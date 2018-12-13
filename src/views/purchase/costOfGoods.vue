<template>
	<div>
		<!--采购单-->
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col>
						<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="search"></el-input>
						<el-button type="primary">搜索</el-button>
						<el-button type="primary">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<!--搜索-->
			<div class="search">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateEnd">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button @click="submitForm('dynamicValidateForm')">清空</el-button>
								<el-button type="primary" @click="resetForm('dynamicValidateForm')">确定</el-button>
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
					      <img  :src="scope.row.img" alt="" style="width: 50px;">
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
				data:[
					{
						img:'http://img1.3lian.com/img013/v2/98/d/109.jpg',//照片
						barCode:'45454545',//条形码
						goodName:'4545',//商品名称
						supplier:'4545',//供应商
						LastPurchasePrice:'100',//上次采购价
						LastPurchaseTime:'2018-12-30 19:20',//上次采购时间
					}
				],//展示出来的数据
			}
		},
		methods: {
			//有问题 只能点击一次
			addchange(val) {
				console.log("选中当前行")
		  },
			//
			// 提交表单
			submitForm(formName) {
				// this.$refs[formName].validate((valid) => {
				// 	if (valid) {
				// 		alert('submit!');
				// 	} else {
				// 		console.log('error submit!!');
				// 		return false;
				// 	}
				// });
			},
			// 重置表单
			resetForm(formData) {
				// 	this.$nextTick(function() {
				//   	this.$refs[formData].resetFields();
				//  })
				if(this.$refs.formData !== undefined) {
					this.$refs.formData.resetFields();
				}
			},
		}
	}
</script>
<style scoped>
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
	}
	
	.model_con {
		width: 800px;
		height: 600px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -300px;
		margin-left: -400px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
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
