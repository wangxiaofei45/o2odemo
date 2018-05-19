const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
    imgUrl: imgUrl,
    address_id: 0, //当前地址ID
    region: ['浙江省', '杭州市', '江干区'], //默认区域
    addr_info: {},
    is_change: false, //是否选择了新区域
  },
  onLoad: function (options) {
    var that = this,
      address_id = options.address_id;
    if (address_id > 0){
      wx.setNavigationBarTitle({
        title: "编辑收货地址",
      })
      that.setData({
        address_id: address_id,
      })
      that.loadAddressInfo();
    }
  },
  //加载需要编辑的内容
  loadAddressInfo: function () {
    var that = this,
      address_id = that.data.address_id;
    if (address_id<=0){
      return false;
    }
    var data = {
      member_id: that.data.member_id,
      address_id: that.data.address_id,
    };
    util.Ajax("member/getAddressInfo", data, function (res) {
      var data = res.datas;
      that.setData({
        addr_info: data.address_info,
        region: data.address_info.region
      })
    },"POST");
  },
  formSubmit: function (e) {
    var that = this;
    var parm = e.detail.value;
    parm['member_id'] = that.data.member_id;
    parm['is_default'] = 0;
    util.Ajax("member/saveAddress", parm, function (res) {
      var data = res.datas;
      if (data.is_save){
        wx.redirectTo({
          url: 'list',
        })
      }else{
        app.showErrMsg(res.sucMsg);
      }      
    },"POST");
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      is_change: true,
    })
  },
})