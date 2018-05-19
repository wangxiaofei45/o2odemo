const app = getApp();
let judge = app.judge,
  imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
// 初始化时间
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 2015; i <= date.getFullYear(); i++) {
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
    model_hidden:false,
    timetype:"",
    // 时间选择
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    // 时间选择
    startyear: '',
    startmonth: '',
    startday: '',
    endyear: '',
    endmonth: '',
    endday:'',
    imgUrl: imgUrl,
    collect: {
      vip_total: 1,
      dues_total: 300
    },
    binding_list:[
      {
        role_type: 'store',
        pull_num: 26,
        role_logo:'',
        role_name:"智琳之家(九堡店)",
        add_time:"2017-05-02 13:12:20",
      },
       {
         role_type: 'user',
         pull_num: 0,
         role_logo: '',
         role_name: "张先生",
         add_time: "2017-12-11 11:11:11",
      }
    ]
  },
  onLoad: function (options) {
    var that = this,
      inviteCode = '';
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("codeowner/my_binding_log", data, function (res) {
      var data = res.datas;
      //console.log('返回码主记录:', res);
      if (data.error_code) {
        that.showErrMsg(data.errMsg);
      } else {
        that.setData({
          collect: data.collect,
          binding_list: data.binding_list,
        })
      }
    });
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  select_t:function(e){
    var that = this;
    that.setData({
      model_hidden:true,
      timetype: e.currentTarget.dataset.time
    })
  },
  bindChange: function (e) {
    const that = this;
    const val = e.detail.value;
    that.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
    if (this.data.timetype == "start"){
        that.setData({
          startyear: that.data.year,
          startmonth: that.data.month,
          startday: that.data.day,
        })
    } else if (this.data.timetype == "end"){
      that.setData({
        endyear: that.data.year,
        endmonth: that.data.month,
        endday: that.data.day,
      })
    }
        
  },

  close:function(){
    var  that = this;
    that.setData({
      model_hidden:false,
    })
  }

})