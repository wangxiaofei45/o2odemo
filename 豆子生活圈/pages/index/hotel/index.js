const app = getApp();
var util = require('../../../utils/util.js'),
  imgUrl = require('../../../config').imgUrl,
  WxParse = require('../../../wxParse/wxParse.js');
Page({
  data: {
    store_name: "DEMO商铺",
    telephone: "0571-28819898",
    address: "杭州江干区玖宝精品服饰皮草城",
    business_hour:"08:00--20:00",
    imgUrl: imgUrl,
    store_pic: imgUrl + '/defaulstoresshow.png',
    open_calltel: true,//隐藏拨打电话
    open_coupon: true,//隐藏优惠券列表
    present:1,//当前默认点击的
    token: app.globalData.token,//token
    member_id: app.globalData.member_id,
    couponList: [
      {
        coupon_des: "满300减100",
        coupon_end_time: "2017-10-31",
        coupon_name: "满300减10",
        coupon_start_time: "2017-10-14",
        indate: "有效期2017.09.20-2017.10.20",
        satisfy_price: 300.00,
        discount_price: "10.00",
        is_receive: 0 //是否领取
      }
    ],
    goodsData:[],
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    that.setData({
      store_id: options.store_id,
    });
    that.getStoreInfo(options.store_id);
    that.getRoomList();
  },
  //加载店铺信息
  getStoreInfo: function (store_id) {
    var that = this;
    var data = {
      store_id: store_id,//店铺ID
    };
    util.Ajax("store/detail", data, function (res) {
      var datas = res.datas;
      that.setData(datas);
      if (datas.description) {
        that.parseIntro(datas.description);
      }
      wx.hideLoading();
      console.log("店铺的信息",datas);
    });
  },
  //加载酒店商品的列表
  getRoomList: function () {
    var that = this;
    var data = {
      store_id: that.data.store_id,//店铺ID
      token: that.data.token,
      member_id: that.data.member_id,
      page:1,
    };
    console.log(data);
    util.Ajax("Hotel/getGoodsList", data, function (res) {
      console.log("酒店列表信息", res);
      that.setData({
        goodsData: res.datas.goodsData,
      })
    });
  },
  // 跳转到商品的详情页
  get_roominfo:function(e){
    var that = this,
      good_id =  e.currentTarget.dataset.good_id,
      store_id = that.data.store_id;
    wx.navigateTo({
      url: 'roominfo?good_id=' + good_id + '&store_id='+store_id,
    })
  },
  //解析商铺介绍
  parseIntro: function (description) {
    WxParse.wxParse('description', 'html', description, this, 5);
  },
  //打开定位导航
  tapOpenLocation: function (e) {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = Number(that.data.baidu_lat),
          longitude = Number(that.data.baidu_lng)
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: e.currentTarget.dataset.address,
          scale: 18
        })
      }
    })
  },
  // 买单
  pay: function () {
    wx.navigateTo({
      url: '../../pay/pay?store_id=' + this.data.store_id + "&store_name=" + this.data.store_name,
    })
  },
  // 打开领取优惠券的列表
  open_coupon: function () {
    var that = this;
    var data = {
      store_id: that.data.store_id,//店铺ID
      member_id: app.globalData.member_id,//会员ID
    };
    console.log('member_id:', app.globalData.member_id);
    util.Ajax("store/couponList", data, function (res) {
      var datas = res.datas;
      if (datas.couponList) {
        that.setData({
          couponList: datas.couponList,
          open_coupon: false,
        });
      } else {
        app.showErrMsg('该店没有可领取的优惠券');
      }
      console.log('店铺优惠券:', datas);
    });
  },
  //领取优惠券
  receive_coupon: function (e) {
    var that = this;
    var data = {
      store_id: that.data.store_id,//店铺ID
      member_id: app.globalData.member_id,//会员ID
      member_name: app.globalData.member_name,//会员名称
      coupon_id: e.currentTarget.dataset.id,//优惠券ID
    };
    util.Ajax("store/receiveCoupon", data, function (res) {
      var datas = res.datas;

      if (datas.is_receive) {
        app.showSucMsg('优惠券领取成功');
        that.setData({
          open_coupon: true,
        });
      } else {
        app.showErrMsg('该店没有可领取的优惠券');
      }

    });
  },
  // 关闭领取优惠券的列表
  close_coupon: function () {
    var that = this;
    that.setData({
      open_coupon: true,
    })
  },
  // 调用打电话的接口
  open_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: false,
    })
  },
  close_calltel: function () {
    var that = this;
    that.setData({
      open_calltel: true,
    })
  },
  makecall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.telephone,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  change:function(e){
    var that = this;
    that.setData({
      present: e.currentTarget.dataset.present,
    })
  },
  errorFunction: function (e) {
    if (e.type == "error") {
      this.setData({
        store_pic: 'http://o2o.hzlwo.com/wxapp/image/defaulstoresshow.png',
      })
    }
  },
})