const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    store_id: app.globalData.store_id,//店铺ID
    is_codeowner: app.globalData.is_codeowner,//码主
    mycoupon: 0,//我的优惠券数量
    memberInfo: {
      member_avatar: imgUrl + '/DefaultAvatar-store.png',
      available_predeposit: 0.00,
      available_rc_balance: 0.00,
    },
  },
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var that = this;
    wx.showLoading({
      title: '拼命加载中',
      mask: true,
    })
    that.loadMemberInfo();
  },
  loadMemberInfo: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/index", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        let mc_id = data.memberInfo.mc_id,
          store_id = data.memberInfo.store_id;
        if (app.globalData.mc_id != mc_id){
          app.globalData.mc_id = mc_id;
          wx.setStorageSync('mc_id', mc_id);
        }
        if (store_id != that.data.store_id){
          app.globalData.store_id = store_id;
          wx.setStorageSync('store_id', store_id);
          that.setData({
            store_id: store_id
          })
        }
        that.setData({
          mc_id: mc_id,
          memberInfo: data.memberInfo,
          is_codeowner: data.memberInfo.is_codeowner,
          mycoupon: data.mycoupon,
        })
      }
    },"POST");
  },
  onPullDownRefresh: function () {
    var that = this;
    wx: wx.showLoading({
      title: 'loading...',
    })
    that.loadMemberInfo();
  },
})