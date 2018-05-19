// pages/my/seller/setproport.js
const app = getApp();
let judge = app.judge,
  util = require('../../../utils/util.js');
Page({
  data: {
    rate_customer: 0, //返利积分比
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      rate_customer: options.commis,
      store_id: options.store_id,
    });
  },
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  onShow: function () {
    canvas(this.data.rate_customer);
  },
  formSubmit: function (e) {
    var that = this,
      rate_customer = e.detail.value.rate_customer;
    var parm = {
      token: app.globalData.token,
      rate_customer: rate_customer,
      store_id: that.data.store_id,
    };
    util.Ajax("seller/settingRateCustomer", parm, function (res) {
      // console.log('设置积分：', res);
      var data = res.datas;
      if (data.is_save) {
        that.setData({
          rate_customer: rate_customer,
        })
        canvas(that.data.rate_customer);
      }
      app.showSucMsg(res.sucMsg);
      wx.redirectTo({
        url: '../index',
      })
    });
  },
  formReset: function () {
    wx.navigateBack({});
  },
  //改变积分比例后
  changeRateCustomer:function(e){
    canvas(e.detail.value)
    var that = this;
    that.setData({
      rate_customer: e.detail.value,
    })
  }
})
let canvas = function (rate_customer){
  var text = rate_customer+"%";
  var rate_customer = rate_customer/100;

  var context = wx.createCanvasContext('ring')
  context.translate(80, 80); //移动坐标系到中心

  context.beginPath();
  context.setTextAlign("center");
  context.setTextBaseline("middle");
  context.setFillStyle("#ff4965");
  context.setFontSize(30)
  context.fillText(text, 0, 0)

  context.stroke();

  context.rotate(Math.PI / 2);
  // 绘制圆盘
  context.beginPath();
  context.arc(0, 0, 70, 0, rate_customer * 2 * Math.PI, false);
  context.setStrokeStyle("#ff4965");
  context.setLineWidth(20);
  context.stroke();

  context.rotate(rate_customer * 2 * Math.PI);
  context.beginPath();
  context.arc(0, 0, 70, 0, (1 - rate_customer) * 2 * Math.PI, false);
  context.setStrokeStyle("#999999");
  context.setLineWidth(20);
  context.stroke();

  // 绘制刻度
  context.beginPath();
  for (var i = 0; i < 20; i++) {
    context.rotate(Math.PI / 10);
    context.moveTo(60, 0);
    context.lineTo(80, 0);
    context.setStrokeStyle("#f5f5f5");
    context.setLineWidth(6);
    context.stroke();
  }
  context.restore();
  context.draw()
}