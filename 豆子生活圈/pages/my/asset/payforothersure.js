const app = getApp();
var util = require('../../../utils/util.js');
Page({
  data: {
    show:{},
    disabled:false,
  },
  onLoad:function(e){
    // var obj = JSON.parse(e.param);
    var show = JSON.parse(e.show);
    var that = this;
    that.setData({
      // param: obj,
      show: show
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
   sure: function (e) {
    var that = this;
    var merber_id = that.data.memberInfo.member_id,
        token = that.data.memberInfo.token,
        param = that.data.show;
    that.setData({
      disabled:true,
    })
    util.Ajax("replacepay/userPay&merber_id=" + merber_id + '&token=' + token, param, function (res) {
      console.log('发送请求', res);
      if (res.code == 200){
        wx.redirectTo({
          url: 'payforothersuccess',
        })
      }
    }, "POST")
  },
})