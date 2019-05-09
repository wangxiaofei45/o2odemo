<!-- 平台的权限设置 -->
<template>
	<div class="container">
		<div v-show="model == 1">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<div class="title">
					<el-button v-show="permission.indexOf('73') != -1" type="primary" @click="open_newInfo">
						<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>新增</span>
					</el-button>
				</div>
				<el-table :data="data_1" stripe border style="width: 100%">
					<el-table-column type="index" label="序号" :index="indexMethod"  width="80" align="center">
					</el-table-column>
					<el-table-column prop="role_name" label="权限组">
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template slot-scope="scope">
							<el-button v-show="permission.indexOf('74') != -1" size="mini" type="primary" @click="amend(scope.row)">编辑</el-button>
							<el-button v-show="permission.indexOf('76') != -1" size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-tabs>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--新增权限-->
		<div v-show="model == 2">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增权限
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="权限组名称" prop="role_name">
								<el-input v-model="new_info.role_name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox-group v-model="checkList">
							<el-row v-for="(item,index) in checkGroup" :key="item.id" style="border-bottom: 1px solid #e0e0e0;margin-bottom: 25px;">
								<el-checkbox :label="item.id" @change="check1($event,item)">{{item.name}}</el-checkbox>
								<el-row v-if="item.children" :key="item.id" style="padding-left:25px">
									<el-row v-for="j in item.children" :key="j.id" style="margin:15px 0px;padding-left:25px">
										<el-checkbox :label="j.id" @change="check2($event,item,j)">{{j.name}}</el-checkbox>
										<el-row style="margin:15px 0px;padding-left:25px">
											<el-checkbox v-for="z in j.children" :key="z.id" :label="z.id" @change="check3($event,item,j,z)">{{z.name}}</el-checkbox>
										</el-row>
									</el-row>
								</el-row>
							</el-row>
						</el-checkbox-group>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton">
							<el-form-item>
								<el-button @click="resetForm('new_info')" name="cancel">重置</el-button>
								<el-button type="primary" @click="submitForm('new_info')">保存</el-button>
							</el-form-item>
						</el-col>
						
					</el-row>
				</el-form>
			</div>
		</div>
		<!--模板列表-->
		<div v-show="model == 3">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						修改权限
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amend_newInfo" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amend_info" ref="amend_info" :rules="amend_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="权限组名称" prop="role_name">
								<el-input v-model="amend_info.role_name" disabled style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="check_group">
						<el-checkbox-group v-model="anemdCheckList">
							<el-row v-for="(item,index) in checkGroup" :key="item.id" style="border-bottom: 1px solid #e0e0e0;margin-bottom: 25px;">
								<el-checkbox :label="item.id" @change="check4($event,item)">{{item.name}}</el-checkbox>
								<el-row v-if="item.children" :key="item.id" style="padding-left:25px">
									<el-row v-for="j in item.children" :key="j.id" style="margin:15px 0px;padding-left:25px">
										<el-checkbox :label="j.id" @change="check5($event,item,j)">{{j.name}}</el-checkbox>
										<el-row style="margin:15px 0px;padding-left:25px">
											<el-checkbox v-for="z in j.children" :key="z.id" :label="z.id" @change="check6($event,item,j,z)">{{z.name}}</el-checkbox>
										</el-row>
									</el-row>
								</el-row>
							</el-row>
						</el-checkbox-group>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton">
							<el-form-item>
								<el-button @click="resetamendForm('amend_info')" name="cancel">重置</el-button>
								<el-button type="primary" @click="submitamendForm('amend_info')">保存</el-button>
							</el-form-item>
						</el-col>
						
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
				model: 1,
				page: 1, //分页
				total: 0,
				per_page: 10,
				permission: [],
				checkAll: false,
				checkedCities: ['上海', '北京'],
				cities: cityOptions,
				isIndeterminate: true,
				activeName: 'second',
				function_model: false, //
				function_amend_model: false, //模板列表修改

				data_1: [], //权限设置列表table
				checkGroup: [], //新增权限时候的checkgroup
				checkList: [], //多选框选择后的值
				anemdCheckList: [], //多选的时候默认选择到的
				new_info: {
					role_name: '', //新增权限的name
					allId: '',
				},
				new_inforules: {
					role_name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
				//修改模板信息
				amend_info: {
					role_id: '',
					role_name: 'dsada', //新增权限的name
					allId: '',
				},
				//规则
				amend_inforules: {
					role_name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
			};
		},
		//页面创建完成后
		created() {
			this.ajaxjson(); //请求模板列表的数据
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
				};
				this.$post(this.$groupList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.total = data.data.total;
						this.data_1 = data.data.data;
					} else {}
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
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
			},
			handleClick(tab, event) {},
			//表格删除用户删除操作
			deletes(e) {
				let data = {
					role_id: e,
				}
				this.$delete(this.$groupDel, data)
			},
			//新增权限model显示
			open_newInfo() {
				this.model = 2;
				//获取结点权限
				this.$post(this.$groupAllRole).then((res) => {
					if(res.status_code == 0) {
						let that = this;
						that.checkGroup = res.data;
					} else {
						this.$message({
							showClose: true,
							message: res.errorMsg,
							type: 'error'
						});
					}
				});
			},
			// 第一级全选
			check1(val,item) {
				//全选
				if(val) {
					for(let i = 0; i < item.children.length; i++) {
						if(this.checkList.indexOf(item.children[i].id) == -1) {
							this.checkList.push(item.children[i].id);
							for(let j = 0; j < item.children[i].children.length; j++) {
								if(this.checkList.indexOf(item.children[i].children[j].id)==-1){
									this.checkList.push(item.children[i].children[j].id);
								}
							}
						}
					}
				} else {
					//取消全选
					let arr = [];
					for(let i = 0; i < item.children.length; i++) {
						arr.push(item.children[i].id);
						for(let j = 0; j < item.children[i].children.length; j++) {
							arr.push(item.children[i].children[j].id);
						}
					};
					for(let j=0;j<arr.length;j++){
						this.checkList.splice(this.checkList.indexOf(arr[j]),1)
					}
				}
			},
			check2(val,item,j) {
				if(val){
					this.checkList.push(item.id);
					for(let i=0;i<j.children.length;i++){
						if(this.checkList.indexOf(j.children[i].id)==-1){
							this.checkList.push(j.children[i].id);
						}
					}
				}else{
					let arr = [];
					for(let i=0;i<j.children.length;i++){
							arr.push(j.children[i].id);
					}
					for(let i=0;i<arr.length;i++){
						this.checkList.splice(this.checkList.indexOf(arr[i]),1)
					}
					
				}
			},
			//第三级的选中事件
			check3(val,item,j,z) {
				if(val){
					this.checkList.push(item.id);
					this.checkList.push(j.id);
				}else{
				}
			},
			check4(val,item) {
				if(val) {
					for(let i = 0; i < item.children.length; i++) {
						if(this.anemdCheckList.indexOf(item.children[i].id) == -1) {
							this.anemdCheckList.push(item.children[i].id);
							for(let j = 0; j < item.children[i].children.length; j++) {
								if(this.anemdCheckList.indexOf(item.children[i].children[j].id)==-1){
									this.anemdCheckList.push(item.children[i].children[j].id);
								}
							}
						}
					}
				} else {
					//取消全选
					let arr = [];
					for(let i = 0; i < item.children.length; i++) {
						arr.push(item.children[i].id);
						for(let j = 0; j < item.children[i].children.length; j++) {
							arr.push(item.children[i].children[j].id);
						}
					};
					for(let j=0;j<arr.length;j++){
						this.anemdCheckList.splice(this.anemdCheckList.indexOf(arr[j]),1)
					}
				}
			},
			check5(val,item,j) {
				if(val){
					this.anemdCheckList.push(item.id);
					for(let i=0;i<j.children.length;i++){
						if(this.anemdCheckList.indexOf(j.children[i].id)==-1){
							this.anemdCheckList.push(j.children[i].id);
						}
					}
				}else{
					let arr = [];
					for(let i=0;i<j.children.length;i++){
							arr.push(j.children[i].id);
					}
					for(let i=0;i<arr.length;i++){
						this.anemdCheckList.splice(this.anemdCheckList.indexOf(arr[i]),1)
					}
					
				}
			},
			check6(val,item) {
				if(val){
					this.anemdCheckList.push(item.id);
					this.anemdCheckList.push(j.id);
				}else{
				}
				
			},
			//新增权限model
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						let str = this.checkList.join(",");
						this.new_info.allId = str;
						this.$post(this.$groupAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.$refs[e].resetFields();//清空表单
								this.checkList = [];
								
								this.model = 1;
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
			// 打开修改权限列表
			amend(e) {
				this.amend_info.role_id = e.id;
				this.amend_info.role_name = e.role_name;
				let param = {
					role_id: e.id
				};
				this.$post(this.$groupAllRole, param).then((res) => {
					if(res.status_code == 0) {
						this.checkGroup = res.data;
						let that = this;
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
									if(datas[i].children[j].children) {
										for(var z = 0; z < datas[i].children[j].children.length; z++) {
											if(datas[i].children[j].children[z].is_hide == 1) {
												arr.push(datas[i].children[j].children[z].id);
											}
										}
									}
								}
							}
						}
						this.anemdCheckList = arr;
						this.model = 3;
						this.amend_info.allId = arr.join(",");
						console.log(this.amend_info);
					} else {

					}
				});
			},

			//修改权限列表
			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						let str = this.anemdCheckList.join(",");
						postData.allId = str;
						this.$post(this.$groupEdit, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.model = 1;
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
				this.model = 1;
			},

			//取消保存用户信息
			cancel_amend_newInfo() {
				this.model = 1;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.checkList = [];
			},
			//重置修改的表单
			resetamendForm(formName){
				this.$refs[formName].resetFields();
				this.anemdCheckList = [];
			},
		},
	};
</script>
<style type="text/css" scoped>
	.title{
		margin-bottom: 15px;
	}
	.container {
		margin: 0px 25px 25px;
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
		padding-bottom: 20px;
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