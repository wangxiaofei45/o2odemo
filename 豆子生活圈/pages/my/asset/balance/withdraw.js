const app = getApp();
var util = require('../../../../utils/util.js'),
  imgUrl = require('../../../../config').imgUrl,
  judge = app.judge;
Page({
  data: {
    defaultpage: true,//缺省页面
    imgUrl: imgUrl,
    money:'',
    draw_disabled:true,
    bankInfo:'',//银行卡信息
    severalshop:true,//拥有多家店铺的情况
    bcid:0,//银行卡ID
    store_id: app.globalData.store_id,//商铺ID
    final_amount: 0.00, //可提现金额
    draw_amount: 0.00, //全部提现
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading...',
    })
    var that = this;
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];  //上一个页面
      that.setData(prevPage.data);
    }
    var bcid = options.bid ? options.bid:0,//页面传递过来的
      store_id = options.store_id?options.store_id:that.data.store_id;    
    // 初次进入页面时候的默认的
    if (store_id > 0 || !judge.judgeNull(store_id) && bcid == 0){
      that.setData({
        store_id: store_id,
        bcid: bcid
      })
      //加载商户信息
      that.getStoreInfo();
      //加载店铺管理
      that.loadBankCard();
    }else{
      wx.hideLoading();
      wx.showModal({
        title: '温馨提醒',
        content: '请选择需要提现的店铺',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'select_shop',
            })
          } else if (res.cancel) {
            wx.navigateBack({});
          }
        }
      })
    }
    // 跳转银行卡时候 的显示的也买了
    if (store_id > 0 || !judge.judgeNull(store_id) && bcid > 0){
      that.setData({
        store_id: store_id,
        bcid: bcid
      })
      //加载商户信息
      that.getStoreInfo();
      //加载店铺管理
      that.loadBankCard();
    }else{
    }
  },
  getStoreInfo: function () {
    var that = this;
    var param = {
      store_id: that.data.store_id,//店铺ID
    };
    util.Ajax("store/detail", param, function (res) {
      var datas = res.datas;
      that.setData(datas);
    });
  },
  //加载银行卡
  loadBankCard: function () {
    var that = this,
      bcid = Number(that.data.bcid);
    var param = {
      token: app.globalData.token, //必带
      store_id: that.data.store_id,
      bcid: bcid,//银行卡ID
    };
    util.Ajax("seller/getBankCardDefault", param, function (res) {
      var data = res.datas;
      console.log(data);
      wx:wx.hideLoading();
      if (data.bankcardInfo){
        that.setData({
          bankInfo: data.bankcardInfo,
          bcid: data.bankcardInfo.bid,
        });
     }
      console.log("最终的银行卡id", that.data.bcid)
    });
  },
  //全部提现
  withdrawAll: function(){
    var that = this,
      final_amount = that.data.final_amount;
    if (final_amount > 0) {
      that.setData({
        draw_amount: final_amount,
        draw_disabled: false,
      });
    }else{
      app.showErrMsg('没有可提取金额');
    }
  },
  bindinput:function(e){
    if (e.detail.value == '' || e.detail.value <= 0){
       let that = this;
       that.setData({
         draw_disabled: true,
       })
    }else{
      let that = this;
      that.setData({
        draw_disabled: false,
      })
    }
    let that = this;
    that.setData({
      money: e.detail.value,
    })
  },
  formSubmit:function(e){
    var param = e.detail.value;
      param.token = app.globalData.token;
      util.Ajax("seller/applySettle", param, function (res) {
      var data = res.datas;
      console.log(data);
      wx.showToast({
        title: '申请提现成功',
        icon: 'success',
        duration: 2000
      })
      if (data){
        setTimeout(function () {
          wx.switchTab({
            url: '../../index',
          })
        }, 2000);
      }
    });
  },
})