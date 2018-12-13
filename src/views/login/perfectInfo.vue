<template>
	<div class="perfectInfo">
		<div class="title">
			<p class="shop_name">XXX店欢迎你</p>
			<p>请完善店铺信息</p>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="活动名称">
				<el-input v-model="form.name" placeholder="需要与营业执照注册名称相同"></el-input>
			</el-form-item>
			<el-form-item label="经营地址">
				<el-input v-model="form.name" placeholder="请填写店铺经营地址"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="form.name" placeholder="请填写联系人"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="form.name" placeholder="请填写联系电话"></el-input>
			</el-form-item>
			<el-button type="primary" @click="onSubmit">下一步</el-button>
		</el-form>
	</div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
	.perfectInfo{
		width: 50%;
		min-width: 600px;
		margin: 0 auto;
		text-align: center;
		.title{
			width: 100%;
			padding-top:50px;
			.shop_name{
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
					name: '',
				}
			}
		},
		methods: {
			onSubmit() {
				this.$router.push({
					path: '/reminder'
				})
			}
		}
	}
</script>