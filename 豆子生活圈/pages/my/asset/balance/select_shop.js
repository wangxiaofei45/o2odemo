const app = getApp();
var util = require('../../../../utils/util.js'),
  imgUrl = require('../../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    store_id: app.globalData.store_id,//店铺ID
  },
  onLoad: function (options) {
    var that = this;
    //加载店铺管理
    wx:wx.showLoading({
      title: 'loading...',
    })
    that.loadStoreList();
  },
  onReady: function () {
  
  },
  // 选择门店
  tapChangeStore: function (e) {
    let that = this,
      dataset = e.currentTarget.dataset;
    let store_id = dataset.sid;
    that.setData({
      store_id: store_id,
    })
    wx.navigateTo({
      url: 'withdraw?store_id=' + store_id,
    })
  },
  //加载店铺管理
  loadStoreList: function () {
    var that = this,
      store_id = that.data.store_id;
    var data = {
      token: app.globalData.token,
      store_id: store_id,//店铺ID
      member_id: that.data.member_id,//会员ID
    };
    util.Ajax("member/getStoreList", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      that.setData({
        storeList: data.storeList,
        store_info: data.storeList[0],
      })
    });
  },
})