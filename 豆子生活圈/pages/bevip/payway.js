let imgUrl = require('../../config').imgUrl;
Page({
  data: {
    imgUrl:imgUrl,
    paymentCode: 'wxpay', //支付方式默认为微信支付
    payment_list: [
      { checked: 'true', payment_name: '微信付款', payment_code: 'wxpay' },
      { checked: '', payment_name: '支付宝', payment_code: 'alipay' },
      { checked: '', payment_name: '银联', payment_code: 'llpay' },
    ],
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  radioPayment: function (e) {
    var that = this;
    that.setData({
      paymentCode: e.detail.value,
    });
    console.log(that.data.paymentCode);
  },
  confirmPay: function () {
    console.log("支付");
  },
})