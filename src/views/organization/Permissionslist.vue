<!--权限列表-->
<template>
	<div class="container">
		<div v-show="showModel == 1">
			<div class="title">
				<el-button v-show="permission.indexOf('201') != -1" type="primary" @click="open_newInfo">
					<svg-icon icon-class="add" /> 
					新增
				</el-button>
			</div>
			<el-tabs v-model="activeName">
				<el-table :data="data_1" stripe border size="mini" min-height="840px" style="width: 100%">
					<el-table-column type="index" label="序号" width="80" align="center">
					</el-table-column>
					<el-table-column prop="role_name" label="权限组">
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template slot-scope="scope">
							 <!--icon="el-icon-edit"-->
							<el-button v-show="permission.indexOf('203') != -1" size="mini" type="primary" @click="amend(scope.row)">修改</el-button>
							<!--icon="el-icon-delete"-->
							<el-button v-show="permission.indexOf('204') != -1" size="mini" type="danger"  @click="deletes(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tabs>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--新增权限-->
		<div v-show="showModel == 2">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增权限
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row v-if="shop_type == 1">
					<el-form>
						<el-col :span="4">
							<el-form-item label="类型">
								<el-radio-group v-model="radio" @change="checkRadio">
									<el-radio label="1">公司</el-radio>
									<el-radio label="2">店铺</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="4">
							<el-form-item label="" style="display: inline-block;">
								<el-select v-model="shop_id" @change="selectShopId">
									<el-option v-for="(item,index) in options" :key="item.id" :value="item.id" :label="item.name"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="权限组名称" prop="name">
								<el-input v-model="new_info.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox-group v-model="checkList">
							<el-row v-for="(item,index) in checkGroup" :key="item.id">
								<el-checkbox style="margin:15px 0px" :label="item.id" @change="check1(item)">{{item.name}}</el-checkbox>
								<el-row v-if="item.children" style="margin:15px 0px;padding-left:25px">
									<el-checkbox v-for="j in item.children" :key="j.id" :label="j.id" @change="check2(j)">{{j.name}}</el-checkbox>
								</el-row>
							</el-row>
						</el-checkbox-group>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="submitForm('new_info')">保存</el-button>
							<el-button @click="resetForm('new_info')">重置</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--权限-->
		<div v-show="showModel == 3">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						修改权限
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amend_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amend_info" ref="amend_info" :rules="amend_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="权限组名称" prop="name">
								<el-input v-model="amend_info.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox-group v-model="anemdCheckList">
							<el-row v-for="(item,index) in checkGroup" :key="item.id">
								<el-checkbox style="margin:15px 0px" :label="item.id" @change="check3(item)">{{item.name}}</el-checkbox>
								<el-row v-if="item.children" style="margin:15px 0px;padding-left:25px">
									<el-checkbox v-for="j in item.children" :key="j.id" :label="j.id" @change="check3(j)">{{j.name}}</el-checkbox>
								</el-row>
							</el-row>
						</el-checkbox-group>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="submitamendForm('amend_info')">保存</el-button>
							<el-button @click="resetForm('amend_info')">重置</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>

	</div>
