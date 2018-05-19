const app = getApp();
var util = require('../../../../utils/util.js'),
  imgUrl = require('../../../../config').imgUrl;
Page({
  data: {
    store_id: 0,
    imgUrl: imgUrl,
    bankcardList: [],//银行卡列表
  },
  onLoad: function (options) {
    wx:wx.showLoading({
      title: '加载中...',
    })
    var that = this,
      store_id = options.store_id;
    if (store_id > 0 || !judge.judgeNull(store_id)) {
      that.setData({
        store_id: store_id,
      })
      //加载商户信息
      that.loadBankCardList();
    }
  },

  onShow: function () {
  },
  //加载银行卡列表
  loadBankCardList: function () {
    var that = this;
    var param = {
      token: app.globalData.token, //必带
      store_id: that.data.store_id,
    };
    util.Ajax("seller/getBankCardList", param, function (res) {
      wx.hideLoading();
      var data = res.datas;
      console.log('返回商家银行卡:', res);
      that.setData({
        bankcardList: data.mybankcard,
      });
    });
  },
  select:function(e){
    console.log(e.currentTarget.dataset.obj)
    console.log(e.currentTarget.dataset.bid);
    var bcid = e.currentTarget.dataset.bid;
    wx.navigateTo({
      url: 'withdraw?bid=' + bcid,
    })
  },
})