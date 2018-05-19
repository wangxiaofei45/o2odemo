const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    store_id: 0,//店铺ID
    imgUrl: imgUrl,
    bank_name: '', //银行名称
    button_disabled: false,
    bank_account_name:'',
    bank_account_number:'',
    bank_address:'',
  },
  onLoad: function (options) {
    if (options.store_id > 0) {
      this.setData({
        store_id: options.store_id,
      });
      this.loadBankCardList();
    }
  },
  //加载银行卡列表
  loadBankCardList: function () {
    var that = this;
    var param = {
      token: app.globalData.token, //必带
      store_id: that.data.store_id,
    };
    util.Ajax("seller/getBankCardList", param, function (res) {
      var data = res.datas;
      that.setData({
        bankInfo: data.mybankcard,
      });
    });
  },
  validateBankCard: function (e) {
    var that = this;
    var data = {
      token: app.globalData.token,
      card: e.detail.value,
    };
    util.Ajax("member/validateBankCard", data, function (res) {
      var data = res.datas;
      that.setData({
        bank_name: res,
      })
    });
  },
  bank_account_name:function(e){
    var that = this;
    that.setData({
      bank_account_name: e.detail.value
    })
  },
  bank_account_number: function (e) {
    var that = this;
    that.setData({
      bank_account_number: e.detail.value
    })
  },
  bank_address: function (e) {
    var that = this;
    that.setData({
      bank_address: e.detail.value
    })
  },
  submit:function(){
     var that =this;
     if (that.data.bank_account_name == ""){
       wx.showModal({
         title: '提示!',
         showCancel: false,
         content: '开户名不可为空',
       });
     } else if (that.data.bank_account_number == ""){
       wx.showModal({
         title: '提示!',
         showCancel: false,
         content: '卡号不可为空',
       });
     } else if (that.data.bank_address == "") {
       wx.showModal({
         title: '提示!',
         showCancel: false,
         content: '开户所在地为空',
       });
     }else{
       var data = {
         token: app.globalData.token,
         // store_id: that.data.store_id,
         bank_account_name: that.data.bank_account_name,
         bank_account_number: that.data.bank_account_number,
         bank_address: that.data.bank_address,
         bank_name: that.data.bank_name,
         is_default: 1
       };
       wx.showLoading({
         title: 'loading...',
       })
       util.Ajax("seller/addBankCard", data, function (res) {
         var data = res.datas;
         if (data.is_save) {
           wx.hideLoading();
           app.showSucMsg(data.sucMsg);
           wx.redirectTo({
             url: '../index',
             success: function (e) {
               var page = getCurrentPages().pop();
               if (page == undefined || page == null) return;
               page.onLoad();
             }
           })
         }
       });
     }
  },
  onUnload: function () {
  },
})