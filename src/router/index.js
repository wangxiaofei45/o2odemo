import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
//我自己定义的路由
import myRouter from './modules/my_router'

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
	{
		path: '/reminder',
		component: () =>
			import('@/views/login/reminder'),
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
				icon: 'dashboard',
				noCache: true
			}
		}]
	},
	//自定义的系统设置的路由
	myRouter,
	//基础设置
	{
		path: '/basicSetting',
		component: Layout,
		redirect: '/basicSetting/storeFiles',
		alwaysShow: true,
		meta: {
			title: 'basicSetting',
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
					title: 'companyArchives'
				}
			},
			//店铺档案
			{
				path: 'storeFiles',
				component: () =>
					import('@/views/basicSetting/storeFiles'),
				name: 'storeFiles',
				meta: {
					title: 'storeFiles'
				}
			},
			//个人档案
			{
				path: 'personalFiles',
				component: () =>
					import('@/views/basicSetting/personalFiles'),
				name: 'personalFiles',
				meta: {
					title: 'personalFiles'
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
			title: 'contactManagement',
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
					title: 'CustomerList'
				}
			},
			//往来单位
			{
				path: 'TradingUnit',
				component: () =>
					import('@/views/StoreTheData/TradingUnit'),
				name: 'TradingUnit',
				meta: {
					title: 'TradingUnit'
				}
			},
//			//角色列表
//			{
//				path: 'RoleManagement',
//				component: () =>
//					import('@/views/StoreTheData/RoleManagement'),
//				name: 'RoleManagement',
//				meta: {
//					title: 'RoleManagement'
//				}
//			},
//			//职员档案
//			{
//				path: 'StaffFiles',
//				component: () =>
//					import('@/views/StoreTheData/StaffFiles'),
//				name: 'StaffFiles',
//				meta: {
//					title: 'StaffFiles'
//				}
//			},
//			//收银方式
//			{
//				path: 'CollectMethod',
//				component: () =>
//					import('@/views/StoreTheData/CollectMethod'),
//				name: 'CollectMethod',
//				meta: {
//					title: 'CollectMethod'
//				}
//			},
			
		]
	},
	//商品管理
	{
		path: '/ProductManagement',
		component: Layout,
		redirect: '/ProductManagement/ProductTypes',
		alwaysShow: true,
		meta: {
			title: 'ProductManagement',
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
					title: 'ProductRegistration'
				},
			},
			//商品类型
//			{
//				path: 'ProductTypes',
//				component: () =>
//					import('@/views/ProductManagement/ProductTypes'),
//				name: 'ProductTypes',
//				meta: {
//					title: 'ProductTypes'
//				}
//			},
			//品牌列表
//			{
//				path: 'BrandList',
//				component: () =>
//					import('@/views/ProductManagement/BrandList'),
//				name: 'BrandList',
//				meta: {
//					title: 'BrandList'
//				}
//			},
			//商品规格
//			{
//				path: 'SpecificationOfGoods',
//				component: () =>
//					import('@/views/ProductManagement/SpecificationOfGoods'),
//				name: 'SpecificationOfGoods',
//				meta: {
//					title: 'SpecificationOfGoods'
//				}
//			},
			//条码管理
