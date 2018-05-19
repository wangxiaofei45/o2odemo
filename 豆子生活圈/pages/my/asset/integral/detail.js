const date = new Date()
const years = []
const months = []
for (let i = 2016; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../../config').imgUrl,
  util = require('../../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    year_click: false,
    // model
    model: true,
    monthsHidden: true,
    time_type: 'year',//账单时间统计维度：year年度、month月度
    // model初始化数据
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    member_info:{
      earn_integral: 0.00, //已赚取
      use_integral: 0.00, //已使用
    },
    pd_list: [],
    showname: '',
    select_model: false,
    member_id: app.globalData.member_id, //会员ID
    identity: [
      {
        name: "个人账户",
        identity: "people",
      },
      {
        name: "码主账户",
        identity: "shop",
      },
      {
        name: "商铺1",
        identity: "shop",
      },
      {
        name: "商铺3",
        identity: "shop",
      },
    ],
    
  },
  onLoad: function () {
    var that = this;
    that.loadPdlogList();
  },
  loadPdlogList: function () {
    var that = this;
    var param = {
      page:'1',
      member_id: app.globalData.member_id, //必带
      time_type: that.data.time_type == 'year'?'1':'2', //账单统计维度：年或月份
      time: that.data.time_type == 'year' ? that.data.year : that.data.year + '-' + that.data.month
    };
    util.Ajax("member_bill/predepositlog", param, function (res) {
      var data = res.datas;
      console.log('返回积分:', res);
      that.setData({
        count: data.count,
        incomeCount: data.incomeCount,
        payCount: data.payCount,
        pd_list: data.pd_list,
      });
    },"POST");
  },
  onReady: function () {

  },
  selectYear: function () {
    let that = this;
    that.setData({
      year_click: false,
      monthsHidden: true,
      time_type: 'year',
    })
    that.loadPdlogList();
  },
  selectMonth: function () {
    let that = this;
    that.setData({
      year_click: true,
      monthsHidden: false,
      time_type: 'month',
    })
    that.loadPdlogList();
  },
  // 点击选择时间的时候弹出来时间选择框
  selectTime() {
    let that = this;
    that.setData({
      model: false,
    })
  },
  //选中年月
  changeYearMonth: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
    this.loadPdlogList();
  },
  // 关闭model
  closeYearMonth: function () {
    let that = this;
    that.setData({
      model: true,
    })
  },
  //确定选中的年份/月份
  confirmYearMonth: function () {
    let that = this;
    console.log("当前年份：", that.data.year);
    that.setData({
      model: true,
    })
    that.loadPdlogList();
  },
  // 跳转到订单详情页面
  goto_order_details: function () {
    wx.navigateTo({
      url: 'orderDetails/orderDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})