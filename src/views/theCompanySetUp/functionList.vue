<!--平台的功能列表 -->
<template>
	<div class="container">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-row  v-show="backArr.length>=1" style="height: 40px;line-height: 40px;border-bottom: 1px solid #D6D6D6;margin-bottom: 20px;color: #333333;">
				<el-col :span="12">
					<el-button v-show="backArr.length>=1" type="text" @click="back" style="margin-right: 10px;">
						<svg-icon icon-class="icon_backs"/>
					</el-button>
					{{showName}}
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button v-show="backArr.length>=1" type="text" @click="ajaxjson" name="topRightCancel">
						<svg-icon icon-class="cancel"/>
					</el-button>
				</el-col>
			</el-row>
			<el-row class="title">
				<el-col :span="12">
					<el-button v-show="permission.indexOf('78') != -1" type="primary" @click="open_newInfo">
						<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>新增</span>
					</el-button>
				</el-col>
			</el-row>
			<el-table :data="data_1" stripe border style="width: 100%">
				<el-table-column type="index"  label="序号" :index="indexMethod" align="center" width="80">
				</el-table-column>
				<el-table-column prop="name" label="功能名称" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.level<3" style="color: #18CCBA;cursor:pointer;" @click="goToSeeOrModify(scope.row)">{{scope.row.name}}</span>
						<span v-else @click="goToSeeOrModify(scope.row)">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="url" label="URL" align="center">
				</el-table-column>
				<el-table-column prop="remark" label="描述" align="center">
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button v-show="permission.indexOf('79') != -1" size="mini" type="primary" @click="amend(scope.row)">编辑</el-button>
						<el-button v-show="permission.indexOf('80') != -1" size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-tabs>
		<div class="block" style="margin-top: 15px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!--新增权限-->
		<div class="model" v-show="function_model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo('new_info')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="功能分类">
								<el-select v-model="selectValue1" placeholder="请选择" @change="select_1">
									<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<el-select v-model="selectValue2" placeholder="请选择" @change="select_2">
									<el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="功能名称" prop="name">
								<el-input placeholder="请输入" v-model="new_info.name" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="URL">
								<el-input placeholder="请输入" v-model="new_info.url" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="描述">
								<el-input placeholder="请输入" v-model="new_info.remark" style="width: 200px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton" align="center">
							<el-button @click="cancel_newInfo('new_info')" name="cancel">取消</el-button>
							<el-button type="primary" @click="submitForm('new_info')">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--编辑列表-->
		<div class="model" v-show="function_amend_model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑
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
							<el-form-item label="功能名称" prop="name">
								<el-input placeholder="请输入" v-model="amend_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="URL">
								<el-input placeholder="请输入" v-model="amend_info.url"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="描述">
								<el-input placeholder="请输入" v-model="amend_info.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton" align="center">
							<el-button @click="cancel_amend_newInfo" name="cancel">取消</el-button>
							<el-button type="primary" @click="submitamendForm('amend_info')">保存</el-button>
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
				showNameArr:[],
				showName:'',
				backArr: [],
				permission: [],
				page: 1, //分页
				total: 0,
				per_page: 10,
				checkAll: false,
				checkedCities: ['上海', '北京'],
				cities: cityOptions,
				isIndeterminate: true,
				activeName: 'second',
				function_model: false, //
				function_amend_model: false, //模板列表编辑
				data_1: [], //权限设置列表table
				options: [], //新增功能时候的一级选择
				options2: [], //新增的时候选择二级的选择
				selectValue1: '', //第一级选择
				selectValue2: '', //第二级选择
				new_info: {
					type: '', //添加type
					name: '', //新增功能name
					url: '', //路径
					id: '', //id
					remark: '', //描述
				},
				new_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
				//编辑模板信息
				amend_info: {
					name: '',
					remark: '',
					url: '',
					id: '',
				},
				//规则
				amend_inforules: {
					name: [{
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
				this.backArr = [];
				let datas = {
					page: this.page,
					per_page: this.per_page,
				};
				this.$post(this.$moduleList, datas).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data.data;
						this.options = data.data.data;
						this.total = data.data.total;
					} else {

					}
				});
			},
			goToSeeOrModify(e) {
				let datas = {
					page: this.page,
					per_page: this.per_page,
					id: e.id,
				};
				if(e.level == 3) {
					return;
				} else {
					this.backArr.push(e);
					this.showNameArr.push(e.name);
					this.showName = this.showNameArr.join(' > ')+" > "+(e.level+1)+"级功能列表";
					this.$post(this.$moduleList, datas).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							this.data_1 = data.data.data;
							this.options = data.data.data;
							this.total = data.data.total;
						} else {

						}
					});
				}
			},
			back() {
				let datas = {
					page: this.page,
					per_page: this.per_page,
					id: this.backArr[this.backArr.length - 2],
				};
				this.backArr.splice(this.backArr.length - 1, 1);
				this.showNameArr = this.backArr.map(function(item){
					return item.name;
				});
				this.showName = this.showNameArr.join(' > ')+" > "+(this.backArr.length+1)+"级功能列表";
				this.$post(this.$moduleList, datas).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data.data;
						this.options = data.data.data;
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
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
			},
			handleClick(tab, event) {},
			// 全选
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
				let data = {
					id: e,
				}
				this.$delete(this.$moduleDel, data)
			},
			//新增权限model显示
			open_newInfo() {
				this.function_model = true;
			},
			select_1() {
				// 选择的第一级请求下面的列表
				let datas = {
					page: 1,
					id: this.selectValue1
				};
				this.$post(this.$moduleList, datas).then((res) => {
					let data = res;

					if(data.status_code == 0) {
						this.options2 = data.data.data;
						this.selectValue2 = '';
					} else {}
				});
			},
			//选择上一级时候下一级的选择
			select_2() {
				// console.log(this.selectValue2);
			},
			//新增权限model
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						let type = '';
						if(!this.selectValue1) {
							type = "0";
							postData.id = '';
						} else if(this.selectValue1 && !this.selectValue2) {
							type = '1';
							postData.id = this.selectValue1;
						} else {
							type = '2';
							postData.id = this.selectValue2;
						}
						postData.type = type;
						this.$post(this.$moduleAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_model = false;
								//清空操作数据
								this.$refs[e].resetFields();
								this.selectValue1 = '';
								this.selectValue2 = '';
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
			// 打开编辑权限列表
			amend(e) {
				this.amend_info.name = e.name;
				this.amend_info.remark = e.remark;
				this.amend_info.url = e.url;
				this.amend_info.id = e.id;
				this.function_amend_model = true;
			},
			//编辑权限列表
			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let data = this.amend_info;
						this.$post(this.$moduleEdit, data).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_amend_model = false;
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
			cancel_newInfo(e) {
				this.$refs[e].resetFields();
				this.selectValue1 = '';
				this.selectValue2 = '';
				this.function_model = false;
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
		width: 960px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -200px;
		margin-left: -480px;
		border-radius: 8px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
	}
	.model_con .el-input{
		min-width: 780px;
	}
	.model_con .el-select{
		min-width: 300px;
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