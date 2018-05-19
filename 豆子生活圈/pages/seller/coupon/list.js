const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    keywords: '',
    types:null,
    text:null,
    couponList:[
      {
        coupon_id:1,
        coupon_name:"开业满送",
        coupon_des:"满 100立减 10",
        coupon_start_time:"2017.09.20",
        coupon_end_time:"2017.10.30",
        discount_price: 10,
        coupon_state: 0,
        audit_state:false,
      },
    ]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '信息加载中...',
    })
    var that = this;
    that.loadCouponList();
  },
  //加载优惠券列表
  loadCouponList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      keywords: that.data.keywords
    };
    util.Ajax("seller/getCouponList", data, function (res) {
      var data = res.datas;
      console.log('返回优惠券列表:', res);
      wx.hideLoading();
      that.setData({
        couponList: data.couponList,
      })
    });
  },
  //搜索关键词
  bindInputKeywords: function (e) {
    var that = this,
      keywords = e.detail.value;
    that.setData({
      keywords: keywords,
    })
    if (keywords){
      that.loadCouponList();
    }
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  openmodel:function(e){
    console.log(e.currentTarget.dataset.cid);
    const that = this;
    if (e.currentTarget.dataset.cid == 1){
      console.log("已经启用点击关闭");
      that.setData({
        types:"该优惠券处于开启状态，关闭后将不再发放，但不影响已领取用户使用，是否关闭？",
        text:"关闭"
      })
    } else if (e.currentTarget.dataset.cid == 0){
      that.setData({
        types: "该优惠券还未启用，启用后消费者可在有效期内领取使用，是否开启？",
        text:"开启"
      })
    } else if (e.currentTarget.dataset.cid == 2){
        that.setData({
          types: "该优惠券已关闭，启用后消费者可在有效期内继续领取使用，是否开启？",
          text:"开启"
        })
    }
    model(that.data.types, that.data.text);
  }
})
const model = function(types,text){
  wx.showModal({
    title: types,
    content: '',
    cancelColor:'#ff4965',
    confirmText: text,
    confirmColor: '#ff4965',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
};