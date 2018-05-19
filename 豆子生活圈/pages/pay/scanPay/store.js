// pages/index/ScanPay/PaySetMoney.js
//获取应用实例
const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    ishidden:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  页面加载打时候判断是否设定的积分；
    // if(){
    //   var that = this;
    //   that.setData({
    //     ishidden: false,
    //   })
    // }
   
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