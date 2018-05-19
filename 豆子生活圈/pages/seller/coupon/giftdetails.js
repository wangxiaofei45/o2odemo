const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    couponInfo:{
      audit_state:1,//是否过期
      discount_price:12,
      coupon_state:"审核通过",
      coupon_name:"优惠券1",
      coupon_des:"满100元使用",
      coupon_start_time:"2017-12-12",
      coupon_end_time:"2018-12-12",
      download_count:12
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '信息加载中...',
    })
    var that = this;
    if (options.coupon_id > 0){
      that.setData({
        coupon_id: options.coupon_id
      });
      that.loadCouponInfo();
    }
  },
  //加载优惠券
  loadCouponInfo: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      coupon_id: that.data.coupon_id
    };
    util.Ajax("seller/getCouponInfo", data, function (res) {
      var data = res.datas;
      console.log('返回优惠券:', res);
      wx.hideLoading();
      that.setData({
        couponInfo: data.couponInfo
        });
    });
  },
  onReady: function () {
  
  },
  goback:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
})