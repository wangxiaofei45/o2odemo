<!--零售开票-->
<template>
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col>
						<el-button type="primary" @click="closeAnAbccount">结算</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input placeholder="请输入单据号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="会员">
								<el-input placeholder="输入手机号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="会员余额">
								110
								<el-button size="mini">充值</el-button>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="营业员">
								<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="收银员">
								<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="img" label="照片" fixed width="80" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.img" alt="" style="width: 50px;">
						</template>
					</el-table-column>
					<el-table-column prop="barCode" label="条形码" fixed width="120" align="center">
					</el-table-column>
					<el-table-column prop="goodName" label="商品名称规格" width="120" align="center">
					</el-table-column>
					<el-table-column prop="supplier" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="LastPurchasePrice" label="上次采购价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="LastPurchaseTime" label="上次采购时间">
					</el-table-column>
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
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="整单打折">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="优惠金额">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="应接金额">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付方式
							</el-col>
							<el-col :span="12">
								<el-form-item label="余额">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="支付宝">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="微信">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="现金">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="银行卡">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="找零">
									<el-input placeholder=""></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage">
								取消
							</el-button>
							<el-button type="primary">
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
				search: '', //采购单输入
				//表单
				formInline: {
					dateStart: '1',
					dateEnd: '',
					shop: '',
					Freightnumber: '',
				},
				accountFrom: {
					data_1: '',
				},
				data: [{
					img: 'http://img1.3lian.com/img013/v2/98/d/109.jpg', //照片
					barCode: '45454545', //条形码
					goodName: '4545', //商品名称
					supplier: '4545', //供应商
					LastPurchasePrice: '100', //上次采购价
					LastPurchaseTime: '2018-12-30 19:20', //上次采购时间
				}], //展示出来的数据
				PutInStorageModel: true,
			}
		},
		methods: {
			addchange(val) {
				console.log("选中当前行")
			},
			//结算
			closeAnAbccount() {
				this.PutInStorageModel = true;
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
			.bottom{
				text-align: center;
			}
			.title{
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