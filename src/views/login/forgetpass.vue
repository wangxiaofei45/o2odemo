<template>
	<div class="container">
		<div class="titles">
			<img src="../../../static/img/login/banner_logo.svg" />
			<span>账号管理中心</span>
		</div>
		<div class="perfectInfo" v-show="showModel == 1">
			<div class="title">
				<p>输入账号</p>
			</div>
			<el-row>
				<!--:rules="formRules"-->
				<el-form ref="form" :model="form" :rules="formRules" label-width="80px">
					<el-col :span='24'>
						<el-form-item label="账号" prop="mobile">
							<el-input style="width: 300px;" v-model="form.mobile" placeholder="手机号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="验证码" prop="captcha">
							<el-input style="width: 300px;" v-model="form.captcha" placeholder="输入验证码"></el-input> <span class="forgetpsw" @click="sendCode">发送验证码</span>
						</el-form-item>
					</el-col>
					<el-col :span="24" style="text-align: center;">
						<el-button type="primary" @click="onSubmit('form')">下一步</el-button>
					</el-col>
				</el-form>
			</el-row>
		</div>
		<div class="perfectInfo" v-show="showModel == 2">
			<div class="title">
				<p>输入账号</p>
			</div>
			<el-row>
				<!--:rules="formRules"-->
				<el-form ref="pass" :model="pass" :rules="passRules" label-width="80px">
					<el-col :span='24'>
						<el-form-item label="新密码" prop="password">
							<el-input style="width: 300px;" v-model="pass.password" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="确认密码" prop="password_two">
							<el-input style="width: 300px;" v-model="pass.password_two" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24" style="text-align: center;">
						<el-button type="primary" @click="amendPass('pass')">下一步</el-button>
					</el-col>
				</el-form>
			</el-row>
		</div>
	</div>

</template>
<style rel="stylesheet/scss" lang="scss" scoped>
	.perfectInfo {
		width: 500px;
		margin: 0 auto;
		.title {
			width: 100%;
			padding-top: 50px;
			color: #333333;
			font-size: 24px;
			text-align: center;
			margin-bottom:50px;
			.shop_name {
				font-size: 26px;
				color: #333;
				font-weight: bold;
			}
		}
	}
	
	.forgetpsw {
		font-size: 14px;
		color: #18ccba;
		font-family: "微软雅黑";
		margin-left: 20px;
		cursor: pointer;
	}
	
	.container {
		.titles {
			width: 100%;
			height: 80px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background-color: #2e3332;
			img {
				/*width: 160px;
				height: 40px;*/
				margin-left: 50px;
			}
			span {
				font-size: 24px;
				color: #ffffff;
				padding: 0px 25px;
				border-left: 2px solid #ffffff;
				margin-left: 25px;
			}
		}
	}
</style>
<script>
	import axio from 'axios';
	export default {
		data() {
			return {
				showModel:1,
				form: {
					mobile: '', //手机号
					captcha: '', //验证码
				}, //非必填
				formRules: {
					mobile: [{
						required: true,
						trigger: 'blur',
						message: '手机号为空',
					}],
					captcha: [{
						required: true,
						trigger: 'blur',
						message: '验证码为空',
					}]
				},
				pass: {
					password: '', //手机号
					password_two: '', //验证码
				}, //非必填
				passRules: {
					password: [{
						required: true,
						trigger: 'blur',
						message: '请输入密码',
					}],
					password_two: [{
						required: true,
						trigger: 'blur',
						message: '请确定密码',
					}]
				}
			}
		},
		methods: {
			//发送验证码
			sendCode() {
				let postData = {
					mobile: this.form.mobile,
				};
				this.$post(this.$commonSend,postData).then((res)=>{
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
			//下一步
			onSubmit(formName) {
				//接口地址得写
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.showModel = 2;
					} else {
						return false;
					}
				});
			},
			//确定修改密码
			amendPass(formName){
				this.$refs[formName].validate((valid) => {
					if(valid) {
					 	let postData = Object.assign(this.form,this.pass);
					 	this.$post(this.$commonResetPassword,postData).then((res)=>{
					 		if(res.status_code == 0){
					 			this.$message({
					 				type:'success',
					 				message:res.message,
					 			})
					 			this.$router.push({
									path: '/'
								})
					 		}else{
					 			this.$message({
					 				type:'success',
					 				message:res.message,
					 			})
					 		}
					 	})
					} else {
						return false;
					}
				});
			}
		}
	}
</script>