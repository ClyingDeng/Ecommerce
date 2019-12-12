import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenus: [],
    rightMenus: [],
    currentIndex: 0,  //被点击的左侧菜单
    scrollTop: 0
  },
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //缓存
    //1 获取本地存储数据
    const Cates = wx.getStorageSync("cates");

    //2 判断
    if (!Cates) {
      //不存在 发送请求获取数据
      this.getCates();
    } else {
      // 存在 
      if (Date.now() - Cates.time > 1000 * 10) {
        //数据过期
        this.getCates();
      } else {
        // 有数据且没有过期
        this.cates = Cates.data;
        let leftMenus = this.cates.map(v => v.cat_name);
        let rightMenus = this.cates[0].children;
        this.setData({
          leftMenus, rightMenus
        });
      }

    }

  },
  //获取轮播图
  async getCates() {
    // request({ url: "/categories" }).then(result => {
    //   this.cates = result.data.message;
    //   //把接口的数据存入到本地存储
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.cates });


    //   let leftMenus = this.cates.map(v => v.cat_name);
    //   let rightMenus = this.cates[0].children;
    //   this.setData({
    //     leftMenus, rightMenus
    //   });
    // });
    // 1.使用es7的async await 来发送请求
    const res = await request({ url: "/categories" });
    this.cates = res;
    //把接口的数据存入到本地存储
    wx.setStorageSync('cates', { time: Date.now(), data: this.cates });


    let leftMenus = this.cates.map(v => v.cat_name);
    let rightMenus = this.cates[0].children;
    this.setData({
      leftMenus, rightMenus
    });
  },
  //左侧菜单的点击事件
  handleTap(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    let rightMenus = this.cates[index].children;
    //重新设置右侧内容scroll-view标签顶部位置
    this.setData({ currentIndex: index, rightMenus, scrollTop: 0 });

  }
}) 