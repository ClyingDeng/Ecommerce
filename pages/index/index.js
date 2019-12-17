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
    //   url: '/home/swiperdata',
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
    request({ url: "/home/swiperdata" }).then(result => {
      console.log(result);
      this.setData({
        swiperList: result
      })
    });
  },
  //获取分类导航
  getNavs() {
    request({ url: "/home/catitems" }).then(result => {
      console.log(result);
      this.setData({
        navs: result
      })
    });
  },
  //获取楼层数据
  getfloorList() {
    request({ url: "/home/floordata" }).then(result => {
      console.log(result);
      this.setData({
        floorList: result
      })
    });
  },


})