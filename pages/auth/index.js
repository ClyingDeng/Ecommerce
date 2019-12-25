import { request } from "../../request/index.js";
const regeneratorRuntime = require('../../lib/runtime.js');
import {login} from '../../utils/asyncWX.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function (options) {

  },
  //获取用户信息
  async handleGetUserInfo(e){
    // 获取用户信息
    const {encryptedData,rawData,iv,signature} = e.detail;
    console.log(e);
    //获取小程序登录成功后的code
   const code = await login();
   console.log(code);
   const loginParams = {encryptedData,rawData,iv,signature,code};
      //发送请求
      const res = await request({url:'/users/wxlogin',data:loginParams,method:"post"});
      console.log(res);
  }
})