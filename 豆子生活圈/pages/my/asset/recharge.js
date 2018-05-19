const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    member_id: app.globalData.member_id,
    imgUrl: imgUrl,
    payableAmount: 0.00, //实际支付金额
    paymentCode: 'wxpay', //支付方式默认为微信支付
    selectedId: 0,//选中的充值金额ID
    payment_list: [
      { checked: 'true', payment_name: '微信付款', payment_code: 'wxpay' }
    ]
  },
  u_defined: function () {
    var that = this;
    that.setData({
      diy: !that.data.diy,
      payableAmount: "0",
      selectedId: "-1",
    });
  },
  onLoad: function (options) {
    var that = this;
    that.loadRechargeCard();
  },
  //加载充值卡
  loadRechargeCard: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/recharge_card", data, function (res) {
      var data = res.datas;
      console.log('返回充值卡:', res);
      that.setData({
        rechargecard_list: data.rechargecard_list,
        payment_list: data.payment_list,
      })
    },"POST");
  },
  changeRechargeAmount: function(e){
    var that = this,
      cutdata = e.currentTarget.dataset;
    that.setData({
      payableAmount: cutdata.amount,
      selectedId: cutdata.id
    })
  },
  // 输入支付
  bindinput:function(e){
    var that = this;
    that.setData({
      payableAmount: e.detail.value,
    })
  },
  //确认支付
  confirmPay: function () {
    var that = this;
    let selectedId = that.data.selectedId,
      payableAmount = that.data.payableAmount,
      paymentCode = that.data.paymentCode;
    if (payableAmount == '0.00' || selectedId == 0){
      app.showErrMsg("还未选择您要充值的金额");
      return false;
    }
    var param = {
      open_id: wx.getStorageSync('openid'),
      payment_code: paymentCode,
      payableAmount: payableAmount,
      member_id: that.data.member_id
    };
    if (!app.globalData.member_id) {
      app.showErrMsg("member_id未获取，请重新登录");
      wx.clearStorage();//清理本地数据缓存\重新登录。
      wx.redirectTo({
        url: '../index'
      })
    }
    util.Ajax("member_payment/buy_pd", param, function (res) {
      console.log("返回支付的信息",res)
      var data = res.datas;
      that.setData({
        order_sn: data.order_sn
      })
      if (paymentCode == 'wxpay' || paymentCode == 'wxpay_jsapi') {
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
          },
          'complete': function (res) {
          }
        })
      } else {
        wx.redirectTo({
          url: '../../pay/payHtml?order_sn=' + data.order_sn + '&payment_code=' + paymentCode + '&payment_type=pd_pay_new'
        })
      }
    },"POST");
  },
  //微信支付后 去修改订单状态
  wxpayNotify: function (res) {
    var that = this;
    let order_sn = that.data.order_sn,
      paymentCode = that.data.paymentCode;
    var param = {
      order_sn: order_sn,
      // payment_code: paymentCode,
      // trade_no: that.data.trade_no
    };
    console.log("打印订单信息",param);
    util.Ajax("payment/wxpay_notify", param, function (res) {
      var data = res.datas;
      console.log('返回修改订单状态:', res);
      app.showSucMsg(res.sucMsg);
      if (data.result == 'success') {
        wx.redirectTo({
          url: '../../pay/paySucTwo?order_sn=' + order_sn
        })
      }
    },"POST");
  },
  //选择支付方式
  radioPayment: function (e) {
    var that = this;
    that.setData({
      paymentCode: e.detail.value,
    });
  },
})