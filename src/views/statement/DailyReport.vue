<!--日结报表-->
<template>
	<div class="tab-container">
		<div style="padding:20px;">
			<el-row style="margin-top:20px;margin-bottom:20px;" :gutter="20">
				<el-col :span="8">
					<el-card shadow="hover" style="cursor:pointer;background-color: rgba(0,0,0,0.1);">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8" style="height:120px;">
					<el-card shadow="hover" style="cursor:pointer;background-color: rgba(0,0,0,0.1);">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="8" style="height:120px;">
					<el-card shadow="hover" style="cursor:pointer;background-color: rgba(0,0,0,0.1);">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-row style="margin-top:20px;padding:20px" :gutter="20">
			<el-col :span="12" align="left">
				<el-table :data="tableData3" style="width: 100%">
					<el-table-column label="日期" align="center">
						<el-table-column type="index" label="序号" width="80px" align="center">
						</el-table-column>
						<el-table-column prop="province" label="省份" width="120">
						</el-table-column>
						<el-table-column prop="city" label="市区" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址" width="300">
						</el-table-column>
						<el-table-column prop="zip" label="邮编" width="120">
						</el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<el-table :data="tableData3" style="width: 100%">
					<el-table-column label="日期" align="center">
						<el-table-column type="index" label="序号" width="80px" align="center">
						</el-table-column>
						<el-table-column prop="province" label="省份" width="120">
						</el-table-column>
						<el-table-column prop="city" label="市区" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址" width="300">
						</el-table-column>
						<el-table-column prop="zip" label="邮编" width="120">
						</el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="padding:20px;">
			<el-col :span="24">
				<el-table :data="tableData3" style="width: 100%">
					<el-table-column label="日期" align="center">
						<el-table-column type="index" label="序号" width="80px" align="center">
						</el-table-column>
						<el-table-column prop="province" label="省份" width="120">
						</el-table-column>
						<el-table-column prop="city" label="市区" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
						<el-table-column prop="zip" label="邮编" width="120">
						</el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData3: [{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-08',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-06',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}, {
					date: '2016-05-07',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333
				}]
			}
		}
	}
</script>
<style scoped>
	dl {
		width: 100%;
		height: 100%;
		text-align: center;
	}
	
	.text {
		height: 80px;
		font-size: 18px;
		/* display: block; */
		line-height: 80px;
		text-align: center;
	}
	
	.content {
		height: 80px;
		line-height: 80px;
		text-align: center;
	}