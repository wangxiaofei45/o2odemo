let imgUrl = require('../../../config').imgUrl;
Page({
  data: {
    input:'',
    imgUrl: imgUrl,
  },
  onLoad: function (options) {
  
  },
  changeKeywords:function(e){
    var that = this;
    that.setData({
      input: e.detail.value,
    })
  },
  Seach:function(){
    console.log(this.data.input);
  },
})