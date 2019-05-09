<!--零售开票-->
<template>
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col>
						<el-button v-show="permission.indexOf('240') != -1 ||permission.indexOf('241') != -1||permission.indexOf('242') != -1" type="primary" @click="closeAnAbccount">
							<svg-icon icon-class="icon_turn" style="margin-right: 5px;" /> <span>结算</span>
						</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search">
				<el-form label-width="60px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="formInline.document_num" placeholder="请输入单据号" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="formInline.dates" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="营业员">
								<el-select v-model="formInline.sales_id" placeholder="请选择">
									<el-option v-for="(item,index) in seller" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input placeholder="请输入" v-model="formInline.remark"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="收银员">
								<el-input v-model="formInline.user_name" disabled></el-input>
								<!--<el-select v-model="formInline.user_id" placeholder="请选择">
									<el-option v-for="(item,index) in StaticGetBillingUser" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="会员">
								<el-select style="width: 200px;" v-model="formInline.member_id" filterable remote reserve-keyword placeholder="请输入姓名或手机号" @change="selectPhone" :remote-method="remoteMethod" :loading="loading">
									<el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
								<el-button type="text" @click="open_check_group">
									<i class="el-icon-circle-plus" style="font-size: 16px;"></i>
								</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="10" v-if="memberInfo.id">
							<el-form-item label-width="70px" label="会员余额">
								<span>{{memberInfo.revenue/100}}</span>
							</el-form-item>
							<el-form-item label-width="70px" label="会员折扣">
								<span>{{Number(memberInfo.discount)/100}}</span>
								<el-button type="primary" size="mini" @click="recharge(memberInfo.id)">
									充值
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-row class="search2" style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="12">
					<el-button type="text"></el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-input placeholder="请输入条码" v-model="bar_code" class="input-with-select" style="width: 400px;" @keyup.enter.native="addgoods">
					</el-input>
				</el-col>
			</el-row>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini" show-summary :summary-method="getSummaries">
					<el-table-column type="index" label="序号" fixed width="80" align="center">
					</el-table-column>
					<el-table-column prop="barcode" label="条形码" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品名称规格" width="150" align="center">
						<template slot-scope="scope">
							{{scope.row.goods_name}},{{scope.row.specnamestr}}
						</template>
					</el-table-column>
					<el-table-column prop="stock" label="数量" width="150" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.stock" @blur="multiply(scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="150" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="discount" width="150" label="折扣" align="center">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.discount" @blur="multiply(scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="unit_price" width="150" label="折后价" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.unit_price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_price" label="小计">
						<template slot-scope="scope">
							<span>{{(scope.row.total_price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_price" label="操作">
						<template slot-scope="scope">
							<el-button type="primary" size="mini">
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!--弹窗-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						结算
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="80px" :inline="true" v-model="accountFrom" class="demo-form-inline">
					<el-row style="padding: 0px 20px;">
						<el-row>
							<el-col :span="24" class="title">
								<svg-icon icon-class="dot" />支付金额
							</el-col>
							<el-row>
								<el-col :span="12">
									<el-form-item label="合计金额">
										<el-input placeholder="" v-model='accountFrom.need_pay' disabled>
											<template slot="append" class="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="整单打折">
										<el-input placeholder="" v-model='accountFrom.discount' @blur="sumAmountPayable" :disabled="canchange">
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="优惠金额">
										<el-input placeholder="" @blur="sumAmountPayable" v-model='accountFrom.preferential'>
											<template slot="append" class="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="应结金额">
										<el-input placeholder="" v-model="accountFrom.payment" disabled>
											<template slot="append" class="append">元</template>
										</el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								<svg-icon icon-class="dot" />支付方式
							</el-col>
							<el-col :span="12" v-for="(item,index) in accountFrom.payment_method" :key="item.id">
								<el-form-item :label="item.name">
									<el-input placeholder="" v-model="item.amount" @blur="sumpay">
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder="" v-model="accountFrom.total_payment" disabled>
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="找零">
									<el-input placeholder="" v-model="accountFrom.give_change" disabled>
										<template slot="append" class="append">元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
					<el-row class="bottom bottomButton">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage" name="cancel">
								取消
							</el-button>
							<el-button type="primary" @click="pay">
								确定
							</el-button>
							<!--<el-button type="primary">
								结算并打印
							</el-button>-->
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>

		<div class="model" v-show="recharge_model">
			<div class="model_cons">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						充值
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelRecharge" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="rechargeFrom" ref="rechargeFrom" :rules="rechargeRule" label-width="100px">
					<el-row>
						<el-col :span="24" class="recharge_title">
							<svg-icon icon-class="dot" />支付金额
						</el-col>
						<el-col :span="12">
							<el-form-item label="充值金额" prop="pay_money">
								<el-input placeholder="请输入" v-model="rechargeFrom.pay_money">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>

						<el-col :span="24" class="recharge_title">
							<svg-icon icon-class="dot" />支付方式
						</el-col>
						<el-col :span="12">
							<el-form-item label="现金" prop="cash_pay">
								<el-input placeholder="请输入" v-model="rechargeFrom.cash_pay">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="微信" prop="wechat_pay">
								<el-input placeholder="请输入" v-model="rechargeFrom.wechat_pay">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="支付宝" prop="alipay_pay">
								<el-input placeholder="请输入" v-model="rechargeFrom.alipay_pay">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="银行卡" prop="bank_card">
								<el-input placeholder="请输入" v-model="rechargeFrom.bank_card">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<!-- <el-col :span="12">
							<el-form-item label="付款合计" prop="total">
								<el-input v-model="rechargeFrom.total">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="找零" prop="change">
								<el-input v-model="rechargeFrom.change">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col> -->
					</el-row>
					<el-row style="text-align: center;" class="bottomButton">
						<el-button @click="cancelRecharge" name="cancel">取消</el-button>
						<el-button type="primary" @click="submitrechargeForm('rechargeFrom')" align="center">结算</el-button>
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
				recharge_model: false,
				canchange: false,
				permission: [],
				memberList: [],
				loading: false,
				memberInfo: {},
				//表单
				formInline: {
					document_num: '',
					dates: '',
					sales_id: '', //营业员id
					remark: '', //摘要
					member_id: '', //会员id
					user_id:sessionStorage.getItem("id"),//收银员的id
					user_name:sessionStorage.getItem("name"),
				},
				accountFrom: {},
				seller: [],
				data: [], //展示出来的数据
				PutInStorageModel: false,
				bar_code: '', //条码
				need_pay: '',
				stock: '',
				rechargeFrom: {
					id: '',
					pay_money: '', //充值金额
					cash_pay: '', //现金
					wechat_pay: '', //微信
					alipay_pay: '', //支付宝
					bank_card: '', //银行卡
				},
				rechargeRule: {
					pay_money: {
						required: true,
						message: '请输入充值金额',
						trigger: 'blur'
					},
				},
				StaticGetBillingUser:[],
			}
		},
		created() {
			this.getBarCode(); //获取条形码
			this.getSeller(); //获取营业员
			this.getData(); //显示当前时间
			this.getStaticGetBillingUser();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
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
			//跳转到添加会员页面
			open_check_group() {
				this.$router.push({
					path: '/StoreTheData/CustomerList'
				})
			},
			recharge(e) {
				this.rechargeFrom.id = e;
				this.recharge_model = true;
			},
			//取消充值信息
			cancelRecharge() {
				this.recharge_model = false;
			},
			//提交充值信息
			submitrechargeForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.rechargeFrom);
						for(var item in postData) {
							postData[item] = Number(postData[item]) * 100 + '';
						}
						postData.id = Number(postData.id) / 100;
						this.$post(this.$memberRecharge, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									message: data.message,
									type: 'success'
								});
								this.memberInfo = res.data.memberInfo;
								this.recharge_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			sumAmountPayable() {
				let payment = 0;
				payment = this.accountFrom.need_pay * this.accountFrom.discount - this.accountFrom.preferential;
				payment = payment.toFixed(2);
				this.accountFrom.payment = payment;
			},
			sumpay() {
				let sum = 0;
				for(let i = 0; i < this.accountFrom.payment_method.length; i++) {
					sum = sum + Number(this.accountFrom.payment_method[i].amount);
				};
				sum = sum.toFixed(2);
				this.accountFrom.total_payment = sum;
				if(this.accountFrom.total_payment > this.accountFrom.payment) {
					let give_change = this.accountFrom.total_payment - this.accountFrom.payment;
					this.accountFrom.give_change = give_change;
				} else {
					this.accountFrom.give_change = 0;
				}
			},
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					let postData = {
						search: query,
						page: 1,
					}
					this.$post(this.$memberSearchMember, postData).then((res) => {
						if(res.status_code == 0) {
							this.memberList = res.data;
							this.loading = false;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					})
				} else {
					this.memberList = [];
				}
			},
			addchange(val) {
				console.log("选中当前行")
			},
			//获取条形码
			getBarCode() {
				let postData = {
					code: 110,
				}
				this.$post(this.$storageGetBarCode, postData).then((res) => {
					if(res.status_code == 0) {
						this.formInline.document_num = res.data.document_num;
					}
				})
			},
			//获取营业员
			getSeller() {
				this.$post(this.$retailopenbillGetSeller).then((res) => {
					if(res.status_code == 0) {
						this.seller = res.data
					}
				})
			},
			getData() {
				let date = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let dataStr = Y + M + D;
				this.formInline.dates = dataStr;
			},
			addgoods(e) {
				let postData = {
					type: '1',
					bar_code: this.bar_code,
				}
				this.$post(this.$staticGetCodeGoods, postData).then((res) => {
					if(res.status_code == 0) {
						let datas = res.data;
						datas.norm = datas.specnamestr; //商品名称
						datas.stock = 1; //数量
						datas.price = datas.sku_price; //吊牌价
						let discount = 1.00;
						//						let memberDiscount = this.memberInfo.discount?this.memberInfo.discount/100:1.00;
						datas.discount = discount.toFixed(2);
						datas.unit_price = Number(datas.discount) * Number(datas.price); //折后价
						datas.total_price = Number(datas.stock) * Number(datas.unit_price); //小计
						datas.total_really_money = Number(datas.stock) * Number(datas.unit_price); //真实金额
						let canAdd = true;
						for(let i = 0; i < this.data.length; i++) {
							if(datas.sku_id == this.data[i].sku_id) {
								canAdd = false;
							}
						};
						if(canAdd) {
							this.data.push(datas);
						} else {
							this.$message({
								type: 'error',
								message: "您已经添加过该商品了",
							})
						}
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//计算
			multiply(e) {

				e.unit_price = Number(e.discount) * Number(e.price); //折后价
				e.total_price = Number(e.stock) * Number(e.unit_price); //小计
				e.total_really_money = Number(e.stock) * Number(e.unit_price); //真实金额
			},
			//选择后的会员
			selectPhone(e) {
				let memberList = this.$coppyArray(this.memberList);
				for(let i = 0; i < memberList.length; i++) {
					if(e == memberList[i].id) {
						this.memberInfo = memberList[i];
					}
				}
			},
			//结算
			closeAnAbccount() {
				let postData = this.$objDeepCopy(this.formInline);
				if(postData.member_id == '') {
					postData.member_id = 0;
				}
				let arr = this.$coppyArray(this.data);
				for(let i = 0; i < arr.length; i++) {
					arr[i].total_really_money = arr[i].total_really_money / 100;
					arr[i].discount = arr[i].discount * 100;
				}
				postData.need_pay = this.need_pay;
				postData.stock = this.stock;
				postData.phone = this.memberInfo.phone ? this.memberInfo.phone : '';
				postData.goodsData = JSON.stringify(arr);
				this.$post(this.$retailopenbillAdd, postData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						})
						let postDatas = {
							id: res.data.rob_id
						}
						this.getBarCode(); //获取单据号
						this.$post(this.$retailopenbillPayInfo, postDatas).then((res) => {
							if(res.status_code == 0) {
								this.accountFrom = res.data;
								this.accountFrom.payment = this.accountFrom.payment / 100;
								this.accountFrom.discount = this.accountFrom.discount / 100;
								this.accountFrom.preferential = this.accountFrom.preferential / 100;
								this.accountFrom.need_pay = this.accountFrom.need_pay / 100;
								if(this.accountFrom.preferential > 0) {
									this.canchange = true;
								} else {
									this.canchange = false;
								}
							} else {

							}
						})
						this.PutInStorageModel = true;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//发起支付
			pay() {
				let postData = this.$objDeepCopy(this.accountFrom);
				let payment_method = this.$coppyArray(this.accountFrom.payment_method);
				for(let i = 0; i < payment_method.length; i++) {
					payment_method[i].amount = Number(payment_method[i].amount) * 100;
				};
				postData.payment_method = JSON.stringify(payment_method);
				postData.payment = postData.payment * 100;
				postData.discount = postData.discount * 100;
				postData.preferential = postData.preferential * 100;
				postData.need_pay = postData.need_pay * 100;
				postData.total_payment = postData.total_payment * 100;
				postData.give_change = postData.give_change * 100;
				this.$post(this.$retailopenbillComplete, postData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						this.PutInStorageModel = false;
						this.formInline.sales_id = '';
						this.formInline.member_id = '';
						this.data = [];
						this.bar_code = '';
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//表尾合计
			getSummaries(param) {
				let memberDiscount = this.memberInfo.discount ? this.memberInfo.discount / 100 : 1.00;
				const {
					columns,
					data
				} = param;
				const sums = [];
				let values = [];
				columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] = '总计';
						return;
					}
					if(column.property === "stock") {
						values = data.map(item => Number(item.stock));
					}
					if(column.property === "total_price") {
						values = data.map(item => Number(item.total_price));
					}
					if(column.property == "stock") {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								this.stock = prev + curr;
								return prev + curr;
							} else {
								this.stock = prev;
								return prev;
							}
						}, 0);
						sums[index] += '';
					} else if(column.property == "total_price") {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								this.need_pay = (prev + curr) * Number(memberDiscount);
								return(prev + curr / 100) * Number(memberDiscount);
							} else {
								this.need_pay = prev * Number(memberDiscount);
								return(prev / 100) * Number(memberDiscount);
							}
						}, 0);
						sums[index] += '';
					} else {
						sums[index] = '--';
					}
				});
				//返回相对应合计数值
				return sums;
			},
			cancelPutInStorage() {
				this.PutInStorageModel = false;
				this.formInline.sales_id = '';
				this.formInline.member_id = '';
				this.data = [];
				this.bar_code = '';
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		background: #f4f4f4;
		padding: 20px 20px 0px;
	}
	
	.search .el-input {
		min-width: 220px;
	}
	
	.search .el-select {
		min-width: 220px;
	}
	
	.search span {
		display: inline-block;
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
			position: absolute;
			height: 570px;
			top: 50%;
			left: 50%;
			margin-left: -480px;
			margin-top: -285px;
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
			min-width: 300px;
		}
		.model_cons {
			width: 960px;
			position: absolute;
			left: 50%;
			transform: translateY(40%);
			margin-left: -480px;
			background-color: #fff;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
		}
	}
	
	.recharge_title {
		font-size: 16px;
		color: #999;
		padding-left: 20px;
		margin-bottom: 20px;
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