const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    mycoupon: 0,//我的优惠券数量
    memberInfo: {
      member_avatar: imgUrl + '/DefaultAvatar-store.png',
      available_predeposit: 0.00,
      available_rc_balance: 0.00,
    },
  },
  onLoad: function (options) {
    var that = this;
    //加载会员信息
    wx.showLoading({
      title: '加载中',
    })
    that.loadMemberInfo();
  },
  //加载会员信息
  loadMemberInfo: function () {
    var that = this;
    var data = {
      member_id: wx.getStorageSync('member_id'),
    };
    util.Ajax("member/nextIndex", data, function (res) {
      var data = res.datas;
      console.log('返回会员信息:', res);
      that.setData({
        memberInfo: data.memberInfo,
      })
      console.log("获取的会员的信息",that.data.memberInfo)
      wx.hideLoading();
    },"POST");
  },
  // 扫一扫调取相机
  Richscan: function () {
    wx.scanCode({
      success: (res) => {
        let scanCode = res.result;
        if (scanCode.indexOf('s') >= 0) {
          let store_id = 0,
            consumeAmount = '';
          if (scanCode.indexOf("a") >= 0) {
            store_id = scanCode.substring(1, scanCode.indexOf("a"));
            consumeAmount = scanCode.substring(scanCode.indexOf("a") + 1);
          } else {
            store_id = scanCode.substring(scanCode.indexOf("s") + 1);
          }
          //会员扫商家付款
          wx.navigateTo({
            url: '../../pay/pay?store_id=' + store_id + '&consumeAmount=' + consumeAmount,
          })
        } else if (scanCode.indexOf('m') >= 0) {
          //商家扫会员收款
          wx.navigateTo({
            url: '../../pay/collect/store?scanCode=' + scanCode,
          })
        } else {
          //会员个人收款
          wx.navigateTo({
            url: '../../pay/scanPay/personal?scanCode=' + scanCode,
          })
        }
        console.log(res)
      }
    })
  },
})