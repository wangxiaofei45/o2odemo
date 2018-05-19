const app = getApp();
let imgUrl = require('../../../config').imgUrl;
let util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    store_id: 0,
    class_list: [],
    add_model: true,
    addmessage: ""
  },
  onLoad: function (e) {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    that.setData({
      store_id: e.store_id,
    })
    that.loadiing_class();
  },
  onReady: function () {

  },
  //加载分类列表
  loadiing_class: function () {
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: that.data.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
    };
    util.Ajax("Hotel/getGoodsClassList", data, function (res) {
      var data = res.datas;
      console.log('分类列表:', data.returnData);
      that.setData({
        class_list: data.returnData
      });
      wx.hideLoading();
    }, "POST");
  },
  open_model: function () {
    var that = this;
    that.setData({
      add_model: false,
    })
  },
  close_model: function () {
    var that = this;
    that.setData({
      add_model: true,
    })
  },
  bindMessage: function (e) {
    this.setData({
      addmessage: e.detail.value
    })
  },
  sendMessage: function (e) {
    var that = this;
    var arr = that.data.class_list;
    var obj = {};
    var name = that.data.addmessage;
    if (name) {
      that.setData({
        add_model: true
      })
      var data = {
        token: app.globalData.token,//登录口令
        store_id: that.data.store_id, //店铺ID
        member_id: app.globalData.member_id, //会员ID
        classname: name,//添加的分类的名称,
      };
      util.Ajax("Hotel/addGoodsClass", data, function (res) {
        that.setData({
          addmessage :'',
        })
        that.loadiing_class();
      }, "POST");
    } else {
      return;
    };
    that.setData({
      addmessage: '',
    })
  },
  cleanInput: function () {
    var setMessage = { sendInfo: this.data.userMessage }
    this.setData(setMessage)
  }
})