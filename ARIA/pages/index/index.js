//index.js
const app = getApp();

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    today: '请选择日期',
    ticketInfList:[],
    monthSelected: 0,
    dateSelected: 0,
    /* daySelected存放用户选择的日期字符串,页面间传值时可直接以数组下标传送 */
    daySelected: "2020-11-23",
    citySelected:"福州",
    typeSelected:"rate",
    index: 0, 
  },
  
  goToResultPage: function(e){
    wx.navigateTo({
      url: "../../pages/Result/Result",  
      })
  },

  initDate: function(e){
    const nowDateTime = new Date();
    let nowDay = '';
    var ntime= nowDateTime.getFullYear() + "/"
    + (nowDateTime.getMonth() + 1) + "/" + nowDateTime.getDate();
    let daySelected = ntime.split("/");
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
 // login.js
requestMsg(){
  if(!app.globalData.userOpenId){
    wx.showToast({
      title: '请先登录再使用订阅功能',
      icon: 'none',
      mask: false
    })
    return;
  }
  return new Promise((resolve, reject) => {
    wx.requestSubscribeMessage({
      tmplIds: ["lu4TyPHCeQvJPCSH-IJ9X1mL3jLQVTCODK50VffU1oI"],
      success: (res) => {
        if (res['lu4TyPHCeQvJPCSH-IJ9X1mL3jLQVTCODK50VffU1oI'] === 'accept'){
          wx.showToast({
            title: '订阅成功',
            duration: 1000,
            success(data) {
              //成功
              resolve()
            }
          })
        }
      },
      fail(err) {
        //失败
        console.error(err);
        reject()
      }
    })
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDate();
    this.directRequest();
  },
  onShow: function (){
    this.directRequest();
  },

  directRequest: function(){
    //请求直达机票信息用于首页推荐
    console.log("向接口请求的日期",this.data.today);
    console.log("向接口请求的地点",this.data.citySelected);
    console.log("向接口请求的排序类型",this.data.typeSelected);
    let daySelected = this.data.daySelected[0] + "-" + this.data.daySelected[1] + "-" + this.data.daySelected[2];

    wx.request({
      url: 'https://airaflyscanner.site:8080/directResearch/',
      data:{
        dcityName:this.data.citySelected,
        dtime:daySelected,
        sortType:this.data.typeSelected
      },
      success: (res)=>{
        console.log(res);
        let collect = wx.getStorageSync('collect')||[];
        //判断当前页面机票是否被收藏,若是已被收藏，就不该出现在推荐中
        for (var index in res.data) {
          for (var indexCollect in collect)
          {
            if(res.data[index].id==collect[indexCollect].id)
            {
              res.data[index].isCollect = true;
            }
          }
       }
        this.setData({
          ticketInfList: res.data,
        })
        console.log(this.data.ticketInfList);
      }
    })
  },

})
