<!--公司档案 -->
<template>
	<div class="tab-container">
		<!--<div style="padding-left:20%;padding-top:5%;">-->
		<div>

			<el-row align="center">
				<el-row :span="20">
					<el-form ref="form" :model="form" label-width="90px" style="width:80%;">
						<el-row class="title">
							企业信息
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="企业名称">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="营业执照">
									<div v-if="imageUrl_1.length>0" v-for="(item,index) in imageUrl_1" :key="index">
										<img :src="item" class="avatar">
									</div>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
										<div class="upload_img">
											上传图片
										</div>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="title">
							企业法人
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="企业法人">
									<el-input v-model="form.enterpriseLegalPerson"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="身份证正面">
									<div v-if="imageUrl_1.length>0" v-for="(item,index) in imageUrl_1" :key="index">
										<img :src="item" class="avatar">
									</div>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
										<div class="upload_img">
											上传图片
										</div>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="身份证反面">
									<div v-if="imageUrl_1.length>0" v-for="(item,index) in imageUrl_1" :key="index">
										<img :src="item" class="avatar">
									</div>
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
										<div class="upload_img">
											上传图片
										</div>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row class="title">
							联系人信息
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="联系人">
									<el-input v-model="form.linkman"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="联系电话">
									<el-input v-model="form.phone"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<!--暂时保留-->
						<el-row align="center" class="submit_button">
							<el-col :span="6" align="center">
								<el-button>取消</el-button>
								<el-button type="primary">保存</el-button>
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
				imageUrl: '',
				imageUrl_1: '',
				postData: {}, //七牛上传参数
				form: {
					name: '', //企业名称
					address: '', //经营地址
					license: '', //营业执照
					enterpriseLegalPerson: '', //企业法人
					theFrontOfIdcard: '', //身份证正面
					backFaceOfIdCard: '', //身份证背面
					linkman: '', //联系人
					phone: '', //联系电话
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
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
			font-size: 16px;
			height: 24px;
			line-height: 24px;
			padding-left: 10px;
			border-left: #18CCBA 3px solid;
			margin-bottom: 15px;
		}
	}
	
	.el-form-item__label {
		width: 100px !important;
	}
	
	.el-input {
		width: 90% !important;
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
		width: 178px;
		height: 178px;
		line-height: 178px;
		/*background-color: #D6D6D6;*/
		border: 1px dashed #d9d9d9;
	}
	
	.upload_img:hover {
		background-color: #d9d9d9;
	}
	
	.submit_button .el-button {
		width: 120px;
		height: 40px;
	}
</style>