// pages/cityList/cityList.js
Page({
  data: {
    winHeight:0
  },
  //监听传值
  cityTap(e){
    console.log('fasdfsdfsdfds');
    console.log(e);
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];
    //获取上一个页面的js里面的pages的所有信息。-2 是上一个页面
    prevPage.setData({  // 将城市名传回常规搜索页面
      acitySelected: e.detail.cityname,
    })
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const win = wx.getSystemInfoSync();
    console.log(win);
    this.setData({
      winHeight: win.windowHeight
    });
  }
})