<!-- 定金 -->
<template>
	<div>
		<div class="tab-container">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button v-show="permission.indexOf('155') != -1" type="primary" @click="closeAnAbccount">新增</el-button>
						<el-input style="width:200px" v-model="formInline.document_num"></el-input>
						<el-button type="primary" @click="ajaxjson">搜索</el-button>
						<el-button type="primary" @click="showModel=!showModel">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search" v-show="showModel">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker type="datetime" placeholder="选择日期" v-model="formInline.startTime" value-format="yyyy-MM-dd HH:mm:ss">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker type="datetime" placeholder="选择日期" v-model="formInline.endTime" value-format="yyyy-MM-dd HH:mm:ss">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="formInline.user_id" placeholder="请选择">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="2">全部</el-radio>
									<el-radio :label="1">已付款</el-radio>
									<el-radio :label="0">未付款</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24" style="text-align:center">
							<el-button @click="resetForm">清空</el-button>
							<el-button type="primary" @click="ajaxjson">确定</el-button>
						</el-col>
					</el-row>
			</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="200" align="center">
						<template slot-scope="scope">
							<span @click="goToEditor(scope.row)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" fixed width="180" align="center">
					</el-table-column>
					<el-table-column prop="supplier_name" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="join_code" label="关联采购单号" width="100" align="center">
					</el-table-column>
					<el-table-column prop="earnest_money" label="金额" width="100" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.earnest_money/100}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="单据状态" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 1">已付款</span>
							<span v-if="scope.row.status == 0">未付款</span>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="180" align="center">
						<template slot-scope="scope" v-if="scope.row.status == 0">
							<el-button v-show="permission.indexOf('156') != -1" @click="pay(scope.row)" type="warning" size="mini">付款</el-button>
							<el-button v-show="permission.indexOf('157') != -1" @click="deletes(scope.row.id)" type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--新增-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="100px" :model="accountFrom" :rules="ruleaccountFrom" ref="accountFrom" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="单据号">
								<el-input placeholder="" v-model="accountFrom.document_num" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="日期">
								<el-date-picker type="dateTime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="accountFrom.storage_date" style="width:180px">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商" prop="supplier_id">
								<el-select v-model="accountFrom.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联采购单号" v-model="accountFrom.join_code">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='earnest_money'>
								<el-input placeholder="" v-model="accountFrom.earnest_money"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="" v-model="accountFrom.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage">
								取消
							</el-button>
							<el-button type="primary" @click="AddOtherCost('accountFrom')">
								保存
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>

		<!--编辑-->
		<div class="model" v-show="amendModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmend">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="100px" :model="amendInfo" :rules="ruleaccountFrom" ref="amendInfo" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="单据号">
								<el-input placeholder="" v-model="amendInfo.document_num" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="日期">
								<el-date-picker type="dateTime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="amendInfo.storage_date" style="width:180px" :disabled='disabled'>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商" prop="supplier_id">
								<el-select v-model="amendInfo.supplier_id" placeholder="请选择" :disabled='disabled'>
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联采购单号" v-model="amendInfo.join_code">
								<el-input placeholder="" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='earnest_money'>
								<el-input placeholder="" v-model="amendInfo.earnest_money" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="" v-model="amendInfo.remark" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom" v-if="disabled == 0">
						<el-col :span='24'>
							<el-button @click="cancelAmend">
								取消
							</el-button>
							<el-button v-show="permission.indexOf('232') != -1" type="primary" @click="amend('amendInfo')">
								保存
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		
		<!--付款-->
		<div class="model" v-show="payModel">
			<div class="model_pay">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						结账
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPay">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="80px" :inline="true" v-model="payInfo" class="demo-form-inline">
					<el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付金额
							</el-col>
							<el-col :span="12">
								<el-form-item label="合计金额">
									<el-input placeholder="" v-model='payInfo.total_money'></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付方式
							</el-col>
							<el-col :span="12">
								<el-form-item label="现金">
									<el-input placeholder="" v-model="payInfo.cash_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="微信">
									<el-input placeholder="" v-model="payInfo.wechat_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="支付宝">
									<el-input placeholder="" v-model="payInfo.alipay_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="银行卡">
									<el-input placeholder="" v-model="payInfo.bank_card"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder="" v-model="payInfo.total_payment"></el-input>
								</el-form-item>
							</el-col>
							
						</el-row>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPay">
								取消
							</el-button>
							<el-button type="primary" @click="surePay">
								确定
							</el-button>
						</el-col>
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
				showModel:false,
				//首页表单提交的数据
				formInline: {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商列表
					user_id: '', //制单人
					status: 2, //单据状态
				},
				//添加时候的提交数据
				accountFrom: {
					document_num: '', //单据号
					storage_date: '', //日期,时间戳
					supplier_id: '', //供应商为空
					join_code: '', //关联单据号
					remark: '', //备注
					earnest_money: '', //费用名称
				},
				amendInfo: {}, //编辑时候的
				ruleaccountFrom: {
					supplier_id: [{
						required: true,
						message: '请选择供应商供应商',
						trigger: 'change'
					}],
					earnest_money: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
				},
				data: [], //展示出来的数据
				PutInStorageModel: false,
				payModel:false,
				SupplierCommonSupplierList: [], //
				amendModel: false, //修改时候的弹窗
				page: 1, //分页
				total: 0,
				per_page: 10,
				payInfo:{
					id:'',
					total_money:'',
					bank_card:'',
					alipay_pay:'',
					wechat_pay:'',
					cash_pay:'',
				},
				disabled:false,
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList(); //获取供应商列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},

		methods: {
			//付款
			pay(e){
				this.payInfo.id = e.id;
				this.payInfo.total_money = e.earnest_money/100;
				this.payModel = true;
			},
			cancelPay(){
				this.payModel = false;
			},
			//确定支付
			surePay(){
				let postData = this.$objDeepCopy(this.payInfo);
				for(var i in postData) {
				     postData[i] = postData[i]*100 +'';
				};
				postData.id = postData.id/100 +'';
				this.$post(this.$earnestPayMoney,postData).then((res)=>{
					if(res.status_code == 0) {
						this.ajaxjson();
						this.payModel = false;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			ajaxjson() {
				//合并提交
				let postData = Object.assign(this.formInline, {
					page: this.page,
					per_page: this.per_page,
				})
				this.$post(this.$earnestList, postData).then((res) => {
					if(res.status_code == 0) {
						let datas = res.data.data;
						for(let i = 0; i < datas.length; i++) {
							datas[i].created_at = this.$formatTimestamp(datas[i].created_at);
						}
						this.data = datas;
						this.total = res.data.total;
						this.per_page = res.data.per_page;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//新增
			AddOtherCost(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.accountFrom);
						postData.user_id = sessionStorage.getItem('id');
						postData.earnest_money = postData.earnest_money*100 +'';
						this.$post(this.$earnestAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.PutInStorageModel = false;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//删除
			deletes(e) {
				let postData = {
					id: e + ''
				};
				this.$delete(this.$earnestDelEarnest, postData);
			},
			//打开编辑
			goToEditor(e) {
				let amendInfo = this.$objDeepCopy(e);
				amendInfo.dateTime = this.$formatTimestamp(amendInfo.created_at);
				if(amendInfo.status == 1){
					this.disabled = true;
				}else{
					this.disabled = false;
				}
				amendInfo.earnest_money = amendInfo.earnest_money/100;
				this.amendInfo = amendInfo;
				this.amendModel = true;
			},
			//编辑
			amend(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amendInfo);
						postData.earnest_money = postData.earnest_money*100 + '';
						this.$post(this.$earnestEditEarnest, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.amendModel = false;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//分页
			handleSizeChange(val) {
				this.per_page = val;
				this.getSaleInfo();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getSaleInfo();
			},
			//新增生成单号
			closeAnAbccount() {
				let postData = {
					code: 153,
				}
				this.$post(this.$storageGetBarCode, postData).then((res) => {
					if(res.status_code == 0) {
						this.accountFrom.document_num = res.data.document_num;
						this.PutInStorageModel = true;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
				this.accountFrom.storage_date = this.$getData();
			},
			//获取供应商列表
			getSupplierCommonSupplierList() {
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.SupplierCommonSupplierList = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			cancelPutInStorage() {
				this.PutInStorageModel = false;
			},
			//取消修改
			cancelAmend() {
				this.amendModel = false;
			},
			resetForm() {
				let formInline =  {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商列表
					user_id: '', //制单人
					status: 2, //单据状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		background: #f4f4f4;
		padding: 20px;
		min-width: 1300px;
	}
	
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.tTable {
		margin-top: 20px;
		min-width: 1200px;
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
		.model_con {
			width: 650px;
			height: 340px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -170px;
			margin-left: -325px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
			.bottom {
				text-align: center;
			}
			.title {
				color: #666666;
				font-size: 16px;
			}
		}
		.model_pay{
			width: 650px;
			height: 450px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -170px;
			margin-left: -325px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
			.bottom {
				text-align: center;
			}
			.title {
				color: #666666;
				font-size: 16px;
			}
		}
	}
	
	.delete {
		text-align: center;
		margin-top: 50px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
</style>
<style type="text/css">
	.el-button--warning {
	    background-color: #f48b25;
	}
	.el-button--danger {
		background-color: #ef4d4c;
	}
</style>