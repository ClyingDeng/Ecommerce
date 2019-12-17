import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
/*
  滚动条触底，加载下一页数据
  若没有下一页则提示
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        index: 0,
        value: '综合',
        isActive: true
      },
      {
        index: 1,
        value: '销量',
        isActive: false
      },
      {
        index: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodList: []
  },
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.queryParams.cid = options.cid;
    this.getGoodsList();
    
  },
  //获取商品分类列表
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.queryParams });
    console.log(res);
    const total = res.total;
    this.totalPages = Math.ceil(total / this.queryParams.pagesize); //总页数= 总条数/每页条数
    console.log(this.totalPages);
    this.setData({
      //拼接的数组
      goodList: [...this.data.goodList, ...res.goods]
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();

  },
  //标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    console.log(e)
    const { index } = e.detail;
    //修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //复制到data中
    this.setData({ tabs });
  },
  //监听用户上拉触底事件
  onReachBottom() {
    if (this.queryParams.pagenum >= this.totalPages) {
      // console.log('没有下一页数据');
      wx.showToast({
        title: '已经到底啦'
      });

    } else {
      // console.log('有');
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新页面
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodList: []
    });
    //重置代码
    this.queryParams.pagenum = 1;
    //调用方法发送请求
    this.getGoodsList();

  }

})