//			{
//				path: 'BarCodeManagement',
//				component: () =>
//					import('@/views/ProductManagement/BarCodeManagement'),
//				name: 'BarCodeManagement',
//				meta: {
//					title: 'BarCodeManagement'
//				}
//			},
		]
	},
	//采购管理
	{
		path: '/purchase',
		component: Layout,
		redirect: '/purchase/PurchasingManagement',
		alwaysShow: true,
		meta: {
			title: 'purchase',
			icon: 'purchase'
		},
		children: [{
				path: 'PurchasingManagement',
				component: () =>
					import('@/views/purchase/PurchasingManagement'),
				name: 'PurchasingManagement',
				meta: {
					title: 'PurchasingManagement'
				}
			},
			//商品成本
			{
				path: 'costOfGoods',
				component: () =>
					import('@/views/purchase/costOfGoods'),
				name: 'costOfGoods',
				meta: {
					title: 'costOfGoods'
				}
			},
			//采购入库
//			{
//				path: 'PurchasingSystem',
//				component: () =>
//					import('@/views/purchase/PurchasingSystem'),
//				name: 'PurchasingSystem',
//				meta: {
//					title: 'PurchasingSystem'
//				}
//			},
			//
			{
				path: 'PurchaseReturn',
				component: () =>
					import('@/views/purchase/PurchaseReturn'),
				name: 'PurchaseReturn',
				meta: {
					title: 'PurchaseReturn'
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
			title: 'storage',
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
					title: 'PurchaseWarehouseEntryForm'
				}
			},
			//调拨入库
			{
				path: 'AllocatingStorage',
				component: () =>
					import('@/views/storage/AllocatingStorage'),
				name: 'AllocatingStorage',
				meta: {
					title: 'AllocatingStorage'
				}
			},
			//调拨出库
			{
				path: 'AllocatingOutbound',
				component: () =>
					import('@/views/storage/AllocatingOutbound'),
				name: 'AllocatingOutbound',
				meta: {
					title: 'AllocatingOutbound'
				}
			},
			//在途商品
			{
				path: 'GoodsInTransit',
				component: () =>
					import('@/views/storage/GoodsInTransit'),
				name: 'GoodsInTransit',
				meta: {
					title: 'GoodsInTransit'
				}
			},
			//库存盘点
			{
				path: 'StockTaking',
				component: () =>
					import('@/views/storage/StockTaking'),
				name: 'StockTaking',
				meta: {
					title: 'StockTaking'
				}
			},
			//报溢单
			{
				path: 'TheOverflowOfSingle',
				component: () =>
					import('@/views/storage/TheOverflowOfSingle'),
				name: 'TheOverflowOfSingle',
				meta: {
					title: 'TheOverflowOfSingle'
				}
			},
			//报损单
			{
				path: 'ReportedLossOfSingle',
				component: () =>
					import('@/views/storage/ReportedLossOfSingle'),
				name: 'ReportedLossOfSingle',
				meta: {
					title: 'ReportedLossOfSingle'
				}
			},
			//库存列表
			{
				path: 'InventoryList',
				component: () =>
					import('@/views/storage/InventoryList'),
				name: 'InventoryList',
				meta: {
					title: 'InventoryList'
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
			title: 'sell',
			icon: 'sell'
		},
		children: [{
				path: 'retail',
				component: () =>
					import('@/views/sell/retail'),
				name: 'retail',
				meta: {
					title: 'retail'
				}
			},
			{
				path: 'sales',
				component: () =>
					import('@/views/sell/sales'),
				name: 'sales',
				meta: {
					title: 'sales'
				}
			},
			{
				path: 'CashierInventory',
				component: () =>
					import('@/views/sell/CashierInventory'),
				name: 'CashierInventory',
				meta: {
					title: 'CashierInventory'
				}
			},
			//收银交班表
			{
				path: 'cashierWatch',
				component: () =>
					import('@/views/sell/cashierWatch'),
				name: 'cashierWatch',
				meta: {
					title: 'cashierWatch'
				}
			},
			//收银接班表
			{
				path: 'successionTable',
				component: () =>
					import('@/views/sell/successionTable'),
				name: 'successionTable',
				meta: {
					title: 'successionTable'
				}
			},
		]
	},
	//财务管理
	{
		path: '/financial',
		component: Layout,
		redirect: '/financial/CostOfGoods',
		alwaysShow: true,
		meta: {
			title: 'financial',
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
					title: 'Otherbillsofpayment'
				}
			},
			// 其他收入单
			{
				path: 'otherReceipts',
				component: () =>
					import('@/views/financial/otherReceipts'),
				name: 'otherReceipts',
				meta: {
					title: 'otherReceipts'
				}
			},
			// 定金
			{
				path: 'deposit',
				component: () =>
					import('@/views/financial/deposit'),
				name: 'deposit',
				meta: {
					title: 'deposit'
				}
			},
			{
				path: 'AccountPayable',
				component: () =>
					import('@/views/financial/AccountPayable'),
				name: 'AccountPayable',
				meta: {
					title: 'AccountPayable'
				}
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
			title: 'memberManagement',
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
					title: 'storeList'
				},
			},
		]
	}	

	//报表管理暂时不做
	// {
	// 	path: '/statement',
	// 	component: Layout,
	// 	redirect: '/statement/DailyReport',
	// 	alwaysShow: true,
	// 	meta: {
	// 		title: 'statement',
	// 		icon: 'statement'
	// 	},
	// 	children: [
	// 		//日结报表
	// 		{
	// 			path: 'DailyReport',
	// 			component: () =>
	// 				import('@/views/statement/DailyReport'),
	// 			name: 'DailyReport',
	// 			meta: {
	// 				title: 'DailyReport'
	// 			}
	// 		},
	// 		//在途单据
	// 		{
	// 			path: 'InTransitDocuments',
	// 			component: () =>
	// 				import('@/views/statement/InTransitDocuments'),
	// 			name: 'InTransitDocuments',
	// 			meta: {
	// 				title: 'InTransitDocuments'
	// 			}
	// 		},
	// 		//零售报表
	// 		{
	// 			path: 'RetailReport',
	// 			component: () =>
	// 				import('@/views/statement/RetailReport'),
	// 			name: 'RetailReport',
	// 			meta: {
	// 				title: 'RetailReport'
	// 			}
	// 		},
	// 		//库存统计
	// 		{
	// 			path: 'InventoryStatistics',
	// 			component: () =>
	// 				import('@/views/statement/InventoryStatistics'),
	// 			name: 'InventoryStatistics',
	// 			meta: {
	// 				title: 'InventoryStatistics'
	// 			}
	// 		},
	// 		//仓库进出存
	// 		{
	// 			path: 'WarehouseInAndOut',
	// 			component: () =>
	// 				import('@/views/statement/WarehouseInAndOut'),
	// 			name: 'WarehouseInAndOut',
	// 			meta: {
	// 				title: 'WarehouseInAndOut'
	// 			}
	// 		},
	// 		//店铺进出存
	// 		{
	// 			path: 'StoreInAndOut',
	// 			component: () =>
	// 				import('@/views/statement/StoreInAndOut'),
	// 			name: 'StoreInAndOut',
	// 			meta: {
	// 				title: 'StoreInAndOut'
	// 			}
	// 		},
	// 	]
	// },
]

