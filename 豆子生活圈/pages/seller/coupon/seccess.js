const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    coupon_id: 0,
    couponInfo: ''
  },
  onLoad: function (options) {
    var that = this,
      coupon_id = options.coupon_id;
    if (coupon_id){
      that.setData({
        coupon_id: coupon_id
      });
      that.loadCouponInfo();
    }
  },
  //加载优惠券列表
  loadCouponInfo: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      coupon_id: that.data.coupon_id
    };
    util.Ajax("seller/getCouponInfo", data, function (res) {
      var data = res.datas;
      that.setData({
        couponInfo: data.couponInfo,
      })
    });
  },
  tapToCouponList: function () {
    wx:wx.redirectTo({
      url: 'list',
    })
  },
})