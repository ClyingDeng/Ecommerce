// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
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
    handleItemTap(e) {
      //获取点击索引
      console.log(e.currentTarget.dataset);
      const {index} = e.currentTarget.dataset;
      //触发父组件事件
      this.triggerEvent("tabsItemChange",{index});
    },
  }
})