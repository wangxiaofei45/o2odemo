const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    apply_id: '',//申请表单ID
    joinin_state: '申请入驻',
    disabledSumit: true, //是否禁止提交
    inviteCode: '',
    extension_id: 0,//邀请人ID
    store_id: 0, //切换店铺ID
    is_type: '',//操作
    member_info:{}
  },
  onLoad: function (options) {
    // let that = this,
    //   is_type = options.is_type;
    // if (is_type == 'add'){
    // }else{
    //   var parm = {
    //     member_id: app.globalData.member_id,
    //   };
    //   util.Ajax("store/getApplyState", parm, function (res) {
    //     console.log('申请结果：', res);
    //     var data = res.datas;
    //     if (data.is_state) {
    //       app.showSucMsg(res.sucMsg);
    //       //已经提交 直接跳转并获取提交的信息
    //       wx.redirectTo({
    //         url: 'apply/step1?apply_id=' + data.apply_id,
    //       })
    //     }
    //     that.setData({
    //       joinin_state: res.sucMsg,
    //       member_info: data.member_info,
    //       disabledSumit: data.is_state
    //     });
    //   });
    // }    
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
      extension: inviteCode,
    }
    console.log(param);
    util.Ajax("login/check_inviteCode", param, function (res) {
      console.log('验证的验证码', res)
      var datas = res.datas;
      if (datas.is_check) {
        app.showSucMsg(res.datas);
        //验证通过允许绑定
        that.setData({
          extension_id: datas.extension_id,//邀请人ID
          inviteCode: datas.extension,
          disabledSumit: false
        })
      } else {
        app.showErrMsg(res.errMsg);
      }
    },"POST")
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
  }

})