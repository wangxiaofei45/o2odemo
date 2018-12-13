<!--公司档案 -->
<template>
	<div class="tab-container">
		<!--<div style="padding-left:20%;padding-top:5%;">-->
		<div>

			<el-row align="center">
				<el-row :span="20">
					<el-form ref="form" :model="form" label-width="90px" style="width:80%;">
						<el-row class="title">
							请完善商品信息
						</el-row>

						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="店铺名称">
									<el-input v-model="form.BodyShop" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="经营地址">
									<el-col :span="4"><el-input v-model="form.area"></el-input></el-col>
									<el-col :span="4"><el-input v-model="form.area"></el-input></el-col>
									<el-col :span="4"><el-input v-model="form.area"></el-input></el-col>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="">
									<el-input v-model="form.detailAddress" placeholder="请输入店铺经营地址"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="6">
								<el-form-item label="早班时间">
									<el-time-picker v-model="form.theAerlyTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
									<!--<el-input v-model="form.theAerlyTime"></el-input>-->
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="午班时间">
									<el-time-picker v-model="form.AfternoonTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
									<!--<el-input v-model="form.AfternoonTime"></el-input>-->
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="晚班时间">
									<el-time-picker v-model="form.nightTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
									<!--<el-input v-model="form.nightTime"></el-input>-->
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="联系人">
									<el-input v-model="form.linkMen"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="联系电话">
									<el-input v-model="form.phone" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="固定电话">
									<el-input v-model="form.fixedLinePhone" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="经营描述">
									<el-input type="textarea" v-model="form.describe" placeholder="请输入"></el-input>
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
				imageUrl: '',
				imageUrl_1: '',
				postData: {}, //七牛上传参数
				form: {
					BodyShop: '', //店铺主体
					area: '', //所在区域
					detailAddress: '', //详细地址
					theAerlyTime: '', //早班时间
					AfternoonTime: '', //午班时间
					nightTime: '', //晚班时间 
					linkMen: '', //联系人
					phone: '', //联系电话
					fixedLinePhone: '', //固定电话
					describe: '', //描述
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
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
	
	.submit_button .el-button {
		width: 120px;
		height: 40px;
	}
</style>