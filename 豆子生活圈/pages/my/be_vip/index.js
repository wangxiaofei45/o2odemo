const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    inputInviteCode: '',
    member_id: wx.getStorageSync("member_id"),
    imgUrl: imgUrl,
    payableAmount: 0.00, //实际支付金额
    paymentCode: 'wxpay', //支付方式默认为微信支付
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
    that.getVipAmount();
  },
  getVipAmount:function(){
    var that = this;
    var param = {
      member_id: that.data.member_id,
    }
    util.Ajax("member/getMemberVipAmount", param, function (res) {
      var data = res.datas;
      that.setData({
        payableAmount: data.amount,
      })
    }, "POST");
  },
  // 邀请码
  inputInviteCode: function (e) {
    var that = this;
    that.setData({
      inputInviteCode: e.detail.value,
    });
    console.log("yaoqin", that.data.inputInviteCode)
  },
  //确认支付先验证店铺的邀请码
  check_Code:function(){
    var that = this,
        extension = that.data.inputInviteCode;
    var param = {
      member_id: that.data.member_id,
      extension: extension,
    };
    if (extension == ''){
        wx.showModal({
          title: '提示',
          content: '店铺邀请码为空',
        })
    }else{
      util.Ajax("login/check_chain_inviteCode", param, function (res) {
        console.log(res)
        if (res.code == 200) {
          app.showSucMsg(res.datas);
          that.confirmPay()//发起支付
        } else {
          app.showErrMsg(res.sucMsg);
        }
      }, "POST");
    }
  },
  confirmPay: function () {
    var that = this;
    let payableAmount = that.data.payableAmount,
      paymentCode = that.data.paymentCode;
    var param = {
      open_id: wx.getStorageSync('openid'),
      payment_code: paymentCode,
      payableAmount: payableAmount,
      member_id: that.data.member_id,
      agent_no: that.data.inputInviteCode
    };
    util.Ajax("member_payment/memberLevelGoup", param, function (res) {
      console.log("返回支付的信息", res)
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
    }, "POST");
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
    console.log("打印订单信息", param);
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
})