const app = getApp();
var util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl;
Page({
  data: {
    order_id: 0,
    order_sn: '',//订单编号
    refund_amount: 0,//退款金额
    rcb_amount: 0,//余额支付
    pd_amount: 0,//积分支付
  },
  onLoad: function (options) {
    var that = this;
    if (options.order_sn){
      that.setData({
        order_id: options.order_id,
        order_sn: options.order_sn,
        refund_amount: options.refund_amount,
        rcb_amount: options.rcb_amount,
        pd_amount: options.pd_amount
      });
    }
  },
  onReady: function () {
  
  },
  //提交申请
  formSubmit: function (e) {
    var that = this,
      param = e.detail.value;
      param.token = app.globalData.token, //必带
      param.order_sn = that.data.order_sn;
    util.Ajax("member_order/add_refund_all", param, function (res) {
      var data = res.datas;
      console.log('返回账单信息:', res);
      if (data.is_refund == 1){
        wx.showToast({
          title: '退款申请已提交!',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: 'bill',
          })
        }, 2000);
      }
    });
  },
})