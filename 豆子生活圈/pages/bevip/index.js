const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
  
  },
  getpay:function(){
    wx:wx.navigateTo({
      url: 'payway',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})