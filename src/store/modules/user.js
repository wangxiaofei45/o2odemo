import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getRoleId,setRoleId,removeRoleId,getShopId,setShopId,removeShopId, getToken, setToken, removeToken } from '@/utils/auth'

const user = {
	state: {
		user: '',
		status: '',
		code: '',
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
			commit('SET_TOKEN', "123123");
				setToken("123123");
				commit('SET_SHOP_ID', '11');
				setShopId("11");
				commit('SET_ROLE_ID', '23');
				setRoleId("23");
				sessionStorage.setItem("token", "123123");
				sessionStorage.setItem("role_id", "23");
				sessionStorage.setItem("shop_id", "11");
			const phone = userInfo.phone.trim()
//			return new Promise((resolve, reject) => {
//				loginByUsername(phone, userInfo.password).then(response => {
//					let datas = response.data;
//					if(datas.status_code == 0) {
//						commit('SET_TOKEN', datas.tokenInfo.token);
//						setToken(datas.tokenInfo.token);
//						commit('SET_SHOP_ID', '11');
//						setShopId("11");
//						commit('SET_ROLE_ID', '23');
//						setRoleId("23");
//						sessionStorage.setItem("token", datas.tokenInfo.token);
//						sessionStorage.setItem("role_id", "23");
//						sessionStorage.setItem("shop_id", "11");
//						resolve();
//						this.$message({
//							type: 'success',
//							message: datas.message,
//						});
//					} else {
//						 this.$message.error('错了哦，这是一条错误消息');
//					}
//				}).catch(error => {
//					reject(error);
//				})
//			})
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