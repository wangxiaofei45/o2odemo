const app = getApp();
let imgUrl = require('../../../config').imgUrl,
  util = require('../../../utils/util.js');
Page({
  data: {
    imgUrl: imgUrl,
    commis_list: [],
    line: [
      {
        id: 1,
        numbers: 29.5,
      },
      {
        id: 2,
        numbers: 70,
      },

      {
        id: 3,
        numbers: 0,
      }, {
        id: 4,
        numbers: 80,
      },
      {
        id: 5,
        numbers: 100,
      },
      {
        id: 6,
        numbers: 190,
      },
      {
        id: 7,
        numbers: 50,
      },

    ]
  },
  onLoad: function (options) {
    var that = this;
    var context = wx.createCanvasContext('canvas')
    context.setStrokeStyle("#d6d6d6")
    context.setLineWidth(1)
    context.rect(35, 20, 315, 160)
    context.stroke();
    // 画矩形
    for (var i = 1; i < 4; i++) {
      context.setStrokeStyle("#d1d1d1")
      context.setLineWidth(1)
      context.moveTo(35, 20 + 40 * i);
      context.lineTo(350, 20 + 40 * i);
      context.stroke();
    }
    for (var i = 1; i < 7; i++) {
      context.moveTo(35 + 45 * i, 20);
      context.lineTo(35 + 45 * i, 180);
      context.stroke()
    }

    context.beginPath();
    context.setStrokeStyle("#ff4965")
    context.setLineWidth(3)
    context.moveTo(57.5, 180 - that.data.line[0].numbers);
    for (var i = 0; i < that.data.line.length; i++) {
      context.lineTo(57.5 + 45 * i, 180 - that.data.line[i].numbers / 5 * 4);
      context.stroke();
    }

    for (var i = 1; i < that.data.lenght; i++) {
      context.moveTo(35 + i * 45, 180 - that.data[i].numbers);
    }
    context.stroke();

    context.beginPath();
    context.setTextAlign("center");//left center right
    context.setTextBaseline("top");
    context.setFillStyle("#666666");
    context.setFontSize(15)
    for (var i = 0; i < 7; i++) {
      let tmpnewchar = getWeek(7 - (i + 1));
      context.fillText(tmpnewchar, 57.5 + 45 * i, 180)
    }
    for (var i = 0; i < 7; i++) {
      let getDate = getDateStr(7-(i+1));
      context.fillText(getDate, 57.5 + 45 * i, 200)
    }
    context.beginPath();
    context.setTextAlign("right");//left center right
    context.setTextBaseline("middle");
    context.setFillStyle("#666666");
    context.setFontSize(15)
    context.translate(33, 20);

    for (var i = 0; i < 5; i++) {
      var text = 200 - i * 50;
      context.fillText(text, 0, 0)
      context.translate(0, 40);
      context.stroke();
    }
    context.draw();

    //加载指定联盟商的抽拥明细列表
    that.loadUnionList();
  },

  //加载指定联盟商的抽拥明细列表
  loadUnionList: function () {
    var that = this;
    var data = {
      token: app.globalData.token,
    };
    util.Ajax("member/union_commis", data, function (res) {
      var data = res.datas;
      console.log('返回联盟商佣金明细:', res);
      that.setData({
        commis_list: data.commis_list,
      })
    });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})
//获取N天前的日期
function getDateStr(day) {
  var dd = new Date();
  dd.setDate(dd.getDate() - day);//获取AddDayCount天前的日期 
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();
  return m + '.' + d;
}
//获取中文大写数字
function getWeek(num) {
  var show_day = new Array('日', '一', '二', '三', '四', '五', '六');
  var date = new Date();
  date.setDate(date.getDate() - num);
  var day = date.getDay();
  return show_day[day];
}