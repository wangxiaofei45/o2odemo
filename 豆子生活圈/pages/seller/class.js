const app = getApp();
let judge = app.judge,
  imgUrl = require('../../config').imgUrl,
  util = require('../../utils/util.js');
Page({
  data: {
    class_color:['',''],
    class_root: [
      {
        class_image: imgUrl + "/submenu-cate.png",
        class_name: "乐享美食",
        color:"red",
      },
    ],
    class_menu: ['美食饭店', '自主餐', '快餐', '日韩料理', '甜点饮品', '零食酒水', '小吃火锅', '早餐', '西餐', '江浙菜']
  },
  onLoad: function (options) {
    var that = this;
    that.loadClassList();
  },
  //加载会员信息
  loadClassList: function () {
    var that = this;
    var parm = {
      token: app.globalData.token
    };
    util.Ajax("store/getSellerClassList", parm, function (res) {
      var data = res.datas;
      console.log('返回分类列表:', res);
      that.setData({
        class_root: data.sellerClassList.class_root,
        class_menu: data.sellerClassList.class_menu,
        class_color: data.sellerClassList.class_color,
      })
    },"POST");
  },
  selecedClass: function (e) {
    let curdata = e.currentTarget.dataset;
    wx:wx.redirectTo({
      url: 'apply/step1?sc_id=' + curdata.id + '&sc_name=' + curdata.name,
    })
  }
})