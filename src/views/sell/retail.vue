<!--零售开票-->
<template>
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col>
						<el-button v-show="permission.indexOf('240') != -1 ||permission.indexOf('241') != -1||permission.indexOf('242') != -1" type="primary" @click="closeAnAbccount">结算</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
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
							<el-form-item label="会员">
								<el-select v-model="formInline.member_id" filterable remote reserve-keyword placeholder="请输入关键词" @change="selectPhone" :remote-method="remoteMethod" :loading="loading">
									<el-option v-for="item in memberList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<!--<el-col :span="6">
							<el-form-item label="会员余额">
								110
								<el-button size="mini">充值</el-button>
							</el-form-item>
						</el-col>-->
						<el-col :span="6">
							<el-form-item label="营业员">
								<el-select v-model="formInline.sales_id" placeholder="亿链旗舰店">
									<el-option v-for="(item,index) in seller" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="formInline.remark"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="收银员">
								<el-input></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-row class="search2" style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="12">
					<el-button type="text">录入排序</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-input placeholder="请输入内容" v-model="bar_code" class="input-with-select" style="width: 400px;" @keyup.enter.native="addgoods">
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
							<el-input size="mini" v-model="scope.row.stock"  @blur="multiply(scope.row)"></el-input>
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
					<!--真实金额  datas.total_really_money = 0;-->
				</el-table>
			</div>
		</div>
		<!--弹窗-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						结账
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="80px" :inline="true" v-model="accountFrom" class="demo-form-inline">
					<el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付金额
							</el-col>
							<el-col :span="12">
								<el-form-item label="合计金额">
									<el-input placeholder="" v-model='accountFrom.need_pay/100'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="整单打折">
									<el-input placeholder="" v-model='accountFrom.discount/100'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="优惠金额">
									<el-input placeholder="" v-model='accountFrom.preferential'></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="应付金额">
									<el-input placeholder="" v-model="accountFrom.payment/100"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付方式
							</el-col>
							<el-col :span="12" v-for="(item,index) in accountFrom.payment_method" :key="item.id">
								<el-form-item :label="item.name">
									<el-input placeholder="" v-model="item.amount"></el-input>
								</el-form-item>
							</el-col>
							
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder="" v-model="accountFrom.total_payment"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="找零">
									<el-input placeholder="" v-model="accountFrom.give_change"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage">
								取消
							</el-button>
							<el-button type="primary" @click="pay">
								确定
							</el-button>
							<el-button type="primary">
								结算并打印
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
				memberList: [],
				loading: false,
				//表单
				formInline: {
					document_num: '',
					dates: '',
					sales_id: '', //营业员id
					remark: '', //摘要
					member_id: '', //会员id
				},
				accountFrom: {},
				seller: [],
				data: [], //展示出来的数据
				PutInStorageModel: false,
				bar_code:'',//条码
				need_pay:'',
				stock:'',
			}
		},
		created() {
			this.getBarCode(); //获取条形码
			this.getSeller(); //获取营业员
			this.getData(); //显示当前时间
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			remoteMethod(query) {
				if(query !== '') {
					this.loading = true;
					let postData = {
						search:query,
						page:1,
					}
					this.$post(this.$memberSearchMember,postData).then((res) =>{
						if(res.status_code==0){
							console.log(res)
							this.memberList = res.data;
							this.loading = false;
						}else{
							this.$message({
								type:'error',
								message:res.message,
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
			addgoods(e){
				let postData = {
					type: '1',
					bar_code: this.bar_code,
				}
				this.$post(this.$staticGetCodeGoods, postData).then((res) => {
							if(res.status_code == 0) {
								let datas = res.data;
								datas.norm = datas.specnamestr;//商品名称
								datas.stock = 1;//数量
								datas.price = datas.sku_price;//吊牌价
								datas.discount = 1.00;
								datas.unit_price = Number(datas.discount)*Number(datas.price);//折后价
								datas.total_price = Number(datas.stock)*Number(datas.unit_price);//小计
								datas.total_really_money = Number(datas.stock)*Number(datas.unit_price);//真实金额
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
			multiply(e){
				e.unit_price = Number(e.discount)*Number(e.price);//折后价
				e.total_price = Number(e.stock)*Number(e.unit_price);//小计
				e.total_really_money = Number(e.stock)*Number(e.unit_price);//真实金额
			},
			selectPhone(e){
				console.log(e);
			},
			//结算
			closeAnAbccount() {
				let postData = this.$objDeepCopy(this.formInline);
				let arr = this.$coppyArray(this.data);
				for(let i=0;i<arr.length;i++){
					arr[i].total_really_money = arr[i].total_really_money/100;
				}
				postData.need_pay = this.need_pay;
				postData.stock = this.stock;
				postData.phone = '15736789563';
				postData.goodsData = JSON.stringify(arr);
				this.$post(this.$retailopenbillAdd,postData).then((res)=>{
					if(res.status_code == 0){
						this.$message({
							type:'success',
							message:res.message,
						})
						let postDatas = {
							id:res.data.rob_id
						}
						this.$post(this.$retailopenbillPayInfo,postDatas).then((res) =>{
							if(res.status_code == 0){
								this.accountFrom = res.data;
							}else{
								
							}
						})
						this.PutInStorageModel = true;
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
			//发起支付
			pay(){
				let postData = this.$objDeepCopy(this.accountFrom);
				let payment_method = postData.payment_method;
				for(let i=0;i<payment_method.length;i++){
					payment_method[i].amount = Number(payment_method[i].amount)*100;
				}
				postData.payment_method = JSON.stringify(postData.payment_method); 
				this.$post(this.$retailopenbillComplete,postData).then((res)=>{
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
			//表尾合计
			getSummaries(param) {
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
					} else if(column.property == "total_price"){
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								this.need_pay = prev + curr;
								return prev + curr/100;
							} else {
								this.need_pay = prev;
								return prev/100;
							}
						}, 0);
						sums[index] += '';
					} else{
						sums[index] = '--';
					}
				});
				//返回相对应合计数值
				return sums;
			},
			cancelPutInStorage() {
				this.PutInStorageModel = false;
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
			width: 600px;
			height: 540px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -300px;
			margin-left: -300px;
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