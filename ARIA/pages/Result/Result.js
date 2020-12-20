const app = getApp()
const network = require("../../utils/network.js");
Page({
  data: {
    clickIndex:100,
    collect:[],
    loading: true,
    ticketIdSelected: 0,
    ticketInfList:[],
    isCollect:[],
    citySelected:"福州",
    dateSelected:"11",
    monthSelected:"11",
    yearSelected:"2020",
    typeSelected:"time",
    startX: 0, //开始坐标
    startY: 0,
    dateList:[], //存放日期的数组
    nowDate:'', //系统当前日期
    resTabs:[//定义筛选栏数据和样式，样式由外部引入
      {
        id:0,
        value:"时间",
        class:"iconfont iconhuabanfuben",
        isActive:true,
      },
      {
        id:1,
        value:"价格",
        class:"iconfont iconjiageguanxiguanli",
        isActive:false
      },
      {
        id:2,
        value:"折扣",
        class:"iconfont iconrate",
        isActive:false
      }
    ]
  },
  //接口传递的参数
  /* QueryParams:{
    //用户选中的日期
    daySelected:"2020-11-22",
    query:"",
    pagenum:1,
    pagesize:10
  }, */

  //标题点击事件 从子组件传递
  handleTabsItemChange(e){
    console.log(e);
    //获取被点击的标题索引
    const {index} = e.detail;
    //修改源数组
    let {resTabs} = this.data;
    //对请求种类进行修改
    console.log(e.detail);
  
    resTabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false)
    this.setData({
      resTabs,
      typeSelected: index == 0 ? 'time':(index == 1?'price':'rate')
    })
    this.directRequest();
    console.log(this.data.typeSelected);
  },

  // 格式化日期，时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  // 格式化数字
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
 
  // 获取日期详情
  getDateInfo(ts) {
    const date = new Date(ts);
    const weekArr = new Array("日", "一", "二", "三", "四", "五", "六");
    const week = date.getDay();
    let dateString = this.formatTime(date);
    let shortDateString = dateString.replace(/\//g, '-').substring(5, 10).replace(/-/g, '月') + "日";
    if (date.getDate() < 10) {
      shortDateString = shortDateString.replace(/0/g, '');
    }
    return {
      shortDateString,
      dateString,
      month: date.getMonth() + 1,
      day: date.getDate(),
      week: weekArr[week]
    }
  },
 
/**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var citySelected = options.citySelected;
    var dateSelected = options.dateSelected;
    var monthSelected = options.monthSelected;
    var yearSelected = options.yearSelected;
    var daySelected = yearSelected + '-' + monthSelected + '-' + dateSelected;
    this.initTicketInf();
    var that = this;
    var myDate = new Date(); //获取系统当前时间
    var sysmonth = myDate.getMonth() + 1
    var nowDate = myDate.getDate();   //当前是本月几日
    var dateNow = nowDate;
    var monthNow = sysmonth;
    var yearNow = myDate.getFullYear();
    var dayNow = yearNow + '-' + monthNow + '-' + dateNow;
    
    that.setData({
      nowDate: nowDate,
      sysmonth: sysmonth,
    }),
    this.setData({
      dateSelected,
      monthSelected,
      daySelected,
      citySelected,
    }),
    this.directRequest();
    console.log('搜索页面传递来的日期（日）：', monthSelected+"/"+dateSelected);
    console.log('搜索页面传递来的城市：', citySelected);
    
 
    // 获取屏幕宽度，设置每个日期宽度
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.setData({
          windowWidth: res.windowWidth,
          itemWidth: parseInt(res.windowWidth / 7)
        });
      },
    })
    this.initData();
  },

  onShow: function(){
    var daySelected = this.data.daySelected;
    var myDate = new Date(); //获取系统当前时间
    var sysmonth = myDate.getMonth() + 1
    var nowDate = myDate.getDate();   //当前是本月几日
    var dateNow = nowDate;
    var monthNow = sysmonth;
    var yearNow = myDate.getFullYear();
    var dayNow = yearNow + '-' + monthNow + '-' + dateNow;
    var clickIndex = this.DateDiff(daySelected,dayNow);
    console.log("1158"+clickIndex);
    this.setData({
      clickIndex
    })
    
  },
 
  // 初始化日期
  initData() {
    const nowDateTime = +new Date();
    let dateList = [];
    for (let i = 0; i < 150; i++) {
      let obj = this.getDateInfo(nowDateTime + i * 24 * 60 * 60 * 1000);
      obj.isChoose = i == 0;
      dateList.push(obj);
    }
    this.setData({
      dateList,
      scrollLeftIndex: 0
    });
  },
 
  // 点击日期方法
  clickDate(e) {
    var yearSelected = '2020';
    var that = this;
    console.log("点击",e);
    console.log('点击日期携带的下标：', e.currentTarget.dataset.index);  //当前的点击的日期
    
    var index = e.currentTarget.dataset.index;
    var monthSelected = this.data.dateList[index].month;
    var dateSelected = this.data.dateList[index].day;
    if(monthSelected<=11)
    {
      yearSelected = "2021";
    }
    var daySelected = yearSelected + '-' + monthSelected + '-' + dateSelected;
    
    that.setData({
      clickIndex: index,
      monthSelected,
      dateSelected,
      daySelected
    });
    
    this.directRequest();
    // console.log(that.data.scrollLeftIndex);
    console.log('当前点击日期：',that.data.dateList[index].shortDateString);   //当前点击的日期
  },


  DateDiff:function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式  
    var  aDate,  oDate1,  oDate2,  iDays  
    aDate  =  sDate1.split("-")  
    oDate1  =  new  Date(aDate[0]  +  '-'  +  aDate[1]  +  '-'  +  aDate[2])    //转换为12-18-2002格式  
    aDate  =  sDate2.split("-")  
    oDate2  =  new  Date(aDate[0]  +  '-'  +  aDate[1]  +  '-'  +  aDate[2])  
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数  
    return  iDays  
},

  /* 从后台获取数据 */
  initTicketInf: function () {
    for (var i = 0; i < 10; i++) {
      this.data.ticketInfList.push({
        isTouchMove: false, //默认全隐藏删除
        isCollect:false
      })
    }
    this.setData({
      ticketInfList: this.data.ticketInfList
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.ticketInfList.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      ticketInfList: this.data.ticketInfList
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.ticketInfList.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      ticketInfList: that.data.ticketInfList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  
  directRequest: function(){
    //请求直达机票信息
    console.log("向接口请求的日期",this.data.daySelected);
    console.log("向接口请求的城市",this.data.citySelected);
    this.getCollectInf();
    wx.request({
      url: 'https://airaflyscanner.site:8080/directResearch/',
      data:{
        dcityName:this.data.citySelected,
        dtime:this.data.daySelected,
        sortType:this.data.typeSelected
      },
      success: (res)=>{
        
        console.log(res);
        //获取缓存中的机票收藏的数组
        let collect = this.data.collect;
        //判断当前页面机票是否被收藏
        for (var indexCollect in collect) {
          for (var index in res.data)
          {
            if(res.data[index].id==collect[indexCollect].ticketId)
            {
              res.data[index].isCollect = true;
            }
          }
       }
        this.setData({
          ticketInfList: res.data,
          loading: false
        })
        console.log(this.data.ticketInfList);
      }
    })
  },
  
  //点击触发收藏事件
  handleCollect: function(e){
    console.log("e的内容：");
    if(!app.globalData.userOpenId){
      wx.showToast({
        title: '请先登录再使用收藏功能',
        icon: 'none',
        mask: false
      })
      return;
    }
    //向后台发送POST请求将机票添加到该用户的收藏列表
    /* this.getCollectInf(); */
    wx.request({
      url: 'https://airaflyscanner.site:8080/concernList/',
      data:{
        openid: app.globalData.userOpenId,
      },
      success: (res)=>{
        //从数据库获取收藏信息
        console.log("收藏列表:",res);
        this.setData({
          collect: res.data
        });
        let collect = this.data.collect;
        let isCollected = false;
        //判断机票是否被收藏过
        let index = collect.findIndex(v=>v.ticketId==this.data.ticketInfList[e.currentTarget.dataset.index].id);
        /* console.log("收藏过了吗？？",index); */
        if(index!=-1){
          //从数据中删除
          this.collectDel(e.currentTarget.dataset.index);
          isCollected = false;
          wx-wx.showToast({
            title: '取消成功',
            icon: 'success',
            mask: false
          })
        }
        else{
          //添加到数据库
          this.collectAdd(e.currentTarget.dataset.index);
          isCollected = true;
          wx-wx.showToast({
            title: '收藏成功',
            icon: 'success',
            mask: false
          })
        }
        //修改data中的isCollect[]属性
        this.data.ticketInfList[e.currentTarget.dataset.index].isCollect = isCollected;
    }
    })
  },

  /* 获取收藏信息 */
  getCollectInf: function(){
    /* console.log("获取收藏信息时的openid",app.globalData.userOpenId); */
    if(app.globalData.userOpenId!="")
    {
      wx.request({
      url: 'https://airaflyscanner.site:8080/concernList/',
      data:{
        openid: app.globalData.userOpenId
      },
      success: (res)=>{
        //从数据库获取收藏信息
        console.log("收藏列表:",res);
        this.setData({
          collect: res.data
        })
    }
    })
} 
  },

  //增加收藏
  collectAdd: function(index){
    wx.request({
      url: 'http://airaflyscanner.site:8000/concernList/',
      method:"POST",
      data:{
        ticketId: this.data.ticketInfList[index].id,
        openid: app.globalData.userOpenId,
        orgPrice: this.data.ticketInfList[index].price
      },
      success: (res)=>{
        console.log(res);
      }
    })
  },

  /* 删除收藏 */
  collectDel: function(index){
    wx.request({
      url: 'https://airaflyscanner.site:8080/concernList/',
      method: "DELETE",
      data:{
        ticketId: this.data.ticketInfList[index].id,
        openid: app.globalData.userOpenId
      },
      success: (res)=>{
        console.log(res);
    }
    })
  }
})