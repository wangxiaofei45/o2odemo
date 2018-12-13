<!-- 其他收入单 -->
<template>
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col :span="12">
						<el-button type="primary" @click="closeAnAbccount">新增</el-button>
					</el-col>
					<el-col :span="12">
						<el-input style="width:200px"></el-input>
						<el-button type="primary">新增</el-button>
						<el-button type="primary">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input placeholder="请输入单据号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="费用名称">
								<el-select v-model="formInline.shop" placeholder="请选择">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="24" style="text-align:center">
							<el-button>清空</el-button>
							<el-button type="primary">确定</el-button>
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
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button type="primary" size="mini">删除</el-button>
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
						新增
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="90px" :inline="true" v-model="accountFrom" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="单据号">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="12">
							<el-form-item label="日期">
								<el-date-picker type="date" placeholder="选择日期" style="width:180px">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商">
								<el-select v-model="formInline.shop" placeholder="请选择">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联单据号">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="12">
							<el-form-item label="金额">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage">
								取消
							</el-button>
							<el-button type="primary">
								保存
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
				PutInStorageModel: false,
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