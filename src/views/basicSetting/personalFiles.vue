<!--个人档案 -->
<template>
	<div class="tab-container">
		<div>
			<el-row align="center">
				<el-row :span="20">
					<el-form ref="form" :model="form" label-width="90px" style="width:80%;">
						<el-row class="title">
							请完善个人信息
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="手机号">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="姓名">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="性别">
									<el-select v-model="form.value" placeholder="请选择">
										<el-option label="男" value="1">
										</el-option>
										<el-option label="女" value="2">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="身份证">
									<el-input v-model="form.name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="出生日期">
									<el-date-picker v-model="form.name" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="入店时间">
									<el-date-picker v-model="form.name" type="date" placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center" class="submit_button">
							<el-col :span="24" align="center">
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
				form: {
					name: '', //姓名
					sex:'',// 性别
					phone: '', //联系电话
					birth_time:'',//出生日期
				}
			}
		},
		created() {
			this.ajaxjson(); //请求模板列表的数据
		},
		methods: {
			// 提交数据的接口
			onSubmit() {
				let postData = this.form;
				this.$post(this.$archivesEditUser,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.form = data.data;
					} else {}
				});
			},
			ajaxjson() {
				this.$post(this.$archivesList).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.form = data.data;
					} else {}
				});
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