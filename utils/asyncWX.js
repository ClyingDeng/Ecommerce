// Promise 形式的getSetting
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });
    })
}
/**
 * promise 形式 showModal
 * @params {object} param0 参数
 */
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        //弹窗提示
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }

        })
    })
}

export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        //弹窗提示
        wx.showToast({
            title: title,
            icon: 'none',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }

        })
    })
}
//登录
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout:10000,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        });
          
        
    })
}
