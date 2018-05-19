const app = getApp();
var util = require('../../../utils/util.js');
let judge = app.judge,
    imgUrl = require('../../../config').imgUrl;
// 验证手机号格式
function  isPoneAvailable(e)  {
          var  myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if  (!myreg.test(e))  {
            wx.showToast({
              title: '手机格式错误',
              icon: 'success',
              duration: 1500,
            });
              return  false;
          }  else  {
              return  true;
          }
      }; 
Page({
  data: {
    shop_hidden:false,
    shop_list:[],
    shop_name:"",
    shop_id:"",
    allowtosend: true,//发送验证码
    submitpayment:true,
    verifyCodeTime:"获取验证码",
    validCodeDisable:false,
    is_pop_paypwd: false, 
    info:{
      account:'',
      shop:'',
      name:'',
      payments:'',
      money:''
    }
  },
  onLoad: function (options) {
    var that = this;
    //加载会员信息
    wx.showLoading({
      title: '加载中',
    })
    that.loadMemberInfo();
  },
  loadMemberInfo: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      store_id: that.data.store_id,//店铺ID
    };
    util.Ajax("member/index", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        that.setData({
          memberInfo: data.memberInfo,
          mycoupon: data.mycoupon,
        })
      }
    });
  },
  // 验证对方手机号格式
  number_blur:function(e){
    var that = this;
    if (isPoneAvailable(e.detail.value)){
      that.data.info.account = e.detail.value;
    }
  },
  // 付给商家
  shop:function(e){
    var that = this;
    var shop_name = e.detail.value;
    that.data.info.name = e.detail.value;
    var mobile = shop_name;
    if (shop_name.length == 11){
      var mermber_id = that.data.memberInfo.member_id,
          token = that.data.memberInfo.token;
      var param = {
        mobile: mobile,
      };
      util.Ajax("replacepay/checkStore&mermber_id=" + mermber_id + '&token=' + token, param, function (res) {
        console.log('获取到数据', res)
        var datas = res.datas.storeData;
        that.setData({
          shop_hidden:true,
          shop_list: datas,
        })
      }, "POST")
    }
  },
  // 选择店铺
  select_shop:function(e){
    var that = this;
    var current = e.currentTarget.dataset;
    that.setData({
      shop_id: current.id,
      shop_name: current.name,
      shop_hidden:false,
    })
  },
  // 验证支付方手机号格式
  payments_blur: function (e) {
    var that = this;
    if (isPoneAvailable(e.detail.value)) {
      that.data.info.payments = e.detail.value;
    }
  },
  // 付款金额
  payment_amount:function(e){
    var that = this;
    that.data.info.money = e.detail.value;
  },
  // 获取页面的数据发送验证码
  sendverification:function(){
    let that = this;
    let info = that.data.info;
    if (info.account == ""){
      wx.showModal({
        title: '提示!',
        showCancel:false,
        content: '账号信息还没有输入',
      });
    } else if (info.name == ""){
      wx.showModal({
        title: '提示!',
        showCancel: false,
        content: '店铺信息还没有输入',
      });
    } else if (info.payments == "") {
      wx.showModal({
        title: '提示!',
        showCancel: false,
        content: '支付账户还没有输入',
      });
    } else if (info.money == ""){
      wx.showModal({
        title: '提示!',
        showCancel: false,
        content: '请输入付款金额',
      });
    }else{
      wx.showToast({
        title: '验证码发送成功',
        icon: 'success',
        duration: 1500,
      });
      that.setData({
        allowtosend: false,//发送验证码
      });
      // 发送验证码
      var mobile = that.data.info.payments,
          merber_id = that.data.memberInfo.member_id,
          token = that.data.memberInfo.token;
      var param = {
        mobile: mobile,
      }      
      util.Ajax("replacepay/send_captcha&merber_id=" + merber_id + '&token=' + token, param, function (res) {
        var datas = res.datas;
        if (datas.sms_state) {
          app.showSucMsg(res.sucMsg);
          that.setData({
            captcha: datas.captcha,
            mobilecaptchas: datas.verify_code,
            is_validCode: false,
          })
        } else {
          app.showErrMsg(res.sucMsg);
        }
      }, "POST")
      // 倒计时
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
    }
  },
  // 填写验证码修改提交支付状态
  verification_code:function(e){
    var that = this;
    var code = e.detail.value;
    if (code.length == 6){
      if (code != that.data.captcha) {
        wx.showModal({
          title: '提示!',
          showCancel: false,
          content: '验证码错误！',
        });
        that.setData({
          submitpayment: true,
        })
      } else if (code == that.data.captcha) {
        wx.showToast({
          title: '验证码正确',
          icon: 'success',
          duration: 1000,
        });
        that.setData({
          submitpayment: false,
        })
      }
    }
  },
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
  },
  formSubmit: function (e) {
    var that = this;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var arr = that.data.info,
        merber_id = that.data.memberInfo.member_id,
        token = that.data.memberInfo.token;
    var param = {
      account: arr.account,
      shop_id:that.data.shop_id,
      payments: arr.payments,
      money: arr.money,
      captcha: that.data.captcha,
      mobilecaptcha: that.data.mobilecaptchas,
    };
    console.log("打印会员id", param);
    util.Ajax("replacepay/replacepayRequest&merber_id =" + merber_id + '&token=' + token, param, function (res) {
      var datas = res.datas.returnData;
      var show = JSON.stringify(datas);
      if (datas.sms_state) {
        app.showSucMsg(res.sucMsg);
      } else {
        app.showErrMsg(res.sucMsg);
      }
      wx.redirectTo({
        url: 'payforothersure?show=' + show,
        
      })
    }, "POST")
    // 成功后的跳转
  },
})