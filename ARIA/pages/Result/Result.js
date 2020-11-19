// pages/Result/Result.js
Page({
  data: {
    ticketInfList:[],
    isCollect:[],
    dplace: "福州",
    aplace: "上海",
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
        value:"仅特价",
        class:"iconfont icontejiajipiaobiaoqian",
        isActive:false
      },
      {
        id:1,
        value:"时间",
        class:"iconfont iconhuabanfuben",
        isActive:true,
      },
      {
        id:2,
        value:"价格",
        class:"iconfont iconjiageguanxiguanli",
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
      typeSelected: index == 1 ? 'time':'price'
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
    var today = myDate.toLocaleDateString();  //今日年月日
    that.setData({
      nowDate: nowDate,
      sysmonth: sysmonth
    }),
    this.setData({
      dateSelected,
      monthSelected,
      daySelected,
      citySelected
    }),
    this.directRequest();
    console.log('系统日期（年/月/日）：',today);
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

/*   onShow: function(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {id} = options;
    
  }, */
 
  // 初始化日期
  initData() {
    const nowDateTime = +new Date();
    let dateList = [];
    for (let i = 0; i < 60; i++) {
      let obj = this.getDateInfo(nowDateTime + i * 24 * 60 * 60 * 1000);
      obj.isChoose = i == 0;
      dateList.push(obj);
    }
    this.setData({
      dateList,
      clickIndex: 0,
      scrollLeftIndex: 0
    });
  },
 
  // 点击日期方法
  clickDate(e) {
    var that = this;
    console.log("点击",e);
    console.log('点击日期携带的下标：', e.currentTarget.dataset.index);  //当前的点击的日期
    
    var index = e.currentTarget.dataset.index;
    var monthSelected = this.data.dateList[index].month;
    var dateSelected = this.data.dateList[index].day;
    //待修改，获取用户输入的年份，并在滑动条从12/31到1/1时使年份+1
    var yearSelected = '2020';
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
    wx.request({
      url: 'http://airaflyscanner.site:8000/directResearch/',
      data:{
        dcityName:this.data.citySelected,
        dtime:this.data.daySelected,
        sortType:this.data.typeSelected
      },
      success: (res)=>{
        console.log(res);
        //获取缓存中的机票收藏的数组
        let collect = wx.getStorageSync('collect')||[];
        //判断当前页面机票是否被收藏
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

  //点击触发收藏事件
  /* handleCollect(){
    let isCollect = false;
    //获取缓存中的机票收藏数组
    let collect = wx.getStorageSync('collect')||[];
    //判断机票是否被收藏过
    let index = collect.findIndex(v=>v.id==this.ticketInf.id);
    //若Index!=-1表示已收藏
    if(index!=-1){
      //从数组中删除
      collect.splice(index,1);
      isCollect = false;
      wx-wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    }
    else{
      //添加到数组
      collect.push(this.ticketInf);
      isCollect = true;
      wx-wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 没有后台接口，α版本暂且存放在缓存中
    wx-wx.setStorageSync('collect', collect);
    //修改data中的isCollect属性
    this.setData({
      isCollect
    })
  } */
  handleCollect(e){
    let isCollected = false;
    //把机票信息放入收藏数组中
    //获取缓存中的机票收藏数组
    let collect = wx.getStorageSync('collect')||[];
    //判断机票是否被收藏过
    let index = collect.findIndex(v=>v.id==this.data.ticketInfList[e.currentTarget.dataset.index].id);
    if(index!=-1){
      //从数组中删除
      collect.splice(index,1);
      isCollected = false;
      wx-wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    }
    else{
      //添加到数组
      collect.push(this.data.ticketInfList[e.currentTarget.dataset.index])
      isCollected = true;
      wx-wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    // 没有后台接口，α版本暂且存放在缓存中
    wx-wx.setStorageSync('collect', collect);
    //修改data中的isCollect[]属性
    this.data.ticketInfList[e.currentTarget.dataset.index].isCollect = isCollected;
  }
  
})