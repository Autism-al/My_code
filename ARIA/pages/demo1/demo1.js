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
    //请求直达机票信息
    wx.request({
      url: 'http://airaflyscanner.site:8000/directResearch/',
      data:{
        dcityName:"福州",
        dtime:"2020-11-22",
        sortType:"price"
      },
      success: (result)=>{
        console.log(result);
      }
    })
  },
  normalRequest(){
    //请求常规搜索机票信息
    wx.request({
      url: 'http://airaflyscanner.site:8000/normalResearch/',
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

