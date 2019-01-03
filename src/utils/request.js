import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Util from './util.js'

// 基础的公用的接口
Vue.prototype.$staticGetAddress = Util.apiUrl+"static/getAddress";//三级联动菜单
Vue.prototype.$qiniu = Util.apiUrl+"config/qiniu";//获取七牛云
Vue.prototype.$supplierCommonSupplierList = Util.apiUrl+"supplier/commonSupplierList";//获取供应商列表
Vue.prototype.$staticGetCodeGoods = Util.apiUrl+"static/getCodeGoods";//根据条形码或者货号添加商品

//店铺登录信息完善
Vue.prototype.$userPerfectinfo = Util.apiUrl+"user/perfectinfo";//登录完善信息
Vue.prototype.$userView = Util.apiUrl+"user/view";//获取首页的侧边栏

//设置 对应店铺的接口
Vue.prototype.$organizationRolelist = Util.apiUrl+"organization/rolelist";//店铺权限设置
Vue.prototype.$organizationRolenode = Util.apiUrl+"organization/rolenode";//获取公司权限组
Vue.prototype.$organizationGetCompanyShop = Util.apiUrl+"organization/getCompanyShop";//获取公司下面的店铺
Vue.prototype.$organizationAddrole = Util.apiUrl+"organization/addrole";//新增权限组
Vue.prototype.$organizationDelete = Util.apiUrl+"organization/delete";//删除公司店铺权限组
Vue.prototype.$organizationRoleUpdate = Util.apiUrl+"organization/roleUpdate";//编辑公司店铺的权限组提交
Vue.prototype.$organizationRoleDelete = Util.apiUrl+"organization/roleDelete";//编辑公司权限删除

// 店铺公司组织架构管理.
Vue.prototype.$organizationList = Util.apiUrl+"organization/list";//公司店铺组织架构列表
Vue.prototype.$organizationGetOrganizeRoleList = Util.apiUrl+"organization/getOrganizeRoleList";//获取组织下面的权限列表
Vue.prototype.$organizationAdd = Util.apiUrl+"organization/add";//新增组织
Vue.prototype.$organizationGetuser = Util.apiUrl+"organization/getuser";//获取组织下的组织和成员
Vue.prototype.$organizationAddroleuser = Util.apiUrl+"organization/addroleuser";//新增组织下的组织和成员
Vue.prototype.$organizationAdduser = Util.apiUrl+"organization/adduser";//新增成员
Vue.prototype.$organizationDeleteuser = Util.apiUrl+"organization/deleteuser";//删除用户
Vue.prototype.$organizationDelete = Util.apiUrl+"organization/delete";//删除用户

// 平台的权限设置
Vue.prototype.$groupList = Util.apiUrl+"group/list";//获取平台的权限设置列表
Vue.prototype.$groupAllRole = Util.apiUrl+"group/allRole";//获取平台全部的权限
Vue.prototype.$groupAdd = Util.apiUrl+"group/add";//添加平台权限组
Vue.prototype.$groupEdit = Util.apiUrl+"group/edit";//编辑平台权限组
Vue.prototype.$groupDel = Util.apiUrl+"group/del";//删除平台权限组

//平台功能列表 
Vue.prototype.$moduleList = Util.apiUrl+"module/list";//获取平台功能
Vue.prototype.$moduleAdd = Util.apiUrl+"module/add";//添加平台功能列表
Vue.prototype.$moduleEdit = Util.apiUrl+"module/edit";//编辑平台功能列表
Vue.prototype.$moduleDel = Util.apiUrl+"module/del";//删除平台功能

// 平台组织架构列表
Vue.prototype.$platformList = Util.apiUrl+"platform/list";//获取平台组织架构列表
Vue.prototype.$platformAddGroup = Util.apiUrl+"platform/addGroup";//平台组织下面新增组
Vue.prototype.$platformRoleGroup = Util.apiUrl+"platform/roleGroup";//获取平台权限组
Vue.prototype.$platformAddUser = Util.apiUrl+"platform/addUser";//添加平台成员
Vue.prototype.$platformChildrenList = Util.apiUrl+"platform/childrenList";//获取平台下级组织
Vue.prototype.$platformOrgUser = Util.apiUrl+"platform/orgUser";//获取平台下级组织成员
Vue.prototype.$platformDelOrg = Util.apiUrl+"platform/delOrg";//删除平台下级组织
Vue.prototype.$platformDelreMember = Util.apiUrl+"platform/delOrgMember";//删除平台下级组织
Vue.prototype.$platformGetOrgMember = Util.apiUrl+"platform/getOrgMember";//获取平台组织成员信息
Vue.prototype.$platformEditOrgMember = Util.apiUrl+"platform/editOrgMember";//修改平台组织成员信息
Vue.prototype.$platformEditOrgMember = Util.apiUrl+"platform/rolelist";//修改平台组织成员信息

//平台商品管理-品牌管理
Vue.prototype.$goodsbrandList = Util.apiUrl+"goodsbrand/list";//商品管理 品牌列表 
Vue.prototype.$goodsbrandAdd = Util.apiUrl+"goodsbrand/add";//商品管理品牌列表 添加
Vue.prototype.$goodsbrandModify = Util.apiUrl+"goodsbrand/modify";//商品管理 编辑 是否显示 都是这个接口
Vue.prototype.$goodsbrandInfo = Util.apiUrl+"goodsbrand/info";//商品管理 编辑 获取信息
Vue.prototype.$goodsbrandGetlist = Util.apiUrl+"goodsbrand/getlist";//商品管理 获取分类
Vue.prototype.$goodsbrandDelete = Util.apiUrl+"goodsbrand/delete";//品牌删除

