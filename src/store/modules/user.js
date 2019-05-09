import Vue from 'vue'
import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getRoleId,setRoleId,removeRoleId,getShopId,setShopId,removeShopId,setOrgtype,getOrgType,getToken, setToken, removeToken } from '@/utils/auth'
import router from '../../router'
import { Message } from 'element-ui'
const user = {
	state: {
		user: '',
		status: '',
		code: '',
		root_org_type:getOrgType(),
		token: getToken(),
		shop_id:getShopId(),
		role_id:getRoleId(),
		setting: {
			articlePlatform: []
		},
		avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",//首页右上角显示的头像
		introduction: "我是超级管理员",
		name: "Super Admin",
		roles: ["admin"]
	},
	mutations: {
		SET_CODE: (state, code) => {
			state.code = code
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ORG_TYPE:(state, root_org_type) =>{
			state.root_org_type = root_org_type
		},
		SET_ID:(state, id)=>{
			state.id = id
		},
		//存储shop_id
		SET_SHOP_ID:(state, shop_id) => {
			state.shop_id = shop_id
		},
		//存储role_id
		SET_ROLE_ID:(state, role_id) => {
			state.role_id = role_id
		},
		SET_INTRODUCTION: (state, introduction) => {
			state.introduction = introduction
		},
		SET_SETTING: (state, setting) => {
			state.setting = setting
		},
		SET_STATUS: (state, status) => {
			state.status = status
		},
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		}
	},

	actions: {
		// 用户名登录
		LoginByUsername({
			commit
		}, userInfo) {
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				loginByUsername(username, userInfo.password).then(response => {	
					let datas = response.data;
					if(datas.status_code == 0) {
						commit('SET_TOKEN', datas.data.tokenArr.token);
						setToken(datas.data.tokenArr.token);
						sessionStorage.setItem('token',datas.data.tokenArr.token);
						commit('SET_ORG_TYPE', datas.data.userInfo.root_org_type);
						setOrgtype(datas.data.userInfo.root_org_type);
						sessionStorage.setItem("root_org_type", datas.data.userInfo.root_org_type);
						commit('SET_ID', datas.data.userInfo.id);
						setRoleId(datas.data.userInfo.id);
						sessionStorage.setItem("id", datas.data.userInfo.id);
						commit('SET_SHOP_ID', datas.data.userInfo.oid);
						setShopId(datas.data.userInfo.id);
						sessionStorage.setItem("shop_id", datas.data.userInfo.oid);//店铺的id
						sessionStorage.setItem("name", datas.data.userInfo.name);
						sessionStorage.setItem("updated_at", datas.data.userInfo.updated_at);
						sessionStorage.setItem("org_name", datas.data.userInfo.org_name);
						let str = JSON.stringify(datas.data.userNodeList);
						sessionStorage.setItem("userNodeList", str);	
						resolve(datas.data);
						Message({
							type: 'success',
							message: datas.message,
						});
					} else {
						Message.error(datas.message);
					}
				}).catch(error => {
					reject(error);
				})
			})
		},
		// 登出
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					removeToken()
					sessionStorage.clear()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()//删除token
				sessionStorage.clear()//清除sessionStorage
				resolve()
			})
		},
		// 动态修改权限
		ChangeRoles({
			commit
		}, role) {
			return new Promise(resolve => {
				commit('SET_TOKEN', role)
				setToken(role)
				getUserInfo(role).then(response => {
					const data = response.data
					commit('SET_ROLES', data.roles)
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					commit('SET_INTRODUCTION', data.introduction)
					resolve()
				})
			})
		}
	}
}

export default user