const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    defaultpage: true,
    imgUrl: imgUrl,
    types: null,
    text: null,
    mycoupon: '',
  },
  onLoad: function (options) {
    var that = this;
    that.loadCouponList();
  },
  //加载优惠券
  loadCouponList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/getCouponList", data, function (res) {
      var data = res.datas;
      console.log('返回我的优惠券:', res);
      that.setData({
        mycoupon: data.mycoupon,
      })
    });
  },
})
