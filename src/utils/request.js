import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Util from './util.js'

//店铺登录信息完善
Vue.prototype.$userPerfectinfo = Util.apiUrl+"user/perfectinfo";//登录完善信息


Vue.prototype.$qiniu = Util.apiUrl+"/config/qiniu";//获取七牛云
//组织架构列表
Vue.prototype.$organizeList = Util.apiUrl+"/organize/list";//组织架构列表
Vue.prototype.$organizeListAdd = Util.apiUrl+"/organize/add";//组织架构列表添加
Vue.prototype.$organizeListModify = Util.apiUrl+"/organize/modify";//组织架构列表修改
Vue.prototype.$organizeListDelete = Util.apiUrl+"/organize/delete";//组织架构列表删除
Vue.prototype.$organizeAddlist = Util.apiUrl+"/organize/addlist";//选择组织列表
//组织成员列表
Vue.prototype.$UserList = Util.apiUrl+"/user/list";//组织成员列表
Vue.prototype.$UserRegistrclass = Util.apiUrl+"/user/registrclass";//店铺注册分类详情
Vue.prototype.$UserModify = Util.apiUrl+"/user/modify";//组织成员禁用
Vue.prototype.$UserAdd = Util.apiUrl+"/user/add";//组织成员添加
Vue.prototype.$UserDelete = Util.apiUrl+"/user/delete";//组织成员删除
//权限列表 模板列表
Vue.prototype.$NodeToplist = Util.apiUrl+"/node/toplist";//模板列表
Vue.prototype.$NodeTopdelete = Util.apiUrl+"/node/topdelete";//模板列表
Vue.prototype.$NodeTopadd = Util.apiUrl+"/node/topadd";//添加
Vue.prototype.$NodeTopModify = Util.apiUrl+"/node/topmodify";//修改
//权限列表 功能列表
Vue.prototype.$NodeAddlist = Util.apiUrl+"/node/addlist";//功能列表
Vue.prototype.$NodeNextlist = Util.apiUrl+"/node/nextlist";//功能列表
Vue.prototype.$NodeNextAdd = Util.apiUrl+"/node/nextadd";//功能列表
Vue.prototype.$NodeNextmodify = Util.apiUrl+"/node/nextmodify";//修改
//基础设置 店铺档案
Vue.prototype.$ArchivesList = Util.apiUrl+"/archives/list";//店铺列表
Vue.prototype.$ArchivesAdd = Util.apiUrl+"/archives/add";//店铺添加
Vue.prototype.$ArchivesModify = Util.apiUrl+"/archives/modify";//修改店铺
Vue.prototype.$ArchivesShopinfo = Util.apiUrl+"/archives/shopinfo";//店铺信息
Vue.prototype.$ArchivesDelete = Util.apiUrl+"/archives/delete";//店铺删除
//预留店铺档案

//店铺资料 在这里

//商品管理 商品类型
Vue.prototype.$GoodClassList = Util.apiUrl+"/goodsclass/list";//商品分类列表
Vue.prototype.$GoodClassAddList = Util.apiUrl+"/goodsclass/addlist";//商品分类信息
Vue.prototype.$GoodClassAdd = Util.apiUrl+"/goodsclass/add";//商品分类添加
Vue.prototype.$GoodClassModify = Util.apiUrl+"/goodsclass/modify";//商品分类修改
Vue.prototype.$GoodClassInfo = Util.apiUrl+"/goodsclass/info";//商品分类详情
Vue.prototype.$GoodClassDelete = Util.apiUrl+"/goodsclass/delete";//商品分类删除
//商品管理 品牌列表
Vue.prototype.$GoodBrandList = Util.apiUrl+"/goodsbrand/list";//品牌列表
Vue.prototype.$GoodBrandAdd = Util.apiUrl+"/goodsbrand/add";//品牌列表添加
Vue.prototype.$GoodBrandModify = Util.apiUrl+"/goodsbrand/modify";//品牌列表修改
Vue.prototype.$GoodBrandInfo = Util.apiUrl+"/goodsbrand/info";//品牌列表信息
Vue.prototype.$GoodBrandDelete = Util.apiUrl+"/goodsbrand/delete";//品牌列表删除
//商品管理 商品规格 
Vue.prototype.$BrandList = Util.apiUrl+"/brand/list";//商品规格 列表
Vue.prototype.$BrandAdd = Util.apiUrl+"/brand/add";//商品规格添加
Vue.prototype.$BrandInfo = Util.apiUrl+"/brand/info";//商品信息
Vue.prototype.$BrandDelete = Util.apiUrl+"/brand/delete";//商品规格删除
//商品管理 条码管理
Vue.prototype.$RoleList = Util.apiUrl+"/role/list";//条码管理列表
Vue.prototype.$RoleAdd = Util.apiUrl+"/role/add";//条码管理添加
Vue.prototype.$RoleModify = Util.apiUrl+"/role/modify";//条码管理修改
Vue.prototype.$RoleDelete = Util.apiUrl+"/role/delete";//条码管理删除
//店铺 仓库管理
Vue.prototype.$WarehouseShoplist = Util.apiUrl+"/warehouse/shoplist";//仓库管理列表
Vue.prototype.$WarehouseShopadd = Util.apiUrl+"/warehouse/shopadd";//仓库管理添加
Vue.prototype.$WarehouseFarmmodify = Util.apiUrl+"/warehouse/farmmodify";//仓库管理修改
Vue.prototype.$WarehouseShopdelete = Util.apiUrl+"/warehouse/shopdelete";//仓库管理删除
//采购管理
//销售管理
//财务管理
//报表管理

