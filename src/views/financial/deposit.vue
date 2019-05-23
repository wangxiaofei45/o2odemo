<!-- 定金 -->
<template>
	<div>
		<div class="tab-container">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col :span="24">
							<el-button  type="primary" @click="closeAnAbccount" style="margin-right: 20px;">
								<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>新增</span>
							</el-button>
							<el-input placeholder="输入单据号" style="width:300px;margin-right: 20px;" v-model="formInline.document_num">
								<el-button slot="append" type="primary" @click='ajaxjson' style="background-color: #e0e0e0;border-radius: 0px;">
									<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
								</el-button>
							</el-input>
							<el-button type="primary" @click="showModel=!showModel">
								<svg-icon icon-class="filter" style="margin-right: 10px;" /> <span>筛选订单</span>
							</el-button>
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
									<el-option v-for="(item,index) in StaticGetBillingUser" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
						<el-col :span="24" style="text-align:center" class="bottomButton">
							<el-button @click="resetForm" name="cancel">清空</el-button>
							<el-button type="primary" @click="ajaxjson">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" :index="indexMethod" label="序号" fixed width="50" align="center">
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
						<el-button type="text" @click="cancelPutInStorage('accountFrom')" name="topRightCancel">
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
								<el-date-picker type="dateTime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="accountFrom.storage_date">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="供应商" prop="supplier_id">
								<el-select v-model="accountFrom.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联采购单号" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.join_code"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='earnest_money'>
								<el-input placeholder="请输入" v-model="accountFrom.earnest_money"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="请输入" v-model="accountFrom.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom bottomButton">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage('accountFrom')" name="cancel">
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
						<el-button type="text" @click="cancelAmend" name="topRightCancel">
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
								<el-date-picker type="dateTime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="amendInfo.storage_date" style="width:300px" :disabled='disabled'>
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
							<el-form-item label="采购单号" v-model="amendInfo.join_code">
								<el-input placeholder="请输入" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='earnest_money'>
								<el-input placeholder="请输入" v-model="amendInfo.earnest_money" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="请输入" v-model="amendInfo.remark" :disabled='disabled'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom bottomButton" v-if="disabled == 0">
						<el-col :span='24'>
							<el-button @click="cancelAmend" name="cancel">
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
						付款
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPay('payInfo')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<!--:rules="payRule"-->
				<el-form label-width="80px" :inline="true" :model="payInfo" ref="payInfo" class="demo-form-inline">
					<el-row>
						<el-row>
							<el-col :span="24" class="title">
								<svg-icon icon-class="dot" />支付金额
							</el-col>
							<el-col :span="12">
								<el-form-item label="合计金额">
									<el-input placeholder="" v-model='payInfo.total_money' disabled>
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								<svg-icon icon-class="dot" />支付方式
							</el-col>
							<el-col :span="12">
								<el-form-item label="现金" prop="cash_pay">
									<el-input placeholder="请输入" v-model="payInfo.cash_pay" @blur="sum">
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="微信" prop="wechat_pay">
									<el-input placeholder="请输入"  v-model="payInfo.wechat_pay" @blur="sum">
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="支付宝" prop="alipay_pay">
									<el-input placeholder="请输入" v-model="payInfo.alipay_pay" @blur="sum">
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="银行卡" prop="bank_card">
									<el-input placeholder="请输入"  v-model="payInfo.bank_card" @blur="sum">
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder="请输入" v-model="payInfo.allpayment" disabled>
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>

						</el-row>
					</el-row>
					<el-row class="bottom bottomButton">
						<el-col :span='24'>
							<el-button @click="cancelPay('payInfo')" name="cancel">
								取消
							</el-button>
							<el-button type="primary" @click="surePay('payInfo')">
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
				permission: [],
				showModel: false,
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
				payModel: false,
				SupplierCommonSupplierList: [], //
				amendModel: false, //修改时候的弹窗
				page: 1, //分页
				total: 0,
				per_page: 10,
				payInfo: {
					id: '',
					allpayment:'',
					total_money: '',
					bank_card: '',
					alipay_pay: '',
					wechat_pay: '',
					cash_pay: '',
				},
				payRule:{
					bank_card: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
					alipay_pay: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
					wechat_pay: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
					cash_pay: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
				},
				disabled: false,
				StaticGetBillingUser:[],//制单人列表
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList(); //获取供应商列表
			this.getStaticGetBillingUser();//获取制单人列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//付款
			pay(e) {
				this.payInfo.id = e.id;
				this.payInfo.total_money = e.earnest_money / 100;
				this.payModel = true;
			},
			cancelPay(e) {
				this.$refs[e].resetFields();
				this.payModel = false;
			},
			sum(){
				this.payInfo.allpayment = Number(this.payInfo.bank_card)+Number(this.payInfo.alipay_pay)+Number(this.payInfo.wechat_pay)+Number(this.payInfo.cash_pay);
			},
			//确定支付
			surePay(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.payInfo);
						for(var i in postData) {
							postData[i] = postData[i] * 100 + '';
						};
						postData.id = postData.id / 100 + '';
						this.$post(this.$earnestPayMoney, postData).then((res) => {
							if(res.status_code == 0) {
								this.ajaxjson();
								this.$refs[e].resetFields();
								this.payModel = false;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else {
						console.log('error submit!');
						return false;
					}
				});

			},
			//获取制单人列表
			getStaticGetBillingUser(){
				let postData = {
					shop_id:sessionStorage.getItem('shop_id'),
				};
				this.$post(this.$staticGetBillingUser,postData).then((res)=>{
					if(res.status_code == 0){
						this.StaticGetBillingUser = res.data.user_list;
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
						//						for(let i = 0; i < datas.length; i++) {
						//							datas[i].created_at = this.$formatTimestamp(datas[i].created_at);
						//						}
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
						postData.earnest_money = postData.earnest_money * 100 + '';
						this.$post(this.$earnestAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.$refs[e].resetFields();
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
				if(amendInfo.status == 1) {
					this.disabled = true;
				} else {
					this.disabled = false;
				}
				amendInfo.earnest_money = amendInfo.earnest_money / 100;
				this.amendInfo = amendInfo;
				this.amendModel = true;
			},
			//编辑
			amend(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amendInfo);
						postData.earnest_money = postData.earnest_money * 100 + '';
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
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
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
			cancelPutInStorage(e) {
				this.$refs[e].resetFields();
				this.PutInStorageModel = false;
			},
			//取消修改
			cancelAmend() {
				this.amendModel = false;
			},
			resetForm() {
				let formInline = {
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
		padding: 20px 20px 20px;
	}
	.search .el-input{
		min-width: 220px;
	}
	.search .el-select{
		min-width: 220px;
	}
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.tTable {
		margin-top: 20px;
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
			width: 960px;
			height: 340px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -170px;
			margin-left: -480px;
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
		.model_con .el-input {
			width: 300px;
		}
		.model_con .el-select {
			width: 300px;
		}
		.model_pay {
			width: 960px;
			height: 450px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -225px;
			margin-left: -480px;
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
		.model_pay .el-input{
			min-width: 300px;
		}
	}
	
	.delete {
		text-align: center;
		margin-top: 50px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 20px;
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