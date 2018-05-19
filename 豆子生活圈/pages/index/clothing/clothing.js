let imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    imgUrl: imgUrl,
    rowcol:true,
    bannerlist: [
      {
        imgurl: imgUrl + "/clothing/text.jpg",
        link: ""
      },
      {
        imgurl: imgUrl + "/clothing/text.jpg",
        link: ""
      },
      {
        imgurl: imgUrl + "/clothing/text.jpg",
        link: ""
      }
    ],
    barlist:[
      {
        id:1,
        imgurl: imgUrl +"/clothing/menu-top.png",
      },
       {
         id:2,
         imgurl: imgUrl +"/clothing/menu-all.png",
      },
       {
         id:3,
         imgurl: imgUrl +"/clothing/menu-new.png",
       },
        {
          id:4,
          imgurl: imgUrl +"/clothing/menu-activity.png",
       }
    ],
    posabs:false,
    filtername:"综合排序",
    filter:[
      {
        types: 0,
        name: "综合排序",
      },
      { 
        types:1,
        name:"价格从高到低",
      },
      {
        types: 2,
        name: "价格从低到高",
      },
    ],
    activeindex:1,
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  toggle:function(e){
    var that = this;
    that.setData({
      activeindex: e.currentTarget.dataset.index,
    })
    
  },
  openfilter:function(){
    let that = this;
    that.setData({
      posabs: !that.data.posabs,
    })
  },
  change:function(e){
    let that = this;
    that.setData({
      filtername: e.currentTarget.dataset.name
    })
  },
  changerow:function(){
    let that = this;
    that.setData({
      rowcol: !that.data.rowcol,
    })
  },
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})