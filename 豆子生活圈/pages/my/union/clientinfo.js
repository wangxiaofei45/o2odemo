const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    information: {},//获取到的信息
    imgUrl: imgUrl,
    user_info: {},//接收用户传递过来信息
    present: "", //当前选中展开的更多
    open_calltel: true,//隐藏拨打电话
    telephone: '', //拨打电话
    un_bind: true,
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    that.setData({
      user_info: options,
    })
    console.log(options)
    that.load_info();
  },
  //加载会员信息
  load_info: function () {
    var that = this;
    var data = that.data.user_info;
    util.Ajax("Bindlist/getInfo", data, function (res) {
      var data = res.datas;
      that.setData({
        information: data
      })
      console.log("会员信息", that.data.information)
      wx.hideLoading();
    }, 'POST');
  },
  onReady: function () {

  },
  //添加标记
  add_marker: function () {
    wx.showLoading({
      title: '添加标记...',
    })
    var that = this;
    var data = that.data.user_info;
    util.Ajax("Bindlist/setStar", data, function (res) {
      var data = res
      console.log("标记信息", res)
      wx.hideLoading();
      wx.showToast({
        title: '标记成功',
        icon: 'success',
        duration: 2000
      })
      that.load_info();
    }, 'POST');
  },
  //备注
  remarker: function () {
    wx.showLoading({
      title: '修改中...',
    })
    var that = this;
    var data = that.data.user_info;
    data.remark = "备注"
    util.Ajax("Bindlist/setRemark", data, function (res) {
      var data = res
      console.log("备注信息", res)
      wx.hideLoading();
      wx.showToast({
        title: '备注成功',
        icon: 'success',
        duration: 2000
      })
      that.load_info();
    }, 'POST');
  },
  // 解除绑定
  unbind: function () {
    var that = this;
    that.setData({
      un_bind: false,
    })
  },
  sure_unbind: function () {
    wx.showLoading({
      title: '解绑中...',
    })
    var that = this;
    var data = that.data.user_info;
    util.Ajax("Bindlist/delBind", data, function (res) {
      var data = res
      console.log("解绑信息", res)
      wx.hideLoading();
      wx.showToast({
        title: '解绑成功',
        icon: 'success',
        duration: 2000
      })
    }, 'POST');
  },
  close_unbind: function () {
    var that = this;
    that.setData({
      un_bind: true,
    })
  },
  // 调用打电话的接口
  open_calltel: function (e) {
    var that = this;
    var phone = e.currentTarget.dataset.phone;
    if (phone) {
      that.setData({
        open_calltel: false,
        telephone: e.currentTarget.dataset.phone,
      })
    } else {
      app.showSucMsg("该用户还未绑定手机号，暂时无法直接联系到");
    }
  },
  close_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: true,
    })
  },
  //打电话
  makecall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.telephone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})