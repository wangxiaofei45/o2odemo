const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
var qqmapsdk;
Page({
  data: {
    imgUrl: imgUrl,
    store_name: "",//店铺名称
    good_id: "",//商品分类id
    good_type: "",//商品类型
    top_of_goods: false,//置顶商品
    free_breakfast: false,//免费早餐
    room_area: "",//房间面积
    configuration: "",//床品配置
    price: "",//价格
    numbers: "",//数量
    in_explain: "",//说明
    detail:"",//详细说明
  },
  onLoad: function (options) {
    var that = this;
    //保存当前页的data参数
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];  //上一个页面
      that.setData(prevPage.data);
    }
    // 页面传出的商品分类的值
    if (options.data) {
      var newobj = JSON.parse(options.data);
      console.log(newobj);
      let that = this;
      that.setData({
        good_id: newobj.good_id,
        good_type: newobj.name,
      })
    }
  },
  onShow: function () {
  },
  // 跳转到商品分类的页面
  select_goodtype: function () {
    wx: wx.navigateTo({
      url: 'select_goodtype',
    })
  },
  // 绑定店铺的名称
  checkStoreName: function (e) {
    var that = this;
    that.setData({
      store_name: e.detail.value
    })
  },
  // 是否置顶商品
  top_of_goods: function (e) {
    var that = this;
    that.setData({
      top_of_goods: e.detail.value
    })
  },
  // 是否免费早餐
  free_breakfast: function (e) {
    var that = this;
    that.setData({
      free_breakfast: e.detail.value
    })
  },
  //房间面积
  room_area: function (e) {
    var that = this;
    that.setData({
      room_area: e.detail.value
    })
  },
  // 床品配置
  configuration: function (e) {
    var that = this;
    that.setData({
      configuration: e.detail.value
    })
  },
  // 价格
  price: function (e) {
    var that = this;
    that.setData({
      price: e.detail.value
    })
  },
  // 数量
  numbers: function (e) {
    var that = this;
    that.setData({
      numbers: e.detail.value
    })
  },
  // 入驻说明
  in_explain: function (e) {
    var that = this;
    that.setData({
      in_explain: e.detail.value
    });
  },
  detail:function(e){
    var that = this;
    that.setData({
      detail: e.detail.value
    });
  },
  uploadImage: function (e) {
    var that = this,
      uploadImg = that.data.uploadImg,
      image_path = that.data.image_path,
      curData = e.currentTarget.dataset,
      tag = curData.tag,
      imgnum = 1; //上传照片数量
    if (tag == 'instore') {
      imgnum = 3; //店内上传3张
    }
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var formData = {
          name: 'photos',
        },
          fileData = {
            filePath: tempFilePaths
          };
        util.uploadFile('store/upload_image', fileData, 'photos', formData,
          function (res) {
            uploadImg[tag] = tempFilePaths.length > 1 ? tempFilePaths : tempFilePaths[0];
            image_path[tag] = res;
            console.log(res);
            that.setData({
              uploadImg: uploadImg,
              image_path: image_path
            })
            that.isUpdateApplyInfo();
          },
          function () { }
        )
      }
    })
  },
  //直接上架
  submit: function () {
    var that = this;
    var data = that.data;
    var prams = {};
    prams.store_name = data.store_name;
    prams.good_id = data.good_id;
    prams.good_type = data.good_type;
    prams.top_of_goods = data.top_of_goods;
    prams.free_breakfast = data.free_breakfast;
    prams.room_area = data.room_area;
    prams.configuration = data.configuration;
    prams.price = data.price;
    prams.numbers = data.numbers;
    prams.in_explain = data.in_explain;
    prams.detail = data.detail;
    console.log(prams);
  },
})