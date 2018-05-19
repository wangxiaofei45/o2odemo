const app = getApp();
let imgUrl = require('../../../config').imgUrl;
let util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    order:1,//排序方式
    status:1,//选择方式
    class_id:'',//分类id
    store_id:0,//店铺的id
    filterright:false,//筛选
    filter_1:"",//销售中显示名字
    filter_1_id:1,//销售中的对号显示
    filter_1_show:false,
    filter1:[
      { 
        name:"所有",
        status:3,
      },
      {
        name: "销售中",
        status:1,
      },
      {
        name: "未上架",
        status:2,
      },
    ],
    filter_2: "",//销售中显示名字
    filter_2_id: 1,//销售中的对号显示
    filter_2_show: false,
    filter2: [
      {
        name: "综合",
        order:1,
      },
      {
        name: "价格由低到高",
        order: 2,
      },
      {
        name: "价格由高到低",
        order: 3,
      },
      {
        name: "时间正序",
        order: 4,
      },
      {
        name: "时间倒叙",
        order: 5,
      },
    ],
    goodsList:[],//商品的列表
    class_list:[],//筛选的分类的列表
    class_index:0,//
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: 'loading...',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    that.setData({
      store_id: options.store_id,
      filter_1 : that.data.filter1[1].name,
      filter_2: that.data.filter2[0].name
    })

    that.loadiing_class();
    that.loadiing_class_list();
  },
  // 加载筛选的分类列表
  loadiing_class_list: function () {
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: that.data.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
    };
    util.Ajax("Hotel/getGoodsClassList", data, function (res) {
      var data = res.datas;
      that.setData({
        class_list: data.returnData
      });
      wx.hideLoading();
    }, "POST");
  },
  // 加载默认的排序的信息
  loadiing_class: function () {
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: that.data.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
      order: that.data.order,
      status: that.data.status,
      class_id:that.data.class_id,
    };
    util.Ajax("Hotel/getMemberGoodsList", data, function (res) {
      var data = res.datas;
      console.log('分类列表:', data);
      that.setData({
        goodsList: data.goodsList,
      })
      wx.hideLoading();
    }, "POST");
  },
  open_filter1:function(){
    var that = this;
    that.setData({
      filter_1_show: !that.data.filter_1_show,
      filter_2_show: false,
    })
  },
  change:function(e){
    var data = e.currentTarget.dataset;
    let that = this;
    that.setData({
      filter_1:data.name,
      filter_1_id:data.index,
      filter_1_show:false,
      status: data.status,
    })
    that.loadiing_class();
  },
  open_filter2: function () {
    var that = this;
    that.setData({
      filter_2_show: !that.data.filter_2_show,
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
      order: data.order,
    })
    that.loadiing_class();
  },
  // 筛选时候的条件1
  change_no_1: function (e) {
    var data = e.currentTarget.dataset;
    let that = this;
    that.setData({
      filter_1: data.name,
      filter_1_id: data.index,
      filter_1_show: false,
      status: data.status,
    })
  },
  // 筛选是时候的文件2
  change_class:function(e){
    var data = e.currentTarget.dataset;
    let that = this;
    that.setData({
      class_id: data.class_id,
      class_index: data.index, 
    })
  },
  open_filter_right:function(){
    let that = this;
    that.setData({
      filterright:true,
    })
  },
  // 筛选点击确定
  close_filter_right: function () {
    let that = this;
    that.setData({
      filterright: false,
    })
    that.loadiing_class();
  },
  close_model: function () {
    let that = this;
    that.setData({
      filter_1_show: false,
      filter_2_show: false,
    })
  },
})