const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    store_id: 0,//查看当前店铺资料
    apply_id: 0, //查看正在申请中的资料id
    extension_id: 0,//邀请人
    sc_name: '',
    region: ['浙江省', '杭州市', '江干区'], //默认区域
    seller_info: {},
    is_change: false, //是否选择了新区域
    disabledSumit: false, //是否禁止提交
    joinin_state: '提交', //按钮
    applyHideMgs: true,//隐藏提示
    uploadImg: {
      instore: {
        0: '',
        1: "",
        2: ""
      }
    }, //上传时图片列表
    image_path: {
      instore: []
    },//上传后
  },
  onLoad: function (options) {
    wx:wx.showLoading({
      title: 'loading...',
    })
    var that = this,
      sc_name = that.data.sc_name;
    //保存当前页的data参数
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];  //上一个页面
      that.setData(prevPage.data);
    }
    //证明已经申请过
    if (options.apply_id) {
      that.setData({
        apply_id: options.apply_id,
      });
    }
    if (options.store_id) {
      that.setData({
        store_id: options.store_id,
      });
    }
    that.getApplyInfo();
  },
  getApplyInfo: function () {
    let that = this;
    var parm = {
      apply_id: that.data.apply_id,
      store_id: that.data.store_id,
    };
    //获取申请信息
    util.Ajax("store/getApplyInfo", parm, function (res) {
      wx.hideLoading();
      var data = res.datas;
      if (data.is_state) {
        that.setData({
          store_info: data.applyInfo
        });
        console.log(that.data.store_info);
      } else {
        //去新增
        // wx.redirectTo({
        //   url: 'apply',
        // })
      }
    });
  },
  //关闭提示
  closeHint: function (e) {
    var that = this;
    that.setData({
      applyHideMgs: true,
    })
  },
})