const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    select_model: false,
    isChangeRole: false,//是否切换了身份
    member_id: app.globalData.member_id,//会员ID
    currentInfo: {},//当前默认信息
    user_type:1,
    current_type:1,
    roleList: [],
    union_list:[],//商户表
    user_list:[],//用户列表
    shopuser_list:[],//店铺下面的用户列表
  },
  onLoad: function (options) {

    var that = this;
    wx.showLoading({
      title: 'loading...',
    })
    that.loadUnionList();
  },
// 请求个人信息
loadUnionList: function () {
    var that = this;
    var data = {
      member_id: that.data.member_id,
    };
    util.Ajax("Bindlist/getChoiceList", data, function (res) {
      var data = res.datas;
      that.setData({
        roleList: data,
        currentInfo:data[0],
      })
      that.loading_list();
    },'POST');
  },
// 加载列表
loading_list:function(){
  var that = this;
  if (that.data.current_type == 1){
    var data = {
      member_id: that.data.member_id,
      showtype: that.data.user_type,
    };
    util.Ajax("Bindlist/getList", data, function (res) {
      var data = res.datas;
      if (that.data.user_type == 1) {
        that.setData({
          union_list: data,
        })
      } else if (that.data.user_type == 2) {
        that.setData({
          user_list: data,
        })
      }
      wx.hideLoading();
    }, 'POST');
  } else if (that.data.current_type == 2){
    var data = {
      store_id: that.data.currentInfo.classid,
    };
    util.Ajax("Bindlist/getStoreUserList", data, function (res) {
      var data = res.datas;
      that.setData({
        shopuser_list:data,
      })
      wx.hideLoading();
    }, 'POST');
  }
},
  // 头部下拉菜单
  selet: function () {
    let that = this;
      that.setData({
        select_model: !that.data.select_model,
      })    
  },
  // 选择门店个人
    changeStore: function (e) {
    let that = this,
      dataset = e.currentTarget.dataset,
      roleList = that.data.roleList;
    that.setData({
      select_model: !that.data.select_model,
      currentInfo: dataset,
      current_type: dataset.type,
    })
    wx.showLoading({
      title: 'loading...',
    })
    that.loading_list();
  },
  // 点击蒙层关闭选择
  close_model: function () {
    var that = this;
    that.setData({
      select_model: !that.data.select_model,
    })
  },
  //标记联盟商为关注
  tapUnionFollow: function (e) {
    var that = this,
     curdata = e.currentTarget.dataset;
    var data = {
      token: app.globalData.token,
      ext_id: curdata.ext_id,
      follow_type: curdata.is_follow
    };
    util.Ajax("member/union_follow", data, function (res) {
      var data = res.datas;
      app.showSucMsg(res.sucMsg);
      that.setData({
        present: '',
      })
      //重新加载联盟商列表
      that.loadUnionList();
    });
  },
  clientinfo:function(e){
    var that = this;
    var obj = e.currentTarget.dataset;
    console.log(obj);
    var id = obj.id;
    var showtype = obj.showtype;
    wx.navigateTo({
      url: 'clientinfo?showtype=' + showtype +'&bind_id='+id,
    })
  },
  // 切换查看联盟店铺还是个人
  id_type:function(e){
    var that = this;
    that.setData({
      user_type:e.target.dataset.id
    })
    wx.showLoading({
      title: 'loading...',
    })
    that.loading_list();
  }
})