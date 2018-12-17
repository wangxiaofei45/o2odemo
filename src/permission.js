import router from './router'
import store from './store'
import { Message } from 'element-ui'

import NProgress from 'nprogress' // 侧边栏
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import Util from './utils/util.js'

NProgress.configure({
	showSpinner: false
}) // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
	if(roles.indexOf('admin') >= 0) return true // admin permission passed directly
	if(!permissionRoles) return true
	return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

function addRoutes() {
	let roles = ["admin"];
	store.dispatch('GenerateRoutes', {
		roles
	}).then(() => { // 根据roles权限生成可访问的路由表
		router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
		//		next({ ...to,
		//			replace: true
		//		})
		// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
	})
};
addRoutes();

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
	if(getToken()) {
		//获取到token

		if(!store.state.permission.permissionList) {
			/* 如果没有permissionList，真正的工作开始了 */
			console.log(store.state.permission.permissionList.length);
			//
//			store.dispatch('permission/FETCH_PERMISSION').then(() => {
//				next({
//					path: to.path
//				})
//			})
		} else {
			if(to.path === '/login') {
				next({
					path: '/'
				})
				NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
			} else {
				next();
			}
		}

	} else {
		//没有token判断跳转到注册页面
		if(to.path === '/perfectInfo') {
			next();
		} else if(to.path === '/reminder') {
			next();
		} else if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
			NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
		}
	}
	//修改
	Util.title(to.meta.title);
})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})