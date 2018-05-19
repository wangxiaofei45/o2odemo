const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
    imgUrl: imgUrl,
     defaultpage: true,
     address_list:''
  },
  onLoad: function (options) {
    var that = this;
    that.loadMemberAddress();
  },
  //加载会员地址
  loadMemberAddress: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/getAddressList", data, function (res) {
      console.log("地址列表：", res);
      var data = res.datas;
        that.setData({
          address_list: data.address_list,
        })
    },"POST");
  },
  //设置默认地址
  defaultAddress: function (e) {
    var addrid = e.currentTarget.dataset.id;
    var that = this;
    var data = {
      member_id: that.data.member_id,
      address_id: addrid
    };
    util.Ajax("member/defaultAddress", data, function (res) {
      var data = res.datas;
      if (data.is_default) {
        app.showSucMsg(res.sucMsg);
        that.loadMemberAddress();
      } else {
        app.showErrMsg(res.sucMsg);
      }
    },"POST");
  },
  //编辑地址
  editAddr: function(e){
    var addrid = e.currentTarget.dataset.id; 
    if (judge.judgeNull(addrid)){
      addrid = 0;
    }
    wx.redirectTo({
      url: 'add?address_id=' + addrid,
    })
  },
  //删除地址
  delAddr: function(e){
    var addrid = e.currentTarget.dataset.id; 
    var that = this;
     wx.showModal({
       title: '提示',
       content: '确定删除改该收货地址吗？',
       success: function(res) {
         if (res.confirm){
            var data = {
              member_id: that.data.member_id,
              address_id: addrid
            };
            util.Ajax("member/delAddress", data, function (res) {
              var data = res.datas;
              if (data.is_del){
                app.showSucMsg(res.sucMsg);
                that.loadMemberAddress();
              }else{
                app.showErrMsg(res.sucMsg);
              }
            },"POST");
          }
       },
       fail: function(res) {},
       complete: function(res) {},
     })
  },

  //同步微信收货地址
  syncWxAddress: function(){
    wx.chooseAddress({
      success: function (res) {
        var parm = {
          'member_id': wx.getStorageSync('member_id'),
          'true_name': res.userName,
          'address_id': 0,
          'area_info': res.provinceName + ' ' + res.cityName + ' ' + res.countyName,
          'address':res.detailInfo,
          'mob_phone': res.telNumber,
          'is_default': 0
        };
        console.log(parm)
        util.Ajax("member/saveAddress", parm, function (res) {
          console.log(res);
          var data = res;
          if (data.is_save) {
            app.showSucMsg("同步成功");
            this.loadMemberAddress();
          } else {
            app.showErrMsg(res.sucMsg);
          }
        },"POST");
      }
    })
  }
})