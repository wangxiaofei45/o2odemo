const imgUrl = require('../../../config').imgUrl;
const util = require('../../../utils/util.js');
const app = getApp();
Page({
  data: {
    class_id:0,//商品类型的id
    store_id:0,//店铺的id
    imgUrl: imgUrl,
    title_disabled:true,//控制修改表头名字
    management_good:false,
    select_all:false,
    middlearr:[],
    items: [
      { name: '1', checked: false},
      { name: '2', checked: false},
      { name: '3', checked: false},
      { name: '4', checked: false},
      { name: '5', checked: false},
      { name: '6', checked: false},
    ],
  },
  onLoad: function (e) {
    var that = this;
    that.setData({
      class_id: e.class_id,
      store_id: e.store_id,
    })
    that.load_class();
  },
  // 商品的分类的加载...
  load_class:function(){
      var that = this;
      var data = {
        token: app.globalData.token,//登录口令
        store_id: that.data.store_id, //店铺ID
        member_id: app.globalData.member_id, //会员ID
        class_id: that.data.class_id,
        order:'1',
        status:'1',
      };
      util.Ajax("Hotel/getMemberGoodsList", data, function (res) {
        var data = res.datas;
        console.log('分类列表:', res);
        that.setData({
          goodsList: data.goodsList,
        })
        wx.hideLoading();
      }, "POST");
  },
  onReady: function () {
  },
  // 改变类目的名字
  change_classname:function(){
     let that = this;
     that.setData({
       title_disabled: !that.data.title_disabled,
     });
    //  这里自动获取焦点
  },
  finish_classname: function () {
    let that = this;
    that.setData({
      title_disabled: !that.data.title_disabled,
    })
  },
  // 管理商品
  management:function(){
    let that = this;
    that.setData({
      management_good: true,
    })
  },
  finish_management:function(){
    let that = this;
    that.setData({
      management_good:false,
    })
  },
  // 选择
  select:function(e){
    var that = this;
    let arr2 = [];
    if (that.data.management_good == false){
       return;
    }else{
      var arr = that.data.items;
      var index = e.currentTarget.dataset.id;
      arr[index].checked = !arr[index].checked;
      console.log(arr);
      
      for(let i=0;i<arr.length;i++){
         if(arr[i].checked){
           arr2.push(arr[i])
         }
      };
      that.setData({
        items: arr,
        middlearr:arr2
      })
    }
  },
  // 删除
  deleteitem:function(){
    var that = this;
    let arr = that.data.items;
    let arr2 = [];
    console.log(arr);
    for(let i=0;i<arr.length;i++){
      if (arr[i].checked == false){
        arr2.push(arr[i]);
      }
    }
    that.setData({
      items:arr2,
      middlearr:[]
    })
  },
  // 全选
  select_all:function(){
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    if (that.data.select_all){
      let arr = that.data.items;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
          arr2.push(arr[i]);
        }else{
          arr[i].checked = true;
          arr2.push(arr[i]);
        }
      }
      that.setData({
        items: arr2,
        middlearr:arr2
      })
    }
  },
  // 取消全选
  select_none:function(){
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i].checked = false;
        arr2.push(arr[i]);
    }
    that.setData({
      items: arr2,
      middlearr:[]
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
})