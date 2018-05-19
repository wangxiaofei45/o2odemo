Page({
  data: {
    identitys:'',
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      identitys: options.identitys//跳转获取用户的信息
    })
  },
  onReady: function () {
  
  },
})