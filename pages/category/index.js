import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenus:[],
    rightMenus:[],
    toView: 'green'
  },
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },
  //获取轮播图
  getCates() {
    request({ url: "https://api.zbztb.cn/api/public/v1/categories" }).then(result => {
      this.cates = result.data.message;
      let leftMenus = this.cates.map(v => v.cat_name);
      let rightMenus = this.cates[0].children;
      this.setData({
        leftMenus,rightMenus
      });
    });
  },

})