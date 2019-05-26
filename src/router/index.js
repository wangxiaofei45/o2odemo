import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

// 不需要动态访问的路由
export const constantRouterMap = [{
		path: '/redirect',
		component: Layout,
		hidden: true,
		children: [{
			path: '/redirect/:path*',
			component: () =>
				import('@/views/redirect/index')
		}]
	},
	// 登录
	{
		path: '/login',
		component: () =>
			import('@/views/login/index'),
		hidden: true,
		meta: {
			title: 'login',
			name: '登录页'
		}
	},
	// 完善资料
	{
		path: '/perfectInfo',
		component: () =>
			import('@/views/login/perfectInfo'),
		hidden: true
	},
	// 提示信息
	{
		path: '/reminder',
		component: () =>
			import('@/views/login/reminder'),
		hidden: true
	},
	{
		path: '/forgetpass',
		component: () =>
			import('@/views/login/forgetpass'),
		hidden: true
	},
	// 错误进入的页面
	{
		path: '/404',
		component: () =>
			import('@/views/errorPage/404'),
		hidden: true
	},
	{
		path: '/401',
		component: () =>
			import('@/views/errorPage/401'),
		hidden: true
	},
	// 首页
	{
		path: '',
		component: Layout,
		redirect: 'dashboard',
		children: [{
			path: 'dashboard',
			component: () =>
				import('@/views/dashboard/index'),
			name: 'Dashboard',
			meta: {
				title: 'dashboard',
				name: '档案室管理',
				icon: 'dashboard'
			}
		}]
	},
]
export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

// 表示需要动态判断权限并通过动态添加的页面
export const asyncRouterMap = [
	// 用户管理
	{
		path: '/user',
		component: Layout,
		redirect: '/user/index',
		children: [{
			path: '/user/index',
			component: () =>
				import('@/views//user/index.vue'),
			name: 'user',
			meta: {
				title: 'user',
				name: '用户管理',
				icon: 'setting',
				permission: []
			}
		}, ]
	},
	// 档案盒管理
	{
			path: '/archivesManagement',
			component: Layout,
			redirect: '/archivesManagement/fileBoxManagement',
			name: 'archivesManagement',
			meta: {
				title: '档案管理',
				name: '档案管理',
				icon: 'setting',
			},
			children: [{
				path: '/archivesManagement/fileBoxManagement',
				component: () =>
					import('@/views/archivesManagement/fileBoxManagement.vue'),
				name: 'fileBoxManagement',
				meta: {
					title: 'fileBoxManagement',
					name: '档案盒管理',
					permission: []
				}
			},
			{
				path: '/archivesManagement/filingCabinetManagement',
				component: () =>
					import('@/views/archivesManagement/filingCabinetManagement.vue'),
					name:"filingCabinetManagement",
				meta: {
					title: 'filingCabinetManagement',
					name: '档案柜管理',
					permission: []
				}
			}, ]
		},
	{
		path: '/organization',
		component: Layout,
		redirect: '/organization/Permissionslist',
		meta: {
			title: '设置', // 中英文切换时默认是改变的title
			icon: 'setting'
		},
		children: [
			// 权限设置
			{
				path: '/Permissionslist',
				component: () =>
					import('@/views/organization/Permissionslist.vue'),
				name: 'Permissionslist',
				meta: {
					title: 'Permissionslist',
					name: '权限设置',
					permission: []
				}
			},
			// 组织架构列表
			{
				path: '/Organizationlist',
				component: () =>
					import('@/views/organization/Organizationlist'),
				name: 'Organizationlist',
				meta: {
					title: 'Organizationlist',
					name: '组织架构列表'
				}
			}
		]
	},
	// 平台端的商品管理
	{
		path: '/terraceGoodsManager',
		component: Layout,
		redirect: '/terraceGoodsManager/brandManagement',
		alwaysShow: true,
		meta: {
			title: '商品管理',
			icon: 'memberManagement'
		},
		children: [
			// 商品管理 -商品分类
			{
				path: 'goodsClass',
				component: () =>
					import('@/views/terraceGoodsManager/goodsClass'),
				name: 'goodsClass',
				meta: {
					title: 'goodsClass',
					name: '商品分类'
				}
			},
			// 规格管理
			{
				path: 'specificationManagement',
				component: () =>
					import('@/views/terraceGoodsManager/specificationManagement'),
				name: 'specificationManagement',
				meta: {
					title: 'specificationManagement',
					name: '规格管理'
				}
			},
			// 商品管理
			{
				path: 'brandManagement',
				component: () =>
					import('@/views/terraceGoodsManager/brandManagement'),
				name: 'brandManagement',
				meta: {
					title: 'brandManagement',
					name: '品牌管理'
				}
			}

		]
	}
]
