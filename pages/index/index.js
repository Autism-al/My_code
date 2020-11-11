//index.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-11-11', 
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
  // 点击日期组件确定事件 
 bindDateChange: function (e) { 
  this.setData({ 
   date: e.detail.value 
  }) 
 }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
