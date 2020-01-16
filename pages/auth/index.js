import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
import { login } from '../../utils/asyncWX.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {

  },
  //获取用户信息
  async handleGetUserInfo(e) {
    try {
      // 获取用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      console.log(e);
      //获取小程序登录成功后的code
      const msg = await login();
      const code = msg.code;
       console.log(code);
      const loginParams = { encryptedData, rawData, iv, signature,  code};
      //发送请求
      console.log(loginParams);
      const { token } = await request({ url: '/users/wxlogin', data: loginParams, method: "post" });
      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }

  }
})