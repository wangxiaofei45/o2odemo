var util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl;
var app = new getApp();
Page({
  data: {
    mobile: '',//当前手机号
    captcha: '',
    password: '',
    mobilecaptcha:'', //暂存已发送的验证码加密串
    inviteCode:'', //邀请码
    is_payDues:'',//是否支付了会费
    vip_dues: 0.01,//需支付会费金额
    member_id:0,
    extension_id: 0,//注册时使用--码主ID
    shop_id: 0, //注册时使用--邀请的店铺ID
    imgUrl: imgUrl,
    motto: "欢迎加入DCL原创生态联盟圈",
    is_type:'login',//提交类型。默认login登录；register注册
    verifyCodeTime: '获取验证码',
    login_mode: 'code', //默认登录方式：code验证码; pwd密码；
    is_pwd: true, //显示隐藏密码 默认：隐藏true；显示为false
    icon_pwd: "hide", //显示隐藏密码的图标 默认：隐藏hide；显示为display
    is_check: 1, //验证手机号是否存在：1表示存在则只需登录；0表示不存在需要注册
    validCodeDisable: true,//默认禁止发送验证码
    is_validCode: true,//默认禁止验证码
    isLoginDisabled: true, //是否禁止登录
    isRegisterDisabled: true, //是否禁止注册
    check_pwd_num: 0,//验证密码次数
    userInfo: {},
    hasUserInfo: false
  },
  //初始化页面
  onLoad: function (options) {
    var that = this;
    //用户第一次进去页面时，先查询是否已经获取了该会员的微信信息
    let token = app.globalData.token;
    if (token) {
      //跳转到首页列表页面
      // console.log(token);
      // wx.reLaunch({
      //   url: '../index/index'
      // });
    }else{
      
    }
  },
  // 获取手机号码
  inputMobile: function (e) {
    var that = this,
      mobile = e.detail.value;
    if (!mobile){
      return false;
    }
    //验证手机号有效性
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(mobile)) {
      app.showErrMsg('手机号格式有误,请重新输入')
      return false;
    };
    var param = {
      mobile: mobile,
    };
    console.log(param);
    util.Ajax("login/check_mobile", param, function (data) {
      if (data.code == '200'){
        let datas = data.datas,
          class_boom = '',
          validCodeDisable = that.data.validCodeDisable,
          is_type = that.data.is_type;
          // 验证码200可以注册
        console.log("验证手机号是否可以注册", datas.is_check)
        if (datas.is_check == 200){
          is_type = 'register';
        }else{
          class_boom = 'margin-boooom';
          is_type = 'register';
          wx.setNavigationBarTitle({
            title: "注册",
          })
          //曾今已经绑定过邀请人
          if (datas.inviteCode){
            that.setData({
              extension_id: datas.extension_id,
              shop_id: datas.shop_id,
              inviteCode: datas.inviteCode,
              isRegisterDisabled: false
            })
          }
        }
        that.setData({
          mobile: e.detail.value,
          is_type: is_type,
          is_check: datas.is_check,
          class_boom: class_boom,
          validCodeDisable: false,
        })
        app.showSucMsg(data.sucMsg);
      }else{
        app.showErrMsg(data.errMsg);
      }
    });
  },


  inputPassword: function (e) {
    let that = this,
      password = e.detail.value;
    that.setData({
      password: e.detail.value,
    })
    if (password.length < 6 || password.length > 18) {
      app.showErrMsg('密码长度有误！必须大于等于6位和小于等于18位');
      return false;
    }
  },
  //发送验证码
  sendValidCode: function (e) {
    var that = this;
    var mobileNumber = that.data.mobile,
      validCodeDisable = that.data.validCodeDisable;
    if (validCodeDisable){
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
          mobilecaptcha:'',
        })
      }
    }, 1000);
    
    var param = {
      mobile: mobileNumber
    }
    util.Ajax("login/send_captcha", param, function (res) {
      console.log('发送的验证码', res)
      var datas = res.datas;
      if (datas.sms_state){
        app.showSucMsg(res.sucMsg);
        that.setData({
          mobilecaptcha: datas.verify_code,
          is_validCode: false,
        })
      }else{
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  //切换显示隐藏密码
  tapPwdMode: function (e) {
    var that = this;
    var is_pwd = that.data.is_pwd,
      icon_pwd = that.data.icon_pwd;
    if (is_pwd) {
      is_pwd = false;
      icon_pwd = 'display';
    } else {
      is_pwd = true;
      icon_pwd = 'hide';
    }
    that.setData({
      is_pwd: is_pwd,
      icon_pwd: icon_pwd
    });
  },
  // 验证 验证码的有效性
  inputCheckCode: function(e){
    let that = this,
      is_type = that.data.is_type,
      mobile = that.data.mobile,
      is_validCode = that.data.is_validCode,
      verify_code = that.data.mobilecaptcha,
      captcha = e.detail.value,
      inviteCode = that.data.inviteCode,
      isRegisterDisabled = that.data.isRegisterDisabled;

    if (!mobile || is_validCode || !captcha){
      return false;
    }
    if (!verify_code){
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
        //如果邀请码不为空，并且验证码通过验证
        if (inviteCode){
          if (isRegisterDisabled = false){
            isRegisterDisabled = false;
          }
        }else{
          isRegisterDisabled = true;
        }
        //验证通过允许登录
        that.setData({
          captcha: captcha,
          isLoginDisabled: false,
          isRegisterDisabled: isRegisterDisabled,
        })
        if (is_type == 'login'){
          //自动触发登录
          that.tapLogin();
        }
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  // 获取邀请码
  scanCodeBtn: function () {
    var that = this;
    wx.scanCode({
      //onlyFromCamera: true,
      success: (res) => {
        //console.log(res)
        that.setData({
          inviteCode: res.result
        })
        that.checkInviteCode();//去检验
      }
    })
  },
  //输入获取邀请码
  inputInviteCode: function (e) {
    let that = this,
      extension = that.data.inviteCode,
      inviteCode = e.detail.value;
      //邀请码是否发生过改变
    if (extension != inviteCode){
      that.setData({
        inviteCode: inviteCode
      })
      that.checkInviteCode();//去检验
    }else{
      return false;
    }
  },

  //检测邀请码的有效性
  checkInviteCode:function(){
    let that = this,
      extension_id = that.data.extension_id,
      shop_id = that.data.shop_id,
      captcha = that.data.captcha,
      inviteCode = that.data.inviteCode,
      is_payDues = that.data.is_payDues, //是否支付了会费
      isRegisterDisabled = that.data.isRegisterDisabled;

    if (!inviteCode) {
      return false;
    }
    var param = {
      extension: inviteCode,
    }
    util.Ajax("login/check_inviteCode", param, function (res) {
      //console.log('验证的验证码', res)
      var datas = res.datas;
      if (datas.is_check) {
        app.showSucMsg(res.sucMsg);
        that.setData({
          shop_id: datas.shop_id, //邀请店铺ID
          extension_id: datas.extension_id,//邀请人ID
          vip_dues: datas.vip_dues,//需支付的会费
          inviteCode: datas.extension
        })

        //是否需要会费，1、必须支付；0无需支付；-1选择支付
        if (datas.is_dues>0){
          is_payDues = that.gotoPayDues();
        } else if (datas.is_dues < 0){
          wx.showModal({
            title: '温馨提示',
            content: '是否需要升级成为联盟圈的VIP？',
            success: function (res) {
              if (res.confirm) {
                is_payDues = that.gotoPayDues();
              }else{
                is_payDues = ''; //无需支付
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }else{
          //如果验证码不为空，并且邀请码通过验证
          if (!captcha) {
            isRegisterDisabled = false;
          }
        }
        if (is_payDues == ''){//默认状态
          isRegisterDisabled = isRegisterDisabled;
        } else if (is_payDues){
          isRegisterDisabled = false;//支付成功 允许注册
        }else{
          isRegisterDisabled = true; //支付失败 不允许注册
        }
        //验证通过允许注册
        that.setData({
          isRegisterDisabled: isRegisterDisabled,
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  //去支付会费
  gotoPayDues: function () {
    var that = this;
    let paymentCode = 'wxpay',
    wxInfoParam = wx.getStorageSync('wxInfoParam');
    wxInfoParam.vip_dues = that.data.vip_dues;
    util.Ajax("login/pay_dues1", wxInfoParam, function (res) {
        var data = res.datas;
        wx.requestPayment({
          'timeStamp': data.timeStamp,
          'nonceStr': data.nonceStr,
          'package': data.package,
          'signType': 'MD5',
          'paySign': data.paySign,
          'success': function (res) {
            //目前微信小程序支付还未支持返回 trade_no微信支付单号
            //验证通过允许注册
            that.setData({
              isRegisterDisabled: false,
            })
            // console.log('支付返回成功:', res);
            wxInfoParam.member_mobile = that.data.mobile,
            wxInfoParam.extension_id = that.data.extension_id,
            wxInfoParam.shop_id = that.data.shop_id,
            wxInfoParam.inviteCode = that.data.inviteCode;
            util.Ajax("login/bindingLog", wxInfoParam, function (res) {
              // console.log('记录绑定的码主', res)
              var datas = res.datas;
              //验证通过允许注册
            })
            wx.showLoading({
              title: 'loading...',
            })
            that.register();
            return true;
          },
          'fail': function (res) {
            console.log('支付失败:', res);
            app.showErrMsg(res.errMsg);
            return false;
          },
          'complete': function (res) {
          }
        })
      });
  },

  register: function(e) {
    let that = this;
    let wxInfoParam = wx.getStorageSync('wxInfoParam');
      wxInfoParam.mobile = that.data.mobile;//手机号
      wxInfoParam.password = that.data.password;//密码
    console.log("获取注册参数：", wxInfoParam);
    if (!that.data.mobile) {
      app.showErrMsg("手机号不能为空");
      return false;
    }
    if (!that.data.captcha) {
      app.showErrMsg("验证码必填");
      return false;
    }
    util.Ajax("login/wxapp_register", wxInfoParam, function (data) {
      console.log("返回注册信息",data);
      var datas = data;
      console.log(datas)
      if (datas.code == 200) {
        console.log("123", datas);
        // app.globalLogin(datas);
        wx.setStorageSync('member_id', datas.datas.member_id);
        // wx.removeStorageSync('wxInfoParam');
        wx.reLaunch({
          url: '../index/index'
        });
        wx.hideLoading();
      } else {
        app.showErrMsg(data.sucMsg);
      }
    })
  },
})