let imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
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
  successPay: function () {
    wx.switchTab({
      url: '../../my/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }  
    })
  },
})