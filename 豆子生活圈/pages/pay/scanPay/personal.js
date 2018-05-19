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
    payableAmount: '',//实际支付金额
    available_rc_balance: 0, //可用余额
    available_predeposit: 0.00,//可用积分
    use_rc_balance: 0, //使用余额
    use_predeposit: 0,//使用积分
    other_pay_amount: 0,//其他方式支付金额
    payDisabled: true, //禁止收款
    payment_mode: 1, //默认支付方式 微信支付
    is_paypwd: false, //支付密码是否已经正确输入，默认未输入密码
    is_pop_paypwd: false, //是否弹出支付密码窗
    is_focus_paypwd: false, //默认控制input聚焦到支付密码上
    payErrNum: 0,//输入密码错误次数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this,
      is_pop_paypwd = that.data.is_pop_paypwd,
      user_id = '',
      consumeAmount = '', //消费金额
      scanCode = options.scanCode;
    //scanCode = '10626a180';
    if (scanCode.indexOf("a") >= 0){ //是否存在金额
      user_id = scanCode.substring(0, scanCode.indexOf("a"));
      consumeAmount = scanCode.substring(scanCode.indexOf("a") + 1);
    }else{
      user_id = scanCode;
    }
    console.log('商家扫码:', user_id);
    if (consumeAmount>0){
      is_pop_paypwd = true;
    }
    that.setData({
      is_pop_paypwd: is_pop_paypwd,
      consumeAmount: consumeAmount,
      user_id: user_id
    })
    if (scanCode){
      this.loadUserInfo();
    }
    this.loadMemberMyasset();
  },
  //加载个人账户
  loadMemberMyasset: function(){
    var that = this,
      consumeAmount = Number(that.data.consumeAmount);
    var parm = {
      token: app.globalData.token,
    };
    util.Ajax("member/my_asset", parm, function (res) {
      var data = res.datas;
      console.log('个人资产:', data);
      that.setData({
        be_paypwd: data.is_paypwd,//是否存在支付密码
        available_predeposit: data.available_predeposit,
        available_rc_balance: data.available_rc_balance,
      })

      if (consumeAmount > 0) {
        that.payableAmount();
      }
    });

  },
  //获取收款人信息
  loadUserInfo: function(){
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
  //提交金额 并转账
  submitScanPay: function () {
    var that = this;
    var parm = {
      token: app.globalData.token,
      user_id: that.data.user_id,
      payableAmount: that.data.payableAmount,
      use_rc_balance: that.data.use_rc_balance,
      use_predeposit: that.data.use_predeposit,
    };
    util.Ajax("member/transferAccounts", parm, function (res) {
      var data = res.datas;
      app.showSucMsg(res.sucMsg);
      wx.redirectTo({
        url: 'scanSuc?user_id=' + that.data.user_id + '&payableAmount=' + that.data.payableAmount + '&use_rc_balance=' + that.data.use_rc_balance + '&use_predeposit=' + that.data.use_predeposit
      })
    });
  },

  /**
   * 应付金额
   */
  blurConsumeAmount: function (e) {
    var that = this;
    that.setData({
      consumeAmount: Number(e.detail.value),
    })
    that.payableAmount();
  },
  //触发应付金额
  payableAmount: function(){
    var that = this,
      consumeAmount = Number(that.data.consumeAmount),
      available_rc_balance = Number(that.data.available_rc_balance),
      available_predeposit = Number(that.data.available_predeposit);
    let use_rc_balance = that.data.use_rc_balance,
      use_predeposit = that.data.use_predeposit,
      payableAmount = that.data.payableAmount,
      other_pay_amount = that.data.other_pay_amount,
      is_pop_paypwd = that.data.is_pop_paypwd,
      is_paypwd = that.data.is_paypwd,
      available_balance = available_rc_balance + available_predeposit;
    if (payableAmount == consumeAmount || consumeAmount <= 0) {
      return false;
    }
    //优先使用卡余额
    if (available_balance < consumeAmount) {//如果用户总余额小于应付金额
      let content = '';
      that.setData({
        payDisabled: true
      })
      if (available_balance <= 0) {
        content = "您没有可用的余额或积分";
      } else {
        content = '您的账户余额不足';
      }
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        confirmText: "知道了",
        content: content + '，注意还需使用其他支付方式。',
        success: function (res) {
          console.log('用户点击确定', res)
        },
      })
      use_rc_balance = available_rc_balance; //使用的余额等于当前用户账户余额
      use_predeposit = available_predeposit;
      other_pay_amount = consumeAmount - use_rc_balance - use_predeposit;
    } else if (available_rc_balance >= consumeAmount) { //余额充足优先使用
      use_rc_balance = consumeAmount;
    } else if (available_balance >= consumeAmount) { //余额不充足，总余额充足
      use_rc_balance = available_rc_balance; //使用的余额等于当前用户账户余额
      use_predeposit = (consumeAmount - available_rc_balance);
    }
    if ((use_rc_balance > 0 || use_predeposit > 0) && !is_paypwd) {
      is_pop_paypwd = true;
    } else {
      is_pop_paypwd = false;
    }
    that.setData({
      payableAmount: consumeAmount,
      is_pop_paypwd: is_pop_paypwd,
      use_rc_balance: use_rc_balance,
      use_predeposit: use_predeposit,
      other_pay_amount: other_pay_amount,
    })
  },
  //输入支付密码
  inputPaypwd: function (e) { //获取支付密码
    var that = this;
    let pay_password = e.detail.value,
      use_rc_balance = that.data.use_rc_balance, //是否使用余额
      use_predeposit = that.data.use_predeposit, //是否使用积分
      pay_pwd = that.data.be_paypwd,
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    //console.log('支付密码pay_pwd：', pay_pwd)
    if (!pay_pwd) {//去设置密码
      app.showErrMsg('您的支付密码还未设置！');
      that.toSetPaypwd();
      return false;
    }
    if (payErrNum > 5) {
      app.showErrMsg('您的支付密码输入错误次数已超过5次，不允许再输入');
      return false;
    }
    that.setData({
      pay_password: pay_password,
    });
    if (pay_password.length == 6) { //密码长度6位时，自动验证钱包支付结果
      that.checkPaypwd();//验证支付密码准确性
    }
  },
  //关闭支付密码的遮罩
  closePaypwd: function () {
    var that = this;
    let is_paypwd = that.data.is_paypwd, //支付密码是否正确
      is_rcb = that.data.is_rcb, //是否使用余额支付
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    //支付密码不正确或密码次数大于3次 而且又使用了积分支付，关闭支付密码后是需要禁止使用积分支付
    that.setData({
      is_focus_paypwd: false, //失去聚焦支付密码
      is_pop_paypwd: false,//关闭支付框
    })
    if ((!is_paypwd || payErrNum > 3) && is_rcb) {
      that.setData({
        is_rcb: false, //取消积分支付
      })
    }
  },
  //验证支付密码
  checkPaypwd: function () {
    var that = this;
    let payableAmount = Number(that.data.payableAmount), //实际需支付金额
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    if (payErrNum > 3) {
      app.showErrMsg('您的支付密码输入错误次数已超过3次，不允许再输入');
      return false;
    }
    var data = {
      token: app.globalData.token, //必带
      pay_pwd: that.data.pay_password,//支付密码
    };
    util.Ajax("member/check_paypwd", data, function (res) {
      var data = res.datas;
      console.log('返回验证支付密码的结果:', res);
      if (data.is_check) {
        that.setData({
          payDisabled: false, //允许点击确定付款 按钮
          is_focus_paypwd: false, //失去聚焦支付密码
          is_pop_paypwd: false,//关闭支付框
          is_paypwd: true, //支付密码正确
        })
      } else {
        if (payErrNum > 0) {
          app.showErrMsg(res.sucMsg + '您已' + payErrNum + '次输错密码，还有' + (3 - payErrNum) + '机会');
        } else {
          app.showErrMsg(res.sucMsg);
        }
        that.setData({
          is_focus_paypwd: true,
          payErrNum: payErrNum + 1,
        });
      }
    });
  },
  //去设置支付密码
  toSetPaypwd: function () {
    var that = this;
    let store_id = that.data.store_id,
      store_name = that.data.store_name,
      is_rcb = that.data.is_rcb, //是否使用积分支付
      consumeAmount = that.data.consumeAmount,
      noDiscountAmount = that.data.noDiscountAmount;
    wx.navigateTo({
      url: '../../my/setting/setpwd/paypwd?to_from=index-pay-scanPay-personal&store_id=' + store_id + '&store_name=' + store_name + '&consumeAmount=' + consumeAmount + '&is_rcb=' + is_rcb + '&noDiscountAmount=' + noDiscountAmount
    });
  },
  //获取支付密码焦点
  setPaypwdFocus: function () {
    var that = this;
    that.setData({
      pay_password: '',
      is_focus_paypwd: true,
    })
  },
})