export default new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})
//表示需要动态判断权限并通过动态添加的页面
export const asyncRouterMap = [{
		path: '/permission',
		component: Layout,
		redirect: '/permission/index',
		alwaysShow: true, // will always show the root menu
		meta: {
			title: 'permission',
			icon: 'lock',
			roles: ['admin', 'editor'] // you can set roles in root nav
		},
		children: [{
				path: 'page',
				component: () =>
					import('@/views/permission/page'),
				name: 'PagePermission',
				meta: {
					title: 'pagePermission',
					roles: ['admin'] // or you can only set roles in sub nav
				}
			},
			//指令权限
			{
				
				path: 'directive',
				component: () =>
					import('@/views/permission/directive'),
				name: 'DirectivePermission',
				meta: {
					title: 'directivePermission'
					// if do not set roles, means: this page does not require permission
				}
			}
		]
	},
	componentsRouter,//权限测试页
	chartsRouter,//
	tableRouter,	
	//错误日志
	{
		path: '/excel',
		component: Layout,
		redirect: '/excel/export-excel',
		name: 'Excel',
		meta: {
			title: 'excel',
			icon: 'excel'
		},
		children: [{
				path: 'export-excel',
				component: () =>
					import('@/views/excel/exportExcel'),
				name: 'ExportExcel',
				meta: {
					title: 'exportExcel'
				}
			},
			{
				path: 'export-selected-excel',
				component: () =>
					import('@/views/excel/selectExcel'),
				name: 'SelectExcel',
				meta: {
					title: 'selectExcel'
				}
			},
			{
				path: 'upload-excel',
				component: () =>
					import('@/views/excel/uploadExcel'),
				name: 'UploadExcel',
				meta: {
					title: 'uploadExcel'
				}
			}
		]
	},
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]