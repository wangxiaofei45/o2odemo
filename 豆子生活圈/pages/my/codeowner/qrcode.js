const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  wxbarcode = require('../../../utils/code.js'),
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: app.globalData.member_id,//会员ID
    is_codeowner: app.globalData.is_codeowner,//码主
    inviteCode: '',
    currentInfo: {
      role_tag: 'code',
      role_logo: imgUrl + "/my/code_owner.png",
      invite_code: 'MTA2MjY',
      invite_qrcode: "",
      role_name: '我是码主',
      store_id: 0, //切换店铺ID
      shop_num: 1,
      vip_num: 50
    }, //当前的身份
    open_role: false,//是否点击切换身份
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载邀请信息',
    })
    var that = this,
      inviteCode = '';
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/invitation_code", data, function (res) {
      var data = res.datas;
      console.log('返回码主信息:', res);
      wx.hideLoading();
      if (data.error_code) {
        app.showErrMsg(data.errMsg);
      } else {
        if (data.roleList[0].role_tag == 'code' && that.data.is_codeowner){
          inviteCode = data.roleList[0].invite_code;
        }else{
          wxbarcode.qrcode('invite_qrcode', data.roleList[0].invite_code, 420, 420);
        }
        that.setData({
          memberInfo: data.memberInfo,
          roleList: data.roleList,
          inviteCode: inviteCode,
          currentInfo: data.roleList[0],
        })
      }
    });
  },
  // 打开切换身份或店铺
  openChangeRole: function () {
    var that = this;
    that.setData({
      open_role: !that.data.open_role,
    })
  },
  // 选择店铺
  change_role: function (e) {
    var that = this;
    var roleList = that.data.roleList,
      curData = e.currentTarget.dataset;
    var currentInfo= roleList[curData.id];
    if (currentInfo.invite_qrcode == ''){
      wxbarcode.qrcode('invite_qrcode', currentInfo.invite_code, 410, 410);
    }
    that.setData({
      currentInfo: currentInfo,
    })
  },
  // 获取邀请码
  scanCodeBtn: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
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
      inviteCode = e.detail.value;
    that.setData({
      inviteCode: inviteCode
    })
    that.checkInviteCode();//去检验
  },
  //检测邀请码的有效性
  checkInviteCode: function () {
    let that = this,
      inviteCode = that.data.inviteCode;

    if (!inviteCode) {
      return false;
    }
    var param = {
      inviteRole: 'store', //身份
      extension: inviteCode,
    }
    util.Ajax("login/check_inviteCode", param, function (res) {
      console.log('验证的验证码', res)
      var datas = res.datas;
      if (datas.is_check) {
        app.showSucMsg(res.sucMsg);
        //验证通过允许绑定
        that.setData({
          extension_id: datas.extension_id,//邀请人ID
          inviteCode: datas.extension
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  //绑定码主
  bindingCodeOwner: function () {
    let that = this,
      inviteCode = that.data.inviteCode;
    if (!inviteCode) {
      return false;
    }
    var param = {
      store_id: that.data.currentInfo.store_id,
      invite_code: inviteCode,
    }
    util.Ajax("login/bindingCodeOwner", param, function (res) {
      console.log('绑定结果', res)
      var datas = res.datas;
      if (datas.is_binding) {
        app.showSucMsg(res.sucMsg);
        that.onLoad();
      } else {
        app.showErrMsg(res.sucMsg);
      }
    })
  },
  //复制邀请码
  tapCopy: function (e) {

    var that = this,
      curData = e.currentTarget.dataset;
    wx.setClipboardData({
      data: curData.invite_code,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
})