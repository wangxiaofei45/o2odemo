// pages/bill/detail.js
const app = getApp();
var util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl;
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),//会员的id
    open_calltel:true,
    imgUrl: imgUrl,
    order_sn: '', //订单编号
    order_info: {},//订单详情
    role_type: '1',//身份类型: 默认user为个人 store表示店铺
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      order_id: options.order_id,
      role_type: options.role_type
    });
    that.loadBillDetail();
  },
  loadBillDetail: function () {
    var that = this;
    var param = {
      member_id: that.data.member_id,
      order_id: that.data.order_id,
    };
    util.Ajax("member_bill/detail", param, function (res) {
      var data = res.datas;
      console.log('返回账单信息:', res);
      that.setData({
        order_info: data.order_info,
      });
    },"POST");
  },
  //打开电话接口
  open_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: false,
    })
  },
  close_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: true,
    })
  },
  makecall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.telephone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})