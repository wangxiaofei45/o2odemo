import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '../router'
import Util from './util.js'

// 基础的公用的接口
Vue.prototype.$staticGetAddress = Util.apiUrl + 'static/getAddress' // 三级联动菜单
// 获取当前时间
Vue.prototype.$getData = getData
export function getData() {
  const date = new Date()
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' '
  const H = date.getHours() + ':'
  const m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + H + m + s
}
// 格式化时间戳
Vue.prototype.$formatTimestamp = formatTimestamp
export function formatTimestamp(sj) {
  var now = new Date(sj * 1000)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
}
Vue.prototype.$formatTimes = formatTimes
export function formatTimes(sj) {
  var now = new Date(sj * 1000)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return year + '-' + month + '-' + date
}
// 深copy
Vue.prototype.$coppyArray = coppyArray
export function coppyArray(arr) {
  return arr.map((e) => {
    if (typeof e === 'object') {
      return Object.assign({}, e)
    } else {
      return e
    }
  })
}
Vue.prototype.$objDeepCopy = objDeepCopy
export function objDeepCopy(source) {
  var sourceCopy = {}
  for (var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  return sourceCopy
}
// 封装全局的post
Vue.prototype.$post = post
export function post(url, data = {}) {
  const postData = data
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      //			url: Util.apiUrl + url,
      url: url,
      data: postData
    }).then(response => {
      resolve(response.data)
    }), err => {
      reject(err)
    }
  })
}
Vue.prototype.$get = get
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then(function(response) {
      resolve(response.data)
    }).catch(function(response) {
      console.log(response) // 发生错误时执行的代码
    })
  })
}
// 全局的删除的方法
Vue.prototype.$delete = deletes
export function deletes(url, data = {}) {
  this.$confirm('确定删除?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // render
    this.$post(url, data).then((res) => {
      const data = res
      if (data.status_code == 0) {
        this.$message({
          type: 'success',
          message: data.message
        })
        this.ajaxjson()
      } else {
        this.$message({
          type: 'error',
          message: data.message
        })
      }
    })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}
// create an axios instance
const service = axios.create({
  baseURL: 'http://api_dev.yilianerptest.com/api/', // api 的 base_url
  timeout: 5000 // request timeout
})
// 添加请求拦截头
service.interceptors.request.use(
  config => {
    var token = getToken()
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = 'Bearer ' + token
    } else {

    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
//
// 添加响应拦截头
service.interceptors.response.use(
  function(response) {
    // 此处有待商榷
    if (response.status == 200) {
      //		router.replace({
      //			path: "/login",
      //		});
    } else if (response.status == 0) {

    }
    return response
  },
  function(error) {
    return Promise.reject(error)
  }
)
// axios的测试的相应的添加header
axios.interceptors.request.use(
  config => {
    var token = getToken()
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers.Authorization = 'Bearer ' + token
    } else if (config.url === 'http://api_dev.yilianerptest.com/api/common/resetPassword') {
      console.log('不添加token')
    } else if (config.url === 'http://api_dev.yilianerptest.com/api/common/send') {
      console.log('不添加token')
    } else {
      // 判断token不存在跳转到登录页面
      router.replace({
        path: '/login'
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
// 添加响应拦截器
axios.interceptors.response.use((response) => {
  return response
}, function(error) {
  if (error.response.status == 401) {
    const a = confirm('您的登录已过期,请重新登录!')
    if (a) {
      store.dispatch('LogOut').then(() => {
        location.reload()
      })
    } else {
      //			console.log("取消!")
    }
  }
  return Promise.reject(error)
})
// 刷新token 两个小时刷新
// setInterval(function() {
//	refresh();
// }, 7200000)

function refresh() {
  var token = sessionStorage.getItem('token')
  axios({
    method: 'put',
    url: Util.apiUrl + '/auth/refresh_token'
  }).then((res) => {
    const data = res.data
    if (data.status_code == 0) {
      sessionStorage.setItem('token', data.tokenInfo.token)
    } else {}
  })
}

export default service
