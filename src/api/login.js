import request from '@/utils/request'

//登录时候的调用
export function loginByUsername(phone, password) {
  const data = {
    phone,
    password,
    type:'2'
  }
  return request({
//		url: '/user/platformLogin',平台
		url: '/user/login',
    method: 'post',
    data
  })
  // 平台和店铺的登录都走这个接口
}

//获取用户路由表
export function userView() {
  return request({
    url: '/user/view',
    method: 'post',
  })
}
//登出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
