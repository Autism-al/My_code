const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetUserInfo(e){
    wx.login({
      success (res) {
        console.log(res);
        if (res.code) {
          //如果成功获取code,发起网络请求
          wx.request({
            method: 'POST',
            url: 'https://airaflyscanner.site:8080/login/',
            data: {
              code: res.code
            },
            success: (result)=>{
              console.log(result);
              app.globalData.userOpenId = result.data.openid;
              console.log(app.globalData.userOpenId);
            }
          })
          console.log(res);
        } else {
          /* 打印错误信息 */
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    console.log(e);
    const {userInfo} = e.detail;
    wx.setStorageSync('userInfo', userInfo);
    wx.navigateBack({
      delta: 1,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})