<!--店铺仓库管理-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="12">
					<el-button type="primary" @click="open_newInfo">添加</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="danger" @click="muchDelete()">删除</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table :data="data" stripe border style="width: 100%;" size="mini" @selection-change="SelectionChange">
			<el-table-column type="selection" width="60" align="center">
			</el-table-column>
			<el-table-column prop="id" label="ID" width="100" align="center">
			</el-table-column>
			<el-table-column prop="name" label="名称">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row)">修改</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增仓库
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="80px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="店铺名称" prop="name">
								<el-input v-model="new_info.name"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="submitForm('new_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--修改客户信息-->
		<div class="model" v-show="amend_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						修改角色
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amendInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amend_info" ref="amend_info" :rules="new_inforules" label-width="80px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="手机号" prop="name">
								<el-input v-model="amend_info.name"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="amendForm('amend_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	import { getRoleId,getShopId } from '@/utils/auth' 
	export default {
		data() {
			return {
				data: [], //表格数据
				new_info_model: false,
				amend_info_model: false,
				customer_id: '',
				//新添加表格数据
				new_info: {
					role_id: sessionStorage.getItem("role_id"),
					shop_id: sessionStorage.getItem("shop_id"),
					name:''
				},
				amend_info: {}, //修改顾客信息
				//绑定新增表单验证规则
				new_inforules: {
					name: [{
						required: true,
						message: '名字不能为空',
						trigger: 'blur'
					}],
				},
			}
		},
		//页面加载之前
		created() {
			this.ajaxjson(); //请求顾客数据
		},
		//计算属性
		computed: {},
		//方法
		methods: {
			//请求数据
			ajaxjson() {
				let postData = {
					page: 1,
					role_id: getRoleId(),
				};
				//调用post请求方法
				this.$post(this.$WarehouseShoplist, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//打开新增添加 用户
			open_newInfo() {
				this.new_info_model = true;
			},
			//添加数据
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						this.$post(this.$WarehouseShopadd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.new_info_model = false;
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
			//修改顾客信息
			amendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						postData.wid = postData.id;
						postData.shop_id = getShopId(),//暂时没有shoo_id
						console.log(postData);
						delete postData.id;
						this.$post(this.$WarehouseFarmmodify, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.amend_info_model = false;
								this.ajaxjson();
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
				this.new_info_model = false;
			},
			cancel_amendInfo() {
				this.amend_info_model = false;
			},
			//修改名称
			amend(e) {
				this.amend_info = e;
				this.amend_info_model = true;
			},
			SelectionChange(val) {
				console.log(val);
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].id);
				};
				this.multipleSelection = arrays;
			},
			//多选删除
			muchDelete() {
				console.log(this.multipleSelection);
				this.$delete(this.$WarehouseShopdelete, {
					wid: this.multipleSelection.join(','),
					shop_id: sessionStorage.getItem("shop_id"),
				});
			},
			//单个删除
			deletes(e) {
				this.$delete(this.$WarehouseShopdelete, {
					wid: e + '',
					shop_id: sessionStorage.getItem("shop_id"),
				});
			},

		}
	}
</script>
<style scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.tab-container {
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
		width: 400px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -150px;
		margin-left: -200px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
</style>

<!--添加店铺照片时候 的样式-->
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>