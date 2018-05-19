const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    mybankcard: '',
  },

  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    that.loadBankCardList();
  },
  //跳转到添加银行卡
  gotoaddbank:function(){
     wx.navigateTo({
       url: 'addbank',
     })
  },
  //加载银行卡列表
  loadBankCardList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      store_id: that.data.store_id,//店铺ID
    };
    util.Ajax("seller/getBankCardList", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      console.log('返回银行卡:', res);
      that.setData({
        mybankcard: data.mybankcard,
      })
    });
  },
})