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
    member_id: app.globalData.member_id, //会员ID
    showname: '',    
    filter_model:true,//过滤model
    w1:'',
    w2: '',
    w3: '',
    drawNum:{
        earn_rcb:4500,
        earn_num: 10,
        use_rcb:1000,
        use_num: 8,
        available_rcb:'',
      },
    select_model: false,
    isChangeRole: false,//是否切换了身份
    currentInfo: {
      role_name: '个人账户',
      role_tag: 'user',
    },//当前默认信息
    roleList: [],
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
    rcblog_list: []
  },
  onLoad: function () {
    var that = this;
    that.loadRcblogList();
  },
  open_filter:function(){
    this.setData({
      filter_model: false,
    })
  },
  close_filter:function(){
    this.setData({
      filter_model: true,
    })
  }, 
  //加载充值卡日志
  loadRcblogList: function () {
    var that = this,
      isChangeRole = that.data.isChangeRole;
    var param = {
      page: '1',
      member_id: app.globalData.member_id, //必带
      time_type: that.data.time_type == 'year' ? '1' : '2', //账单统计维度：年或月份
      time: that.data.time_type == 'year' ? that.data.year+'' : that.data.year + '-' + that.data.month+''
    };
    util.Ajax("member_bill/rcblog", param, function (res) {
      var data = res.datas;
      console.log('返回账单信息:', res);
      // that.setData({
      //   rcblog_list: data.rcblog_list,
      //   roleList: data.roleList,
      //   drawNum: data.member_info
      // });
      if (!isChangeRole) {
        that.setData({
          currentInfo: data.roleList[0],
        })
      }
      var numbers = that.data.drawNum;
      numbers.available_rcb = Number(numbers.earn_rcb) + Number(numbers.use_rcb);
      if (numbers.earn_rcb > 0-numbers.use_rcb) {
        that.setData({
          w1: '100%',
          w2: ((0 - numbers.use_rcb) / numbers.earn_rcb) * 100 + '%',
          w3: (numbers.available_rcb / numbers.earn_rcb) * 100 + '%',
        })
      } else {
        that.setData({
          w2: '100%',
          w1: (numbers.earn_rcb / (0 - numbers.use_rcb)) * 100 + '%',
          w3: '0%'
        })
      }
      that.setData({
        drawNum: numbers,
      })
    },"POST");
  },
  onReady: function () {

  },
  openRole: function () {
    let that = this;
    if (that.data.bill_identity == "user") {
      return;
    } else {
      that.setData({
        select_model: !that.data.select_model,
      })
    }
  },
  // 选择门店个人
  changeStore: function (e) {
    let that = this,
      dataset = e.currentTarget.dataset,
      roleList = that.data.roleList;
    that.setData({
      select_model: !that.data.select_model,
      currentInfo: roleList[dataset.id],
      isChangeRole: true
    })
    that.loadRcblogList();
  },
  // 切换年月
  selectYear: function () {
    let that = this;
    that.setData({
      year_click: false,
      monthsHidden: true,
      time_type: 'year',
    })
    that.loadRcblogList();
  },
  selectMonth: function () {
    let that = this;
    that.setData({
      year_click: true,
      monthsHidden: false,
      time_type: 'month',
    })
    that.loadRcblogList();
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
      dateVal: val,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
    })
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
    that.loadRcblogList();
  },
  // 跳转到订单详情页面
  seeRcbDetails: function () {
    wx: wx.navigateTo({
      url: 'orderDetails/orderDetails',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})