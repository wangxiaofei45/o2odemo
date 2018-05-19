let imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
    tickt: {
      imaurl: "",
      title: "智琳之家女装",
      text: "送冬靴长靴1双，围巾1条",
      time: "2018.02.01-2018.03.15",
      status: 4,
    },
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  goback:function(){
    wx.navigateBack({
      delta: 1,
    })
  }
})