import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js'
const regeneratorRuntime = require('../../lib/runtime.js');
Page({
  data: {
    address: {}
  },
  onShow() {
    //获取本地地址数据
    const address = wx.getStorageSync('address');
    //给data赋值
    this.setData({ address });

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
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //收货地址存入缓存
      wx.setStorageSync('address', address);

      console.log(address);



    } catch (error) {
      console.log(error);
    }

  },

})