let host = "https://api.fcmusic.cn/wxapp";//小程序调用接口
const config = {
  API_HOST: "https://api.fcmusic.cn/wxapp/index.php",//小程序调用接口
  imgUrl: "https://api.fcmusic.cn/wxapp/image",
  imgUpload: "https://img.fcmusic.cn/index.php",
  loginUrl: `${host}index.php?act=login&op=index`,
  APPID:  'wx1a65780913fa7fca', //微信小程序 DCL原创生态联盟圈 商家
  QQMapKey: '55FBZ-MQRKK-UUQJA-AJCOV-GQ7JF-Q4BUW',//腾讯地图申请的key
}
//初始值为空对象
module.exports = config;