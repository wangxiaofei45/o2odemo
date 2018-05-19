import WeCropper from '../../../cropper/we-cropper.js'
const app = getApp();
const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
const util = require('../../../utils/util.js');
Page({
  data: {
    tag:'',
    cropperOpt: {
      id: 'cropper',
      width: width,
      height: height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    },
    uploadImg: {
      instore: {
        0: '',
        1: "",
        2: ""
      }
    }, //上传时图片列表
    image_path: {
      instore: []
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    var that = this,
      uploadImg = that.data.uploadImg,
      image_path = that.data.image_path;
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        var tag = this.data.tag
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = [];
        tempFilePaths.push(avatar);
        var formData = {
          token: app.globalData.token,
          name: 'photos',
        },
          fileData = {
            filePath: tempFilePaths
          };

        util.uploadFile('store/upload_image', fileData, 'photos', formData,
          function (res) {
            console.log(res);
            var sres = res.pic_name;
            that.isUpdateApplyInfo();
            if (that.data.types == "add"){
              wx: wx.redirectTo({
                url: `step1?avatar=${tempFilePaths}&tag=${tag}&sres=${sres}`
              })
            } else if (that.data.types == "ament"){
              wx: wx.redirectTo({
                url: `step_ament?avatar=${tempFilePaths}&tag=${tag}&sres=${sres}`
              })
            }
          
          },
          function () { }
        )
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  // 重新选择
  uploadTap() {
    const self = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad(option) {
    // console.log(option.tag);
    this.setData({
      tag: option.tag,
      types: option.type,
    })
    const { cropperOpt } = this.data
    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  },
  //是否修改资料
  isUpdateApplyInfo: function () {
    var that = this;
    let apply_id = that.data.apply_id;
    if (apply_id) {
      that.setData({
        disabledSumit: false, //是否禁止提交
        joinin_state: '确定修改', //按钮
      });
    }
  }
})
