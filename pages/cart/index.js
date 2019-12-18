// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //处理添加收货地址
  handleAddress() {
      // wx.chooseAddress({
      //   success: (result) => {
      //     console.log(result);
      //   },
      //   fail: () => { },
      //   complete: () => { }
      // });
      // wx.getSetting({
      //   success: (res) => {
      //     console.log(res)
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });
        
    //获取权限
    wx.getSetting({
      success: (result) => {
        console.log(result);
        //权限状态  一些怪异属性名使用[] 形式获取属性值
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1);
            }
          });

        } else {
          //用户拒绝过授予权限 先诱导用户打开授权界面
          wx.openSetting({
            success: (result2) => {
              //可以调用收货地址代码
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3);
                }
              });

            }
          });

        }
        console.log(result);
      },
    });

  }


})