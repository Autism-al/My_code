//index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    today: '请选择日期',
    monthSelected: 0,
    dateSelected: 0,
    daySelected: [],
    citySelected:"福州",
    index: 0, 
    selectArray: [{
      "id": "1",
      "text": "福州"
  }, {
      "id": "2",
      "text": "厦门"
  }, {
    "id": "3",
    "text": "三明"
}, {
  "id": "4",
  "text": "广州"
}, {
  "id": "5",
  "text": "上海"
}]
  },
  
  goToResultPage: function(e){
    wx.navigateTo({
      url: "../../pages/Result/Result",  
      })
  },

  initDate: function(e){
    const nowDateTime = new Date();
    let nowDay = '';
    let daySelected = nowDateTime.toLocaleDateString().split("/");
    nowDay += nowDateTime.getFullYear();
    nowDay += "-";
    nowDay += nowDateTime.getMonth()+1;
    nowDay += "-";
    nowDay += nowDateTime.getDate();
    this.setData({
      today: nowDay,
      daySelected
    })
    console.log("系统日期为",daySelected);
  },

 bindDateChange: function (e) {
   let daySelected = e.detail.value.split("-");
   console.log(daySelected);
  this.setData({ 
   today: e.detail.value,
   daySelected
  }) 
    

 }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
