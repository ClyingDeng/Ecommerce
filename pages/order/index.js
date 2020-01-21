import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        index: 0,
        value: '全部',
        isActive: true
      },
      {
        index: 1,
        value: '待付款',
        isActive: false
      },
      {
        index: 2,
        value: '待发货',
        isActive: false
      },
      {
        index: 2,
        value: '退货/退款',
        isActive: false
      }
    ],
    orders:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad(options) {//获取url上参数
  //   console.log(options);
  // },
  onShow(options) {
    // const token = wx.getStorageSync('token');
    // if (!token) {
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }

    //1.获取当前的小程序的页面栈-数组 长度最大10
    //2.数组中 索引最大的页面就是当前页面
    let pages = getCurrentPages();
    // console.log(pages);
    let currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    const { type } = currentPage.options;
    this.getOrders(type);
    this.changeTitleByIndex(type - 1);
  },
  //获取订单列表的方法
  async getOrders(type) {
    const res = await request({ url: "/my/orders/all", data: { type } });
    console.log(res);
    // this.setData({orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))});
  },

  //标题点击事件
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    console.log(e)
    const { index } = e.detail;
    //修改原数组
    this.changeTitleByIndex(index);
    this.getOrders(index + 1);
  },
  //根据标题索引激活选中
  changeTitleByIndex(index) {
    //修改原数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //复制到data中
    this.setData({ tabs });
  }

})