const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  wxbarcode = require('../../../utils/code.js'),
  util = require('../../../utils/util.js');
Page({
  data: {
    selectRole:true,//是否选择身份
    roleList: [],
    imgUrl: imgUrl,
    currentInfo:{
      role_name: '个人账号',
      role_tag: 'user',
      role_logo: imgUrl + '/my/code_owner.png',
    },//当前默认信息
    collectCode: app.globalData.member_id, //生成的二维码
    inputSetMoneyHidden:true,
    collectMoney: "", //收钱
    member_id: app.globalData.member_id,
    store_id: app.globalData.store_id,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载收款信息中',
    })
    var that = this,
      store_id = that.data.store_id;
    that.loadRoleList();
  },
  //加载身份列表
  loadRoleList: function (options) {
    var that = this,
      collectCode = that.data.member_id;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/getCollectRole", data, function (res) {
      var data = res.datas;
      console.log('返回收钱人信息:', res);
      if (data.error_code) {
        app.showErrMsg(data.errMsg);
      } else {
        collectCode = data.roleList[0].collect_code;
        that.setData({
          roleList: data.roleList,
          collectCode: collectCode,
          currentInfo: data.roleList[0],
        })
        that.wxbarcode();
      }
    });
  },
  bindselect:function(){
    var that = this;
    that.setData({
      selectRole: !that.data.selectRole,
    })
  },
  //   
  bindChange: function (e) {
    var that = this,
      val = e.detail.value;
    that.setData({
      value: e.detail.value,
      currentInfo: that.data.roleList[val[0]],
      collectCode: that.data.roleList[val[0]].collect_code,      
      selectRole: !that.data.selectRole,
    })
    that.wxbarcode();
  },
  
  //生成二维码
  wxbarcode: function () {
    var that = this,
      collectCode = that.data.collectCode,
      currentInfo = that.data.currentInfo,
      navigationBarTitle = '个人收钱',
      member_id = that.data.member_id,
      store_id = that.data.store_id,
      collectMoney = that.data.collectMoney;
    if (collectMoney){
      collectCode = collectCode + 'a' + collectMoney
    }
    if (currentInfo.role_tag == 'store'){
      navigationBarTitle = '商家收款';
    }
    wx.setNavigationBarTitle({
      title: navigationBarTitle,
    })
    console.log('qrcode:', collectCode);
    wx.hideLoading();
    wxbarcode.qrcode('collectCode', collectCode, 420, 420);
  },
  //设置金额
  setMoney:function(){
    var that = this;
    that.setData({
      inputSetMoneyHidden: false,
    })
  }, 
  //清楚金额
  removeMoney:function(){
    var that = this;
    that.setData({
      collectMoney:"",
      inputSetMoneyHidden: true,
    })
    that.wxbarcode();
  },
  //设置金额后
  blurInputCollectMoney:function(e){
    var that = this,
      collectMoney = e.detail.value,
      dataMoney = that.data.collectMoney;
    
    if (dataMoney == collectMoney){
      return false;
    }
    console.log('dataMoney', collectMoney);
    that.setData({
      collectMoney: collectMoney,
    })
    that.wxbarcode();
  },
  /**
   * 将画布的图片保存到手机相册中
   */
  saveImageToPhotosAlbum: function () {
    wx.canvasToTempFilePath({
      canvasId: 'qrcode',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
})