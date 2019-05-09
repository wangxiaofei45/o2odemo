<!--公司档案 -->
<template>
	<div class="tab-container">
		<div>
			<el-row align="center">
				<el-row style="width: 990px;min-width: 900px;">
					<el-form ref="form" :model="form" label-width="90px">
						<el-row class="title">
							公司信息
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="公司名称">
									<el-input v-model="form.name" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="所在区域">
									<el-col :span="8">
										<el-select v-model="form.province_id" placeholder="请选择" style="width:300px" @change="selectOptions1">
											<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
											</el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="form.city_id" placeholder="请选择" style="width:300px" @change="selectOptions2">
											<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
											</el-option>
										</el-select>
									</el-col>
									<el-col :span="8">
										<el-select v-model="form.area_id" placeholder="请选择" style="width:300px">
											<el-option v-for="item in options3" :key="item.region_id" :label="item.region_name" :value="item.region_id">
											</el-option>
										</el-select>
									</el-col>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="详细地址">
									<el-input v-model="form.address" placeholder="请输入店铺经营地址"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item prop="businessLicense" label="经营执照">
							<el-input v-model='form.licenseimg' name="licenseimg" v-show="false" style="width: 200px;"></el-input>
							<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
								<div class="upload_img">
									<img style="width: 225px;height: 300px;" v-if="centermerchant.licenseimg" :src="centermerchant.licenseimg" />
									<img v-else src="../../../static/img/uploadImg.png" />
								</div>
							</el-upload>
						</el-form-item>
						<el-row class="title">
							公司法人
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="公司法人">
									<el-input v-model="form.legal_person"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item prop="positive_img" label="手持正面">
									<el-input v-model='form.positive_img' name="positive_img" v-show="false" style="width: 200px;"></el-input>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_2" :before-upload="beforeAvatarUpload">
										<div class="identityCard">
											<img style="width: 240px;height: 152px;" v-if="centermerchant.positive_img" :src="centermerchant.positive_img" />
											<img v-else src="../../../static/img/uploadImg.png" />
										</div>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item prop="back_img" label="手持背面">
									<el-input v-model='form.back_img' v-show="false" name="back_img" style="width: 200px;"></el-input>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_3" :before-upload="beforeAvatarUpload">
										<div class="identityCard">
											<img style="width: 240px;height: 152px;" v-if="centermerchant.back_img" :src="centermerchant.back_img" />
											<img v-else src="../../../static/img/uploadImg.png" />
										</div>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="title">
							联系人信息
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="联系人">
									<el-input v-model="form.contacts_name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="联系电话">
									<el-input v-model="form.phone"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<!--暂时保留-->
						<el-row align="center" class="submit_button">
							<el-col :span="24">
								<el-form-item label=" ">
								<el-button class="cancel" style="color: #ffffff;background-color: #cacccc;" @click="ajaxjson">
									取消
								</el-button>
								<el-button @click="onSubmit" type="primary" v-if="permission.indexOf(254)">保存</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-row>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission: [],
				imageUrl: '',
				imageUrl_1: '',
				postData: {}, //七牛上传参数
				form: {},
				options1: [], //省
				options2: [], //市
				options3: [], //区
				centermerchant: {
					licenseimg: '', //营业执照
					positive_img: '', //手持正面
					back_img: '', //手持背面
				},
			}
		},
		created() {
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
			this.ajaxjson();
			this.getadress();
		},
		methods: {
			ajaxjson() {
				this.$post(this.$archivesList).then((res) => {
					if(res.status_code == 0) {
						this.form = res.data;
						this.centermerchant.licenseimg = res.data.licenseimg;
						this.centermerchant.positive_img = res.data.positive_img;
						this.centermerchant.back_img = res.data.back_img;
						let postData = {
							region_id: res.data.province_id,
						}
						this.$post(this.$staticGetAddress, postData).then((res1) => {
							if(res1.status_code == 0) {
								this.options2 = res1.data.address;
								let postDatas = {
									region_id: res.data.city_id,
								}
								this.$post(this.$staticGetAddress, postDatas).then((res) => {
									let data = res;
									if(data.status_code == 0) {
										this.options3 = data.data.address;
									} else {}
								});
							} else {}
						});
					}
				})
			},
			getadress() {
				this.$post(this.$staticGetAddress).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options1 = data.data.address;
					} else {}
				});
			},
			selectOptions1(e) {
				let postData = {
					region_id: e,
				};
				this.options2 = [];
				this.form.city_id = '';
				this.options3 = [];
				this.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options2 = data.data.address;
					} else {}
				});
			},
			selectOptions2(e) {
				let postData = {
					region_id: e,
				};
				this.options3 = [];
				this.form.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options3 = data.data.address;
					} else {}
				});
			},
			//上传图片之前
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.postData.key = file.name; //上传时控制文件名
			},
			//上传营业执照
			handleAvatarSuccess_1(res, file) {
				this.centermerchant.licenseimg = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.form.licenseimg = res.key //本地地址上传展示
			},
			//上传手持身份证正面
			handleAvatarSuccess_2(res, file) {
				this.centermerchant.positive_img = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.form.positive_img = res.key //本地地址上传展示
			},
			//上传手持身份证背面
			handleAvatarSuccess_3(res, file) {
				this.centermerchant.back_img = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.form.back_img = res.key //本地地址上传展示
			},
			onSubmit() {
				let postData = this.$objDeepCopy(this.form)
				this.$post(this.$archivesEditCompany,postData).then((res)=>{
					if(res.status_code == 0){
						this.$message({
							type:'success',
							message:res.message,
						})
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
			//上传图片
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
				this.imageUrl_1.push(URL.createObjectURL(file.raw)) //暂时展示 的还是本地添加图片
				let arr = [];
				arr.push(res.key);
				this.good_info.goods_images = arr //本地地址上传展示

			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.tab-container {
		padding: 25px;
		.title {
			font-size: 15px;
			padding-left: 10px;
			border-left: #18CCBA 3px solid;
			margin-bottom: 15px;
		}
	}
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
		width: 225px;
		height: 300px;
		background-color: #e3e6e5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.upload_img:hover {
		background-color: #d9d9d9;
	}
	
	.identityCard {
		width: 240px;
		height: 152px;
		background-color: #e3e6e5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.identityCard:hover {
		background-color: #d9d9d9;
	}
	
	.submit_button .el-button {
		width: 120px;
		height: 40px;
	}
</style>