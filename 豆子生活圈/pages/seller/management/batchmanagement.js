let imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
    filterright: false,//筛选
    filter_1: "",//销售中显示名字
    filter_1_id: 1,//销售中的对号显示
    filter_1_show: false,
    filter1: [
      {
        name: "所有",
      },
      {
        name: "销售中",
      },
      {
        name: "未上架",
      },
    ],
    filter_2: "",//销售中显示名字
    filter_2_id: 1,//销售中的对号显示
    filter_2_show: false,
    filter2: [
      {
        name: "综合",
      },
      {
        name: "价格由低到高",
      },
      {
        name: "价格由高到低",
      },
      {
        name: "销量由低到高",
      },
      {
        name: "销量由高到低",
      },
    ],
    // 
 
    select_all: false,
    middlearr: [],
    items: [
      { name: '1', checked: false },
      { name: '2', checked: false },
      { name: '3', checked: false },
      { name: '4', checked: false },
      { name: '5', checked: false },
      { name: '6', checked: false },
    ],
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      filter_1: that.data.filter1[1].name,
      filter_2: that.data.filter2[0].name
    })
  },
  // 过滤
  open_filter1: function () {
    var that = this;
    that.setData({
      filter_1_show: true,
      filter_2_show: false,
    })
  },

  change: function (e) {
    var data = e.currentTarget.dataset;
    let that = this;
    that.setData({
      filter_1: data.name,
      filter_1_id: data.index,
      filter_1_show: false,
    })
  },
  open_filter2: function () {
    var that = this;
    that.setData({
      filter_2_show: true,
      filter_1_show: false,
    })
  },
  change2: function (e) {
    var data = e.currentTarget.dataset;
    let that = this;
    that.setData({
      filter_2: data.name,
      filter_2_id: data.index,
      filter_2_show: false,
    })
  },
  open_filter_right: function () {
    let that = this;
    that.setData({
      filterright: true,
    })
  },
  close_filter_right: function () {
    let that = this;
    that.setData({
      filterright: false,
    })
  },
  close_model:function(){
    let that = this;
    that.setData({
      filter_1_show: false,
      filter_2_show: false,
    })
  },
  // 选择
  select: function (e) {
    var that = this;
    let arr2 = [];
      var arr = that.data.items;
      var index = e.currentTarget.dataset.id;
      arr[index].checked = !arr[index].checked;
      console.log(arr);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          arr2.push(arr[i])
        }
      };
      that.setData({
        items: arr,
        middlearr: arr2
      })
  },
  // 删除
  deleteitem: function () {
    var that = this;
    let arr = that.data.items;
    let arr2 = [];
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked == false) {
        arr2.push(arr[i]);
      }
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  },
  // 全选
  select_all: function () {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    if (that.data.select_all) {
      let arr = that.data.items;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
          arr2.push(arr[i]);
        } else {
          arr[i].checked = true;
          arr2.push(arr[i]);
        }
      }
      that.setData({
        items: arr2,
        middlearr: arr2
      })
    }
  },
  // 取消全选
  select_none: function () {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].checked = false;
      arr2.push(arr[i]);
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  },
})