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
// 轮播图
{
  path: '/banner',
  component: () =>
			import('@/views/login/banner'),
  hidden: true,
  meta: {
    title: 'banner',
    name: 'banner'
  }
},
// 档案详情
{
  path: '/fileForDetails',
  component: () =>
			import('@/views/archivesManagement/fileForDetails'),
  hidden: true,
  meta: {
    title: 'fileForDetails',
    name: 'fileForDetails'
  }
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
}
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
        icon: 'user',
        permission: []
      }
    }]
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
      icon: 'basicSetting'
    },
    children: [
      {
        path: '/archivesManagement/filingCabinetManagement',
        component: () =>
						import('@/views/archivesManagement/filingCabinetManagement.vue'),
        name: 'filingCabinetManagement',
        meta: {
          title: 'filingCabinetManagement',
          name: '档案柜管理',
          permission: []
        }
      }, {
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
        path: '/archivesManagement/documentQuery',
        component: () =>
					import('@/views/archivesManagement/documentQuery.vue'),
        name: 'documentQuery',
        meta: {
          title: 'documentQuery',
          name: '档案添加与查询',
          permission: []
        }
      },
      {
        path: '/archivesManagement/theFilePreview',
        component: () =>
					import('@/views/archivesManagement/theFilePreview.vue'),
        name: 'theFilePreview',
        meta: {
          title: 'theFilePreview',
          name: '档案预览',
          permission: []
        }
      },
      // 档案归总页
      {
        path: '/archivesManagement/CategoryForArchives',
        component: () =>
					import('@/views/archivesManagement/CategoryForArchives.vue'),
        name: 'CategoryForArchives',
        meta: {
          title: 'CategoryForArchives',
          name: '档案归总',
          permission: []
        }
      },

      {
        path: '/archivesManagement/fileTransfer',
        component: () =>
					import('@/views/archivesManagement/fileTransfer.vue'),
        name: 'fileTransfer',
        meta: {
          title: 'fileTransfer',
          name: '档案转移',
          permission: []
        }
      }
    ]
  },
  {
    path: '/organization',
    component: Layout,
    redirect: '/organization/Permissionslist',
    meta: {
      title: '权限设置', // 中英文切换时默认是改变的title
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
          name: '角色管理',
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
          name: '菜单管理'
        }
      }
    ]
  }
]
