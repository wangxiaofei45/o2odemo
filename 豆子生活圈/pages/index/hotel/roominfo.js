var util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl,
  WxParse = require('../../../wxParse/wxParse.js');
const app = getApp();
Page({
  data: {
    imgUrl: imgUrl,
    open_calltel:true,
    token: app.globalData.token,//token
    merber_id: app.globalData.merber_id,//获取会员的id
    goodsInfo:{},
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;
    that.setData({
      store_id: options.store_id,
      good_id: options.good_id,
    })
    that.get_roominfo();
  },
  onReady: function () {
  
  },
  get_roominfo:function(){
    var that = this;
    var data = {
      store_id: that.data.store_id,//店铺ID
      good_id:that.data.good_id,
      token: that.data.token,
      member_id: that.data.merber_id,
    };
    console.log(data);
    util.Ajax("Hotel/getGoodsInfo", data, function (res) {
      wx.hideLoading();
      that.setData({
        goodsInfo: res.datas.goodsInfo,
      })
    });
  },
  // 调用打电话的接口
  open_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: false,
    })
  },
  close_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: true,
    })
  },
  makecall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.telephone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})