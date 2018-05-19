const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    amount: '',//账户资产
    userLevel: '',//用户身份判断
    putamount: '',//可以提现的资产
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '资产信息加载中',
      mask: true,
    })
    var that = this;
    that.loadMemberInfo();
  },
  //加载会员信息
  loadMemberInfo: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/my_asset", data, function (res) {
      var data = res.datas;
      console.log('返回会员信息:', res);
      that.setData({
        amount: res.datas.amount,//账户资产
        userLevel: res.datas.userLevel,//用户身份判断
        putamount:res.datas.putamount,//可以提现的资产
      })
      wx.hideLoading();
    },"POST");
  },
})