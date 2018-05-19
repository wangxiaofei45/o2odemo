// pages/index/paymentCode/paymentCode.js
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
    user_id: 0,
    pay_price: 0,//实际支付金额
    buyerInfo: {
      available_rc_balance: 0, //可用余额
      available_predeposit: 0.00,//可用积分
    },
    use_rc_balance: 0, //使用余额
    use_predeposit: 0,//使用积分
    other_pay_amount: 0,//其他方式支付金额
    consumeDisabled: true, //禁止收款
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this,
      scanCode = options.scanCode;
    //scanCode = '123456267832145626m10626';
    let order_sn = scanCode.substring(0, scanCode.indexOf("m")),
      user_id = scanCode.substring(scanCode.indexOf("m") + 1);
    console.log('商家扫码:', scanCode.indexOf("m"));
    if (scanCode){
      var parm = {
        token: app.globalData.token,
        order_sn: order_sn,
        user_id: user_id,
      };
      util.Ajax("seller/scanCollect", parm, function (res) {
        var data = res.datas;
        console.log('商家扫码:', res);
        if (judge.judgeNull(data.buyerInfo)){
          app.showErrMsg("未能获取到会员资料");
          wx.navigateBack({
            
          })
        }else{
          that.setData({
            order_sn: order_sn,
            user_id: user_id,
            buyerInfo: data.buyerInfo,
          })
        }
      });
    }
  },
 //提交金额 并生成订单
  submitConsume: function () {
    var that = this;
    var parm = {
      token: app.globalData.token,
      order_sn: that.data.order_sn,
      buyer_id: that.data.user_id,
      pay_price: that.data.pay_price,
      use_rc_balance: that.data.use_rc_balance,
      use_predeposit: that.data.use_predeposit,
    };
    util.Ajax("seller/buy_step", parm, function (res) {
      var data = res.datas;
      console.log("商家收款：",res);
      if (data.order_sn) {
        app.showSucMsg(res.sucMsg);
        if (data.order_state == '20') { //支付成功
          wx.redirectTo({
            url: '../paySuc?order_sn=' + data.order_sn
          })
        } else {
          //支付失败
          wx.redirectTo({
            url: '../payFail?order_sn=' + data.order_sn + "&payableAmount=" + that.data.pay_price + "&errMsg=" + res.sucMsg
          })
        }
      } else {
        app.showErrMsg("订单创建失败！");
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 应付金额
   */
  blurConsumeAmount: function (e) {
    var that = this, 
      consumeAmount = Number(e.detail.value),
      available_rc_balance = Number(that.data.buyerInfo.available_rc_balance),
      available_predeposit = Number(that.data.buyerInfo.available_predeposit);
    let use_rc_balance = that.data.use_rc_balance,
      use_predeposit = that.data.use_predeposit,
      pay_price = that.data.pay_price,
      other_pay_amount = that.data.other_pay_amount,
      available_balance = available_rc_balance + available_predeposit;
    if (pay_price == consumeAmount || consumeAmount <= 0){
        return false;
    }
    //优先使用卡余额
    if (available_balance < consumeAmount){//如果用户总余额小于应付金额
      let content = '';
      that.setData({
        consumeDisabled: true
      })
      if (available_balance <= 0){
        content = "该会员没有可用的余额或积分";
      }else{
        content = '该用户账户余额不足';
      }
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        confirmText:"已知晓",
        content: content + '，注意提示用户使用其他支付方式。',
        success: function (res) {
          console.log('用户点击确定', res)
        },
      })
      use_rc_balance = available_rc_balance; //使用的余额等于当前用户账户余额
      use_predeposit = available_predeposit;
      other_pay_amount = consumeAmount - use_rc_balance - use_predeposit;       
    } else if (available_rc_balance >= consumeAmount){ //余额充足优先使用
      use_rc_balance = consumeAmount;
    } else if (available_balance >= consumeAmount) { //余额不充足，总余额充足
      use_rc_balance = available_rc_balance; //使用的余额等于当前用户账户余额
      use_predeposit = (consumeAmount - available_rc_balance);
    }
    console.log('商家zhifu :', consumeAmount);
    that.setData({
      pay_price: consumeAmount,
      use_rc_balance: use_rc_balance,
      use_predeposit: use_predeposit,
      other_pay_amount: other_pay_amount,
      consumeDisabled: false
    })
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