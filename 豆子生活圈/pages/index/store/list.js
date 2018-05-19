// pages/index/seach/subpage.js
//获取应用实例
let app = getApp();
let judge = app.judge,
  util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"商铺分类",
    keyword: '',
    imgUrl: imgUrl,
    show:false,
    storeList: []
  },
  onLoad: function (options) {
    var that = this,
      class_id = options.class_id,
      keyword = options.keyword;
    wx.showLoading({
      title: '加载中，请稍后',
    })
    if (!judge.judgeNull(class_id)) {
      that.setData({
        class_id: class_id,
      });
      that.getStoreList(class_id);
    }
    if (!judge.judgeNull(options.title)) {
      that.setData({
        title: options.title,
      });
    }
    if (!judge.judgeNull(keyword)) {
      that.setData({
        keyword: keyword,
        title: "搜索：" + keyword +" 的结果",
      });
      that.getStoreList(keyword);
    }
    wx.setNavigationBarTitle({
      title: that.data.title,
    })
  },
  //根据商铺分类加载列表
  getStoreList: function(){
    var that = this;
    var data = {
      lng: app.globalData.longitude,//经度
      lat: app.globalData.latitude, //纬度
      class_id: that.data.class_id,//商铺分类ID
      keyword: that.data.keyword,//关键字
    };
    util.Ajax("index/seach", data, function (res) {
      var data = res.datas;
      that.setData({
        storeList: data.storeList,
        show:true,
      })
      //返回有数据才存储
      if (judge.judgeArray(data.storeList)){
        var keywords = wx.getStorageSync('keyword') || []
        if (keywords.indexOf(that.data.keyword) < 0) {
          keywords.unshift(that.data.keyword)
        }
        wx.setStorageSync('keyword', keywords)
      }
      console.log('返回:', res);
      wx.hideLoading();
    });
  },

  //失去小焦点并发生变化时触发
  changeKeywords: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  //去搜索
  tapSeach: function () {
    // 这里获得input输入框你的输入的参数
    let that = this;
    that.getStoreList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  }, 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})