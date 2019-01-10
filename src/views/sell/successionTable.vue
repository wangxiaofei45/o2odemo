<!--收银交班表-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row style="margin-top:15px;margin-left:20px;">
				<el-col >
					<el-button type="primary"><i class="erp-icon-xiabanjiaojie"></i>交班</el-button>
					<el-button type="primary"><i class="erp-icon-dayin"></i>打印</el-button>
				</el-col>
			</el-row>
		</div>
		<el-row>
			<el-col :span="24" style="margin-top:20px;margin-bottom:20px;">
				<span>开始时间：2018-09-29 15:00:00</span>
				<span>当前时间：2018-09-29 15:00:00</span>
				<span>店铺   亿链旗舰店</span>
			</el-col>
		</el-row>
		<div style="padding:20px;">
			<el-row style="margin-top:20px;margin-bottom:20px;" :gutter="20">
			<el-col :span="4">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4" style="height:120px;">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4" style=";height:120px;">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4" style="height:120px;">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4" style="height:120px;">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="4" style="height:120px;">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
					<div class="grid-content grid-con-1">
						<div class="grid-cont-right">
							<div class="grid-num" style="text-align:center;height:60px;line-height:60px;">1234</div>
							<div style="text-align:center;height:60px;line-height:60px;">用户访问量</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		</div>
	
		<el-row style="padding:20px;">
			<el-col :span="24">
				<el-table :data="tableData3" stripe border size="mini" style="width: 100%">
					<el-table-column prop="date" label="日期" width="150">
					</el-table-column>
					<el-table-column label="配送信息">
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column label="地址">
							<el-table-column prop="province" label="省份" width="120">
							</el-table-column>
							<el-table-column prop="city" label="市区" width="120">
							</el-table-column>
							<el-table-column prop="address" label="地址" min-width="300">
							</el-table-column>
							<el-table-column prop="zip" label="邮编" width="120">
							</el-table-column>
						</el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-row style="margin-top:20px;padding:20px" :gutter="20">
			<el-col :span="12" align="left">
				<el-table :data="tableData3" style="width: 100%">
					<el-table-column prop="date" label="日期" width="150">
					</el-table-column>
					<el-table-column label="配送信息">
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column label="地址">
							<el-table-column prop="province" label="省份" width="120">
							</el-table-column>
							<el-table-column prop="city" label="市区" width="120">
							</el-table-column>
							<el-table-column prop="address" label="地址" width="300">
							</el-table-column>
							<el-table-column prop="zip" label="邮编" width="120">
							</el-table-column>
						</el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<el-table :data="tableData3" style="width: 100%">
					<el-table-column prop="date" label="日期" width="150">
					</el-table-column>
					<el-table-column label="配送信息">
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column label="地址">
							<el-table-column prop="province" label="省份" width="120">
							</el-table-column>
							<el-table-column prop="city" label="市区" width="120">
							</el-table-column>
							<el-table-column prop="address" label="地址" width="300">
							</el-table-column>
							<el-table-column prop="zip" label="邮编" width="120">
							</el-table-column>
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
.title {
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 15px;
}

dl{
	width:100%;
	height:100%;
	text-align: center;
}
.text{
	height:80px;
	font-size: 18px;
	/* display: block; */
	line-height: 80px;
	text-align: center;
}
.content{
	height:80px;
	line-height: 80px;
	text-align: center;
}



