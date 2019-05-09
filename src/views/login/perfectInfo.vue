<template>
	<div class="container">
		<div class="titles">
			<img src="../../../static/img/login/banner_logo.svg" />
			<span>店铺信息</span>
		</div>
		<div class="perfectInfo">
			<div class="title">
				<p>完善店铺信息</p>
			</div>
			<el-form ref="form" :model="form" :rules="formRules" label-width="80px">
				<el-form-item label="店铺名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-row align="center">
					<el-col :span="24">
						<el-form-item label="所在区域">
							<el-col :span="8">
								<el-select v-model="form.province_id" placeholder="省份" style="width:300px" @change="selectOptions1">
									<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="8">
								<el-select v-model="form.city_id" placeholder="城市" style="width:300px" @change="selectOptions2">
									<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
									</el-option>
								</el-select>
							</el-col>
							<el-col :span="8">
								<el-select v-model="form.area_id" placeholder="区域" style="width:300px">
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
							<el-input v-model="form.address" placeholder="请输入"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row align="center">
					<el-col :span="8">
						<el-form-item label="早班时间">
							<el-time-picker format="HH:mm" value-format="timestamp" v-model="form.theAerlyTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<!-- value-format="HH:mm" -->
						<el-form-item label="午班时间">
							<el-time-picker format="HH:mm" value-format="timestamp" v-model="form.AfternoonTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="晚班时间">
							<el-time-picker format="HH:mm" value-format="timestamp" v-model="form.nightTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
							</el-time-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="联系人" prop="contacts_name">
					<el-input v-model="form.contacts_name" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input v-model="form.phone" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="固定电话" prop="phone">
					<el-input v-model="form.telphone" placeholder="请输入"></el-input>
				</el-form-item>
				<el-form-item label="经营描述" prop="phone">
					<el-input v-model="form.context" placeholder="请输入"></el-input>
				</el-form-item>
				<el-button type="primary" @click="onSubmit('form')">下一步</el-button>
			</el-form>
		</div>
	</div>

</template>
<style rel="stylesheet/scss" lang="scss" scoped>
	.perfectInfo {
		width: 980px;
		min-width: 900px;
		margin: 0 auto;
		text-align: center;
		.title {
			width: 100%;
			padding-top: 50px;
			color: #333333;
			font-size: 24px;
			margin-bottom:50px;
			.shop_name {
				font-size: 26px;
				color: #333;
				font-weight: bold;
			}
		}
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
				width: 160px;
				height: 40px;
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
	export default {
		data() {
			return {
				form: {}, //非必填
				options1: [],
				options2: [],
				options3: [],
				formRules: {
					name: [{
						required: true,
						message: '店铺名称为空',
						trigger: 'blur'
					}],
				}
			}

		},
		created() {
			this.ajaxjson();
			this.getadress(); //获取公司地址
		},
		methods: {
			ajaxjson() {
				this.$post(this.$userOrgInfo).then((res) => {
					if(res.status_code == 0) {
						this.form = res.data;
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
					} else {
						this.$message({
							type: 'error',
							message: res.message
						})
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
			//提交完善的信息
			onSubmit(formName) {
				//接口地址得写
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$post(this.$userOrgInfoUpdate, this.form).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$router.push({
									path: '/'
								})
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						this.message({
							type:'error',
							message:res.message,
						})
						return false;
					}
				});
			}
		}
	}
</script>