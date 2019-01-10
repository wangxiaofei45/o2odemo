<!--收银交班表-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row style="margin-top:15px;">
				<el-col>
					<el-button type="primary">交班</el-button>
					<el-button type="primary">打印</el-button>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<el-col :span="24" style="margin-top:20px;margin-bottom:20px;">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker v-model="formInline.begin_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
								</el-date-picker>
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
					<p class="title"><span class="text">上班结存金</span>元</p>
				</el-row>
			</el-col>
			<el-col :span="12" class="list2">
				<el-row class="content">
					<p class="title">上班结存金额</p>
					<p class="title"><span class="text">上班结存金</span>元</p>
				</el-row>
			</el-col>
		</el-row>
		<el-row :gutter="20" style='margin-top: 15px;'>
			<el-col :span="8" class="list3">
				<el-row class="content">
					<p class="title">上班结存金额</p>
					<p class="title"><span class="text">上班结存金</span>元</p>
				</el-row>
			</el-col>
			<el-col :span="8" class="list3">
				<el-row class="content">
					<p class="title">上班结存金额</p>
					<p class="title"><span class="text">上班结存金</span>元</p>
				</el-row>
			</el-col>
			<el-col :span="8" class="list4">
				<el-row class="content">
					<p class="title">上班结存金额</p>
					<p class="title"><span class="text">上班结存金</span>元</p>
				</el-row>
			</el-col>
		</el-row>
		<!--其他费用汇总-->
		<el-row>
			<el-col :span="24">
				其他费用汇总
			</el-col>
			<el-col :span="12">
				其他的
			</el-col>
			<el-col :span="12">
				其他的
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					begin_date: '',
				},
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.tab-container {
		padding: 20px;
		
	}
	.list1 {
		height: 120px;
		.content {
			height: 120px;
			border-radius: 10px;
			background-color: #12ccba;
			color: #ffffff;
			text-align:center;
			font-family: "微软雅黑";
			.title{
				font-size: 16px;
			}
			.text{
				font-size: 32px;
			}
		}
	}
	.list2,.list4{
		height: 120px;
		.content {
			height: 120px;
			border-radius: 10px;
			background-color: #f5820f;
			color: #ffffff;
			text-align:center;
			font-family: "微软雅黑";
			.title{
				font-size: 16px;
			}
			.text{
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
			text-align:center;
			font-family: "微软雅黑";
			.title{
				font-size: 16px;
			}
			.text{
				font-size: 32px;
			}
		}
	}
</style>