// Componet/resTabs/resTabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    resTabs:{
      type:Array,
      value:[],
      class:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件
    handleItemTap(e){
      // 获取点击的索引
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange",{index});
    }
    //出发父组件中的事件
    
  }
})
