<!--库存统计-->
<template>
	<div class="tab-container">
		<div style="padding:30px;">
			<el-row style="" :gutter="30">
				<el-col :span="4" :offset="2">
					<el-card shadow="hover" :body-style="{padding: '0px'}">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">5000</div>
								<div style="text-align:center;height:60px;line-height:60px;">库存数量</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="4" style="height:120px;">
					<el-card shadow="hover" :body-style="{padding: '0px'}">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">100.00</div>
								<div style="text-align:center;height:60px;line-height:60px;">库存均价</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="4" style=";height:120px;">
					<el-card shadow="hover" :body-style="{padding: '0px'}">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">500000.00</div>
								<div style="text-align:center;height:60px;line-height:60px;">库存总价</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="4" style="height:120px;">
					<el-card shadow="hover" :body-style="{padding: '0px'}">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">500</div>
								<div style="text-align:center;height:60px;line-height:60px;">商品品牌</div>
							</div>
						</div>
					</el-card>
				</el-col>
				<el-col :span="4" style="height:120px;">
					<el-card shadow="hover" :body-style="{padding: '0px'}">
						<div class="grid-content grid-con-1">
							<div class="grid-cont-right">
								<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">500</div>
								<div style="text-align:center;height:60px;line-height:60px;">商品类型</div>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<el-row :gutter="20" style="padding: 25px;">
			<el-col :span="4">
				<el-select v-model="value5" multiple placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select v-model="value6" multiple placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select v-model="value7" multiple placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row style="padding: 25px;">
			<el-col :span="24">
				<el-table :data="tableData3" stripe border size="mini" style="width: 100%">
					<el-table-column label="配送信息" align="center">
						<el-table-column prop="province" label="省份" width="120" align="center">
						</el-table-column>
						<el-table-column prop="city" label="市区" width="120" align="center">
						</el-table-column>
						<el-table-column prop="address" label="地址" min-width="300" align="center">
						</el-table-column>
						<el-table-column prop="zip" label="邮编" width="120" align="center">
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
				}],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value5: [],
				value6: [],
				value7: [],
			}
		}
	}
</script>
<style scoped>
	.title {
		margin-top: 15px;
		margin-bottom: 15px;
		padding: 15px;
	}
	
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