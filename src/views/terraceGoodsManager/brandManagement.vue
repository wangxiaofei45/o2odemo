<!--往来单位-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="24">
					<el-button v-show="permission.indexOf('190') != -1" type="primary" @click="addMember">添加</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="tTable">
			<el-table :data="data" stripe border style="width: 100%;" size="mini" @selection-change="SelectionChange">
				<el-table-column prop="brand_id" label="序号" width="60" align="center">
				</el-table-column>
				<el-table-column prop="brand_name" label="品牌名称" align="center">
				</el-table-column>
				<el-table-column prop="disabled" label="是否显示" align="center">
					<template slot-scope="scope">
						<el-button type="text">
							<span v-if="permission.indexOf('192') != -1">
								<el-button v-if="scope.row.disabled == 0" @click="SiteMember(scope.row)" type="text">是</el-button>
								<el-button v-if="scope.row.disabled == 1" @click="SiteMember(scope.row)" type="text" style="color: #666;">否</el-button>
							</span>
							<span v-else>
								<span v-if="scope.row.disabled == 0">
									 是
								</span>
								<span v-if="scope.row.disabled == 1">
									 否
								</span>
							</span>
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button v-show="permission.indexOf('192') != -1" size="mini" type="primary" icon="el-icon-edit" @click="amendMember(scope.row)">编辑</el-button>
						<el-button v-show="permission.indexOf('193') != -1" size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.brand_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!--添加账号-->
		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="form" :rules="form_rule" ref="form" label-width="100px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="品牌名称" prop="brand_name">
								<el-input v-model="form.brand_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="品牌首字母" prop="brand_initial">
								<el-input v-model="form.brand_initial"></el-input>
							</el-form-item>
						</el-col>
					
						<el-col :span="12">
							<el-form-item label="商品分类" prop="class_id">
								<el-select v-model="form.class_id" placeholder="请选择">
									<el-option v-for="item in goodClass" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否显示" prop="disabled">
								<el-radio-group v-model="form.disabled">
								    <el-radio :label="0">是</el-radio>
								    <el-radio :label="1">否</el-radio>
								  </el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="详情介绍" prop="brand_introduction">
								<el-input v-model="form.brand_introduction"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="官方地址" prop="brand_official_web">
								<el-input v-model="form.brand_official_web"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="公司名称" prop="shop_name">
								<el-input v-model="form.bankcode"></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="品牌logo" prop="brand_pic">
								<el-input v-model="form.brand_pic" v-show="false"></el-input>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
										<div class="upload_img"  v-if="imageUrl_1">
											<img :src="imageUrl_1" class="avatar">
										</div>
										<div class="upload_img" v-else>
											上传图片
										</div>
									</el-upload>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button type="primary" @click="submitForm('form')" align="center">添加</el-button>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--修改model-->
		<div class="model" v-show="amend_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmendInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amendForm" :rules="amendFormRule" ref="amendForm" label-width="100px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="品牌名称" prop="brand_name">
								<el-input v-model="amendForm.brand_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="品牌首字母" prop="brand_initial">
								<el-input v-model="amendForm.brand_initial"></el-input>
							</el-form-item>
						</el-col>
					
						<el-col :span="12">
							<el-form-item label="商品分类" prop="class_id">
								<el-select v-model="amendForm.class_id" placeholder="请选择">
									<el-option v-for="item in goodClass" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否显示" prop="disabled">
								<el-radio-group v-model="amendForm.disabled">
								    <el-radio :label="0">是</el-radio>
								    <el-radio :label="1">否</el-radio>
								  </el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="详情介绍" prop="brand_introduction">
								<el-input v-model="amendForm.brand_introduction"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="官方地址" prop="brand_official_web">
								<el-input v-model="amendForm.brand_official_web"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="公司名称" prop="shop_name">
								<el-input v-model="amendForm.bankcode"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button type="primary" @click="submitAmendForm('amendForm')" align="center">保存</el-button>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission:[],
				postData: {}, //七牛上传参数
				new_info_model: false, //添加弹窗
				amend_info_model: false, //修改弹窗
				//表格数据
				data: [{
						id: 1,
						name: '王天佑',
						phone: '15736748856',
						location:'杭州市西湖区天恒大厦1505',//地址
					},
					{
						id: 2,
						name: '王老爹',
						phone: '15736748866',
						location:'杭州市西湖区天恒大厦1506',//地址
					}
				],
				//添加提交的表单
				form: {
					brand_name:'',//品牌名称
					brand_initial:'',//品牌首字母
					class_id:'',//商品分类
					disabled:'',//是否显示
					brand_introduction:'',//详情介绍
					brand_official_web:'',//官方地址
					shop_name:'',//公司名称
					brand_pic:'',//品牌logo
					brand_class:'女人装',//商品分类名称
				},
				form_rule: {
					brand_name: [{
						required: true,
						message: '供应商名称为空',
						trigger: 'blur'
					}, ],
					class_id:{
						required: true,
						message: '联系人为空',
						trigger: 'change'
					},
				},
				options:[
					{
						value:1,
						label:'进价'
					},
					{
						value:2,
						label:'零售价'
					}
				],
				goodClass:[],//商品分类
				imageUrl_1:'',
				//修改信息
				amendForm: {},
				amendFormRule: {
					brand_name: [{
						required: true,
						message: '供应商名称为空',
						trigger: 'blur'
					}, ],
					class_id:{
						required: true,
						message: '联系人为空',
						trigger: 'change'
					},
				},
			};
		},
		created() {
			this.ajaxjson(); //请求模板列表的数据
			this.get_qiniu_token();//获取到的七牛云上传配置信息
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			ajaxjson() {
				let postData = {
					page:1,
				};
				this.$post(this.$goodsbrandList,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data.data;
					} else {

					}
				});
			},
			// 
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
			// 获取分类列表
			getClass(){
				let postData = {
					pid:0,
				}
				this.$post(this.$goodsclassGetlist,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.goodClass = data.data;
					} else {

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
			handleAvatarSuccess(res, file) {
				this.imageUrl_1 = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.form.brand_pic = res.key //本地地址上传展示
			},
			// 全选
			SelectionChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
			},
			//添加会员
			addMember() {
				this.getClass();
				this.new_info_model = true;
			},
			//取消添加新的供应商
			cancel_newInfo() {
				this.new_info_model = false;
			},
			//确定添加
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.form;
						this.$post(this.$goodsbrandAdd,postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
						          message: data.message,
						          type: 'success'
						        });
						        this.ajaxjson();
						        this.new_info_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
						} else {
							console.log('error submit!!');
							return false;
						}
				});
			},
			// 
			SiteMember(e){
				let postData = e;
				postData.disabled = e.disabled?0:1;
				this.$post(this.$goodsbrandModify,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data.data;
					} else {

					}
				});
			},
			
			// 删除供应商
			deletes(e){
				let data ={
					brand_id:e+'',
				}
				this.$delete(this.$goodsbrandDelete,data)
			},
			// 打开编辑
			amendMember(e) {
				let postData = {
					pid:0,
				}
				// 首先获取到商品分类再去获取商品的详细信息 否者展示效果会出错
				this.$post(this.$goodsclassGetlist,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.goodClass = data.data;
						let postDatas = {
							brand_id:e.brand_id,
						}
						this.$post(this.$goodsbrandInfo,postDatas).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.amendForm = data.data;
								this.amend_info_model = true
							} else {

							}
						});
					} else {

					}
				});
				
				
			},
			cancelAmendInfo() {
				this.amend_info_model = false;
			},
			// 供应商编辑
			submitAmendForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.amendForm;
						this.$post(this.$goodsbrandModify,postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
						          message: data.message,
						          type: 'success'
						        });
						        this.ajaxjson();
						        this.amend_info_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},

	}
