const app = getApp();
let imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    order_sn: '330562504124144626',//订单号
    order_info: '',
    pay_way:true//默认是自己支付
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      order_sn: options.order_sn
    });
  },
  onReady: function () {
  
  },
  sure:function(){
    wx.navigateBack();
  },
  onShow: function () {
    var that = this;
    let pay_way = that.data.pay_way;
    if (pay_way){
      let order_sn = that.data.order_sn;
      var param = {
        token: app.globalData.token, //必带
        order_sn: order_sn,
      };
      util.Ajax("member_order/order_info", param, function (res) {
        var data = res.datas;
        console.log('返回订单基本信息:', res);
        that.setData({
          order_info: data.order_info
        });
      });
    }else{
       console.log("这里是帮他人代付的模块");
    }
  },
  successPay: function () {
    wx.switchTab({
      url: '../my/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }  
    })
  },
})