const app = getApp()
var bmap = require('../../libs/bmap-wx.min.js'),
  util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl,
  judge = app.judge;
var wxMarkerData = [];
Page({
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  data: {
    home_tickt_hidden: true,//首页蒙层的礼券包
    couponAmount: 0, //可领取金额
    canIUse: wx.canIUse('button.open-type.getUserInfo'),//检测网络
    userInfo: {},
    hasUserInfo: false,
    title: "",
    imgUrl: imgUrl,
    is_codeowner: app.globalData.is_codeowner,//码主
    location: '定位中...', //默认定位
    currentCity: '杭州', //默认所在城市
    markers: [],//当前位置信息
    longitude: '',//经度
    latitude: '',//纬度
    rgcData: {},
    toView: '',
    bannerlist: [
      {
        imgurl: imgUrl + "/banner/banner-01.png",
        link: ""
      },
      {
        imgurl: imgUrl + "/banner/banner-02.png",
        link: ""
      },
      {
        imgurl: imgUrl + "/banner/banner-03.png",
        link: ""
      }
    ],
    indicatorDots: true,
    indicatorColor: "#ffffff",
    indicatorActiveColor: "#ff4965",
    circular: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    hiddenScanCode: true,
    submenu: [
      {
        class_image: imgUrl + "/submenu-cate.png",
        class_name: "乐享美食"
      },
      {
        class_image: imgUrl + "/submenu-dress.png",
        class_name: "美靠衣装"
      },
      {
        class_image: imgUrl + "/submenu-rummery.png",
        class_name: "酒店住宿"
      },
      {
        class_image: imgUrl + "/submenu-travel.png",
        class_name: "说走就走"
      },
      {
        class_image: imgUrl + "/submenu-study.png",
        class_name: "学习培训"
      },
      {
        class_image: imgUrl + "/submenu-play.png",
        class_name: "尽情畅玩"
      },
      {
        class_image: imgUrl + "/submenu-service.png",
        class_name: "生活服务"
      },
      {
        class_image: imgUrl + "/submenu-more.png",
        class_name: "更多惊喜"
      },
    ],
    storelist: []
  },
  // 点击蒙层关闭
  close_home_tickt: function () {
    var that = this;
    that.setData({
      home_tickt_hidden: true,
    })
  },
  //扫码按钮显示隐藏
  tapScanCode: function () {
    var that = this;
    that.setData({
      hiddenScanCode: !that.data.hiddenScanCode,
    })
  },
  // 这里获取焦点时候跳转到搜索页面
  bindfocus: function () {
    wx.navigateTo({
      url: 'seach/seach'
    })
  },
  // 扫一扫调取相机
  Richscan: function () {
    wx.scanCode({
      success: (res) => {
        let scanCode = res.result;
        if (scanCode.indexOf('s') >= 0) {
          let store_id = 0,
            consumeAmount = '';
          if (scanCode.indexOf("a") >= 0) {
            store_id = scanCode.substring(1, scanCode.indexOf("a"));
            consumeAmount = scanCode.substring(scanCode.indexOf("a") + 1);
          } else {
            store_id = scanCode.substring(scanCode.indexOf("s") + 1);
          }
          //会员扫商家付款
          wx.navigateTo({
            url: '../pay/pay?store_id=' + store_id + '&consumeAmount=' + consumeAmount,
          })
        } else if (scanCode.indexOf('m') >= 0) {
          let store_id = app.globalData.store_id;
          if (store_id) {
            //商家扫会员收款
            wx.navigateTo({
              url: '../pay/collect/store?scanCode=' + scanCode,
            })
          } else {
            app.showErrMsg('您还不是商家，可以尝试清除一下缓存，确认您的商家身份');
          }
        } else {
          //会员个人收款
          wx.navigateTo({
            url: '../pay/scanPay/personal?scanCode=' + scanCode,
          })
        }
        console.log(res);
        this.setData({
          hiddenScanCode: true,
        })
      }
    })
  },
  //商家扫会员
  sellerScanMember: function () {
    var that = this;
    var data = {
      token: app.globalData.token,//登录口令
      store_id: app.globalData.store_id, //店铺ID
      member_id: app.globalData.member_id, //会员ID
    };
    util.Ajax("member_buy/scanCode", data, function (res) {
      var data = res.datas;
      that.setData({
        bannerlist: data.bannerList,
        submenu: data.classList,
        storelist: data.storeList,
        hiddenScanCode: true,
      })
    });
  },
  //打开定位导航
  tapOpenLocation: function (e) {
    let cut = e.currentTarget.dataset;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: Number(cut.lat),
          longitude: Number(cut.lng),
          name: cut.name,
          address: cut.address,
          scale: 18
        })
      }
    })
  },
  //分类跳转
  tapSubmenu: function (e) {
    let cut = e.currentTarget.dataset;
    wx.navigateTo({
      url: "store/list?class_id=" + cut.id + "&title=" + cut.name
    })
  },
  //打开店铺
  open_store: function (e) {
    console.log(e.currentTarget.dataset);
    var dataset = e.currentTarget.dataset;
    if (dataset.class_id == 3) {
      wx.navigateTo({
        url: "hotel/index?chain_id=" + dataset.chain_id,
      })
    } else {
      wx.navigateTo({
        url: "store/info?chain_id=" + dataset.chain_id,
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          console.log("没有授权")
          wx.navigateTo({
            url: '../allow_info/index',
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      that.setData({
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      app.userInfoReadyCallback = res => {
        that.setData({
          hasUserInfo: true
        })
        if (that.loginReadyCallback) {
          that.loginReadyCallback(app.globalData);
        }
      }
    } else {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo;
          app.alobalData.wxInfoParam = res.encryptedData
        }
      })
    }
    wx.getLocation({
      success: function (res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        that.getIndexShow();
      },
      fail: function (res) {
        app.showErrMsg("当前定位获取失败");
      },
    });
    //登录
    that.getLocation();//获取当前位置
  },
  //显示页面
  onShow: function () {
    // 判断是否是已经登录了 否则去重新登录
    var that = this;
    if (app.globalData.member_id) {
      console.log("登录了")
      return;
    } else {
      console.log("没有登录")
      that.login();
    }
  },
  getIndexShow: function () {
    var that = this;
    var data = {
      lng: app.globalData.longitude,//经度
      lat: app.globalData.latitude, //纬度
      member_id: app.globalData.member_id, //会员ID
    };
    console.log(data);
    util.Ajax("index/index", data, function (res) {
      console.log("首页的数据", res);
      var data = res.datas;
      wx.hideLoading();
      wx.stopPullDownRefresh();
      that.setData({
        bannerlist: data.bannerList,
        // submenu: data.classList,
        storelist: data.storeList,
        hiddenScanCode: true,
      })
    }, "POST");
  },
  
  getLocation: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '1iFLHdddzIroXx9j9lj2ZYC6l2oOAejk'
    });
    // 出错
    var fail = function (data) {
      wx.showModal({ title: data.errMsg })
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.loadCity(wxMarkerData, 0);
    }
    //百度地图返回当前位置信息
    BMap.regeocoding({
      fail: fail,
      success: success,
      iconPath: '../../image/bmap/marker_red.png',
      iconTapPath: '../../image/bmap/marker_red.png'
    });
  },
  //根据定位获取到当前所在城市
  loadCity: function (data, i) {
    var that = this;
    let address = data[i].address,
      desc = data[i].desc,
      business = data[i].business;
    let addrSLen = address.indexOf('省') + 1,
      citylen = address.indexOf('市'),
      addr = address.replace('市', '');
    var city = addr.substring(addrSLen),
      addrELen = city.indexOf('区');
    var location = city.substring(0, addrELen), //当前所在区域
      currentCity = address.substring(addrSLen, citylen);//当前城市
    that.setData({
      location: location,
      currentCity: currentCity,
    });
  },
  //调用登录接口，记住以后所有的小程序登录都应该写在首页
  login: function () {
    console.log("正在登陆！")
    var that = this;
    wx.showLoading({
      title: '正在登录...',
    })
    var param = wx.getStorageSync('loginParam');
    // 没有拿到登陆的信息
    console.log("登录信息",param)
    util.Ajax("login/index", param, function (data) {
      if (data.constructor == String) {
        var data = data.trim(),
          data = JSON.parse(data);
      }
      wx.hideLoading();
      if (data.code == '200') {
        var datas = data.datas;
        if (datas.is_login == '200') {
          wx.setStorageSync('member_id', datas.member_id);
          wx.setStorageSync('openid', datas.wxInfoParam.openid);
        } else {
          wx.setStorageSync('wxInfoParam', datas.wxInfoParam);
          wx.navigateTo({
            url: '../register/register'
          })
        }
      } else {
        wx.navigateTo({
          url: '../register/register'
        })
      }
    }, "POST");
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx: wx.showLoading({
      title: 'loading...',
    })
    that.getIndexShow();
  },
  onShareAppMessage: function () {
    return {
      title: 'DCL生态联盟圈',
      desc: '最具人气的生态联盟圈!',
      path: '/pages/index/index'
    }
  }
})
