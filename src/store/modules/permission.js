import { asyncRouterMap, constantRouterMap } from '@/router'
import { userView } from '@/api/login'
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * keepAlive 是否缓存当前的页面
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

const nativeList = [{
  id: 199,
  path: '/organization',
  component: Layout,
  redirect: '/organization/Permissionslist',
  meta: {
    title: '设置', // 中英文切换时默认是改变的title
    icon: 'setting'
  }
},
{
  id: 200,
  path: '/Permissionslist',
  component: () =>
			import('@/views/organization/Permissionslist.vue'),
  name: 'Permissionslist',
  meta: {
    title: 'Permissionslist',
    name: '权限设置'
  }
},
  // 组织架构列表
{
  id: 206,
  path: '/Organizationlist',
  component: () =>
			import('@/views/organization/Organizationlist'),
  name: 'Organizationlist',
  meta: {
    title: 'Organizationlist',
    name: '组织架构',
    keepAlive: true
  }
},
  // 基础设置
{
  id: 98,
  alwaysShow: true,
  path: '/basicSetting',
  component: Layout,
  redirect: '/basicSetting/companyArchives',
  meta: {
    title: '基础设置',
    icon: 'basicSetting'
  }
},
  //
{
  id: 251,
  path: 'companyArchives',
  component: () =>
			import('@/views/basicSetting/companyArchives'),
  name: 'companyArchives',
  meta: {
    title: 'companyArchives',
    name: '公司档案'
  }
},

  // 店铺档案
{
  id: 252,
  path: 'storeFiles',
  component: () =>
			import('@/views/basicSetting/storeFiles'),
  name: 'storeFiles',
  meta: {
    title: 'storeFiles',
    name: '店铺档案'
  },
  permission: []
},
  // 个人档案
{
  path: 'personalFiles',
  component: () =>
			import('@/views/basicSetting/personalFiles'),
  name: 'personalFiles',
  meta: {
    title: 'personalFiles',
    name: '个人档案'
  }
},
  // 联系人管理
{
  id: 103,
  path: '/StoreTheData',
  component: Layout,
  redirect: '/StoreTheData/CustomerList',
  alwaysShow: true,
  meta: {
    title: '联系人管理',
    // 联系人管理
    icon: 'StoreTheData'
  }
},
  // 会员管理
{
  id: 104,
  path: 'CustomerList',
  component: () =>
			import('@/views/StoreTheData/CustomerList'),
  name: 'CustomerList',
  meta: {
    title: 'CustomerList',
    name: '会员管理'
  }
},
  // 往来单位
{
  id: 110,
  path: 'TradingUnit',
  component: () =>
			import('@/views/StoreTheData/TradingUnit'),
  name: 'TradingUnit',
  meta: {
    title: 'TradingUnit',
    name: '往来单位'
  }
},
  // 商品管理
{
  id: 257,
  path: '/ProductManagement',
  component: Layout,
  redirect: '/ProductManagement/ProductTypes',
  alwaysShow: true,
  meta: {
    title: '商品管理',
    icon: 'ProductManagement'

  }
},
  // 商品注册
{
  id: 194,
  path: 'ProductRegistration',
  component: () =>
			import('@/views/ProductManagement/ProductRegistration'),
  name: 'ProductRegistration',
  meta: {
    title: 'ProductRegistration',
    name: '商品注册',
    keepAlive: true
  }
},
  // 采购管理
{
  id: 216,
  path: '/purchase',
  component: Layout,
  redirect: '/purchase/PurchasingManagement',
  alwaysShow: true,
  meta: {
    title: '采购管理',
    icon: 'purchase'
  }
},
{
  id: 217,
  path: 'PurchasingManagement',
  component: () =>
			import('@/views/purchase/PurchasingManagement'),
  name: 'PurchasingManagement',
  meta: {
    title: 'PurchasingManagement',
    name: '采购订单',
    keepAlive: true
  }
},
  // 商品成本
{
  id: 224,
  path: 'costOfGoods',
  component: () =>
			import('@/views/purchase/costOfGoods'),
  name: 'costOfGoods',
  meta: {
    title: 'costOfGoods',
    name: '商品成本'
  }
},
{
  id: 225,
  path: 'PurchaseReturn',
  component: () =>
			import('@/views/purchase/PurchaseReturn'),
  name: 'PurchaseReturn',
  meta: {
    title: 'PurchaseReturn',
    name: '采购退货'
  }
},
  // 仓库管理
{
  id: 117,
  path: '/storage',
  component: Layout,
  redirect: '/storage/InventoryList',
  alwaysShow: true,
  meta: {
    title: '仓库管理',
    icon: 'storage'
  }
},
  // 采购入库单
{
  id: 118,
  path: 'PurchaseWarehouseEntryForm',
  component: () =>
			import('@/views/storage/PurchaseWarehouseEntryForm'),
  name: 'PurchaseWarehouseEntryForm',
  meta: {
    title: 'PurchaseWarehouseEntryForm',
    name: '采购入库单'
  }
},
  // 调拨入库
{
  id: 125,
  path: 'AllocatingStorage',
  component: () =>
			import('@/views/storage/AllocatingStorage'),
  name: 'AllocatingStorage',
  meta: {
    title: 'AllocatingStorage',
    name: '仓库调入'
  }
},
  // 调拨出库
{
  id: 128,
  path: 'AllocatingOutbound',
  component: () =>
			import('@/views/storage/AllocatingOutbound'),
  name: 'AllocatingOutbound',
  meta: {
    title: 'AllocatingOutbound',
    name: '仓库调出'
  }
},
  // 在途商品
{
  id: 134,
  path: 'GoodsInTransit',
  component: () =>
			import('@/views/storage/GoodsInTransit'),
  name: 'GoodsInTransit',
  meta: {
    title: 'GoodsInTransit',
    name: '在途商品'
  }
},
  // 库存盘点
{
  id: 135,
  path: 'StockTaking',
  component: () =>
			import('@/views/storage/StockTaking'),
  name: 'StockTaking',
  meta: {
    title: 'StockTaking',
    name: '库存盘点'
  }
},
  // 报溢单
{
  id: 140,
  path: 'TheOverflowOfSingle',
  component: () =>
			import('@/views/storage/TheOverflowOfSingle'),
  name: 'TheOverflowOfSingle',
  meta: {
    title: 'TheOverflowOfSingle',
    name: '报溢单'
  }
},
  // 报损单
{
  id: 145,
  path: 'ReportedLossOfSingle',
  component: () =>
			import('@/views/storage/ReportedLossOfSingle'),
  name: 'ReportedLossOfSingle',
  meta: {
    title: 'ReportedLossOfSingle',
    name: '报损单'
  }
},
  // 库存列表
{
  id: 150,
  path: 'InventoryList',
  component: () =>
			import('@/views/storage/InventoryList'),
  name: 'InventoryList',
  meta: {
    title: 'InventoryList',
    name: '库存列表'
  }
},
  // 销售管理
{
  id: 238,
  path: '/sell',
  component: Layout,
  redirect: '/sell/retail',
  alwaysShow: true,
  meta: {
    title: '销售管理',
    icon: 'sell'
  }
},
{
  id: 239,
  path: 'retail',
  component: () =>
			import('@/views/sell/retail'),
  name: 'retail',
  meta: {
    title: 'retail',
    name: '零售开票'
  }
},
{
  id: 243,
  path: 'sales',
  component: () =>
			import('@/views/sell/sales'),
  name: 'sales',
  meta: {
    title: 'sales',
    name: '销售订单'
  }
},
{
  id: 246,
  path: 'CashierInventory',
  component: () =>
			import('@/views/sell/CashierInventory'),
  name: 'CashierInventory',
  meta: {
    title: 'CashierInventory',
    name: '收银盘点'
  }
},
  // 收银交班表
{
  id: 247,
  path: 'cashierWatch',
  component: () =>
			import('@/views/sell/cashierWatch'),
  name: 'cashierWatch',
  meta: {
    title: 'cashierWatch',
    name: '收银交班表'
  }
},
  // 财务管理
{
  id: 153,
  path: '/financial',
  component: Layout,
  redirect: '/financial/CostOfGoods',
  alwaysShow: true,
  meta: {
    title: '财务管理',
    icon: 'financial'
  }
},
  // 其他支出单
{
  id: 158,
  path: 'Otherbillsofpayment',
  component: () =>
			import('@/views/financial/Otherbillsofpayment'),
  name: 'Otherbillsofpayment',
  meta: {
    title: 'Otherbillsofpayment',
    name: '其他支出单'
  }
},
  // 其他收入单
{
  id: 161,
  path: 'otherReceipts',
  component: () =>
			import('@/views/financial/otherReceipts'),
  name: 'otherReceipts',
  meta: {
    title: 'otherReceipts',
    name: '其他收入单'
  }
},
  // 定金
{
  id: 154,
  path: 'deposit',
  component: () =>
			import('@/views/financial/deposit'),
  name: 'deposit',
  meta: {
    title: 'deposit',
    name: '订金'
  }
},
{
  id: 164,
  path: 'AccountPayable',
  component: () =>
			import('@/views/financial/AccountPayable'),
  name: 'AccountPayable',
  meta: {
    title: 'AccountPayable',
    name: '应付款'
  }
},
  // 平台端的设置
{
  id: 71,
  path: '/theCompanySetUp',
  component: Layout,
  redirect: '/theCompanySetUp/permissionSetting',
  alwaysShow: true,
  meta: {
    title: '设置',
    icon: 'setting'
  }
},
  // 权限设置
{
  id: 72,
  path: 'permissionSetting',
  component: () =>
			import('@/views/theCompanySetUp/permissionSetting'),
  name: 'permissionSetting',
  meta: {
    title: 'permissionSetting',
    name: '权限设置'
  }
},
  // 功能列表
{
  id: 77,
  path: 'functionList',
  component: () =>
			import('@/views/theCompanySetUp/functionList'),
  name: 'functionList',
  meta: {
    title: 'functionList',
    name: '功能列表'
  }
},
  // 组织架构列表
{
  id: 81,
  path: 'organizationalStructureList',
  component: () =>
			import('@/views/theCompanySetUp/organizationalStructureList'),
  name: 'organizationalStructureList',
  meta: {
    title: 'organizationalStructureList',
    name: '组织架构',
    keepAlive: true
  }
},
  // 成员管理
{
  id: 91,
  path: '/memberManagement',
  component: Layout,
  redirect: '/memberManagement/ProductTypes',
  alwaysShow: true,
  meta: {
    title: '成员管理',
    icon: 'StoreTheData'
  }
},
{
  id: 92,
  path: 'storeList',
  component: () =>
			import('@/views/memberManagement/storeList'),
  name: 'storeList',
  meta: {
    title: 'storeList',
    name: '商家列表'
  }
},
  // 平台端的商品管理
{
  id: 172,
  path: '/terraceGoodsManager',
  component: Layout,
  redirect: '/terraceGoodsManager/brandManagement',
  meta: {
    title: '商品管理',
    icon: 'ProductManagement'
  }
},
  // 商品管理 -商品分类
{
  id: 173,
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
  id: 180,
  path: 'specificationManagement',
  component: () =>
			import('@/views/terraceGoodsManager/specificationManagement'),
  name: 'specificationManagement',
  meta: {
    title: 'specificationManagement',
    name: '规格管理'
  }
},
  // 品牌管理
{
  id: 188,
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

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers) // 添加动态的路由表
    }
  },
  actions: {
    // 刷新时候重新渲染路由表
    GenerateRoutes({
      commit
    }, data) {
      const {
        roles
      } = data
      // 暂时是从路由表里面获取路由的列表 登录完成后匹配
      const userNodeList = sessionStorage.getItem('userNodeList')
      const getList = JSON.parse(userNodeList) // 后台获取的
      // 重新组装
      // let newArr = [];
      // for(let i = 0; i < getList.length; i++) {
      // 	let objs = {};
      // 	for(let j = 0; j < nativeList.length; j++) {
      // 		if(getList[i].id == nativeList[j].id) {
      // 			objs = nativeList[j];
      // 			objs.component = Layout;
      // 			let arr_1 = [];
      // 				for(let x = 0; x < getList[i].children.length; x++) {
      // 					for(let y = 0; y < nativeList.length; y++) {
      // 						if(getList[i].children[x].id == nativeList[y].id) {
      // 							if(getList[i].children[x].children) {
      // 								let centerInArr = getList[i].children[x].children;
      // 								let idArr = [];
      // 								for(let z = 0; z < centerInArr.length; z++) {
      // 									idArr.push(centerInArr[z].id);
      // 								}
      // 								nativeList[y].meta.permission = idArr;
      // 							}
      // 							arr_1.push(nativeList[y]);
      // 						}
      // 					}
      // 				}
      // 			objs.children = arr_1;
      // 		}
      // 	};
      // 	newArr.push(objs);
      // };
      // const accessedRouters = newArr;

      const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
      commit('SET_ROUTERS', accessedRouters)
    },
    // 动态添加路由
    async FETCH_PERMISSION({
      commit,
      state
    }) {
      /*  获取后台给的权限数组 */
      const permissionList = await fetchPermission()
      /*  根据后台权限跟我们定义好的权限对比，筛选出对应的路由并加入到path=''的children */
      const routes = recursionRouter(permissionList, dynamicRouter)
      const MainContainer = DynamicRoutes.find(v => v.path === '')
      const children = MainContainer.children
      children.push(...routes)
      /* 生成左侧导航菜单 */
      commit('SET_MENU', children)
      setDefaultRoute([MainContainer])
      /*  初始路由 */
      const initialRoutes = router.options.routes
      /*  动态添加路由 */
      router.addRoutes(DynamicRoutes)
      /* 完整的路由表 */
      commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
  }
}
export default permission
