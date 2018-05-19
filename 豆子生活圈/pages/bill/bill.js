const app = getApp();
var util = require('../../utils/util.js'),
  wxCharts = require('../../utils/wxcharts.js'),
  imgUrl = require('../../config').imgUrl;
// model时间初始化
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
    keyword: '',//关键词搜索
    minPrice: '', //最低金额
    maxPrice: '',//最高金额
    nowClassId: '',//当前分类id
    user_type:'1',
    id:"0",
    bill_time: 'year',//账单时间统计维度：year年度、month月度
    order_count: 0,//交易笔数
    expend_total: 0, //支出统计
    commis_total: 0, //佣金收入
    store_total: 0,//店铺余额
    showYearMonth: true, //显示年月选择器
    monthsHidden: true, //隐藏月份选择器
    // model初始化数据
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth() + 1,
    value: [9999, 1, 1],
    colors: [],
    showname: '个人账户',
    select_model: false, //是否点开身份选择
    role_list: [],//身份列表
    series: [],//个人的账单查看的时候的显示出来的数据
    orderData: []  // 消费列表渲染时候的
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '账单信息加载中',
    });
    let that = this;
    if (options.keyword) {
      that.setData({
        keyword: options.keyword
      });
      wx.setNavigationBarTitle({
        title: "搜索：" + options.keyword + " 结果的账单",
      })
    }
    if (options.minPrice > 0 || options.maxPrice > 0 || options.nowClassId > 0) {
      that.setData({
        minPrice: options.minPrice,
        maxPrice: options.maxPrice,
        nowClassId: options.nowClassId,
      });
    }
    this.loadBillList();
  },

  close_model: function () {
    var that = this;
    that.setData({
      select_model: !that.data.select_model,
    })
  },
  //加载账单的列表
  loadBillList: function () {
    var that = this;
    var param = {
      type:that.data.user_type,
      id:that.data.id,
      page: '1',
      member_id: app.globalData.member_id, //必带
      time_type: that.data.time_type == 'year' ? '1' : '2', //账单统计维度：年或月份
      time: that.data.time_type == 'year' ? that.data.year + '' : that.data.year + '-' + that.data.month + ''
    };
    util.Ajax("member_bill/index", param, function (res) {
      var data = res.datas;
      console.log("账单列表！",data)
      that.setData({
        levelData: data.levelData,//身份的判定
        countData: data.countData,//当前的信息
        series: data.classCountData,//数据表格
        orderData: data.orderData,//账单列表
      })
      console.log("列表",that.data.orderData)
      if (that.data.user_type == "1") {
        new wxCharts({
          canvasId: 'ringCanvas',
          series: that.data.series,
          subtitle: {
            name: '消费比例',
            color: '#666666',
            fontSize: 15
          },
          type: 'ring',
          animation: false,
          extra: {
            column: {
              width: 15
            }
          },
          width: wx.getSystemInfoSync().windowWidth * 0.5,
          height: 250,
          dataLabel: false,
          enableScroll: true,//允许左右滑动
        });
      }
      wx.stopPullDownRefresh();
      wx.hideLoading();
    },"POST");
  },
  // 头部下拉菜单
  tapSelectRole: function () {
    let that = this,
      levelData = that.data.levelData;
    if (levelData.length > 1) {
      that.setData({
        select_model: !that.data.select_model,
      })
    }
  },
  // 选择门店个人
  tapChangeRole: function (e) {
    let that = this,
      dataset = e.currentTarget.dataset;
    that.setData({
      id : dataset.id,
      user_type: dataset.type,
      showname: dataset.name,
      select_model: !that.data.select_model,
    })
    this.loadBillList();
  },
  // 切换年月
  selectYear: function () {
    let that = this;
    that.setData({
      bill_time: 'year',
      monthsHidden: true,
    })
    this.loadBillList();
  },
  //切换月度
  selectMonth: function () {
    let that = this;
    that.setData({
      bill_time: 'month',
      monthsHidden: false,
    })
    this.loadBillList();
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
    // console.log("当前年份：", that.data.year);
    that.setData({
      showYearMonth: true,
    })
    this.loadBillList();
  },

  changeYearMonth: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
  },
  onPullDownRefresh: function () {
    var that = this;
    wx:wx.showLoading({
      title: 'loading...',
    })
    this.loadBillList();
  },
  // 跳转到订单详情页面
  gotoOrderDetails: function (e) {
    let that = this,
    data_set = e.currentTarget.dataset,
    order_id = data_set.order_id,
    user_type = that.data.user_type;
    wx.navigateTo({
      url: 'detail?order_id=' + order_id + '&role_type=' + user_type,
    })
  },
})