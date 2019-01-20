<template>
	<div class="dashboard-editor-container">
		<el-row class="title_1">
			<el-col :span="6" style="padding: 10px;">
				<el-row style="margin-top: 15px;border: 1px solid #E0E0E0;padding: 20px; height: 300px;">
					<div class="shop_name">
						<img src="../../../../static/img/erp_logo.png" />
						<div class="text">
							<div>欢迎你:{{name}}</div>
							<div>门店ID:{{id}}</div>
						</div>
					</div>
					<el-row>
						<el-col :span='12' style="text-align: center;border-right: 1px solid #d6d6d6;">
							<p>有效期至</p>
							<p>{{updated_at}}</p>
						</el-col>
						<el-col :span='12' style="text-align: center;">
							<p>操作门店
								<p <p>南通店</p>
						</el-col>
					</el-row>
				</el-row>
			</el-col>
			<el-col :span="18" style="padding: 10px;">
				<el-row class="title_3">
					<el-row class="list_con">
						<div class="list">
							<img src="../../../../static/img/index/icon_jrxsze.png" />
							<div class="text">
								<p>今日销售总额</p>
								<p>人民币:{{todayData.sell_amount}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_jrxszs.png" />
							<div class="text">
								<p>今日销售总数</p>
								<p>人民币:{{todayData.sell_stock}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_jrdds.png" />
							<div class="text">
								<p>今日订单数</p>
								<p>数量:{{todayData.order_num}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_jrkkhy.png" />
							<div class="text">
								<p>今日开卡会员</p>
								<p>数量:{{todayData.add_member_num}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_jrhycz.png" />
							<div class="text">
								<p>今日会员充值</p>
								<p>数量:{{todayData.member_recharge_amount}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_spj.png" />
							<div class="text">
								<p>商品价</p>
								<p>数量:{{todayData.goods_price}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_kdj.png" />
							<div class="text">
								<p>客单价</p>
								<p>数量:{{todayData.customer_price}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_fjtxl.png" />
							<div class="text">
								<p>附加推销率</p>
								<p>数量:{{todayData.sell_rate}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_mdspkc.png" />
							<div class="text">
								<p>门店商品库存</p>
								<p>数量:{{todayData.total_inventory}}</p>
							</div>
						</div>
						<div class="list">
							<img src="../../../../static/img/index/icon_mdkkhy.png" />
							<div class="text">
								<p>门店开卡会员</p>
								<p>数量:{{todayData.total_member_num}}</p>
							</div>
						</div>
					</el-row>
				</el-row>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="chart_1">
			<el-col :xs="24" :sm="24" :lg="24" class="bar_container">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="3">交易订单统计</el-col>
						<el-col class="time_val" :span="20">
							<el-button @click="search(2,1)" type="text">近7天</el-button>
							<el-button @click="search(3,1)" type="text">30天</el-button>
							<el-date-picker style='margin-left: 15px;' v-model="dates" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectTime1(4,1)"  value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row>
						<el-col calss="bar_left" :span="6">
							<el-row>
								<el-col :span="10">
									<div class="statement">
										<p>本周订单统计</p>
										<p class="big_number">{{orderData.total}}</p>
										<p>/笔</p>
									</div>
								</el-col>
								<el-col :span="14" v-if="orderData.rate>=0">
									<el-col :span="12">
										<div class="statement3">
											<p>同比</p>
											<p class="big_number">{{orderData.rate}}</p>
											<p>/笔</p>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="statement4">
											<p>环比</p>
											<p class="big_number">{{orderData.ringRate}}</p>
											<p>/笔</p>
										</div>
									</el-col>
								</el-col>
								<el-col :span="10" v-else>
									<div class="statement2">
										<p>环比</p>
										<p class="big_number">{{orderData.ringRate}}</p>
										<p>/笔</p>
									</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col calss="bar_right" :span="18">
							<div class="chart-wrapper">
								<div id="main" :style="{height:height,width:width}" />
							</div>
						</el-col>
					</el-row>
				</el-row>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" class="bar_container">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="3">销售金额统计</el-col>
						<el-col class="time_val" :span="20">
							<el-button @click="search(2,2)" type="text">近7天</el-button>
							<el-button @click="search(2,2)" type="text">30天</el-button>
							<el-date-picker style='margin-left: 15px;' v-model="date1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" @change="selectTime2(4,2)"  value-format="yyyy-MM-dd">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row>
						<el-col calss="bar_left" :span="6">
							<el-row>
								<el-col :span="10">
									<div class="statement">
										<p>本周销售统计</p>
										<p class="big_number">{{amountData.total}}</p>
										<p>/笔</p>
									</div>
								</el-col>
								<el-col :span="14" v-if="amountData.rate>=0">
									<el-col :span="12">
										<div class="statement3">
											<p>同比</p>
											<p class="big_number">{{amountData.rate}}</p>
											<p>/笔</p>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="statement4">
											<p>环比</p>
											<p class="big_number">{{amountData.ringRate}}</p>
											<p>/笔</p>
										</div>
									</el-col>
								</el-col>
								<el-col :span="10" v-else>
									<div class="statement2">
										<p>环比</p>
										<p class="big_number">{{amountData.ringRate}}</p>
										<p>/笔</p>
									</div>
								</el-col>
							</el-row>
						</el-col>

						<el-col calss="bar_right" :span="18">
							<div class="chart-wrapper">
								<div id="mains" :style="{height:height,width:width}" />
							</div>
						</el-col>
					</el-row>

				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import { debounce } from '@/utils'
	const animationDuration = 6000
	export default {
		props: {
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '300px'
			}
		},
		data() {
			return {
				name:'',
				updated_at:'',
				id:'',
				value1: '', //时间选择
				model: false, //默认先显示出来
				todayData: {},
				orderData: {},
				amountData: {},
				amountDatas: [],
				orderDatas: [],
				arr1: [],
				arr2: [],
				arr3: [],
				arr4: [],
				dates:'',
				date1:'',
			}
		},
		created() {
			this.ajaxjson();
			this.name = sessionStorage.getItem("name");
			this.updated_at=sessionStorage.getItem("updated_at");
			this.id = sessionStorage.getItem("id");
		},
		beforeDestroy() {
			if(!this.chart) {
				return
			}
			window.removeEventListener('resize', this.__resizeHandler)
			this.chart.dispose()
			this.chart = null
			
		},
		methods: {
			ajaxjson() {
				this.$post(this.$userIndex).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.todayData = res.data.todayData;
						this.orderData = res.data.orderData;
						this.amountData = res.data.amountData;
						this.amountDatas = res.data.weekData.amountData;
						this.orderDatas = res.data.weekData.orderData; //交易额
						let centerArr = res.data.weekData.orderData;
						let centerArr1 = res.data.weekData.amountData; //
						let arr1 = [];
						let arr2 = [];
						for(let i = 0; i < centerArr.length; i++) {
							arr1.push(centerArr[i].key);
							arr2.push(centerArr[i].value);
						}
						this.arr1 = arr1;
						this.arr2 = arr2;

						let arr3 = [];
						let arr4 = [];
						for(let i = 0; i < centerArr1.length; i++) {
							arr3.push(centerArr1[i].key);
							arr4.push(centerArr1[i].value);
						}
						this.arr3 = arr3;
						this.arr4 = arr4;
						this.initChart();
						this.initChart2();
						this.__resizeHandler = debounce(() => {
							if(this.chart) {
								this.chart.resize()
							}
						}, 100)
						window.addEventListener('resize', this.__resizeHandler)
					}

				})
			},
			//
			search(x, y) {
				let postData = {
					type: x,
					mode: y,
					beginDate: '',
					endDate: '',
				}
				this.$post(this.$userIndexSearch, postData).then((res) => {
					if(res.status_code == 0) {
						if(y == 1) {
							this.orderData = res.data;
						} else {
							this.amountData = res.data;
						}

					}
				})
			},
			selectTime1(x,y){
				let postData = {
					type: x,
					mode: y,
					beginDate: '',
					endDate: '',
				};
				postData.beginDate=this.dates[0];
				postData.endDate=this.dates[1];
				this.$post(this.$userIndexSearch, postData).then((res) => {
					if(res.status_code == 0) {
						this.orderData = res.data;
					}
				})
			},
			selectTime2(x,y){
				let postData = {
					type: x,
					mode: y,
					beginDate: '',
					endDate: '',
				};
				postData.beginDate=this.date1[0];
				postData.endDate=this.date1[1];
				this.$post(this.$userIndexSearch, postData).then((res) => {
					if(res.status_code == 0) {
						this.amountData = res.data;
					}
				})
			},
			initChart() {
				this.chart = echarts.init(document.getElementById('main'), 'macarons')
				this.chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						top: 10,
						left: '2%',
						right: '2%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: this.arr1,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						}
					}],
					series: [{
						name: '交易笔数',
						type: 'bar',
						stack: 'vistors',
						barWidth: '40%',
						data: this.arr2,
						animationDuration
					}]
				})
			},
			initChart2() {
				this.chart = echarts.init(document.getElementById('mains'), 'macarons')
				this.chart.setOption({
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						top: 10,
						left: '2%',
						right: '2%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: this.arr3,
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						}
					}],
					series: [{
						name: '金额',
						type: 'bar',
						stack: 'vistors',
						barWidth: '40%',
						data: this.arr4,
						animationDuration
					}]
				})
			},

			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type];
			},
			//打开model
			open_model() {
				this.model = true;
			},
			//确定按钮
			sure() {
				console.log("sure");
			},
			//取消
			cancel() {
				this.model = false;
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.model {
		position: fixed;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.4);
	}
	
	.model_con {
		width: 600px;
		height: 450px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		margin-left: -225px;
		top: 50%;
		margin-top: -225px;
		border-radius: 15px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
	/*柱状图左边的提示性文字*/
	
	.bar_container {
		margin-top: 20px;
	}
	
	.statement {
		padding: 10px;
		font-size: 16px;
		margin-top: 80px;
		box-sizing: border-box;
		text-align: center;
		width: 95%;
		border-radius: 8px;
		color: #333333;
		background-color: #fef0e2;
		.big_number {
			font-size: 20px;
			color: #000000;
		}
	}
	
	.statement2 {
		padding: 10px;
		font-size: 16px;
		margin-top: 80px;
		color: #333333;
		text-align: center;
		background-color: #e3f9f7;
		box-sizing: border-box;
		width: 95%;
		border-radius: 8px;
		.big_number {
			font-size: 20px;
			color: #000000;
		}
	}
	.statement3{
		padding: 10px;
		padding-right: 0px;
		font-size: 16px;
		margin-top: 80px;
		color: #333333;
		text-align: center;
		background-color: #e3f9f7;
		box-sizing: border-box;
		border-radius: 8px;
		border-top-right-radius:0px;
		border-bottom-right-radius:0px;
		.big_number {
			font-size: 20px;
			color: #000000;
		}
	}
	.statement4{
		padding: 10px;
		padding-left: 0px;
		font-size: 16px;
		margin-top: 80px;
		color: #333333;
		text-align: center;
		background-color: #e3f9f7;
		box-sizing: border-box;
		border-radius: 8px;
		border-top-left-radius:0px;
		border-bottom-left-radius:0px;
		.big_number {
			font-size: 20px;
			color: #000000;
		}
	}
	.chart_1 {
		margin-top: 20px;
		.pie {
			border: 1px solid #E0E0E0;
			padding: 20px;
			.title_pie {
				font-size: 16px;
				font-weight: 700;
			}
			.time_val {
				text-align: right;
			}
		}
	}
	
	.dashboard-editor-container {
		padding: 32px;
		/*background-color: rgb(240, 242, 245);*/
		.chart-wrapper {
			background: #fff;
			padding: 16px 16px 0;
			margin-bottom: 32px;
		}
	}
	/*店铺ID*/
	
	.title_1 {
		.shop_name {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: 50px;
			img {
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
			.text {
				font-size: 16px;
				line-height: 30px;
				color: #333333;
				padding-left: 25px;
				.text_1 {
					float: left;
					padding-bottom: 12px;
				}
			}
		}
		.list {
			p {
				margin: 0;
				font-size: 16px;
				line-height: 40px;
			}
			p:nth-child(1) {
				font-weight: 700;
			}
		}
	}
	
	.title_3 {
		margin-top: 15px;
		border: 1px solid #E0E0E0;
		padding: 20px;
		height: 300px;
		.wrning_t {
			font-size: 16px;
			font-weight: 700;
			padding-bottom: 20px;
		}
		.list_con {
			clear: both;
			.list {
				width: 20%;
				float: left;
				padding: 20px 0px;
				img {
					width: 80px;
					height: 80px;
					display: block;
					border: 1px solid #e0e0e0;
					border-radius: 50%;
					float: left;
				}
				.text {
					height: 80px;
					float: left;
					padding-left: 15px;
					font-size: 14px;
					color: #666666;
				}
			}
		}
	}
</style>