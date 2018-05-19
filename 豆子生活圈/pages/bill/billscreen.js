const app = getApp();
var util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_type: 'user',//身份
    minPrice: '', //最低金额
    maxPrice: '',//最高金额
    nowClassId: '',//当前分类id
    classList: {} //店铺分类
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.role_type) {
      that.setData({
        role_type: options.role_type,
      });
      if (options.role_type == 'user'){
        var data = {};
        util.Ajax("index/getStoreClasslist", data, function (res) {
          var data = res.datas;
          console.log('分类:', res);
          that.setData({
            classList: data.classList,
          })
        });
      }
    }
    if (options.minPrice > 0 || options.maxPrice > 0 || options.nowClassId > 0) {
      that.setData({
        minPrice: options.minPrice,
        maxPrice: options.maxPrice,
        nowClassId: options.nowClassId,
      });
    }
  },
  //最小金额
  changeMinPrice: function (e) {
    var that = this,
      minPrice = e.detail.value;
    that.setData({
      minPrice: minPrice
    });
  },
  //最高金额
  changeMaxPrice: function (e) {
    var that = this,
      maxPrice = e.detail.value;
    that.setData({
      maxPrice: maxPrice
    });
  },
  //选择分类
  tapClass: function (e) {
    var that = this;
    that.setData({
      nowClassId: e.currentTarget.dataset.id
    });
    console.log('当前选择分类', e.currentTarget.dataset.id);
  },
  formSubmit: function (e) {
    var that = this,
      parm = e.detail.value;
    let minPrice = parm.minPrice,
      maxPrice = parm.maxPrice,
      nowClassId = parm.nowClassId
    wx.reLaunch({
      url: 'bill?minPrice=' + minPrice + '&maxPrice=' + maxPrice + '&nowClassId=' + nowClassId
    })
    console.log('form发生了submit事件，携带数据为：', parm)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})