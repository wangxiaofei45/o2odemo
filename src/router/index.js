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

//不需要动态访问的路由
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
	//登录
	{
		path: '/login',
		component: () =>
			import('@/views/login/index'),
		hidden: true
	},
	//完善资料
	{
		path: '/perfectInfo',
		component: () =>
			import('@/views/login/perfectInfo'),
		hidden: true
	},
	//提示信息
	{
		path: '/reminder',
		component: () =>
			import('@/views/login/reminder'),
		hidden: true
	},
	//收银接班
	{
			path: '/successionTable',
			component: () =>
				import('@/views/sell/successionTable'),
//			name: 'successionTable',
//			meta: {
//				title: 'successionTable',
//				name:'收银接班表'
//			}
			hidden: true
		},
	{
		path: '/auth-redirect',
		component: () =>
			import('@/views/login/authredirect'),
		hidden: true
	},
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
	//首页
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
				name:'首页',
				icon: 'dashboard',
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

//表示需要动态判断权限并通过动态添加的页面
export const asyncRouterMap = [
	{
		path: '/organization',
		component: Layout,
		redirect: '/organization/Permissionslist',
		meta: {
			title: "设置", //中英文切换时默认是改变的title
			icon: 'setting',
		},
		children: [
			//权限设置
			{
				path: '/Permissionslist',
				component: () =>
					import('@/views/organization/Permissionslist.vue'),
				name: 'Permissionslist',
				meta: {
					title: "Permissionslist",
					name:"权限设置",
					permission:[],
				},
			},
			//组织架构列表
			{
				path: '/Organizationlist',
				component: () =>
					import('@/views/organization/Organizationlist'),
				name: 'Organizationlist',
				meta: {
					title: "Organizationlist",
					name:"组织架构列表",
				},
			},
		]
	},
	
	{
		
		path: '/basicSetting',
		component: Layout,
		redirect: '/basicSetting/storeFiles',
		alwaysShow: true,
		meta: {
			title: '基础设置',
			icon: 'basicSetting'
		},
		children: [
			//公司档案
			{
				path: 'companyArchives',
				component: () =>
					import('@/views/basicSetting/companyArchives'),
				name: 'companyArchives',
				meta: {
					title: 'companyArchives',
					name:'公司档案',
				}
			},
			//店铺档案
			{
				path: 'storeFiles',
				component: () =>
					import('@/views/basicSetting/storeFiles'),
				name: 'storeFiles',
				meta: {
					title: 'storeFiles',
					name:'店铺档案',
				}
			},
			//个人档案
			{
				path: 'personalFiles',
				component: () =>
					import('@/views/basicSetting/personalFiles'),
				name: 'personalFiles',
				meta: {
					title: 'personalFiles',
					name:'个人档案',
				}
			},
		]
	},
	//联系人管理
	{
		path: '/StoreTheData',
		component: Layout,
		redirect: '/StoreTheData/CustomerList',
		alwaysShow: true,
		meta: {
			title: '联系人管理',
			//联系人管理
			icon: 'StoreTheData'
		},
		children: [
			//会员管理
			{
				path: 'CustomerList',
				component: () =>
					import('@/views/StoreTheData/CustomerList'),
				name: 'CustomerList',
				meta: {
					title: 'CustomerList',
					name:'会员管理',
				}
			},
			//往来单位
			{
				path: 'TradingUnit',
				component: () =>
					import('@/views/StoreTheData/TradingUnit'),
				name: 'TradingUnit',
				meta: {
					title: 'TradingUnit',
					name:'往来单位',
				}
			},
		]
	},
	//商品管理
	{
		path: '/ProductManagement',
		component: Layout,
		redirect: '/ProductManagement/ProductTypes',
		alwaysShow: true,
		meta: {
			title: '商品管理',
			icon: 'ProductManagement'
		},
		children: [
			//商品注册
			{
				path: 'ProductRegistration',
				component: () =>
					import('@/views/ProductManagement/ProductRegistration'),
				name: 'ProductRegistration',
				meta: {
					title: 'ProductRegistration',
					name:'商品注册',
				},
			},
		]
	},
	//采购管理
	{
		path: '/purchase',
		component: Layout,
		redirect: '/purchase/PurchasingManagement',
		alwaysShow: true,
		meta: {
			title: '采购管理',
			icon: 'purchase'
		},
		children: [{
				path: 'PurchasingManagement',
				component: () =>
					import('@/views/purchase/PurchasingManagement'),
				name: 'PurchasingManagement',
				meta: {
					title: 'PurchasingManagement',
					name:'采购单',
				}
			},
			//商品成本
			{
				path: 'costOfGoods',
				component: () =>
					import('@/views/purchase/costOfGoods'),
				name: 'costOfGoods',
				meta: {
					title: 'costOfGoods',
					name:'商品成本'
				}
			},
			{
				path: 'PurchaseReturn',
				component: () =>
					import('@/views/purchase/PurchaseReturn'),
				name: 'PurchaseReturn',
				meta: {
					title: 'PurchaseReturn',
					name:'采购退货',
				}
			},
		]
	},
	//仓库管理
	{
		path: '/storage',
		component: Layout,
		redirect: '/storage/InventoryList',
		alwaysShow: true,
		meta: {
			title: '仓库管理',
			icon: 'storage'
		},
		children: [
			//采购入库单
			{
				path: 'PurchaseWarehouseEntryForm',
				component: () =>
					import('@/views/storage/PurchaseWarehouseEntryForm'),
				name: 'PurchaseWarehouseEntryForm',
				meta: {
					title: 'PurchaseWarehouseEntryForm',
					name:'采购入库单'
				}
			},
			//调拨入库
			{
				path: 'AllocatingStorage',
				component: () =>
					import('@/views/storage/AllocatingStorage'),
				name: 'AllocatingStorage',
				meta: {
					title: 'AllocatingStorage',
					name:'调拨入库'
				}
			},
			//调拨出库
			{
				path: 'AllocatingOutbound',
				component: () =>
					import('@/views/storage/AllocatingOutbound'),
				name: 'AllocatingOutbound',
				meta: {
					title: 'AllocatingOutbound',
					name:'调拨出库'
				}
			},
			//在途商品
			{
				path: 'GoodsInTransit',
				component: () =>
					import('@/views/storage/GoodsInTransit'),
				name: 'GoodsInTransit',
				meta: {
					title: 'GoodsInTransit',
					name:'在途商品'
				}
			},
			//库存盘点
			{
				path: 'StockTaking',
				component: () =>
					import('@/views/storage/StockTaking'),
				name: 'StockTaking',
				meta: {
					title: 'StockTaking',
					name:'库存盘点'
				}
			},
			//报溢单
			{
				path: 'TheOverflowOfSingle',
				component: () =>
					import('@/views/storage/TheOverflowOfSingle'),
				name: 'TheOverflowOfSingle',
				meta: {
					title: 'TheOverflowOfSingle',
					name:'报溢单',
				}
			},
			//报损单
			{
				path: 'ReportedLossOfSingle',
				component: () =>
					import('@/views/storage/ReportedLossOfSingle'),
				name: 'ReportedLossOfSingle',
				meta: {
					title: 'ReportedLossOfSingle',
					name:'报损单'
				}
			},
			//库存列表
			{
				path: 'InventoryList',
				component: () =>
					import('@/views/storage/InventoryList'),
				name: 'InventoryList',
				meta: {
					title: 'InventoryList',
					name:'库存列表'
				}
			},
		]
	},

	//销售管理
	{
		path: '/sell',
		component: Layout,
		redirect: '/sell/retail',
		alwaysShow: true,
		meta: {
			title: '销售管理',
			icon: 'sell'
		},
		children: [{
				path: 'retail',
				component: () =>
					import('@/views/sell/retail'),
				name: 'retail',
				meta: {
					title: 'retail',
					name:'零售开票'
				}
			},
			{
				path: 'sales',
				component: () =>
					import('@/views/sell/sales'),
				name: 'sales',
				meta: {
					title: 'sales',
					name:'销货订单'
				}
			},
			{
				path: 'CashierInventory',
				component: () =>
					import('@/views/sell/CashierInventory'),
				name: 'CashierInventory',
				meta: {
					title: 'CashierInventory',
					name:'收银盘点'
				}
			},
			//收银交班表
			{
				path: 'cashierWatch',
				component: () =>
					import('@/views/sell/cashierWatch'),
				name: 'cashierWatch',
				meta: {
					title: 'cashierWatch',
					name:'收银交班表'
				}
			},
			//收银接班表
//			{
//				path: 'successionTable',
//				component: () =>
//					import('@/views/sell/successionTable'),
//				name: 'successionTable',
//				meta: {
//					title: 'successionTable',
//					name:'收银接班表'
//				}
//			},
		]
	},
	//财务管理
	{
		path: '/financial',
		component: Layout,
		redirect: '/financial/CostOfGoods',
		alwaysShow: true,
		meta: {
			title: '财务管理',
			icon: 'financial'
		},
		children: [
			//其他支出单
			{
				path: 'Otherbillsofpayment',
				component: () =>
					import('@/views/financial/Otherbillsofpayment'),
				name: 'Otherbillsofpayment',
				meta: {
					title: 'Otherbillsofpayment',
					name:'其他支出单'
				}
			},
			// 其他收入单
			{
				path: 'otherReceipts',
				component: () =>
					import('@/views/financial/otherReceipts'),
				name: 'otherReceipts',
				meta: {
					title: 'otherReceipts',
					name:'其他收入单',
				}
			},
			// 定金
			{
				path: 'deposit',
				component: () =>
					import('@/views/financial/deposit'),
				name: 'deposit',
				meta: {
					title: 'deposit',
					name:'定金',
				}
			},
			{
				path: 'AccountPayable',
				component: () =>
					import('@/views/financial/AccountPayable'),
				name: 'AccountPayable',
				meta: {
					title: 'AccountPayable',
					name:'应付款',
				}
			},

		]
	},
	// 平台端的设置
	{
		path: '/theCompanySetUp',
		component: Layout,
		redirect: '/theCompanySetUp/permissionSetting',
		alwaysShow: true,
		meta: {
			title: '设置',
			icon: 'setting'
		},
		children: [
			//权限设置
			{
				path: 'permissionSetting',
				component: () =>
					import('@/views/theCompanySetUp/permissionSetting'),
				name: 'permissionSetting',
				meta: {
					title: 'permissionSetting',
					name:'权限设置'
				},
			},
			// 功能列表
			{
				path: 'functionList',
				component: () =>
					import('@/views/theCompanySetUp/functionList'),
				name: 'functionList',
				meta: {
					title: 'functionList',
					name:'功能列表'
				},
			},
			// 组织架构列表
			{
				path: 'organizationalStructureList',
				component: () =>
					import('@/views/theCompanySetUp/organizationalStructureList'),
				name: 'organizationalStructureList',
				meta: {
					title: 'organizationalStructureList',
					name:'组织架构列表'
				},
			},
		]
	},
	//  平台端的成员管理
	{
		path: '/memberManagement',
		component: Layout,
		redirect: '/memberManagement/ProductTypes',
		alwaysShow: true,
		meta: {
			title: '成员管理',
			icon: 'memberManagement'
		},
		children: [
			//商品注册
			{
				path: 'storeList',
				component: () =>
					import('@/views/memberManagement/storeList'),
				name: 'storeList',
				meta: {
					title: 'storeList',
					name:'商品注册'
				},
			},
		]
	},
	//平台端的商品管理
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
					name:'商品分类'
				},
			},
			// 规格管理
			{
				path: 'specificationManagement',
				component: () =>
					import('@/views/terraceGoodsManager/specificationManagement'),
				name: 'specificationManagement',
				meta: {
					title: 'specificationManagement',
					name:'规格管理'
				},
			},
			//商品管理
			{
				path: 'brandManagement',
				component: () =>
					import('@/views/terraceGoodsManager/brandManagement'),
				name: 'brandManagement',
				meta: {
					title: 'brandManagement',
					name:'品牌管理'
				},
			},
		
		]
	},
]