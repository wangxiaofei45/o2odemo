const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../../config').imgUrl,
  util = require('../../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
    to_from: '', //来自哪个页面的跳转
    member_mobile: '',
    payErrNum: 0,//输入密码错误次数
    is_validCode: true,//默认禁止输入验证码
    verifyCodeTime: '获取验证码',
    validCodeDisable: true,//默认禁止发送验证码
    newPwdDisable: false,
    confirmNewPwdDisable: true,//默认输入复核新密码
    isConfirmNewPwd: false,//是否确定复核密码失败
  },
  onLoad: function (options) {
    var that = this;
    that.loadMemberPasswd();
  },
  //加载会员电话
  loadMemberPasswd: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/getMemberMobile", data, function (res) {
      that.setData({
        member_mobile: res.datas.member_mobile
      })
    },"POST");
  },
  //输入新密码
  inputNewpasswd: function (e) {
    let new_passwd = e.detail.value;
    if (!new_passwd) {
      return false;
    }
    this.setData({
      new_passwd: new_passwd,
      confirmNewPwdDisable: false,
    })
  },
  //复核新密码
  inputConfirmNewpasswd: function (e) {
    var that = this;
    let confirmNewpasswd = e.detail.value, //验证老密码
      new_passwd = that.data.new_passwd;
    if (!confirmNewpasswd) {
      return false;
    }
    if (confirmNewpasswd != new_passwd) {
      app.showErrMsg("您设置的登录密码复核不正确");
    }
    that.setData({
      isConfirmNewPwd: true,
      validCodeDisable: false,
    })
  }, 

  //发送验证码
  sendValidCode: function (e) {
    var that = this;
    var mobileNumber = that.data.member_mobile;
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
      var datas = res.datas;
      if (datas.sms_state) {
        app.showSucMsg(res.sucMsg);
        that.setData({
          captcha: captcha,
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    let isConfirmNewPwd = that.data.isConfirmNewPwd,
      new_passwd = that.data.new_passwd;
    if (!isConfirmNewPwd) {
      app.showErrMsg("原来的登录密码不正确");
      return false;
    }
    var data = {
      member_id: that.data.member_id,
      new_passwd: new_passwd,
    };
    util.Ajax("member/modify_passwd", data, function (res) {
      console.log(res);
      var data = res.datas;
      if (data.is_res) {
        wx.redirectTo({
          url: '../index'
        })
      } else {
        that.showErrMsg(data.errMsg);
      }
    },"POST");
  },
})