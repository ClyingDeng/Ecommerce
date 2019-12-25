import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWX.js'
const regeneratorRuntime = require('../../lib/runtime.js');
Page({
  data: {
    address: {},
    carts: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    //获取本地地址数据
    const address = wx.getStorageSync('address');
    //获取缓存cart数据
    const carts = wx.getStorageSync('cart') || [];
    this.setData({ address });
    this.setCart(carts);

  },
  onload() {
  },
  //处理添加收货地址
  async handleAddress() {
    try {

      //获取权限
      // wx.getSetting({
      //   success: (result) => {
      //     console.log(result);
      //     //权限状态  一些怪异属性名使用[] 形式获取属性值
      //     const scopeAddress = result.authSetting["scope.address"];
      //     if (scopeAddress === true || scopeAddress === undefined) {
      //       wx.chooseAddress({
      //         success: (result1) => {
      //           console.log(result1);
      //         }
      //       });

      //     } else {
      //       //用户拒绝过授予权限 先诱导用户打开授权界面
      //       wx.openSetting({
      //         success: (result2) => {
      //           //可以调用收货地址代码
      //           wx.chooseAddress({
      //             success: (result3) => {
      //               console.log(result3);
      //             }
      //           });

      //         }
      //       });

      //     }
      //     console.log(result);
      //   },
      // });
      const res1 = await getSetting();
      //权限状态  一些怪异属性名使用[] 形式获取属性值
      const scopeAddress = res1.authSetting["scope.address"];
      if (scopeAddress === false) {
        //诱导打开授权界面
        await openSetting();
      }
      //调用收货地址
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //收货地址存入缓存
      wx.setStorageSync('address', address);





    } catch (error) {
      console.log(error);
    }

  },
  async handleNum(e) {
    // 获取传递过来的参数
    const { opration, id } = e.currentTarget.dataset;
    console.log(opration, id);
    let { carts } = this.data;
    const index = carts.findIndex(v => v.goods_id === id);
    //判断是否要执行删除
    if (carts[index].num === 1 && opration === -1) {
      //弹窗提示
      const res = await showModal({ content: '您是否要删除？' });
      if (res.confirm) {
        carts.splice(index, 1);
        this.setCart(carts);

      }
    } else {
      carts[index].num += opration;
      console.log({ carts });
      this.setCart(carts);
    }
  },
  //商品选中
  handleItemChange(e) {
    //获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let { carts } = this.data;
    //找到被修改的商品对象
    let index = carts.findIndex(v => v.goods_id === goods_id);
    //选中状态取反
    carts[index].checked = !carts[index].checked;
    //5 6把购物车数据重新设置回data中和缓存中
    this.setCart(carts);

  },
  //商品的全选功能
  handleAllChk() {
    let { carts, allChecked } = this.data;
    allChecked = !allChecked;
    carts.forEach(v => v.checked = allChecked);
    console.log(carts);
    this.setCart(carts);
  },
  //设置购物车状态同时，重新计算 底部工具栏的数据 全选 总价格 购买数量
  setCart(carts) {
    let allChecked = true;
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    carts.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    });
    allChecked = carts.length ? allChecked : false;
    //给data赋值
    this.setData({ carts, allChecked, totalNum, totalPrice });
    wx.setStorageSync('cart', carts);
  },
  //支付
  async handlePay() {
    //判断收货地址
    const { address, totalNum } = this.data;
    if (!address.userName) {
      await showToast({ title: "您还没有选择收货地址" })
      return;
    }
    //判断有没有选购
    if (totalNum == 0) {
      await showToast({ title: "您还没有选购商品" })
      return;
    }
    //跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });

  }
})