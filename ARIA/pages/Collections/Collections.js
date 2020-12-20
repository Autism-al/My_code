const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    typeArr:["出发日期","航空公司"],
    typeIndex: 0
  },
  bindTypeChange: function(e){
    console.log(e);
    this.setData({
      typeIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取收藏信息
    this.getCollectInf();
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
      let index = e.currentTarget.dataset.index;
      wx.request({
        url: 'https://airaflyscanner.site:8080/concernList/',
        method: "DELETE",
        data:{
          openid:app.globalData.userOpenId,
          ticketId: this.data.items[index].ticketId,
        },
        success: (res)=>{
          console.log(res);
      }
      })
      this.data.items.splice(e.currentTarget.dataset.index, 1);
      let collect = this.data.items;
      this.setData({
        items: this.data.items,
      })
    },

    getCollectInf: function(){
      wx.request({
        url: 'http://airaflyscanner.site:8000/concernList/',
        data:{
          openid:app.globalData.userOpenId
        },
        success: (res)=>{
          console.log(res);
          this.setData({
            items:res.data
          })
      }
      })
    }
})