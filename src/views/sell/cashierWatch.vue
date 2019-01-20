<!--收银交班表-->
<template>
	<div class="tab-container">
		<div v-show="showModel == 1" class="showModel">
			<div class="title">
				<el-row style="margin-top:15px;">
					<el-col>
						<el-button @click="exchange" type="primary">交班</el-button>
						<el-button type="primary">打印</el-button>
					</el-col>
				</el-row>
			</div>
			<el-row>
				<el-col :span="24" style="margin-top:20px;margin-bottom:20px;">
					<el-form :inline="true" v-model="formInline" label-width="80px" class="demo-form-inline">
						<el-row>
							<el-col :span="6">
								<el-form-item label="开始时间">
									<el-date-picker v-model="formInline.begin_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" />
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12" class="list1">
					<el-row class="content">
						<p class="title">上班结存金额</p>
						<p class="title"><span class="text">{{data.last_amount}}</span>元</p>
					</el-row>
				</el-col>
				<el-col :span="12" class="list2">
					<el-row class="content">
						<p class="title">本班金额</p>
						<p class="title"><span class="text">{{data.amount}}</span>元</p>
					</el-row>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 15px;">
				<el-col :span="8" class="list3">
					<el-row class="content">
						<p class="title">上班结存/当前结存</p>
						<p class="title"><span class="text">{{data.last_stock}}/{{data.begin_stock}}</span>件</p>
					</el-row>
				</el-col>
				<el-col :span="8" class="list3">
					<el-row class="content">
						<p class="title">本班销售数量</p>
						<p class="title"><span class="text">{{data.sale_stock}}</span>件</p>
					</el-row>
				</el-col>
				<el-col :span="8" class="list4">
					<el-row class="content">
						<p class="title">本班结存数量</p>
						<p class="title"><span class="text">{{data.stock}}</span>元</p>
					</el-row>
				</el-col>
			</el-row>
			<!--其他费用汇总-->
			<el-row class="elsesum">
				<el-col :span="24" class="title">
					其他费用汇总
				</el-col>
				<el-col :span="12" class="list">
					其他收入{{data.other_income}}
				</el-col>
				<el-col :span="12" class="list">
					其他支出{{data.other_outcome}}
				</el-col>
			</el-row>
			<!--收支汇总-->
			<el-row class="paymentSummary">
				<el-col class="title">
					收支汇总
				</el-col>
				<!--<el-table :data="sale_amounts" border style="width: 100%">
					<el-table-column type="index" label="序号" width="50" />
					<el-table-column prop="name" label="结算方式" width="180" />
					<el-table-column prop="amount" label="零售开票" />
				</el-table>-->
			</el-row>
			<el-row class="elsething">
				<el-col :span="24" class="title">
					其他交班事项
				</el-col>
				<el-col :span="24">
					<el-row class="text" />
				</el-col>
			</el-row>
		</div>
		<div v-show="showModel == 2" class="tab-container">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					本班进销数量
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24" style="text-align: right;">
						<el-button type="primary">
							导出
						</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form :inline="true" :model="formation" label-width="80px" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker v-model="formation.beginTime" type="datetime" value-format="yyyy-MM-dd hh:mm" placeholder="选择日期" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker v-model="formation.endTime" type="datetime" value-format="yyyy-MM-dd hh:mm" placeholder="选择日期" />
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="店铺">
								<!--<el-select v-model="forMation.cbid" placeholder="请选择供应商" style="width: 200px;">
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center" />
					<el-table-column prop="barcode" label="条形码" fixed width="100" align="center" />
					<el-table-column prop="goods_name" label="商品规格名称" width="100" align="center" />
					<el-table-column prop="stock" label="数量" width="100" align="center">
						<template slot-scope="scope">
							<el-input v-model="scope.row.stock" size="small" placeholder="" align="center" @blur="multiply(scope.row)" />
						</template>
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="100" align="center" />
					<el-table-column prop="discount" label="折扣" width="100" align="center" />
					<el-table-column prop="unit_price" label="采购价" width="100" align="center" />
					<el-table-column prop="total_price" label="小计" align="center" />
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteAdd()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="page"
			      :page-sizes="[10, 20, 30, 40]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
  			</div>			
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showModel: 1,
				forMation: {},
				newTableData: [],
				formInline: {
					begin_date: ''
				},
				formation: {
					beginTime: '', //开始时间
					endTime: '', //结束时间
				},
				data: {},
				sale_amounts: [],
				page:1,//分页
				total:0,
				per_page:10,
				remark:'',
			}
		},
		created() {
			this.ajaxjson();
			this.getData();
		},
		methods: {
			ajaxjson() {
				this.$post(this.$cashHandoverHandOver).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data;
						this.sale_amounts = res.data.sale_amounts;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//获取时间
			getData() {
				let date = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				let H = date.getHours() + ":";    
         		let m = date.getMinutes(); 
				let dataStr = Y + M + D + H + m;
				this.formation.beginTime = dataStr;
				this.formation.endTime = dataStr;
				this.getSaleInfo();
			},
			
			// 本班进销数量
			getSaleInfo(){
				let postData = Object.assign(this.formation,{page: this.page,per_page:this.per_page,});
				this.$post(this.$cashHandoverSaleInfo,postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.table = res.data.data;
						this.total = res.data.total;//多少条
						this.per_page = res.data.per_page;//当前一页多少条
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
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
			back() {
				this.showModel = 1
			},
			//交班
			exchange(){
				let postData = {
					beginTime: this.$getData(),
					remark:this.remark,
				}
				this.$post(this.$cashHandoverDoHandOver,postData).then((res)=>{
					if(res.status_code == 0){
						//退出登录
						this.$store.dispatch('LogOut').then(() => {
					    	location.reload()// In order to re-instantiate the vue-router object to avoid bugs
					    })
					}else{
						this.message({
							type:'error',
							message:res.message,
						})
					}
				})
			}
		}

	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.tab-container {
		padding: 20px;
	}
	
	.elsething {
		.title {
			font-size: 14px;
			background-color: #fff;
			padding: 10px;
			border-left: 3px solid #12ccba;
			margin-top: 15px;
		}
		.text {
			border: 1px solid #d6d6d6;
			padding: 10px;
			margin-top: 10px;
		}
	}
	/*收支汇总*/
	
	.paymentSummary {
		margin-top: 15px;
		.title {
			font-size: 14px;
			background-color: #f5f5f5;
			padding: 10px;
			box-sizing: border-box;
		}
	}
	/*其他费用汇总*/
	
	.elsesum {
		color: #333333;
		margin-top: 15px;
		border: 1px solid #f5f5f5;
		.title {
			font-size: 14px;
			background-color: #f5f5f5;
			padding: 10px;
			box-sizing: border-box;
		}
		.list {
			padding: 10px;
			font-size: 14px;
			color: #666666;
			text-align: center;
		}
	}
	
	.list1 {
		height: 120px;
		.content {
			height: 120px;
			border-radius: 10px;
			background-color: #12ccba;
			color: #ffffff;
			text-align: center;
			font-family: "微软雅黑";
			.title {
				font-size: 16px;
			}
			.text {
				font-size: 32px;
			}
		}
	}
	
	.list2,
	.list4 {
		height: 120px;
		.content {
			height: 120px;
			border-radius: 10px;
			background-color: #f5820f;
			color: #ffffff;
			text-align: center;
			font-family: "微软雅黑";
			.title {
				font-size: 16px;
			}
			.text {
				font-size: 32px;
			}
		}
	}
	
	.list3 {
		height: 120px;
		.content {
			height: 120px;
			border-radius: 10px;
			background-color: #f5f5f5;
			color: #333;
			text-align: center;
			font-family: "微软雅黑";
			.title {
				font-size: 16px;
			}
			.text {
				font-size: 32px;
			}
		}
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
	
	.recharge_title {
		font-size: 16px;
		color: #999;
		padding-left: 20px;
		margin-bottom: 20px;
	}
	
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		height: 50px;
		background: #f4f4f4;
		height: 240px;
		padding: 20px;
		min-width: 1300px;
	}
	
	.search1 {
		height: 50px;
		/* background: #f4f4f4; */
		height: 120px;
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
		min-width: 1300px;
	}
	
	.total {
		width: 100%;
		position: fixed;
		bottom: 30px;
		height: 38px;
		padding-left: 20px;
		background: #f4f4f4;
		line-height: 38px;
	}
	
	.total .totalNum {
		width: 1200px;
		display: inline-block;
		height: 38px;
		text-align: center;
	}
</style>