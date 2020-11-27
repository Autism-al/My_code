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
    acitySelected:"上海",
    index: 0, 
  },
  
  /* goToResultPage: function(e){
    wx.navigateTo({
      url: "../../pages/Result/Result",  
      })
  }, */

  initDate: function(e){
    const nowDateTime = new Date();
    let nowDay = '';
    let daySelected = nowDateTime.toLocaleDateString().split("/");
    nowDay += nowDateTime.getMonth()+1;
    nowDay += "月";
    nowDay += nowDateTime.getDate();
    nowDay += "日";
    this.setData({
      today: nowDay,
      daySelected
    })
    console.log("系统日期为",daySelected);
  },

 bindDateChange: function (e) {
   let daySelected = e.detail.value.split("-");
   let today = daySelected[1]+"月"+daySelected[2]+"日";
   console.log(daySelected);
  this.setData({ 
   today,
   daySelected
  }) 
    

 }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate();
  },
})
