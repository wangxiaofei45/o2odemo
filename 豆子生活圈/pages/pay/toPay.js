const app = getApp();
let imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js'),
  WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    paymentCode:'wxpay',//微信支付
    order_sn: '610562529617228626',//订单号
    trade_no: '4200000002201711093408649584',//微信支付单号
    payableAmount: 0.01, //实际支付的金额
    payment_list: [
      { checked: 'true', payment_name: '微信付款', payment_code: 'wxpay' }
    ],
    allowPay: false,//防止重复点击支付
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      order_sn: options.order_sn,
      payableAmount: options.payableAmount,
    });
    //加载支付方式列表
    that.loadPaymentList();
  },
  //加载支付方式列表
  loadPaymentList: function () {
    var that = this;
    var data = {
      payment_code: 'wxpay'
    };
    util.Ajax("payment/payment_list", data, function (res) {
      var data = res.datas;
      console.log(res);
      that.setData({
        payment_list: data.payment_list,
      })
    });
  },
  //确认支付
  confirmPay: function () {
    var that = this;
    that.setData({
      allowPay: true
    });
    let order_sn = that.data.order_sn,
      paymentCode = that.data.paymentCode;
    if (paymentCode == 'wxpay') {
      var param = {
        token: app.globalData.token, //必带
        open_id: app.globalData.open_id,
        order_sn: order_sn,
        payment_code: paymentCode,
        payableAmount: 0.01
      };
      if (!app.globalData.open_id){
        app.showErrMsg("openId未获取，请重新登录");
        wx.clearStorage();//清理本地数据缓存\重新登录。
        wx.redirectTo({
          url: '../index'
        })
      }
      util.Ajax("member_payment/vr_pay_new", param, function (res)      {
        var data = res.datas;
        console.log('返回订单基本信息:', res);

          wx.requestPayment({
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': 'MD5',
            'paySign': data.paySign,
            'success': function (res) {
              //目前微信小程序支付还未支持返回 trade_no微信支付单号
              console.log('支付返回成功:', res);
              that.wxpayNotify();//去修改订单状态
            },
            'fail': function (res) {
              console.log('支付失败:', res);
              app.showErrMsg(res);
              that.setData({
                allowPay: false
              });
            },
            'complete':function (res) {
            }
          })
      });
    } else {
      wx.redirectTo({
        url: 'payHtml?order_sn=' + order_sn + '&payment_code=' + paymentCode
      })
    }
  },
  //选择支付方式
  radioPayment: function (e) {
    console.log("选择支付方式:", e.detail.value);
    var that = this;
    that.setData({
      paymentCode: e.detail.value,
    });
  },
  //微信支付后 去修改订单状态
  wxpayNotify: function (res) {
    var that = this;
    let order_sn = that.data.order_sn,
      paymentCode = that.data.paymentCode;
    var param = {
      order_sn: order_sn,
      payment_code: paymentCode,
      trade_no: that.data.trade_no
    };
    util.Ajax("payment/wxpay_notify", param, function (res) {
      var data = res.datas;
      console.log('返回修改订单状态:', res);
      app.showSucMsg(res.sucMsg);
      if (data.result == 'success'){
        wx.redirectTo({
          url: 'paySuc?order_sn=' + order_sn
        })
      }
    });
  },
  //解析支付页面
  resPayhtml: function (payhtml) {
    WxParse.wxParse('payhtml', 'html', payhtml, this, 5);
  },
})