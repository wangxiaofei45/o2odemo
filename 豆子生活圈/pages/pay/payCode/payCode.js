const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  wxbarcode = require('../../../utils/code.js'),
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    sight:true,
    order_sn:'',
    memberInfo: {
      member_avatar: imgUrl + '/DefaultAvatar-store.png',
      available_predeposit: 0.00,
      available_rc_balance: 0.00,
    },
  },
  onLoad: function (options) {
    var that = this;
    that.loadMemberInfo();
    wx.showLoading({
      title: '加载付款信息中',
    })
  },
  //加载会员信息
  loadMemberInfo: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      store_id: that.data.store_id,//店铺ID
    };
    util.Ajax("member/index", data, function (res) {
      var data = res.datas;
      console.log('返回会员信息:', res);
      wx.hideLoading();
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        that.setData({
          memberInfo: data.memberInfo,
          mycoupon: data.mycoupon,
        })
      }
    });
  },
  //获取订单号
  getOrderSn: function () {
    var that = this,
      member_id = app.globalData.member_id;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member_buy/getOrderSn", data, function (res) {
      var data = res.datas;
      console.log("获取订单号：",res);
      var reg = /^(\d{4})(\d*)(\d{4})$/;
      that.setData({
        order_sn: data,
        hideOrderSn: data.replace(reg, function (a, b, c, d) {
          return b + c.replace(/\d/g, "*") + d;
        }),
      });
      wxbarcode.barcode('barcode', data + 'm' + member_id, 600, 180);
      wxbarcode.qrcode('qrcode', data + 'm' + member_id, 420, 420);
    });
  },
  changesight: function () {
    var that = this;
    that.setData({
      sight: !that.data.sight,
    })
  },
  onShow: function () {
    //获取订单号
    this.getOrderSn();
  },
  checkNumber: function () {
     console.log("触发了");
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
})