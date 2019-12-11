//引入 用来发送请求的方法 一定要把路径补全
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList: [],
    //获取分类导航
    navs: [],
    //获取楼层数据
    floorList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1.发送异步请求 优化手段可以通过es6的 promise来解决这个问题
    // var reqTask = wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })

    //   },
    //   fail: () => {
    //     console.log('错误！');
    //   }
    // });
    this.getSwiperList();
    this.getNavs();
    this.getfloorList();

  },
  //获取轮播图
  getSwiperList() {
    request({ url: "https://api.zbztb.cn/api/public/v1/home/swiperdata" }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    });
  },
  //获取分类导航
  getNavs() {
    request({ url: "https://api.zbztb.cn/api/public/v1/home/catitems" }).then(result => {
      this.setData({
        navs: result.data.message
      })
    });
  },
  //获取楼层数据
  getfloorList() {
    request({ url: "https://api.zbztb.cn/api/public/v1/home/floordata" }).then(result => {
      this.setData({
        floorList: result.data.message
      })
    });
  },


})