</script>
<style type="text/css">
	.el-input-group__append {
		background-color: #FFF;
		color: #909399;
		vertical-align: middle;
		display: table-cell;
		position: relative;
		border: 0px solid #dcdfe6;
		border-radius: 4px;
		padding: 0 10px;
		width: 1px;
		white-space: nowrap;
	}
</style>
<style scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		height: 50px;
		/* background: #f4f4f4; */
		height: 180px;
		padding: 20px;
		min-width: 1300px;
	}
	
	.delete {
		width: 500px;
		margin: 50px auto;
	}
	
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.information {
		width: 100%;
		padding: 10% 10% 10% 10%;
		background: #f4f4f4;
	}
	
	.tTable {
		margin-top: 20px;
		min-width: 1300px;
	}
	
	.oTable {
		position: relative;
	}
	
	.addTable {
		position: absolute;
		right: 90px;
		bottom: 50px;
	}
	
	.total {
		width: 100%;
		position: fixed;
		bottom: 30px;
		height: 38px;
		padding-left: 20px;
		background: #f4f4f4;
		line-height: 38px;
	}
	
	.total .totalNum {
		width: 1200px;
		display: inline-block;
		height: 38px;
		text-align: center;
		/* background: red; */
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
		width: 800px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -300px;
		margin-left: -400px;
		background-color: #fff;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
	
	.recharge_title {
		font-size: 16px;
		color: #999;
		padding-left: 20px;
		margin-bottom: 20px;
	}
</style>

<!--添加店铺照片时候 的样式-->
<style rel="stylesheet/scss" lang="scss" scoped>
	.avatar-uploader .el-upload {
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
		float: left;
		margin-right: 15px;
	}
	
	.upload_img {
		width: 178px;
		height: 178px;
		line-height: 178px;
		/*background-color: #D6D6D6;*/
		border: 1px dashed #d9d9d9;
	}
	
	.upload_img:hover {
		background-color: #d9d9d9;
	}
</style>