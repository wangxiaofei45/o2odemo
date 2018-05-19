// pages/index/seach/seach.js
let app = getApp();
var history = wx.getStorageSync('keyword'),
  util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl;
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    keyword: '',//关键字
    history: history, //历史关键字
    hotKeyword: ['DCL','生态圈','联盟圈'], //历史关键字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //失去小焦点并发生变化时触发
  changeKeywords: function(e){
    this.setData({
      keyword: e.detail.value
    });
  },
  //去搜索
  tapSeach: function () {
    // 这里获得input输入框你的输入的参数
    let that = this;
    wx.navigateTo({
      url: '../store/list?keyword=' + that.data.keyword
    })
  },
  //点击关键字
  tapHistory: function (e) {
    // 这里获得input输入框你的输入的参数
    wx.navigateTo({
      url: '../store/list?keyword=' + e.currentTarget.dataset.name
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})