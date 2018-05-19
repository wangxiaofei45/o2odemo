// pages/index/seach/seach.js
let app = getApp();
var history = wx.getStorageSync('billKeyword'),
  util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
    keyword: '',//关键字
    history: history, //历史关键字
    role_type: 'user',//身份
    seachtxt: '店铺的名称',
    hotKeyword: ['DCL', '生态圈', '联盟圈'], //历史关键字
  },
  onLoad: function (options) {
    let that = this,
      seachtxt = that.data.seachtxt;
    if (options.role_type) {
      if (options.role_type=='user'){
        seachtxt = '会员名、手机号、支付金额等';
      }
      that.setData({
        role_type: options.role_type,
        seachtxt: seachtxt
      });
    }
  },
  //失去小焦点并发生变化时触发
  changeKeywords: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  //去搜索
  tapSeach: function () {
    // 这里获得input输入框你的输入的参数
    let that = this,
      keyword = that.data.keyword;
    var keywords = wx.getStorageSync('billKeyword') || []
    if (keywords.indexOf(keyword) < 0) {
      keywords.unshift(keyword)
    }
    console.log(keywords);
    wx.setStorageSync('billKeyword', keywords)
    wx.reLaunch({
      url: 'bill?keyword=' + keyword
    })
  },
  //点击关键字
  tapHistory: function (e) {
    // 这里获得input输入框你的输入的参数
    wx.reLaunch({
      url: 'bill?keyword=' + e.currentTarget.dataset.name
    })
  },
})