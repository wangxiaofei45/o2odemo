<!--组织成员列表-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-button type="primary" @click="open_newInfo">添加</el-button>
		</div>
		<el-table :data="data" stripe border style="width: 100%;" size="mini">
			<el-table-column prop="id" label="用户id" width="80" align="center">
			</el-table-column>
			<el-table-column prop="name" label="用户名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="type" label="账户类型">
				<template slot-scope="scope">
					
					<span v-if="scope.row.type == 0">
						平台用户</span>
					<span v-if="scope.row.type == 1">店铺</span>
					<span v-if="scope.row.type == 2">供应商</span>
					<span v-if="scope.row.type == 3">组织成员</span>
				</template>
			</el-table-column>
			<el-table-column prop="pass" label="审核状态" width="100" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.pass == 0" style="color: red;">未审核</span>
					<span v-if="scope.row.pass == 1" style="color: limegreen;">通过审核</span>
				</template>
			</el-table-column>
			<el-table-column prop="disabled" label="是否启用" width="100">
				<template slot-scope="scope">
					<el-button v-if="scope.row.disabled == 1" size="mini" type="primary" @click="starUsing(scope.row.id,scope.row.disabled)">启用</el-button>
					<el-button v-if="scope.row.disabled == 0" size="mini" type="danger" @click="starUsing(scope.row.id,scope.row.disabled)">禁用</el-button>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="deletes(scope.row.id)">修改</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="4" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增账号
					</el-col>
					<el-col :span="2" :offset="18" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="组织" prop="role_id">
								<el-input v-show="false" v-model="new_info.role_id"></el-input>
								<el-cascader placeholder="请选择" :options="options" filterable change-on-select @change="select_options"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="new_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input type="password" v-model="new_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="new_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="sure_password">
								<el-input v-model="new_info.sure_password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="new_info.email"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="店铺名称" prop="store_name">
								<el-input v-model="new_info.store_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="所属分类" prop="sc_id">
								<el-input v-model="new_info.sc_id"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类名称" prop="sc_name">
								<el-input v-model="new_info.sc_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系人姓名" prop="contacts_name">
								<el-input v-model="new_info.contacts_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="公司地址" prop="company_address">
								<el-input v-model="new_info.company_address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="详细地址" prop="company_address_detail">
								<el-input v-model="new_info.company_address_detail"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系人电话" prop="contacts_phone">
								<el-input v-model="new_info.contacts_phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证号" prop="store_owner_card">
								<el-input v-model="new_info.store_owner_card"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item label="身份证与人合照" prop="owner_card_electronic">
								<el-input v-model="new_info.owner_card_electronic" v-show="false"></el-input>
							</el-form-item>
							<el-upload class="avatar-uploader" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl_1" :src="imageUrl_1" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-col>
						<el-col :span="8">
							<el-form-item label="身份证正面" prop="owner_card_front_pic">
								<el-input v-model="new_info.owner_card_front_pic" v-show="false"></el-input>
							</el-form-item>
							<el-upload class="avatar-uploader" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_2" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl_2" :src="imageUrl_2" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-col>
						<el-col :span="8">
							<el-form-item label="身份证反面" prop="owner_card_back_pic">
								<el-input v-model="new_info.owner_card_back_pic" v-show="false"></el-input>
							</el-form-item>

							<el-upload class="avatar-uploader" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_3" :before-upload="beforeAvatarUpload">
								<img v-if="imageUrl_3" :src="imageUrl_3" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-col>
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
	</div>
</template>
<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				data: [], //表格数据
				new_info_model: false,
				//新添加表格数据
				new_info: {
					phone: '15736748889', //手机号
					password: '123456', //密码
					sure_password: '123456',
					name: '王肖飞', //姓名
					business_pic: "www.baidu.com/index.png", //营业执照照片
					role_id: '10', //组织
					email: '450731224@qq.com', //邮箱
					store_name: '王的店铺', //店铺名称
					sc_id: '3', //所属分类 user/registrclass
					sc_name: '服装鞋帽', //分类名称
					contacts_name: '王肖飞', //联系人姓名
					company_address: '火星', //公司地址
					company_address_detail: '250号41栋', //详细地址
					contacts_phone: '15736748889', //联系人电话
					store_owner_card: '410353199305062356', //身份证号
					owner_card_electronic: 'www.baidu.com/index.png', //身份证与人合照
					owner_card_front_pic: 'www.baidu.com/index.png', //身份证正面
					owner_card_back_pic: 'www.baidu.com/index.png', //身份证反面
				},
				//绑定新增表单验证规则
				new_inforules: {
					role_id: [{
						required: true,
						message: '组织名称为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '手机号为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '姓名为空',
						trigger: 'blur'
					}],
					sure_password: [{
						required: true,
						message: '请确定密码',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}],
				},
				options: [], //获取的组织列表
				registrclass: [], //获取注册选择店铺分类
				imageUrl_1: "", //身份证与人合照
				imageUrl_2: "", //身份证正面
				imageUrl_3: "", //身份证反面
				actionPath: "", //七牛上传的地址
				postData: {},
			}
		},
		//页面加载之前
		created() {
			this.ajaxjson(); //请求顾客数据
			this.get_qiniu_token();
		},
		//计算属性
		computed: {},
		//方法
		methods: {

			//请求数据
			ajaxjson() {
				let postData = {
					page: 1,
				};
				//调用post请求方法
				this.$post(this.$UserList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//获取七牛token上传
			get_qiniu_token() {
				this.$post(this.$qiniu).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.actionPath = data.data.QiNiuFileUrl + "erp-app";
						this.postData.token = data.data.token;
					} else {
						console.log("加载出错", res);
					}
				});
			},
			//上传图片之前
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.postData.key = file.name; //上传时控制文件名
			},
			//上传图片成功  身份证与人合照
			handleAvatarSuccess_1(res, file) {
				this.imageUrl_1 = URL.createObjectURL(file.raw);
				this.new_info.owner_card_electronic = URL.createObjectURL(file.raw)
			},
			//身份证正面
			handleAvatarSuccess_2(res, file) {
				this.imageUrl_2 = URL.createObjectURL(file.raw);
				this.new_info.owner_card_front_pic = URL.createObjectURL(file.raw)
			},
			//身份证反面
			handleAvatarSuccess_3(res, file) {
				this.imageUrl_3 = URL.createObjectURL(file.raw);
				this.new_info.owner_card_back_pic = URL.createObjectURL(file.raw)
			},
			//打开新增添加 用户
			open_newInfo() {
				this.get_options();
				this.get_registrclass();
			},
			//获取注册店铺分类详情
			get_registrclass() {
				this.$post(this.$UserRegistrclass).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.registrclass = data.data;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			//获取组织详情
			get_options() {
				this.$post(this.$organizeAddlist).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options = data.data;
						this.new_info_model = true;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			//获取选择的值
			select_options(e) {
				let lastindex = e.pop();
				console.log(lastindex);
				this.new_info.role_id = lastindex;
			},
			//是否启用
			starUsing(a, b) {
				switch(b) {
					case 0:
						b = 1;
						break;
					case 1:
						b = 0;
						break;
					default:
						break;
				};
				let postData = {
					user_id: a,
					disabled: b
				}
				this.$post(this.$UserModify, postData).then((res) => {
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
			},
			//提交表单
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						this.$post($UserAdd, postData).then((res) => {
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
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//表格删除用户删除操作
			deletes(e) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let postData = {
						user_id: e + '',
					};
					this.$post(this.$UserDelete, postData).then((res) => {
						let data = res;
						console.log(data);
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