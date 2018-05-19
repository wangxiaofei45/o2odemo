const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    select_model:true,
    store_type: "hotel",//当前店铺是酒店类型
    store_id: '',//店铺的id
    parent_class_id:'',//店铺类型的id
    store_info: {
      store_id: 0,
      store_commision: 0,
      couponCount: 0,
      applying_id: '',// 当前是否有店铺是在审核
      is_audit: true,//当前店铺是否是在审核
      is_default: false,//当前店铺是否是默认店铺
    },
    sort: {
      currentIdx: 0,
      list: [
        {
          name: '默认排序',
          sort_id: 0
        }, {
          name: '订量从高到低',
          sort_id: 1
        }, {
          name: '订量从低到高',
          sort_id: 2
        }, {
          name: '价格从高到低',
          sort_id: 3
        }, {
          name: '价格从低到高',
          sort_id: 4
        }
      ]
    },
    // 是否已选定筛选
    has: {
      currentIdx: 0,
      list: [
        {
          name: '所有',
          has_id: 0
        }, {
          name: '已订货',
          has_id: 1
        }, {
          name: '未订货',
          has_id: 2
        }
      ]
    },
  },
  //切换店铺
  tapChangeStore: function () {
    var that = this;
    let store_id = that.data.store_info.store_id,
      storeList = that.data.storeList;
    var index = Math.floor((Math.random() * storeList.length));
    if (storeList[index]['store_id'] == store_id){
      that.tapChangeStore();
    }else{
      that.setData({
        store_info: storeList[index],
        parent_class_id: storeList[index].parent_class_id,//判断店铺类型的id
        store_id: storeList[index].store_id,//店铺的id
      })
    }
  },
  //设置默认店铺
  set_default: function () {
    var that = this,
      store_id = that.data.store_id;
    var data = {
      token: app.globalData.token,
      store_id: store_id,//店铺ID
      member_id: app.globalData.member_id,//会员ID
      openid: app.globalData.open_id,//openID
    };
    util.Ajax("store/settingStore", data, function (res) {
      var data = res.datas;
      console.log('设置为默认店铺:', res);
      if (data.is_res){
          app.globalData.store_id = store_id;
          wx.setStorageSync('store_id', store_id);
          that.loadStoreList();
      }
      app.showSucMsg(res.sucMsg);
    });
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '店铺信息加载中',
    })
    var that = this;
    that.loadStoreList();
  },
  management:function(e){
    var dataset = e.currentTarget.dataset;
    if (dataset.pc_id == 3){
      wx.navigateTo({
        url: 'management/index?store_id=' + dataset.store_id,
      })
    }else{
      console.log("功能正在开发当中...")
    }
  },
  //加载店铺管理
  loadStoreList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      member_id: app.globalData.member_id,//会员ID
      openid: app.globalData.open_id,//openID
    };
    util.Ajax("member/getStoreList", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      that.setData({
        storeList: data.storeList,
        store_info: data.storeList[0],
        parent_class_id: data.storeList[0].parent_class_id,//判断店铺类型的id
        store_id: data.storeList[0].store_id,//店铺的id
      })
      // console.log(that.data.store_info)打印会员信息
    });
  },
  //新增审核店铺
  tapAddApplyStore: function () {
    var that = this,
      applying_id = that.data.store_info.applying_id,
      url = 'apply?is_type=add';
    //是否有在审核中的店铺
    if (applying_id){
      wx.showModal({
        title: '温馨提醒',
        content: '您有一家店铺还在审核中，您是要去新增申请店铺，还是去查看审核资料？',
        confirmText: '去查看',
        cancelText: '去新增',
        success: function (res) {
          if (res.confirm) {
            //去查看
            url = 'basicinfo?apply_id=' + applying_id;
          }
          wx.navigateTo({
            url: url
          })
        }
      })
    }else{
      wx.navigateTo({
        url: url
      })
    }
  },


})