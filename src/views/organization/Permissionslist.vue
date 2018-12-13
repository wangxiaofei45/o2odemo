<!--权限列表-->
<template>
	<div class="container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<div class="title">
				<el-button type="primary" @click="open_newInfo">新增权限</el-button>
			</div>
			<el-table :data="data_1" style="width: 100%">
				<el-table-column prop="id" label="Id" width="180">
				</el-table-column>
				<el-table-column prop="name" label="权限组">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row)">修改</el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tabs>
		<!--新增权限-->
		<div class="model" v-show="function_model">
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
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="权限组名称" prop="name">
								<el-input v-model="new_info.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<el-row class="check_group_con">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
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
		<!--模板列表-->
		<div class="model" v-show="function_amend_model">
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
								<el-input v-model="new_info.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<el-row class="check_group_con">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
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
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		data() {
			return {
				checkAll: false,
				checkedCities: ['上海', '北京'],
				cities: cityOptions,
				isIndeterminate: true,
				activeName: 'second',
				function_model: false, //
				function_amend_model: false, //模板列表修改
				data_1: [{
						id: 1,
						name: "权限组1"
					},
					{
						id: 2,
						name: "权限组2"
					}
				], //模板列表数据
				new_info: {
					name: '',
					remark: '',
					num: ''
				},
				//新增功能列表
				new_info_2: {
					node_id: '', //
					name: '',
					remark: '',
					num: '',
					url: '',
				},
				//修改功能列表
				new_info_3: {

				},
				new_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
					remark: [{
						required: true,
						message: '说明为空',
						trigger: 'blur'
					}],
					num: [{
						required: true,
						message: '排序数值为空',
						trigger: 'blur'
					}],
				},
				//修改模板信息
				amend_info: {
					name: '',
					remark: '',
					num: ''
				},
				//规则
				amend_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
					remark: [{
						required: true,
						message: '说明为空',
						trigger: 'blur'
					}],
					num: [{
						required: true,
						message: '排序数值为空',
						trigger: 'blur'
					}],
				},
			};
		},
		//页面创建完成后
		created() {
			//			this.ajaxjson(); //请求模板列表的数据
		},
		methods: {
			handleClick(tab, event) {},
			//请求模板列表
			ajaxjson() {
				let postData = {
					page: 1,
				};
				//调用post请求方法
				this.$post(this.$NodeToplist, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data;
					} else {}
				});
			},
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			//表格删除用户删除操作
			deletes(e) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let postData = {
						node_id: e + '',
					};
					this.$post(this.$NodeTopdelete, postData).then((res) => {
						let data = res;

						if(data.status_code == 0) {
							this.$message({
								type: 'success',
								message: data.message,
							});
							this.ajaxjson();
							this.ajaxjson_2();
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
			},

			//添加新用户模板列表
			open_newInfo() {
				this.function_model = true;
			},
			//功能列表
			open_newInfo_2() {
				this.$post(this.$NodeAddlist).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options = data.data;
						this.function_model_2 = true;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});

			},
			//新增添加新的用户
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						this.$post(this.$NodeTopadd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_model = false;
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

			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						postData.node_id = postData.id;
						delete postData.id;
						this.$post(this.$NodeTopModify, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_model = false;
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
				this.function_model = false;
			},
			//取消添加功能列表
			cancel_newInfo_2() {
				this.function_model_2 = false;
			},
			//模板列表修改
			amend(e) {
				this.amend_info = e;
				this.function_amend_model = true;
			},

			//取消保存用户信息
			cancel_amend_newInfo() {
				this.function_amend_model = false;
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
	.check_group_con{
		margin-top: 20px;
		border-bottom: 1px dashed #E0E0E0;
		padding-bottom: 25px;
	}
</style>