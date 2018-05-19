// pages/index/PayCode/CheckNumber.js
const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  wxbarcode = require('../../../utils/code.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '该数字仅用于付款，请不要发给他人。',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            order_sn: options.order_sn
          });
          wxbarcode.barcode('barcode', options.order_sn + 'm' + app.globalData.member_id, 970, 280);
        }else{
          wx.navigateBack({
            delta: 1,
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})