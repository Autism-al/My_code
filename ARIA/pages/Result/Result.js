// pages/Result/Result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dtime: "09:00",
    dplace: "福州",
    atime: "15:00",
    aplace: "上海",
    priceInf: 1000,
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    dateList:[],    //存放日期的数组
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
  //标题点击事件 从子组件传递
  handleTabsItemChange(e){
    console.log(e);
    //获取被点击的标题索引
    const {index} = e.detail;
    //修改源数组
    let {resTabs} = this.data;
    resTabs.forEach((v,i)=>i==index?v.isActive=true:v.isActive=false)
    this.setData({
      resTabs
    })
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
    this.loadTicketInf();
    var that = this;
    var myDate = new Date(); //获取系统当前时间
    var sysmonth = myDate.getMonth() + 1
    var nowDate = myDate.getDate();   //当前是本月几日
    var today = myDate.toLocaleDateString();  //今日年月日
    that.setData({
      nowDate: nowDate,
      sysmonth: sysmonth
    }),
    console.log('系统日期：',myDate);
    console.log('系统日期（年/月/日）：',today);
    console.log('系统日期（月）：', sysmonth);
    console.log('系统日期（日）：', nowDate);
 
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
 
  // 初始化日期
  initData() {
    const nowDateTime = +new Date();
    let dateList = [];
    for (let i = -30; i < 30; i++) {
      let obj = this.getDateInfo(nowDateTime + i * 24 * 60 * 60 * 1000);
      obj.isChoose = i == 0;
      dateList.push(obj);
    }
    this.setData({
      dateList,
      clickIndex: 30,
      scrollLeftIndex: 30
      
    });
  },
 
  // 点击日期方法
  clickDate(e) {
    var that = this;
    console.log('点击日期携带的下标：', e.currentTarget.dataset.index);  //当前的点击的日期
    var index = e.currentTarget.dataset.index;
    that.setData({
      clickIndex: index
    });
    // console.log(that.data.scrollLeftIndex);
    console.log('当前点击日期：',that.data.dateList[index].shortDateString);   //当前点击的日期
 
    // const {
    //   index
    // } = e.currentTarget.dataset;
    // this.setData({
    //   clickIndex: index
    // });
    // console.log(this.data.dateList[index]);
  },
  loadTicketInf: function () {
    for (var i = 0; i < 10; i++) {
      this.data.items.push({
        content: i+1+".机票信息"+"从后台获取",
        isTouchMove: false //默认全隐藏删除
      })
    }
    this.setData({
      items: this.data.items
    })
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
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
    that.data.items.forEach(function (v, i) {
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
      items: that.data.items
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
  //删除事件
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },
  
  
  
})