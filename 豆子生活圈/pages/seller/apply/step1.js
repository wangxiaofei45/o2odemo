const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  QQMapWX = require('../../../libs/qqmap-wx-jssdk.js'),
  QQMapKey = require('../../../config').QQMapKey,
  util = require('../../../utils/util.js');
var show_model = function (a, b) {
  wx.showModal({
    title: a,
    content: b,
    success: function (res) {
      if (res.confirm) {
      } else if (res.cancel) {
      }
    }
  })
};
var isPoneAvailable = function (e) {
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(e)) {
                  return false;
            } else {
                  return true;
            }
      };
var isCardNo = function (card) {
  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(card)) {
    return false;
  } else {
    return true;
  }
};
var check = function (obj){
  var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/; 
  if (!reg.test(obj)) {
    return false;
  } else {
    return true;
  }
};
var qqmapsdk;
Page({
  data: {
    src: "",
    imgUrl: imgUrl,
    apply_id: 0, //申请id
    extension_id: 0,//邀请人
    sc_name: '',
    region: ['浙江省', '杭州市', '江干区'], //默认区域
    location: '',//获取经纬度
    latitude: '', //纬度
    longitude: '', //经度
    deviation: 0, //误差距离
    seller_info: {},
    is_change: false, //是否选择了新区域
    disabledSumit: false, //是否禁止提交
    joinin_state: '提交', //按钮
    uploadImg: {
    }, //上传时图片列表
    image_path: {

    },//上传后
  },
  onLoad: function (options) {
    var that = this;
    //保存当前页的data参数
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var prevPage = pages[pages.length - 2];  //上一个页面
      that.setData(prevPage.data);
    }
    var uploadImg = that.data.uploadImg,
      image_path = that.data.image_path,
      sc_name = that.data.sc_name;
    if (options.extension_id) {
      that.setData({
        extension_id: options.extension_id,
      });
      console.log(that.data.extension_id)
    }
    if (options.sc_name) {
      that.setData({
        sc_id: options.sc_id,
        sc_name: options.sc_name
      });
      that.isUpdateApplyInfo();
    }
    //证明已经申请过
    if (options.apply_id) {
      that.setData({
        apply_id: options.apply_id,
      });
      that.getApplyInfo();
    }
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: QQMapKey
    });
  },
  onShow: function () {

  },
  //获取申请信息
  getApplyInfo: function () {
    let that = this;
    var parm = {
      apply_id: that.data.apply_id
    };
    util.Ajax("store/getApplyInfo", parm, function (res) {
      console.log('申请信息：', res);
      var data = res.datas;
      if (data.is_state){
      that.setData(data.applyInfo);
      }else{
        wx.redirectTo({
          url: '../apply',
        })
      }      
    });
  },
  //检验商家名称是否存在
  checkStoreName: function (e) {
    let that = this,
      new_name = e.detail.value,
      disabledSumit = that.data.disabledSumit,
      store_name = that.data.store_name;
    if (new_name == store_name || new_name == '') {
      return false;
    }
    var parm = {
      store_name: new_name
    };
    util.Ajax("store/checkStoreName", parm, function (res) {
      var data = res.datas;
      that.setData({
        store_name: new_name,
        disabledSumit: data.is_check,
      });
      that.isUpdateApplyInfo();
    });
  },
  //选择区域
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value,
      is_change: true,
    });
    this.isUpdateApplyInfo();
  },
  //跳转分类页
  tapSelectSellerClass: function () {
    wx.navigateTo({
      url: '../class',
    })
  },
  //上传图片
  uploadImage: function (e) {

    var that = this,
      uploadImg = that.data.uploadImg,
      image_path = that.data.image_path,
      curData = e.currentTarget.dataset,
      tag = curData.tag;
      console.log(tag);
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        var formData = {
          name: 'photos',
        },
          fileData = {
            filePath: tempFilePaths
          };
        util.uploadFile('store_join/upload_pic', fileData, 'photos', formData,
          function (res) {
            console.log("上传后的返回",res);
            var data = JSON.parse(res.data);
            uploadImg[tag] = tempFilePaths[0];//图片上上传
            image_path[tag] = data.name;
            that.setData({
              uploadImg: uploadImg,
              image_path: image_path
            });
            console.log("图片的路径",image_path);
            if (tag == ""){
            
            } else if (tag == "owner_card_front_pic"){
               that.setData({
                 owner_card_front_pic: res.picname,
               })
            } else if (tag == "owner_card_back_pic"){
              that.setData({
                owner_card_back_pic: res.picname,
              })
            } else if (tag == "owner_card_electronic"){
              that.setData({
                owner_card_electronic: res.picname,
              })
            }
            that.isUpdateApplyInfo();
          },
          function () { }
        )
      }
    })
  },
  //地址详情
  blurAddressDetail: function (e) {
    let that = this,
      address_detail = e.detail.value,
      region = that.data.region;
    that.setData({
      company_address_detail: address_detail
    })
    that.isUpdateApplyInfo();
    console.log('组合地址：', region + address_detail);
    // 调用接口
    qqmapsdk.geocoder({
      address: region + address_detail,
      success: function (res) {
        if (res.status == 0) {
          var result = res.result;
          let latitude = result.location.lat, //纬度
            longitude = result.location.lng, //经度
            deviation = result.location.deviation;
          that.setData({
            location: latitude + ',' + longitude,
            latitude: latitude,
            longitude: longitude,
            isLocation: true,//获取到经纬度
          })
        } else {
          wx.showModal({
            title: '温馨提醒',
            content: '获取店铺地址的经纬度失败，原因：' + res.message,
            success: function (res) {
              if (res.confirm) {
                $("#company_address_detail").focus();
              }
            }
          })
        }
        console.log('获取地址经纬度：', res);
      },
      fail: function (res) {
        wx.showModal({
          title: '温馨提醒',
          content: '没有获取到店铺地址的经纬度，请更换您的店铺地址',
          success: function (res) {
            if (res.confirm) {
              $("#company_address_detail").focus();
            }
          }
        })
      }
    });
  },
  //联系人姓名
  blurContactsName: function (e) {
    this.isUpdateApplyInfo();
    this.setData({
      contacts_name: e.detail.value
    })
  },
  //联系人电话
  blurContactsPhone: function (e) {
    this.isUpdateApplyInfo();
    if (isPoneAvailable(e.detail.value)) {
      this.setData({
        contacts_phone: e.detail.value
      })
    } else {
      show_model("提示", "电话输入不合法")
    }
  },
  //联系人身份证
  blurContactsCard: function (e) {
    this.isUpdateApplyInfo();
    if (isCardNo(e.detail.value)) {
      this.setData({
        store_owner_card: e.detail.value
      })
    } else {
      show_model("提示", "身份证输入不合法")
    }
  },
  //联系人电子邮箱
  blurContactsEmail: function (e) {
    this.isUpdateApplyInfo();
    if (check(e.detail.value)) {
      this.setData({
        contacts_email: e.detail.value
      })
    } else {
      show_model("提示", "邮箱输入不合法")
    }
  },
  //经营特色
  blurStoreSphere: function (e) {
    this.isUpdateApplyInfo();
    this.setData({
      business_sphere: e.detail.value
    })
  },
  //经营特色
  blurStoreDescription: function (e) {
    this.isUpdateApplyInfo();
    this.setData({
      store_description: e.detail.value
    })
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
  },
  // 提交
  formSubmit: function (e) {
    let that = this;
    var parm = e.detail.value;
    parm['extension_id'] = that.data.extension_id,
    parm['member_id'] = app.globalData.member_id,
    parm['member_name'] = app.globalData.member_name;
    if (parm.store_name == "") {
      show_model("提示", "店铺名称为空")
    } else if (parm.sc_name == "") {
      show_model("提示", "店铺分类为空")
    } else if (parm.company_address_detail == "") {
      show_model("提示", "详细地址为空")
    } else if (parm.contacts_name == "") {
      show_model("提示", "联系人为空")
    } else if (parm.contacts_phone == "") {
      show_model("提示", "联系电话为空");
    } else if (isPoneAvailable(parm.contacts_phone) == false) {
      show_model("提示", "联系电话格式错误")
    } else if (parm.store_owner_card == "") {
      show_model("提示", "身份证为空")
    }  else if (parm.business_sphere == "") {
      show_model("提示", "经营特色为空")
    } else if (parm.store_description == "") {
      show_model("提示", "店铺介绍为空")
    } else if (parm.business_licence_number_electronic == "") {
      show_model("提示", "营业执照为空")
    } else if (parm.owner_card_front_pic == "") {
      show_model("提示", "身份证找正面照为空")
    } else if (parm.owner_card_back_pic  == "") {
      show_model("提示", "身份证找反面照为空")
    } else if (parm.owner_card_electronic == "") {
      show_model("提示", "手持身份证照片为空")
    }
    else {
      util.Ajax("store/personalApplyStep", parm, function (res) {
        console.log(res.code)
        if (res.code == 200) {
          app.showSucMsg(res.sucMsg);
          setTimeout(function () {
            wx.switchTab({
              url: '../../my/index',
            })
          }, 2000);
        }
      },"POST");
    }
  },
})