</template>
<script>
	import { getOrgType } from '@/utils/auth' // 获取是公司还是店铺
	export default {
		data() {
			return {
				permission:[],
				radio: '1', //默认是店铺
				checkGroup: [], //权限选择
				checkList: [], //权限选择的
				anemdCheckList: [], //修改时候的
				checkAll: false,
				checkedCities: ['上海', '北京'],
				isIndeterminate: true,
				activeName: 'second',
				options: [],
				showModel: 1,
				data_1: [], //权限设置列表table
				new_info: {
					name: '', //新增权限的name
					idstr: '', //id字符串
					type: '', //类型
					shop_id: '', //店铺id
				},
				new_inforules: {
					name: [{
						required: true,
						message: '权限组名称为空',
						trigger: 'blur'
					}],
				},
				//修改模板信息
				amend_info: {
					name: '',
					idstr: '',
					type: '', //类型
					shop_id: '', //店铺id
				},
				//规则
				amend_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
				shop_id: '', //店铺id
				shop_type: '',
				page: 1, //分页
				total: 0,
				per_page: 10,
				currentPage4: 4,
			};
		},
		//页面创建完成后
		created() {
			this.ajaxjson(); //请求模板列表的数据
			this.shop_type = getOrgType();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//获取权限设置列表
			ajaxjson() {
				let postData = {
					page: this.page,
					per_page: this.per_page,
				}
				this.$post(this.$organizationRolelist, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data.data;
						this.total = data.data.total;
					} else {

					}
				});
			},
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			//权限设置删除
			deletes(e) {
				let data = {
					role_id: e,
				}
				this.$delete(this.$organizationRoleDelete, data)
			},
			//新增权限显示model层
			open_newInfo() {
				//获取结点权限
				this.showModel = 2;
				let postData = {
					type: this.radio,
					role_id: this.role_id,
				};
				this.$post(this.$organizationRolenode, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.checkGroup = data.data;
					}
				});
			},
			// 选择店铺去切换
			checkRadio(e) {
				if(e == 2) {
					this.$post(this.$organizationGetCompanyShop).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							this.options = res.data; //下拉选择
						} else {
							this.$message.error(data.message);
						}
					});
				} else {
					let postData = {
						type: this.radio,
						role_id: this.role_id,
					};
					this.options = [];
					this.shop_id = '';
					this.$post(this.$organizationRolenode, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							this.checkGroup = data.data;
						}
					});
				}
			},
			// 选择后的
			check1(val) {
				let str = this.checkList.join(",");
				this.new_info.idstr = str;
			},
			check2() {
				let str = this.checkList.join(",");
				this.new_info.idstr = str;
			},
			check3() {
				let str = this.anemdCheckList.join(",");
				this.amend_info.idstr = str;
			},
			selectShopId() {
				let postData = {
					type: this.radio,
					shop_id: this.shop_id,
				};
				this.$post(this.$organizationRolenode, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.checkGroup = data.data;
					}
				});
			},
			//新增权限提交
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.new_info);
						console.log(postData);
						postData.type = this.radio;
						this.$post(this.$organizationAddrole, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.showModel = 1;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//修改权限列表
			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amend_info);
						this.$post(this.$organizationRoleUpdate, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.showModel = 1;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.showModel = 1;
			},
			//修改权限
			amend(e) {
				let postData = {
					type: this.radio,
					role_id: e.id,
				};
				this.$post(this.$organizationRolenode, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						let datas = res.data;
						let arr = [];
						for(var i = 0; i < datas.length; i++) {
							if(datas[i].is_hide == 1) {
								arr.push(datas[i].id);
							}
							if(datas[i].children) {
								for(var j = 0; j < datas[i].children.length; j++) {
									if(datas[i].children[j].is_hide == 1) {
										arr.push(datas[i].children[j].id);
									}

								}
							}
						}
						this.anemdCheckList = arr;
						this.checkGroup = data.data;
						this.showModel = 3;
						this.amend_info.name = e.role_name;
						this.amend_info.idstr = arr.join(",");
						this.amend_info.type = e.is_shop ? '0' : '1';
						this.amend_info.role_id = e.id;
					}
				});
			},
			//取消保存用户信息
			cancel_amend_newInfo() {
				this.showModel = 1;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	};
</script>
<style type="text/css" scoped>
	.container {
		margin: 25px;
	}
	
	.model {
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		z-index: 100;
		overflow: scroll;
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.model_con {
		width: 100%;
		height: 100%;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
	
	.check_group {
		padding: 20px;
		border: 1px solid #E0E0E0;
		margin-bottom: 20px;
	}
	
	.check_group_con {
		margin-top: 20px;
		border-bottom: 1px dashed #E0E0E0;
		padding-bottom: 25px;
	}
</style>
<style>
	.block{
		position: absolute;
		bottom: ;
	}
	.el-button--danger {
		background-color: #ef4d4c;
	}
</style>