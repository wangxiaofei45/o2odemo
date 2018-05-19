// pages/index/Pay/PayFail.js
const app = getApp();
let imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    order_sn: '',//订单号
    payableAmount: 0,//应付金额
    errMsg: "对不起，您的充值卡余额不足，请充值！",//提示信息
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})