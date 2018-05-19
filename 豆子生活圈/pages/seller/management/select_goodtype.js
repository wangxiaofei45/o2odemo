const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    class_list: [
      {
        good_id: 1,
        name: "置顶商品",
      }, {
        good_id: 1,
        name: "2商品",
      }, {
        good_id: 1,
        name: "3商品",
      }
    ],
    add_model: true,
    addmessage: ""
  },
  onLoad: function (options) {
  },
  onReady: function () {
  },
  // 选择商品后跳珠到添加商品
  select: function (e) {
    var that = this;
    var datas = e.currentTarget.dataset;
    var data = JSON.stringify(datas);
    wx: wx.redirectTo({
      url: 'addgood?data=' + data,
    })
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
    console.log(this.data.addmessage)
  },
  sendMessage: function (e) {
    var that = this;
    var arr = that.data.class_list;
    var obj = {};
    var name = that.data.addmessage;
    if (name) {
      obj.name = name;
      obj.numbers = '0'
      arr.push(obj)
      that.setData({
        class_list: arr,
        add_model: true
      })
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
  },
})