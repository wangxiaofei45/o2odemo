const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
const date = new Date()
const years = []
const months = []
for (let i = 2014; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
Page({
  data: {
    imgUrl: imgUrl,
    union_id: '', //佣金ID
    time_type: 'year',
    year_click: false,
    model: true,
    monthsHidden: true,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    commis_list: []
  },
  onLoad: function(options) {
    
    var that = this;
    that.setData({
      union_id: options.union_id,
    })
    //加载指定联盟商的抽拥明细列表
    that.loadUnionList();
  },

  //加载指定联盟商的抽拥明细列表
  loadUnionList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
      union_id: that.data.union_id,
      year: that.data.year, //佣金年份
      month: that.data.month, //佣金月份
      time_type: that.data.time_type
    };
    console.log('账单月份:', that.data.month);
    util.Ajax("member/union_detail", data, function (res) {
      var data = res.datas;
      //console.log('返回联盟商佣金明细:', res);
      that.setData({
        commis_list: data.commis_list,
      })
    });
  },
  onReady: function () {

  },
  // 切换年月
  selectYear: function () {
    let that = this;
    that.setData({
      time_type: 'year',
      year_click: false,
      monthsHidden: true,
    })
  },
  selectMonth: function () {
    let that = this;
    that.setData({
      time_type: 'month',
      year_click: true,
      monthsHidden: false,
    })
  },
  // 点击选择时间的时候弹出来时间选择框
  selectTime() {
    let that = this;
    that.setData({
      model: false,
    })
  },
  // 关闭model
  close_model: function () {
    let that = this;
    that.setData({
      model: true,
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },
})