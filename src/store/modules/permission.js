import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

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
	permissionList:[],//
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  //动态的添加路由表
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    //动态添加路由
     async FETCH_PERMISSION({ commit, state }) {
       /*  获取后台给的权限数组 */
        let permissionList = await fetchPermission()

        /*  根据后台权限跟我们定义好的权限对比，筛选出对应的路由并加入到path=''的children */
        let routes = recursionRouter(permissionList, dynamicRouter)
        let MainContainer = DynamicRoutes.find(v => v.path === '')
        let children = MainContainer.children
        children.push(...routes)

        /* 生成左侧导航菜单 */
        commit('SET_MENU', children)

        setDefaultRoute([MainContainer])

        /*  初始路由 */
        let initialRoutes = router.options.routes

        /*  动态添加路由 */
        router.addRoutes(DynamicRoutes)

        /* 完整的路由表 */
        commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
  }
}

export default permission
