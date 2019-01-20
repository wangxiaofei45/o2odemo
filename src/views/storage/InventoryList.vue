<!--在途商品-->
<template>
	<div>
		<div class="tab-container">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col :span="12">
							<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="formInline.document_num"></el-input>
							<el-button type="primary">搜索</el-button>
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<a :href="upload()" v-show="permission.indexOf('151') != -1">
								<el-button type="primary">
									导出
								</el-button>
							</a>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable" id="printMe">
				<el-table :data="data" stripe border style="width: 100%;" show-summary :summary-method="getSummaries" size="mini">
					<el-table-column type="index" label="序号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="img_url" label="图片" fixed width="100" align="center">
						<template slot-scope="scope">
							<img :src="scope.row.img_url" style="height: 40px;"/>
						</template>
					</el-table-column>
					<el-table-column prop="goods_name" label="商品名称" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="freight_number" label="货号" width="150" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="颜色尺码" width="100" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" width="150" align="center">
					</el-table-column>
					<el-table-column prop="reserve_count" label="库存" width="100" align="center">
					</el-table-column>
					<el-table-column prop="stock_price" label="采购价" align="center">
					</el-table-column>
					<el-table-column prop="stock_count_money" label="采购合计" align="center">
						
					</el-table-column>
					<el-table-column prop="tag_price" label="吊牌价" align="center">
						
					</el-table-column>
					<el-table-column prop="tag_count_money" label="合计金额" align="center">
						
					</el-table-column>
					<el-table-column prop="brand_name" label="品牌" align="center">
						
					</el-table-column>
					<el-table-column prop="category_name" label="分类" align="center">
						
					</el-table-column>
					
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
	</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission:[],
				showSearch: true, //采购单输入
				//筛选时候的表单
				formInline: {
					type:1,//仓库调入
					document_num:'',//单据号
					startTime:'',//开始时间
					endTime:'',//结束时间
					shop_id:'',//调出店铺
					user_id:'',//用户id
					status:2,//状态
				},
				forMation: {},//订单详情
				data: [], //展示出来的数据
				newTableData: [],
				per_page: 10,
				page: 1,
				total:0,
				PutInStorageId:'',//入库id中间变量
				shopList:[],
			}
		},
		created() {
			this.getShopList(); //获取供应商列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			ajaxjson() {
				let postData = this.formInline;
				postData.per_page = this.per_page;
				postData.page = this.page;
				this.$post(this.$inventoryReserveList, postData).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data.warehouseDetail.data;
						this.total = res.data.warehouseDetail.total; //多少条
						this.per_page = res.data.warehouseDetail.per_page; //当前一页多少条
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			upload(){
				return this.$inventoryReserveExport +"?shop_id=9"
			},
			lead(){
				this.$post(this.$inventoryReserveExport).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type:'success',
							message:res.meassage,
						})
					}else{
						this.$message({
							type:'error',
							message:res.meassage,
						})
					}
				})
			},
			getShopList() {
				this.$post(this.$staticGetCompanyShop).then((res) => {
					if(res.status_code == 0) {
						this.shopList = res.data.shopList;
						this.formInline.shop_id = this.shopList[0].id;
						this.ajaxjson();
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			//打开查看详情
			addPurseMan(e) {
				let postData = {
					id:e,
				};
				this.PutInStorageId = e;
				this.$post(this.$transferOrderDetail,postData).then((res) =>{
					if(res.status_code == 0){
						this.forMation = res.data.transfer;
						this.newTableData = res.data.list;
						this.isShow = 2;
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
					console.log(res);
				})
			},
			//表尾自定义合计行
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				let values = [];
				columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] = '总计';
						return;
					}
					if(column.property === "totalQuantity") {
						values = data.map(item => Number(item.totalQuantity));
					}
					if(column.property === "totalMoney") {
						values = data.map(item => Number(item.totalMoney));
					}
					if(column.property == "totalQuantity" || column.property == "totalMoney") {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += '';
					} else {
						sums[index] = '--';
					}
				});
				//返回相对应合计数值
				return sums;
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
<style rel="stylesheet/scss" lang="scss" scoped>
	/*添加时候的弹出框的title*/
	
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
		/* background: red; */
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
	
	.save_model_con {
		width: 400px;
		height: 200px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -100px;
		margin-left: -200px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
	}
	/*确定入库的提示框*/
	
	.PutInStorage {
		width: 500px;
		/*height: 300px;*/
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -200px;
		margin-left: -250px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
		.text {
			font-size: 16px;
			color: #666666;
			text-align: center;
			margin-top: 40px;
			margin-bottom: 40px;
		}
		.bottom {
			text-align: center;
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

<!--添加店铺照片时候 的样式-->
<style>
	.el-button--warning {
		background-color: #f48b25;
	}
</style>