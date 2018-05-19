// pages/index/Pay/PaySuccess.js
const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    user_id: 0,
    payableAmount: '',//实际支付金额
    available_rc_balance: 0, //可用余额
    available_predeposit: 0.00,//可用积分
    use_rc_balance: 0, //使用余额
    use_predeposit: 0,//使用积分
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log('options:',options);
    if (options) {
      that.setData(options);
      this.loadUserInfo();
    } else {
      wx.navigateBack()
    }
  },
  //获取收款人信息
  loadUserInfo: function () {
    var that = this;
    var parm = {
      user_id: that.data.user_id,
    };
    util.Ajax("index/getUserInfo", parm, function (res) {
      var data = res.datas;
      console.log('个人:', data);
      that.setData({
        userInfo: data.userInfo,
      })
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  sure: function () {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 完成支付跳转页面
   */
  successPay: function () {
    wx.switchTab({
      url: '../../my/index'
    })
  },
})