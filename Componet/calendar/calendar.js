  //index.js 
//获取应用实例 
var app = getApp() 
Page({ 
 data: { 
  
 }, 
 
 onLoad: function () { 
 
 }, 
 // 点击时间组件确定事件 
 bindTimeChange: function (e) { 
  this.setData({ 
   time: e.detail.value 
  }) 
 }, 
 
 // 点击国家组件确定事件 
 bindPickerChange: function (e) { 
  this.setData({ 
   index: e.detail.value 
  }) 
 } 
}) 