const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../../config').imgUrl,
  util = require('../../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
    to_from: '', //来自哪个页面的跳转
    member_mobile: '',
    is_exist: true,//密码是否已设置
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

  //加载会员基本信息
  loadMemberPasswd: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/check_passwd", data, function (res) {

    },"POST");
  },
  //验证老密码
  checkOldPasswd: function (e) {
    var that = this;
    let oldPasswd = e.detail.value, //老密码
      payErrNum = Number(that.data.payErrNum);//登录密码错误次数
    if (!oldPasswd || oldPasswd.length < 6) {
      return false;
    }
    if (payErrNum > 3) {
      app.showErrMsg('您的登录密码输入错误次数已超过3次，不允许再输入');
      return false;
    }
    var data = {
      member_id: that.data.member_id,
      member_passwd: oldPasswd,
    };
    util.Ajax("member/check_passwd", data, function (res) {
      var data = res.datas;
      console.log('返回验证登录密码的结果:', res);
      if (data.is_check) {
        app.showSucMsg(res.sucMsg);
        that.setData({
          newPwdDisable: false,
        })
      } else {
        if (payErrNum > 0) {
          app.showErrMsg(res.sucMsg + '您已' + payErrNum + '次输错密码，还有' + (3 - payErrNum) + '机会');
        } else {
          app.showErrMsg(res.sucMsg);
          that.setData({
            newPwdDisable: true,
          })
        }
      }
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
      new_passwd: new_passwd
    };
    util.Ajax("member/modify_passwd", data, function (res) {
      var data = res.datas;
      console.log(data);
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