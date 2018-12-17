import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'原来的默认的样式表
import '../static/theme/change_theme.scss' //修改主题色

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import deletes from './utils/delete.js'

import i18n from './lang' // 切换语言
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import './assets/icon/iconfont.css' //自定义图标

import * as filters from './filters' // global filters

import Print from 'vue-print-nb'
Vue.use(Print)
Vue.prototype.apiUrl = "http://api.yilianerptest.com/api"; //全局的定义api
Vue.use(Element, {
	size: Cookies.get('size') || 'medium', // set element-ui default size
	i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	render: h => h(App)
})
//侧边栏的图标的颜色#bfcbd9

//打印插件
//<button v-print="'#printMe'">Print local range</button>