<!--收银交班表-->
<template>
	<div class="tab-container">
		<div class="titles">
			<img src="../../../static/img/login/banner_logo.svg"/>
			<span>收银接班表</span>
		</div>
		<div v-show="showModel == 1" class="showModel">
			<div class="title">
				<el-row style="margin-top:15px;">
					<el-col>
						<el-button @click="confirmTheSuccession" type="primary">
							<svg-icon icon-class="icon_submit" style="margin-right: 10px;" />
							接班
						</el-button>
						<!--<el-button type="primary">打印</el-button>-->
					</el-col>
				</el-row>
			</div>
			<el-row>
				<el-col :span="24" style="margin-top:20px;">
					<el-form :inline="true" v-model="formInline" label-width="80px" class="demo-form-inline">
						<el-row>
							<el-col :span="6">
								<el-form-item label="开始时间">
									<el-date-picker v-model="data.begin_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" disabled/>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="结束时间">
									<el-date-picker v-model="data.end_time" type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" disabled/>
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
						<p class="title"><span class="text">{{data.last_amount}}</span> /元</p>
					</el-row>
				</el-col>
				<el-col :span="12" class="list2">
					<el-row class="content">
						<p class="title">本班金额</p>
						<p class="title"><span class="text">{{data.amount}}</span> /元</p>
					</el-row>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="margin-top: 15px;">
				<el-col :span="8" class="list3">
					<el-row class="content">
						<p class="title">上班结存/当前结存</p>
						<p class="title"><span class="text">{{data.last_stock}}/{{data.begin_stock}}</span> /件</p>
					</el-row>
				</el-col>
				<el-col :span="8" class="list3">
					<el-row class="content">
						<p class="title">本班销售数量</p>
						<p class="title"><span class="text">{{data.sale_stock}}</span> /件</p>
					</el-row>
				</el-col>
				<el-col :span="8" class="list4">
					<el-row class="content">
						<p class="title">本班结存数量</p>
						<p class="title"><span class="text">{{data.stock}}</span> /元</p>
					</el-row>
				</el-col>
			</el-row>
			<!--其他费用汇总-->
			<el-row class="elsesum">
				<el-col :span="24" class="title">
					其他费用汇总
				</el-col>
				<el-col :span="12" class="list">
					其他收入：￥{{data.other_income}}
				</el-col>
				<el-col :span="12" class="list">
					其他支出：￥{{data.other_outcome}}
				</el-col>
			</el-row>
			<!--收支汇总-->
			<el-row class="paymentSummary">
				<el-col class="title">
					收支汇总
				</el-col>
				<el-table :data="sale_amounts" border style="width: 100%">
					<el-table-column type="index" label="序号" width="80" align='center'/>
					<el-table-column prop="name" label="结算方式" align='center'/>
					<el-table-column prop="amount" label="零售开票" align='center'/>
				</el-table>
			</el-row>
			<el-row class="elsething">
				<el-col :span="24" class="title">
					其他交班事项
				</el-col>
				<el-col :span="24">
					<el-row class="text" v-if="data.remark">
						{{data.remark}}
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				showModel: 1,
				newTableData: [],
				formInline: {},
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
				this.$post(this.$cashHandoverTakeOver).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data;
						this.sale_amounts = res.data.sale_amounts.list;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//确认接班
			confirmTheSuccession(){
				let postData = {
					id:this.data.id
				}
				this.$post(this.$cashHandoverDoTakeOver,postData).then((res)=>{
					if(res.status_code == 0){
						this.$router.push({
							path: '/'
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
		background-color: #F5F5F5;
	}
	.showModel{
		margin: 0 auto;
		margin: 50px 80px;
		padding: 30px 60px;
		background-color: #FFFFFF;
	}
	.elsething {
		.title {
			font-size: 14px;
			background-color: #fff;
			border-left: 3px solid #12ccba;
			padding-left: 15px;
			margin-top: 15px;
		}
		.text {
			border: 1px solid #d6d6d6;
			padding: 10px;
			margin-top: 10px;
			font-size: 14px;
			color: #333333;
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
			margin: 0px;
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
	.title {
		margin-bottom: 15px;
	}
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
</style>