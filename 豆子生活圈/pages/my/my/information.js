const app = getApp();
let judge = app.judge,
  config = require('../../../config'),
  util = require('../../../utils/util.js');
Page({
  data: {
    member_id: wx.getStorageSync('member_id'),
    imgUrl: config.imgUrl,
    disabledSumit: false, //默认允许提交
    is_codeowner: app.globalData.is_codeowner,//码主
    hide_sex: true,
    sex: "请选择性别",
    member_birthday: "请选择出生日期",
    sexList: [
      { name: '保密', value: '0', checked: 'true' },
      { name: '男', value: '1' },
      { name: '女', value: '2' },
    ],
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '身份信息加载中',
    });
    // 添加剪裁头像
    let { avatar } = options
    if (avatar) {
      this.setData({
        member_avatar: avatar
      })
    }
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("member/index", data, function (res) {
      var data = res.datas;
      wx.hideLoading();
      let member_sex = data.memberInfo.member_sex;
      var _sexparam = that.data.sexList.map(function (item) {
        if (item.value == member_sex) {
          item.checked = 'true';
        } else {
          item.checked = '';
        }
        return item;
      })
      that.setData({
        memberInfo: data.memberInfo,
        member_avatar: data.memberInfo.member_avatar,
        sex: data.memberInfo.sex,
        member_birthday: data.memberInfo.member_birthday,
        sexList: _sexparam
      })
    },"POST");
  },
  checkMemberName: function (e) {
    let that = this,
      new_name = e.detail.value,
      member_name = that.data.memberInfo.member_name;
    if (new_name == member_name) {
      return false;
    }
    var parm = {
      token: app.globalData.token,
      member_name: new_name
    };

    util.Ajax("member/checkMemberName", parm, function (res) {
      var data = res.datas;
      if (data.is_check) {
        app.showErrMsg(res.sucMsg);
        that.setData({
          disabledSumit: true,
        })
      } else {
        that.setData({
          disabledSumit: false,
        })
      }
    });
  },
  chooseImageTap: function () {
    let that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      // 剪切头像
      // success(res) {
      //   let src = res.tempFilePaths[0];
      //   wx.redirectTo({
      //     url: "upload/upload?src=" + src
      //   })
      // },
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        var formData = {
          token: app.globalData.token,
          name: 'photos',
        },
          fileData = {
            filePath: tempFilePaths
          };
        util.uploadFile('member/avatar_upload', fileData, 'photos', formData,
          function (res) {
            console.log('头像返回：', tempFilePaths[0]);
            that.setData({
              member_avatar: tempFilePaths[0],
            })
          },
          function () { }
        )
      }
    })
  },
  //选择图片结束
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url] // 需要预览的图片http链接列表
    })
  },
  //选择性别
  radioSexChange: function (e) {
    var that = this,
      memberInfo = that.data.memberInfo,
      sex = e.detail.value;
    if (sex == 1) {
      sex = '男';
    } else if (sex == 2) {
      sex = '女';
    } else {
      sex = '保密';
    }
    that.setData({
      hide_sex: true,
      sex: sex
    })
  },
  //打开性别
  openRadioSex: function (e) {
    var that = this;
    that.setData({
      hide_sex: false,
    })
  },
  //选择生日
  bindDateChange: function (e) {
    this.setData({
      member_birthday: e.detail.value
    })
  },
  // 提交
  formSubmit: function (e) {
    var that = this;
    var parm = e.detail.value;
    parm['member_id'] = that.data.member_id;
    util.Ajax("member/editMemberInfo", parm, function (res) {
      var data = res.datas;
      if (data.is_edit) {
        app.showSucMsg(res.sucMsg);
        wx.switchTab({
          url: '../index',
        })
      } else {
        app.showErrMsg(res.sucMsg);
      }
    },"POST");
  },
  // 取消修改
  un_change: function () {
    wx.navigateBack({
      delta: -1,
    })
  },
})