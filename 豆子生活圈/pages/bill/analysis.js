const app = getApp();
var util = require('../../utils/util.js'),
  imgUrl = require('../../config').imgUrl,
  wxCharts = require('../../utils/wxcharts.js');
const date = new Date();
const years = [];
const months = [];
let lineChart = null,
    startPos = null;
for (let i = 2015; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
Page({
  data: {
    orderAmountCount:'',
    member_id: app.globalData.member_id,//会员ID
    identity:'shop',//用户身份判断
    presentid:1,//客户消费分析选择
    presenttext:'年到店分析',
    imgUrl: imgUrl,
    bill_time: 'year',
    showYearMonth: true, //显示年月选择器
    monthsHidden: true, //隐藏月份选择器
    // model初始化数据
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    value: [9999, 1, 1],
    categories:[],
    line_data: [],
    // 消费者分析切换
    analys_list:[
      {  
         id:1,
         name:'忠诚度',
         text:'年到店次数',
      },
      {
        id: 2,
        name: '活跃度',
        text: '60天内到店次数',
      },
      {
        id: 3,
        name: '流失风险',
        text: '多天未到店人数',
      },
    ],
    series: [{
      id: 1,
      name: '60天以下：30人',
      color: '#b8e90c',
      data: 100,
    }, {
      id: 2,
      name: '2-3个月以下：30人',
      color: '#ff66c8',
      data: 30,
    }, {
      id: 3,
      name: '4-6个月：30人',
      color: '#4cdfd5',
      data: 45,
    }, {
      id: 4,
      name: '6个月以上：30人',
      color: '#fbd674',
      data: 45,
    }
    ],
  },
  // canvas左右拖动
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ':' + item.data
      }
    });
  },
  onLoad: function (e) {
    var that = this;
    console.log(e);
    wx.showLoading({
      title: 'loading...',
    })
    that.setData({
      role_type: e.role_type,
      chain_id: e.chain_id
    })
    // 加载个人
    if (that.data.role_type == "1"){
      that.loadanalysis();
      wx.hideLoading();
    }
    if (that.data.role_type == "2") {
      that.setData({
        store_id: e.store_id,
      })
      that.loadstore();
       wx.hideLoading();
    }
   
  },
  // 请求数据开始个人的
  loadanalysis: function () {
    var that = this;
    var param = {
      showtype: that.data.monthsHidden?1:2,
      member_id: that.data.member_id,
      date: that.data.monthsHidden ? that.data.year : that.data.year + '-' + that.data.month ,
    };
    util.Ajax("Count/getUserCount", param, function (res) {
      var datas = res.datas;
      that.setData({
        orderAmountCount:datas.orderAmountCount,
        categories: datas.dayData ? datas.dayData : datas.monthData,
        line_data: datas.dayCountData ? datas.dayCountData : datas.monthCountData,
        orderClassData: datas.orderClassData,
        storeCountData: datas.storeCountData,
      });
      var windowWidth = 320;
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: that.data.categories,
        animation: true,
        series: [{
          data: that.data.line_data,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: windowWidth,
        height: 150,
        dataLabel: false,
        dataPointShape: true,
        enableScroll: true,
        legend: false,
        extra: {
          lineStyle: 'curve'
        }
      });
      wx.stopPullDownRefresh();
      wx.hideLoading();
    },'POST');
  },
  //请求数据店铺
  loadstore: function () {
    var that = this;
    var param = {
      member_id: that.data.member_id,
      showtype: that.data.monthsHidden ? 1 : 2,
      chain_id: that.data.chain_id,
      date: that.data.monthsHidden ? that.data.year : that.data.year + '-' + that.data.month ,
    };
    util.Ajax("Count/getChainCount", param, function (res) {
      var datas = res.datas;
      that.setData({
        orderAmountCount: datas.orderAmountCount,
        categories: datas.dayData ? datas.dayData : datas.monthData,
        line_data: datas.dayCountData ? datas.dayCountData : datas.monthCountData,
        orderClassData: datas.orderClassData,
        // storeCountData: datas.storeCountData,
      });
      var windowWidth = 320;
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: that.data.categories,
        animation: true,
        series: [{
          data: that.data.line_data,
          format: function (val, name) {
            return val.toFixed(2);
          }
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: windowWidth,
        height: 150,
        dataLabel: false,
        dataPointShape: true,
        enableScroll: true,
        legend: false,
        extra: {
          lineStyle: 'curve'
        }
      });
      try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        console.error('getSystemInfoSync failed!');
      }
      new wxCharts({
        canvasId: 'ringCanvas',
        series: that.data.series,
        subtitle: {
          name: '收益率',
          color: '#666666',
          fontSize: 15
        },
        type: 'ring',
        animation: true,
        extra: {
          column: {
            width: 15
          }
        },
        width: wx.getSystemInfoSync().windowWidth * 0.5,
        height: 180,
        dataLabel: false,
        legend: false,
      });
      wx.hideLoading();
    }, 'POST');
  },
  //请求数据
  onReady: function () {
  },
  // 切换年月
  selectYear: function () {
    let that = this;
    that.setData({
      bill_time: 'year',
      monthsHidden: true,
    })

  },
  //切换月度
  selectMonth: function () {
    let that = this;
    that.setData({
      bill_time: 'month',
      monthsHidden: false,
    })
  },
  // 点击选择时间的时候弹出来时间选择框
  selectTime: function () {
    let that = this;
    that.setData({
      showYearMonth: false,
    })
  },
  //关闭/隐藏 年月选择器
  closeYearMonth: function () {
    let that = this;
    that.setData({
      showYearMonth: true,
    })
  },
  //确定选中的年份/月份
  confirmYearMonth: function () {
    let that = this;
    console.log("当前年份：", that.data.year, that.data.month);
    that.setData({
      showYearMonth: true,
    })
    if (that.data.identity == "user") {
      that.loadanalysis();
      wx.hideLoading();
    }
    if (that.data.identity == "store") {
      that.loadstore();
      wx.hideLoading();
    }
  },

  changeYearMonth: function (e) {
    var that = this;
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },
  select_type:function(e){
    var that = this;
    that.setData({
      presentid: e.currentTarget.dataset.id,
      presenttext: e.currentTarget.dataset.text,
    })
  },
  onShow: function () {

  },
})