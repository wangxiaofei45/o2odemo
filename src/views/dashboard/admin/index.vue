<template>

	<div class="dashboard-editor-container">
		<div class="model" v-show="model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;font-size: 16px;color: #333333;">
						快捷菜单
						<span style="font-size: 12px;color: #999999;">(最多添加9个)</span>
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="120px">
					<el-row>
						<el-checkbox-group v-model="checkedCities1" :max="9">
							<el-col :span="24">
								<el-button type="text" style="margin-right: 25px;">商品</el-button><el-checkbox v-for="city in cities_1" :label="city" :key="city">{{city}}</el-checkbox>
							</el-col>
						</el-checkbox-group>
						
					</el-row>
					<el-row>
						<el-form-item>
							<el-button @click="cancel">取消</el-button>
							<el-button type="primary" @click="sure">确定</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--<panel-group @handleSetLineChartData="handleSetLineChartData"/>-->
		<el-row class="title_1">
			<el-col :span="10" class="shop_name">
				<img src="../../../../static/img/erp_logo.png" />
				<div class="text">
					<p class="text_1">欢迎你!</p>
					<p class="text_2">哈哈哈!</p>
				</div>
			</el-col>
			<el-col :span="14">
				<el-row class="list">
					<el-col :span=8>
						<p>商户ID</p>
						<p>123456</p>
					</el-col>
					<el-col :span=8>
						<p>有效期至</p>
						<p>2018-05-18</p>
					</el-col>
					<el-col :span=8>
						<p>操作门店</p>
						<p>产品大神</p>
					</el-col>
				</el-row>
			</el-col>
		</el-row>

		<el-row class="title_2" :gutter="20">
			<el-col :span="12">
				<el-row class="list">
					<el-row class="wrning_t">
						待处理事物
					</el-row>
					<el-row>
						<el-col class="list_t" :span="8">采购待审核</el-col>
						<el-col class="list_t" :span="8">采购退货审核</el-col>
						<el-col class="list_t" :span="8">入库待审核</el-col>
						<el-col class="list_t" :span="8">出库待审核</el-col>
						<el-col class="list_t" :span="8">调拨待审核</el-col>
						<el-col class="list_t" :span="8">盘点待审核</el-col>
						<el-col class="list_t" :span="8">订单促销待审核</el-col>
						<el-col class="list_t" :span="8">商品促销待审核</el-col>
						<el-col class="list_t" :span="8">------</el-col>
					</el-row>
				</el-row>
			</el-col>
			<el-col :span="12">
				<el-row class="list">
					<el-row class="wrning_t">
						<el-col :span="12">快捷菜单</el-col>
						<el-col :span="12" style="text-align:right;">
							<el-button type="text" @click="open_model">添加/设置</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col class="list_t" :span="8">采购待审核</el-col>
						<el-col class="list_t" :span="8">采购退货审核</el-col>
						<el-col class="list_t" :span="8">入库待审核</el-col>
						<el-col class="list_t" :span="8">出库待审核</el-col>
						<el-col class="list_t" :span="8">调拨待审核</el-col>
						<el-col class="list_t" :span="8">盘点待审核</el-col>
						<el-col class="list_t" :span="8">订单促销待审核</el-col>
						<el-col class="list_t" :span="8">商品促销待审核</el-col>
						<el-col class="list_t" :span="8">------</el-col>
					</el-row>
				</el-row>

			</el-col>
		</el-row>
		<el-row class="title_3">
			<el-row class="wrning_t">
				待处理事物
			</el-row>
			<el-row class="list_con">
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>今日销售总额</p>
						<p>人民币:10000</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>今日毛利总额</p>
						<p>人民币:10000</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>今日销售总额</p>
						<p>数量:132</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>今日购买用户</p>
						<p>数量:1546</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>今日开卡会员</p>
						<p>数量:45</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>门店入驻品牌</p>
						<p>数量:456</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>门店商品类别</p>
						<p>数量:1245</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>门店商品档案</p>
						<p>数量:4564</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>门店商品库存</p>
						<p>数量:4564</p>
					</div>
				</div>
				<div class="list">
					<img src="../../../../static/img/erp_logo.png" />
					<div class="text">
						<p>门店开卡会员</p>
						<p>数量:4564654</p>
					</div>
				</div>
			</el-row>
		</el-row>
		<!--线图-->
		<!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
			<line-chart :chart-data="lineChartData" />
		</el-row>-->
		<el-row :gutter="20" class="chart_1">
			<el-col :xs="24" :sm="24" :lg="12">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="4">表格标题</el-col>
						<el-col class="time_val" :span="20">
							<el-button type="text">近7天</el-button>
							<el-button type="text">近30天</el-button>
							<el-button type="text">自定义</el-button>
							<el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-col>
					</el-row>
					<div class="chart-wrapper">
						<pie-chart/>
					</div>
				</el-row>
			</el-col>

			<el-col :xs="24" :sm="24" :lg="12">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="3">表格标题</el-col>
						<el-col class="time_val" :span="20">
							<el-button type="text">近7天</el-button>
							<el-button type="text">30天</el-button>
							<el-button type="text">自定义</el-button>
							<el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-col>
					</el-row>
					<div class="chart-wrapper">
						<pie-chart/>
					</div>
				</el-row>
			</el-col>
			<el-col :xs="24" :sm="24" :lg="24" class="bar_container">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="3">交易订单统计</el-col>
						<el-col class="time_val" :span="20">
							<el-button type="text">近7天</el-button>
							<el-button type="text">30天</el-button>
							<el-button type="text">自定义</el-button>
							<el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row>
						<el-col calss="bar_left" :span="6">
							<div class="statement">
								<p>本周订单统计【终端销售】</p>
								<p><span class="big_number">6899</span>笔</p>
								<p>8%同比上周</p>
							</div>
							<div class="statement">
								<p>本周订单统计【终端销售】</p>
								<p><span class="big_number">6899</span>笔</p>
								<p>8%同比上周</p>
							</div>
						</el-col>
						<el-col calss="bar_right" :span="18">
							<div class="chart-wrapper">
								<bar-chart/>
							</div>
						</el-col>
					</el-row>
				</el-row>
			</el-col>

			<el-col :xs="24" :sm="24" :lg="24" class="bar_container">
				<el-row class="pie">
					<el-row>
						<el-col class="title_pie" :span="3">表格标题</el-col>
						<el-col class="time_val" :span="20">
							<el-button type="text">近7天</el-button>
							<el-button type="text">30天</el-button>
							<el-button type="text">自定义</el-button>
							<el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
							</el-date-picker>
						</el-col>
					</el-row>
					<el-row>
						<el-col calss="bar_left" :span="6">
							<div class="statement">
								<p>本周订单统计【终端销售】</p>
								<p><span class="big_number">6899</span>笔</p>
								<p>8%同比上周</p>
							</div>
							<div class="statement">
								<p>本周订单统计【终端销售】</p>
								<p><span class="big_number">6899</span>笔</p>
								<p>8%同比上周</p>
							</div>
						</el-col>
						<el-col calss="bar_right" :span="18">
							<div class="chart-wrapper">
								<bar-chart/>
							</div>
						</el-col>
					</el-row>

				</el-row>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	import PanelGroup from './components/PanelGroup'
	import LineChart from './components/LineChart'
	import RaddarChart from './components/RaddarChart'
	import PieChart from './components/PieChart'
	import BarChart from './components/BarChart'

	const lineChartData = {
		newVisitis: {
			expectedData: [100, 120, 161, 134, 105, 160, 200],
			actualData: [120, 82, 91, 154, 162, 140, 145]
		},
		messages: {
			expectedData: [200, 192, 120, 144, 160, 130, 140],
			actualData: [180, 160, 151, 106, 145, 150, 130]
		},
		purchases: {
			expectedData: [80, 100, 121, 104, 105, 90, 200],
			actualData: [120, 90, 100, 138, 142, 130, 130]
		},
		//
		shoppings: {
			expectedData: [130, 140, 141, 142, 145, 150, 160],
			actualData: [120, 82, 91, 154, 162, 140, 130]
		}
	}
	export default {

		name: 'DashboardAdmin',
		components: {
			PanelGroup,
			LineChart,
			RaddarChart,
			PieChart,
			BarChart
		},
		data() {
			return {
				value1: '', //时间选择
				model: false, //默认先显示出来
				lineChartData: lineChartData.newVisitis,
				checkedCities1: ['上海', '北京'],
        		cities_1: ['上海', '北京', '广州', '深圳'],
        		cities_2: ['上海', '北京', '广州', '深圳'],
        		cities_3: ['上海', '北京', '广州', '深圳'],
        		cities_4: ['上海', '北京', '广州', '深圳'],
        		cities_5: ['上海', '北京', '广州', '深圳'],
			}
		},
		methods: {
			handleSetLineChartData(type) {
				this.lineChartData = lineChartData[type];
			},
			//打开model
			open_model() {
				this.model = true;
			},
			//确定按钮
			sure(){
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
		padding: 20px;
		font-size: 14px;
		color: #333333;
		.big_number {
			font-size: 16px;
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
		background-color: #FFFFFF;
		border: 1px solid #E0E0E0;
		padding: 25px;
		.shop_name {
			clear: both;
			img {
				margin-left: 60px;
				float: left;
				width: 120px;
				height: 120px;
				border-radius: 50%;
			}
			.text {
				float: left;
				font-size: 16px;
				line-height: 24px;
				height: 120px;
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
				line-height: 60px;
			}
			p:nth-child(1) {
				font-weight: 700;
			}
		}
	}
	
	.title_2 {
		margin-top: 15px;
		.list {
			padding: 20px;
			border: 1px solid #E0E0E0;
			.wrning_t {
				font-size: 16px;
				font-weight: 700;
				padding-bottom: 20px;
			}
			.list_t {
				font-size: 14px;
				color: #666666;
				padding-bottom: 20px;
			}
		}
	}
	
	.title_3 {
		margin-top: 15px;
		border: 1px solid #E0E0E0;
		padding: 20px;
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