const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    member_id: wx.getStorageSync('member_id'),
  },
  onLoad: function (options) {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    console.log("会员信息！",data);
    util.Ajax("member/index", data, function (res) {
      var data = res.datas;
      that.setData({
        member_info: data.memberInfo,
      })     
      console.log("会员信息", that.data.member_info) 
    },"POST");
  },
  clearCache: function () {
    wx.showModal({
      title: '温馨提醒',
      content: '您确实要清除该小程序的所有缓存吗？可能会影响您正常使用...',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage();
          wx.clearStorageSync()
          wx.switchTab({
            url: '../../index/index',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        } else if (res.cancel) {
        }
      }
    })
    
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
})