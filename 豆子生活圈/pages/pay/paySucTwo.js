const app = getApp();
let imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
  },
  onLoad: function (options) {

  },
  successPay: function () {
    wx.switchTab({
      url: '../my/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },
})