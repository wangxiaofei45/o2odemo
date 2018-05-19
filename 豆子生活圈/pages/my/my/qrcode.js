const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    memberInfo: {},
  },
  onLoad: function (options) {
    var that = this;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/invitation_code", data, function (res) {
      var data = res.datas;
      console.log('返回会员信息:', res);
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        that.setData({
          memberInfo: data.memberInfo,
        })
      }
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})