// 平台商品管理-商品分类
Vue.prototype.$goodsclassList = Util.apiUrl+"goodsclass/list";//商品管理 获取分类
Vue.prototype.$goodsModifyview = Util.apiUrl+"goodsclass/modifyview";//商品分类 是否展示
Vue.prototype.$goodsAdd = Util.apiUrl+"goodsclass/add";//商品分类 添加
Vue.prototype.$goodsDelete = Util.apiUrl+"goodsclass/delete";//商品分类 删除
Vue.prototype.$attributeGetAll = Util.apiUrl+"attribute/getAll";//商品分类 添加规格 获取所有属性
Vue.prototype.$attributeClassattributesave = Util.apiUrl+"attribute/classattributesave";//商品分类 添加规格
Vue.prototype.$attributeClassattribute = Util.apiUrl+"attribute/classattribute";//商品分类 获取分类下规格数据

// 平台商品管理-商品规格
Vue.prototype.$attributeList = Util.apiUrl+"attribute/list";//商品管理 获取规格
Vue.prototype.$attributeStatus = Util.apiUrl+"attribute/status";//商品管理 商品规格 禁用
Vue.prototype.$attributeAdd = Util.apiUrl+"attribute/add";//商品管理 商品规格添加
Vue.prototype.$attributeDelete = Util.apiUrl+"attribute/delete";//商品管理 商品规格删除

Vue.prototype.$attributeValueList = Util.apiUrl+"attributeValue/list";//商品管理 商品规格属性列表
Vue.prototype.$attributeValueAdd = Util.apiUrl+"attributeValue/add";//商品管理 商品规格属性添加
Vue.prototype.$attributeValueDelete = Util.apiUrl+"attributeValue/delete";//商品管理 商品规格属性删除

// 基础设置
Vue.prototype.$archivesList = Util.apiUrl+"archives/list";//公司档案 店铺档案 个人档案获取
Vue.prototype.$archivesEditShop = Util.apiUrl+"archives/editShop";//店铺档案 编辑archives/editUser
Vue.prototype.$archivesEditUser = Util.apiUrl+"archives/editUser";//个人档案编辑

// 联系人管理 会员管理
Vue.prototype.$memberMemberList = Util.apiUrl+"member/memberList";//联系人管理会员列表
Vue.prototype.$memberSiteMember = Util.apiUrl+"member/siteMember";//会员禁用开启
Vue.prototype.$memberSearchMember = Util.apiUrl+"member/searchMember";//会员搜索
Vue.prototype.$memberAddMember = Util.apiUrl+"member/addMember";//添加会员
Vue.prototype.$memberMemberDetail = Util.apiUrl+"member/memberDetail";//获取会员信息
Vue.prototype.$memberEditMember = Util.apiUrl+"member/editMember";//编辑会员信息
Vue.prototype.$memberRecharge = Util.apiUrl+"member/recharge";//会员充值
Vue.prototype.$memberDelMember = Util.apiUrl+"member/delMember";//会员删除

// 联系人管理 供应商
Vue.prototype.$supplierSupplierList = Util.apiUrl+"supplier/supplierList";//供应商列表
Vue.prototype.$supplierAddSupplier = Util.apiUrl+"supplier/addSupplier";//供应商列表
Vue.prototype.$supplierDelSupplier = Util.apiUrl+"supplier/delSupplier";//删除供应商
Vue.prototype.$supplierEditSupplier = Util.apiUrl+"supplier/editSupplier";//删除供应商

//商品管理 商品注册
Vue.prototype.$goodsclassGetlist = Util.apiUrl+"goodsclass/getlist";// 商品注册 获取分类
Vue.prototype.$goodsbrandGetlist = Util.apiUrl+"goodsbrand/getlist";// 商品注册 品牌列表
Vue.prototype.$goodsGetattribute = Util.apiUrl+"goods/getattribute";// 商品注册 品牌列表
Vue.prototype.$goodsAdd = Util.apiUrl+"goods/add";// 商品注册 提交

//采购管理
Vue.prototype.$purchaseList = Util.apiUrl+"purchase/list";// 采购管理 采购单
Vue.prototype.$purchaseAudit = Util.apiUrl+"purchase/audit";// 采购管理 采购单审核
Vue.prototype.$purchaseAdd = Util.apiUrl+"purchase/add";// 采购管理 新增获取id
Vue.prototype.$purchaseInfo = Util.apiUrl+"purchase/info";// 采购管理 新增获取id

// 深copy
Vue.prototype.$coppyArray = coppyArray;
export function coppyArray(arr) {
		return arr.map((e) => {
			if(typeof e === 'object') {
				return Object.assign({}, e);
			} else {
				return e;
			}
		})
	};
Vue.prototype.$objDeepCopy = objDeepCopy;
export function objDeepCopy(source) {
		var sourceCopy = {};
		for(var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
		return sourceCopy;
	}
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