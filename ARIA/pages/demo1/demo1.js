// pages/demo1/demo1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.directRequest();
    
  },
  directRequest(){
    //发送异步请求获取数据
    wx.request({
      url: 'http://airaflyscanner.site:8000/directResearch/',
      data:{
        dcity:"福州",
        dtime:"2020-11-19"
      },
      success: (result)=>{
        console.log(result);
      }
    })
  },
  normalRequest(){
    //请求直达机票信息
    wx.request({
      url: 'url',
      data: {
        dcityName:"福州",
        dtime:"2020-11-19",
        actiyName:"上海"
      },
      success:((res) => {
        console.log(result);
      })
      })
    
}})

