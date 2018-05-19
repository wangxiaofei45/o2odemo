const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    integral: 0,
    amount:'',//积分总额
    incomeAmount:'',//赚取 的积分
    payAmount:'',
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载积分信息',
    })
    var that = this;
    that.loadMemberInfo();
  },
  loadMemberInfo: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/my_point", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      that.setData({
        amount: data.amount,
        incomeAmount: data.incomeAmount,
        payAmount: data.payAmount,
      })
    },"POST");
  },
})