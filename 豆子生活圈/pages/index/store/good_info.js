var util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl,
  WxParse = require('../../../wxParse/wxParse.js');
const app = getApp();
Page({
  data: {
    imgUrl: imgUrl,
    open_calltel: true,
    merber_id: app.globalData.merber_id,//获取会员的id
    goodsInfo:{},
    telphone:'',
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;
    that.setData({
      chain_id: options.chain_id,
      goods_commonid: options.goods_commonid,
    })
    that.get_roominfo(options);
  },
  get_roominfo: function (data) {
    var that = this;
    util.Ajax("goods/index", data, function (res) {
      that.setData({
        goodsInfo: res.datas.goodsInfo,
        telphone: res.datas.goodsInfo.telphone,
      })
      wx.hideLoading();
    },"POST");
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
      phoneNumber: this.data.telphone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})