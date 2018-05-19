const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    coupontype:0,//判断优惠券类型
    defaultpage: true,
    imgUrl: imgUrl,
    types: null,
    text: null,
    mycoupon: '',
  },
  onLoad: function (options) {
    wx:wx.showLoading({
      title: '加载中请稍后',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    var that = this;
    wx.setNavigationBarTitle({
      title: options.title,
    })
    that.setData({
      coupontype: options.coupontype,
    });
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
      wx.hideLoading()//隐藏加载中提示
      that.setData({
        mycoupon: data.mycoupon,
      })
    });
  },
})
