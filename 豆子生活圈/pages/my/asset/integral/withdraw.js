const imgUrl = require('../../../../config').imgUrl;
Page({
  data: {
    defaultpage: true,
    imgUrl: imgUrl,
    money: '',
    disabled: true,
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  bindinput: function (e) {
    console.log(e.detail.value);
    if (e.detail.value == '' || e.detail.value <= 0) {
      let that = this;
      that.setData({
        disabled: true,
      })
    } else {
      let that = this;
      that.setData({
        disabled: false,
      })
    }
    let that = this;
    that.setData({
      money: e.detail.value,
    })
  },
  sure: function (e) {
    console.log("dainji");
  },
})


