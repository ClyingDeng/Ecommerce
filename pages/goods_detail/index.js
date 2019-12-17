import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: '/goods/detail', data: { goods_id } });
    this.GoodsInfo = goodsObj;
    console.log(goodsObj);
    this.setData(
      {
        goodsObj: {
          goods_price: goodsObj.goods_price,
          goods_name: goodsObj.goods_name,
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsObj.pics

        }
      });
  },
  //将轮播图放大预览
  handlePrevewImage(e) {
    //图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    //接受传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  //添加至购物车
  handleCartAdd() {
    //获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart') || [];
    //判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //不存在于购物车中，给购物车添加
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    } else {
      //商品已存在
      cart[index].num++;

    }
    //把购物车中数据重新添加到缓存中
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true, //true 防止用户手抖 疯狂点击
    });



  }
})