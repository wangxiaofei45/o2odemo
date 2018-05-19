const app = getApp();
var util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl;
Page({
  data: {
  	imgUrl: imgUrl,
    couponAmount: 0, //优惠券金额
    storeList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponStoreList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  //获取有效优惠券的商铺
  getCouponStoreList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: app.globalData.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
    };
    util.Ajax("member/getCouponStoreList", data, function (res) {
      var data = res.datas;
      console.log('店铺列表:', res);
      that.setData({
        storeList: data.storeList,
        couponAmount: data.couponAmount,
      })
    });
  },
  //已经领取优惠券
  tapReceive: function(){
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: app.globalData.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
    };
    util.Ajax("member/onekeyReceiveCoupon", data, function (res) {
      var data = res.datas;
      console.log('领取返回结果:', res);
      app.showSucMsg(data.sucMsg);
      if (data.is_receive){
        wx.redirectTo({
          url: '../../my/my/coupon',
        })
      }
    });
  }
})