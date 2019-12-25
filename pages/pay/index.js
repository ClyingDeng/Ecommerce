import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWX.js'
const regeneratorRuntime = require('../../lib/runtime.js');
Page({
  data: {
    address: {},
    carts: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    //获取本地地址数据
    const address = wx.getStorageSync('address');
    //获取缓存cart数据
    let carts = wx.getStorageSync('cart') || [];
    //过滤后的数组
    carts = carts.filter(v => v.checked);

    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num; 
    });
    //给data赋值
    this.setData({ address, carts, totalNum, totalPrice });
    wx.setStorageSync('cart', carts);

  },
//点击支付
handleOrderPay(){
  //判断缓存中有无token
  const token = wx.getStorageSync('token');
  //判断
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/index'
    });
    return;
      
  }
    console.log('已经存在token了');
}

})