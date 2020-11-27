// pages/Result/Result.js
var util = require('../../utils/util.js');

Page({
  data: {
    ticketInfList:[],
  },
/**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) 
  {
    var nameSelected = options.nameSelected;
    var DATE = util.formatDate(new Date());
    console.log(nameSelected);
    this.setData({
      date: DATE,
    });

    wx.request({
      url: 'http://www.airaflyscanner.site:8000/companyTickets/',
      data: {
        companyName/* 改成林必涵给的变量名 */ : nameSelected/* 你的相应变量名 */,
        dtime/* 改成林必涵给的变量名 */: '2020-12-01'/* 你的相应变量名 */
      },
      success: (res)=>{
        console.log(res);
        
        this.setData({
          ticketInfList: res.data,
        })
        console.log(this.data.ticketInfList);
      }
    })
  }
})