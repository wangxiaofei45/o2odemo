const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value);
    var parm = e.detail.value;
    parm['member_id'] = wx.getStorageSync('member_id');
    util.Ajax("member/saveFeedback", parm, function (res) {
      console.log("res",res);
      var data = res.datas;
      if (data.is_save) {
        wx.redirectTo({
          url: 'index',
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    },"POST");
  }
})