// 封装全局的post
Vue.prototype.$post = post;
export function post(url, data = {}) {
	let postData = data;
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
//			url: Util.apiUrl + url,
			url: url,
			data: postData,
		}).then(response => {
			resolve(response.data);
		}), err => {
			reject(err);
		};
	})
}
Vue.prototype.$get = get;
export function get(url, data = {}) {
	let postData = data;
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
//			url: Util.apiUrl + url,
			url: url,
			data: postData,
		}).then(response => {
			resolve(response.data);
		}), err => {
			reject(err);
		};
	})
}
//全局的删除的方法
Vue.prototype.$delete = deletes;
export function deletes(url, data = {}) {
		this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(() => {
			this.$post(url, data).then((res) => {
				let data = res;
				if(data.status_code == 0) {
					this.$message({
						type: 'success',
						message: data.message,
					});
					this.ajaxjson();
				} else {
					this.$message({
						type: 'error',
						message: data.message,
					});
				}
			});
		}).catch(() => {
			this.$message({
				type: 'info',
				message: '已取消删除'
			});
		});
	}
	// create an axios instance
	const service = axios.create({
		baseURL: 'http://api.yilianerptest.com/api/', // api 的 base_url
		timeout: 5000 // request timeout
	})
//添加请求拦截头
service.interceptors.request.use(
	config => {
		var token = sessionStorage.getItem("token");
		//		var token = store.state.token;
		if(token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
			config.headers.Authorization = "Bearer " + token;
		} else {

		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});
//
// 添加响应拦截头
service.interceptors.response.use(
	function(response) {
		//此处有待商榷
		if(response.status == 200) {
			//		router.replace({
			//			path: "/login",
			//		});
		} else if(response.status == 0) {};
		return response;
	},
	function(error) {
		return Promise.reject(error);
	}
)
//axios的测试的相应的添加header
axios.interceptors.request.use(
	config => {
		var token = sessionStorage.getItem("token");
		//		var token = store.state.token;
		if(token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
			config.headers.Authorization = "Bearer " + token;
		} else {
			//判断token不存在跳转到登录页面
			router.replace({
				path: "/login",
			});
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});
//添加响应拦截器
axios.interceptors.response.use(function(response) {
	//此处有待商榷
	if(response.data.status_code == 401) {
		router.replace({
			path: "/login",
		});
	} else if(response.data.status_code == 0) {

	};
	return response;
}, function(error) {
	return Promise.reject(error);
})
//刷新token
setInterval(function() {
	refresh();
}, 7200000)

function refresh() {
	var token = sessionStorage.getItem("token");
	axios({
		method: 'put',
		url: Util.apiUrl + '/auth/refresh_token',
	}).then((res) => {
		let data = res.data;
		if(data.status_code == 0) {
			sessionStorage.setItem("token", data.tokenInfo.token)
		} else {}
	});
};

export default service