<template>
	<div class="perfectInfo">
		<div class="title">
			<p class="shop_name">XXX店欢迎你</p>
			<p>请完善店铺信息</p>
		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="店铺名称" prop="name">
				<el-input v-model="form.name" placeholder="需要与营业执照注册名称相同"></el-input>
			</el-form-item>
			<el-form-item label="经营地址" prop="address">
				<el-input v-model="form.address" placeholder="请填写店铺经营地址"></el-input>
			</el-form-item>
			<el-form-item label="联系人" prop="contacts_name">
				<el-input v-model="form.contacts_name" placeholder="请填写联系人"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" prop="phone">
				<el-input v-model="form.phone" placeholder="请填写联系电话"></el-input>
			</el-form-item>
			<el-button type="primary" @click="onSubmit('form')">下一步</el-button>
		</el-form>
	</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
	.perfectInfo {
		width: 50%;
		min-width: 600px;
		margin: 0 auto;
		text-align: center;
		.title {
			width: 100%;
			padding-top: 50px;
			.shop_name {
				font-size: 26px;
				color: #333;
				font-weight: bold;
			}
		}
	}
</style>
<script>
	export default {
		data() {
			return {
				form: {
					name: '', //名称
					address: '', //地址
					contacts_name: '', //联系人姓名
					phone: '', //联系电话
				},
				rules: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					contacts_name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//提交完善的信息
			onSubmit(formName) {
				//接口地址得写
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$post(this.$userPerfectinfo,this.form).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$router.push({ path: '/' })
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>