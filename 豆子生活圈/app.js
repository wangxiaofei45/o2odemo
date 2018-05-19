//app.js
// require('./utils/tracker.min.js')({ token: '8afbb48c1681e2ac77ab276b0273d7e7', behaviour: 15})
import judge from 'utils/index';//导入公共常用函数
var util = require('./utils/util.js'),
  loginUrl = require('config').loginUrl;
var token = wx.getStorageSync('token'),//登录令牌
  open_id = wx.getStorageSync('open_id'),
  member_id = wx.getStorageSync('member_id'),
  member_name = wx.getStorageSync('member_name'),
  store_id = wx.getStorageSync('store_id'),
  is_codeowner = wx.getStorageSync('is_codeowner'); //是否为码主
App({
  onLaunch: function () {
    var that = this;
    this.judge = new judge();
    if (!member_id) {
      this.getUserInfo(
        function (err, openid) {
          if (!err) {
            wx.hideLoading();
          } else {
            console.log('err:', err)
          }
        }
      );
    }else{

    }
  },
  //全局赋值，方便其他页面获取。
  globalData: {
    userInfo: null,
    loginParam: null,//小程序登录参数
    member_id: member_id,
    member_name: member_name,
    token: token,
    open_id: open_id,
    store_id: store_id, //默认登录的店铺
    is_codeowner: is_codeowner,
    latitude: 0,
    longitude: 0
  },
  //获取会员信息
  getUserInfo: function (callback) {
    var that = this;
    //调用登录接口
    wx.login({
      success: res => {
        wx.setStorage({
          key: 'code',
          data: res.code,
        })
        if (res.code) {
          var code = res.code;
          var that = this;
          wx.showLoading({
            title: '正在获取个人信息...',
          })
          wx.getUserInfo({
            success: function (res2) {
              that.globalData.userInfo = res2.userInfo;
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI
              var iv = res2.iv;
              that.globalData.loginParam = {
                code: res.code,
                encryptedData: encryptedData,
                iv: iv
              };
              wx.setStorageSync('loginParam', that.globalData.loginParam)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res2);
              }
              callback(null, that.globalData.loginParam);
            },
            fail: function (err) {
              that.showErrMsg('获取信息失败，原因：' + err);
              callback(err);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  //全局登录赋值
  globalLogin: function (datas){
    var that = this;
    that.globalData.member_id = datas.member_info.member_id;
    wx.setStorageSync('member_id', datas.member_info.member_id);
  },
  //调用提示成功
  showSucMsg: function (sucmsg, duration = 3000) {
    wx.showToast({
      title: sucmsg,
      icon: 'success',
      duration: duration
    })
  },
  //调用提示失败
  showErrMsg: function (errmsg, duration = 3000) {
    wx.showToast({
      title: errmsg,
      icon: 'loading',
      duration: duration
    })
  },
})