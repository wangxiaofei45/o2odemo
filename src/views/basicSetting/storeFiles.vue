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
									<el-input v-model="form.name" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="24">
								<el-form-item label="经营地址">
									<el-col :span="4">
										 <el-select v-model="form.province_id" placeholder="请选择" style="width:180px" @change="selectOptions1">
										    <el-option
										      v-for="item in options1"
										      :key="item.region_id"
										      :label="item.region_name"
										      :value="item.region_id">
										    </el-option>
										  </el-select>
									</el-col>
									<el-col :span="4">
										 <el-select v-model="form.city_id" placeholder="请选择" style="width:180px" @change="selectOptions2">
										    <el-option
										      v-for="item in options2"
										      :key="item.region_id"
										      :label="item.region_name"
										      :value="item.region_id">
										    </el-option>
										  </el-select>
									</el-col>
									<el-col :span="4">
										<el-select v-model="form.area_id" placeholder="请选择" style="width:180px">
										    <el-option
										      v-for="item in options3"
										      :key="item.region_id"
										      :label="item.region_name"
										      :value="item.region_id">
										    </el-option>
										  </el-select>
									</el-col>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="经营地址">
									<el-input v-model="form.address" placeholder="请输入店铺经营地址"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="6">
								<el-form-item label="早班时间">
									<el-time-picker format="HH:mm" value-format="timestamp" v-model="form.theAerlyTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<!-- value-format="HH:mm" -->
								<el-form-item label="午班时间">
									<el-time-picker format="HH:mm" value-format="timestamp" v-model="form.AfternoonTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="晚班时间">
									<el-time-picker format="HH:mm"  value-format="timestamp" v-model="form.nightTime" is-range start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px;">
									</el-time-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="联系人">
									<el-input v-model="form.contacts_name"></el-input>
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
									<el-input v-model="form.telphone" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center">
							<el-col :span="12">
								<el-form-item label="经营描述">
									<el-input type="textarea" v-model="form.context" placeholder="请输入"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row align="center" class="submit_button">
							<el-col :span="24" align="center">
								<el-button type="primary" @click="onSubmit" v-show="permission.indexOf(100)">保存</el-button>
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
				permission:[],
				imageUrl: '',
				imageUrl_1: '',
				postData: {}, //七牛上传参数
				form: {},
				options1:[],//省
				options2:[],//市
				options3:[],//区
			    formRules:{
			    	name: [{
						required: true,
						message: '店铺名称为空',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '经营地址为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '店铺名称为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '店铺名称为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '店铺名称为空',
						trigger: 'blur'
					}],
					
			    }

			}
		},
		created() {
			this.ajaxjson(); //请求模板列表的数据
			this.getadress();
//			this.$route.params.toPath;
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
			
		},
		methods: {
			ajaxjson() {
				this.$post(this.$archivesList).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.form = data.data;
					} else {}
				});
			},
			getadress() {
				this.$post(this.$staticGetAddress).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options1 = data.data.address;
					} else {}
				});
			},
			selectOptions1(e){
				let postData = {
					region_id:e,
				};
				this.options2 = [];
				this.form.city_id = '';
				this.options3 = []; 
				this.area_id = '';
				this.$post(this.$staticGetAddress,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options2 = data.data.address;
					} else {}
				});
			},
			selectOptions2(e){
				let postData = {
					region_id:e,
				};
				this.options3 = []; 
				this.form.area_id = '';
				this.$post(this.$staticGetAddress,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options3= data.data.address;
					} else {}
				});
			},
			onSubmit() {
				let form = this.$objDeepCopy(this.form);
				form.theAerlyTime = this.CombinationOfTime(form.theAerlyTime);
				form.AfternoonTime = this.CombinationOfTime(form.AfternoonTime);
				form.nightTime = this.CombinationOfTime(form.nightTime);
				this.$post(this.$archivesEditShop, form).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.$message({
							type: 'success',
							message: data.message,
						});
						this.ajaxjson();
						this.function_model = false;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			// 时间格式
			CombinationOfTime(arr){
				let str1 = arr[0]/1000;
				let str2 = arr[1]/1000;
				return str1 +"," +str2;
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