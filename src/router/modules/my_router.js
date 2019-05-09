//系统设置
import Layout from '@/views/layout/Layout'
const myRouter = {
	path: '/Organizationlist',
	component: Layout,
	meta: {
		title: "systemSettings",//中英文切换时默认是改变的title
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
		},
	}, 
//	//组织成员列表
//	{
//		path: '/membershiplist',
//		component: () =>
//			import('@/views/organization/membershiplist'),
//		name: 'membershiplist',
//		meta: {
//			title: "membershiplist",
//		},
//	}, 
	]
}
export default myRouter