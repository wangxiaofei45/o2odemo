const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  wxbarcode = require('../../utils/code.js'),
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
  },
  onLoad: function (options) {
    console.log(options.store_id);
    var that = this;
    var collectCode = 'http://o2o.hzlwo.com/wap/pay.html?store_id='+options.store_id;
    wxbarcode.qrcode('collectCode', collectCode, 360, 360);
  },
  save:function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 360,
      height: 360,
      destWidth: 360,
      destHeight: 360,
      canvasId: 'collectCode',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
  }
})