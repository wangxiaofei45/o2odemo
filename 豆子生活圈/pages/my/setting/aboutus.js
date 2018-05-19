var imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
  },
  // 调取拨打电话
  makePhoneCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel //仅为示例，并非真实的电话号码
    })
  },
})