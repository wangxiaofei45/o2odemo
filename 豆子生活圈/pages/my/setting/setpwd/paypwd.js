var util = require('../../../../utils/util.js');
var app = new getApp();
Page({
  data:{
    to_from: '', //来自哪个页面的跳转
    member_mobile:'',
    payErrNum: 0,//输入密码错误次数
    is_exist: true,//密码是否已设置
    is_validCode: true,//默认禁止输入验证码
    verifyCodeTime: '获取验证码',
    validCodeDisable: true,//默认禁止发送验证码
    confirmNewpaypwdDisable: true,//默认输入复核新密码
    isConfirmNewPwd: false,//是否确定复核密码失败
    updatePaypwdDisable: true,//默认禁止修改支付密码
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //从哪里跳转过来
    if (options.to_from) {
      that.setData({
        to_from: options.to_from,
        store_id: options.store_id,
        store_name: options.store_name,
        is_integral: options.is_integral,
        consumeAmount: options.consumeAmount,
        noDiscountAmount: options.noDiscountAmount,
      })
    }
    that.loadMemberInfo();
  },
  //加载会员基本信息
  loadMemberInfo: function(){
    var that = this;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/my_asset", data, function (res) {

      console.log('返回支付密码结果:', res);
      var data = res.datas;
      if (data.member_mobile) {
        that.setData({
          member_mobile: data.member_mobile,
          is_exist: data.is_paypwd,
        })
      } else {
        that.showErrMsg('您未绑定手机号，无法重设支付密码');
        wx.redirectTo({
          url: '../verifyphone'
        })
      }
    });
  },
  //验证老密码
  checkOldPaypwd:function(e){
    var that = this;
    let oldPaypwd = e.detail.value, //老密码
      payErrNum = Number(that.data.payErrNum);//支付密码错误次数
    if (!oldPaypwd || oldPaypwd.length < 6){
      return false;
    }
    if (payErrNum > 3) {
      app.showErrMsg('您的支付密码输入错误次数已超过3次，不允许再输入');
      return false;
    }
    var data = {
      token: app.globalData.token, //必带
      pay_pwd: oldPaypwd,//支付密码
    };
    util.Ajax("member/check_paypwd", data, function (res) {
      var data = res.datas;
      console.log('返回验证支付密码的结果:', res);
      if (data.is_check) {
        app.showSucMsg(res.sucMsg);
      } else {
        if (payErrNum > 0) {
          app.showErrMsg(res.sucMsg + '您已' + payErrNum + '次输错密码，还有' + (3 - payErrNum) + '机会');
        } else {
          app.showErrMsg(res.sucMsg);
        }
      }
    });
  },
  //输入新密码
  inputNewpaypwd: function (e) {
    let new_paypwd = e.detail.value;
    if (!new_paypwd) {
      return false;
    }
    if (new_paypwd.length != 6){
      app.showErrMsg("支付密码必须是6位数字");
      return false;
    }
    this.setData({
      new_paypwd: new_paypwd,
      confirmNewpaypwdDisable:false,
    })
  },
  //复核新密码
  inputConfirmNewpaypwd: function (e) {
    var that = this;
    let confirmNewpaypwd = e.detail.value, //验证老密码
      new_paypwd = that.data.new_paypwd;
    if (!confirmNewpaypwd) {
      return false;
    }
    if (confirmNewpaypwd != new_paypwd){
      app.showErrMsg("您设置的支付密码复核不正确");
    }
    that.setData({
      isConfirmNewPwd: true,
      validCodeDisable: false,
    })
  }, 
  //发送验证码
  sendValidCode: function (e) {
    var that = this;
    var mobileNumber = that.data.member_mobile,
      validCodeDisable = that.data.validCodeDisable;
    if (validCodeDisable) {
      return false;
    }
    var c = 90;
    var intervalId = setInterval(function () {
      c = c - 1;
      that.setData({
        verifyCodeTime: c + 's后重发',
        validCodeDisable: true
      })
      if (c == 0) {
        clearInterval(intervalId);
        that.setData({
          verifyCodeTime: '获取验证码',
          validCodeDisable: false,
          mobilecaptcha: '',
        })
      }
    }, 1000);

    var param = {
      mobile: mobileNumber
    }
    util.Ajax("login/send_captcha", param, function (res) {
      console.log('发送的验证码', res)
      var datas = res.datas;
      if (datas.sms_state) {
        app.showSucMsg(res.sucMsg);
        that.setData({
          mobilecaptcha: datas.verify_code,
          is_validCode: false,
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  // 验证 验证码的有效性
  inputCheckCode: function (e) {
    let that = this,
      mobile = that.data.member_mobile,
      is_validCode = that.data.is_validCode,
      verify_code = that.data.mobilecaptcha,
      captcha = e.detail.value;

    if (!mobile || is_validCode || !captcha) {
      return false;
    }
    if (!verify_code) {
      app.showErrMsg("验证码已经过期请重新获取");
      return false;
    }
    var param = {
      mobile: mobile,
      verify_code: verify_code,//验证码加密
      captcha: captcha
    }
    util.Ajax("login/check_sms_captcha", param, function (res) {
      //console.log( '验证的验证码', res)
      var datas = res.datas;
      if (datas.sms_state) {
        app.showSucMsg(res.sucMsg);
        //验证通过允许修改支付密码
        that.setData({
          captcha: captcha,
          updatePaypwdDisable: false,
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  //去修改支付密码
  formSubmit: function (e) {
    var that = this;
    let isConfirmNewPwd = that.data.isConfirmNewPwd,
      new_paypwd = that.data.new_paypwd;
    if (!isConfirmNewPwd) {
      app.showErrMsg("支付密码复核未通过");
      return false;
    }
    var data = {
      token: app.globalData.token,
      member_id: app.globalData.member_id,//会员ID
      new_paypwd: new_paypwd
    };
    util.Ajax("member/modify_paypwd", data, function (res) {
      var data = res.datas;
      console.log('返回修改支付密码:', res);
      if (res.code) {
        let to_from = that.data.to_from,
          store_id = that.data.store_id,
          store_name = that.data.store_name,
          pay_pwd = that.data.pay_pwd,
          is_integral = that.data.is_integral,
          consumeAmount = that.data.consumeAmount,
          noDiscountAmount = that.data.noDiscountAmount;
        if (to_from){
          to_from = to_from.replace(/-/g, '/'); //全局替换路径
          wx.redirectTo({
            url: '../../../' + to_from + '?is_paypwd=' + true + '&store_id=' + store_id + '&store_name=' + store_name + '&is_integral=' + is_integral + '&consumeAmount=' + consumeAmount + '&noDiscountAmount=' + noDiscountAmount
          })
        }else{
          wx.redirectTo({
            url: '../index'
          })
        }        
      } else {
        that.showErrMsg(data.errMsg);
      }
    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})