const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
const date = new Date()
const years = []
const months = []
const days = []

for (let i = date.getFullYear(); i <= date.getFullYear()+3; i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    imgUrl: imgUrl,
    years: years,
    startyear: date.getFullYear(),
    months: months,
    startmonth: date.getMonth()+1,
    days: days,
    startday: date.getDate(),
    startyear: date.getFullYear(),
    currentTime: [0, date.getMonth(), date.getDate()-1], //当前选中时间
    hiddenDate: true, //显示隐藏时间选择器
    types: '',
    endyear: date.getFullYear(),
    endmonth: date.getMonth() + 1,
    endday: date.getDate(),
    start_time:'请选择',
    end_time:'请选择',
    limit_num: 1,//每人限领一次
    total_num:0,//默认发放总数为0
    isLimit: true,//是否限领 默认限制
    //选择发放对象
    obj_hidden:true,
    current_obj_id:0, 
    current_obj_name:"所有用户",
    select_obj:[
      {
        id: 0,
        name: "所有用户"
      },
      {
        id:1,
        name:"平台新注册用户"
      },
      {
        id: 2,
        name: "平台VIP用户"
      },
      // {
      //   id: 3,
      //   name: "本店VIP用户"
      // },
    ],
    way_hidden: true,
    current_way_id: 0,
    current_way_name: "手动领取",
    select_way: [
      {
        id: 0,
        name: "手动领取"
      },
      // {
      //   id: 1,
      //   name: "首页推送"
      // },
      {
        id: 2,
        name: "店铺主页领取"
      },
      // {
      //   id: 3,
      //   name: "自动发放"
      // },
    ]  
  },
  onLoad: function (options) {

  },
  //是否限领次数
  switchChangeLimit: function (e) {
    var that = this,
      isLimit = that.data.isLimit,
      limit_num = that.data.limit_num;
    if (isLimit){
      isLimit = false;
      limit_num = 0;
    }else{
      isLimit = true;
      limit_num = 1;
    }
    that.setData({
      isLimit: isLimit,
      limit_num: limit_num
    });
  },
  //选择具体日期
  bindChangeDate: function (e) {
    const that = this;
    const val = e.detail.value;
    if (that.data.types == 'start'){
      this.setData({
        startyear: this.data.years[val[0]],
        startmonth: this.data.months[val[1]],
        startday: this.data.days[val[2]],
      })
    }else{
      this.setData({
        endyear: this.data.years[val[0]],
        endmonth: this.data.months[val[1]],
        endday: this.data.days[val[2]],
      })
    }
  },
  // 选择发放对象
  open_object:function(e){
    var that = this;
    that.setData({
      obj_hidden:false,
    })
  },
  change_obj:function(e){
    console.log(e.currentTarget.dataset);
    var that = this;
    that.setData({
      current_obj_id: e.currentTarget.dataset.id,
      current_obj_name: e.currentTarget.dataset.name,
      obj_hidden:true
    })
  },
  // 选择发放方式
  open_disbursement:function(){
    var that = this;
    that.setData({
      way_hidden: false,
    })
  },
  change_way :function(e) {
    console.log(e.currentTarget.dataset);
    var that = this;
    that.setData({
      current_way_id: e.currentTarget.dataset.id,
      current_way_name: e.currentTarget.dataset.name,
      way_hidden: true
    })
  },
  //选择日期
  tapSelectDate: function (e) {
    let that = this;
    that.setData({
      hiddenDate: false,
      types: e.currentTarget.dataset.time,
    })
  },
  //关闭日期
  tapCloseDate: function () {
    let that = this;
    that.setData({
      hiddenDate: true,
      start_time: that.data.startyear + '-' + that.data.startmonth + '-' + that.data.startday,
      end_time: that.data.endyear + '-' + that.data.endmonth + '-' + that.data.endday,
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this,
      parm = e.detail.value;
    if (judge.judgeNull(parm.coupon_name)) {
      app.showErrMsg("活动名称不可为空");
      return false;
    }
    if (judge.judgeNull(parm.discount_price) || judge.judgeNull(parm.satisfy_price)) {
      app.showErrMsg("优惠券金额不可为空");
      return false;
    }
    if (parm.discount_pric > parm.satisfy_price) {
      app.showErrMsg("优惠券的金额不可大于满减金额");
      return false;
    }
    if (judge.judgeNull(parm.coupon_start_time)) {
      app.showErrMsg("优惠券开始时间不可为空");
      return false;
    }
    parm.token = app.globalData.token;
    util.Ajax("seller/saveCoupon", parm, function (res) {
      var data = res.datas;
      app.showErrMsg(res.sucMsg);
      if (data.coupon_id){
        wx.navigateTo({
          url: 'seccess?coupon_id=' + data.coupon_id,
        })
      }   
    });    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})