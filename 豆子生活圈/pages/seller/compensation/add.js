const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    limit_num: 1,//每人限领一次
    money:0,
    //选择发放对象
    obj_hidden: true,
    current_obj_id: 1,
    current_obj_name: "全部新注册用户",
    select_obj: [
      {
        id: 1,
        name: "全部新注册用户"
      },
      {
        id: 2,
        name: "全部VIP用户"
      },
      {
        id: 3,
        name: "本店VIP用户"
      },
    ],
  },
  onLoad: function (options) {

  },
  // 选择发放对象
  open_object: function (e) {
    var that = this;
    that.setData({
      obj_hidden: false,
    })
  },
  change_obj: function (e) {
    console.log(e.currentTarget.dataset);
    var that = this;
    that.setData({
      current_obj_id: e.currentTarget.dataset.id,
      current_obj_name: e.currentTarget.dataset.name,
      obj_hidden: true
    })
  },
  open_disbursement: function () {
    var that = this;
    that.setData({
      way_hidden: false,
    })
  },
  input:function(e){
    console.log(e.detail.value);
    let value = e.detail.value;
    let that = this;
    if (value == ''){
      that.setData({
        money: 0
      })
    }else{
      that.setData({
        money: value
      })
    }
    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 提交完成跳转
    wx.navigateTo({
      url: 'seccess',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
})