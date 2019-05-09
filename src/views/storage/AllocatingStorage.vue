<template>
	<div>
		<!--采购单-->
		<div class="tab-container" v-show="isShow == 1">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col>
							<el-input placeholder="输入单据号" style="width:300px;margin-right: 20px;" v-model="formInline.document_num">
								<el-button slot="append" type="primary" @click='ajaxjson' style="background-color: #e0e0e0;border-radius: 0px;">
									<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
								</el-button>
							</el-input>
							<el-button type="primary" @click="showSearch = !showSearch">
								<svg-icon icon-class="filter" style="margin-right: 10px;" /> <span>筛选订单</span>
							</el-button>
						</el-col>
					</el-row>
				</div>
				<!--搜索-->
				<div class="search" v-show="showSearch">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInline.startTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInline.endTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调入店铺">
								<el-select v-model="formInline.shop_id" placeholder="请选择" style="width: 200px;">
									<el-option v-for="(item,index) in shopList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="formInline.user_id" placeholder="请选择">
									<el-option v-for="(item,index) in StaticGetBillingUser" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="2">所有</el-radio>
									<el-radio :label="0">未入库</el-radio>
									<el-radio :label="1">已入库</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center" class="bottomButton">
							<el-form-item label=" " align="center">
								<el-button @click="resetForm" name="cancel">清空</el-button>
								<el-button type="primary" @click="ajaxjson">确定</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable" id="printMe">
				<el-table :data="data" stripe border style="width: 100%;" show-summary :summary-method="getSummaries" size="mini">
					<el-table-column type="index" label="序号" :index="indexMethod" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="150" align="center">
						<template slot-scope="scope">
							<!--点击单据号跳转显示单据详情-->
							<span v-if="permission.indexOf('126') != -1" @click="addPurseMan(scope.row.id)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
							<span v-else style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="updated_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="shop_name" label="调出店铺" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_number" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_money" label="总金额" width="100" align="center">
						<template slot-scope="scope">
							<span>
								{{scope.row.total_money/100}}
							</span>
						</template>
					</el-table-column>
					
					<el-table-column prop="status" label="审核状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.status == 0" type="text">未入库</el-button>
							<el-button v-if="scope.row.status == 1" type="text" style="color: #666;">已出库</el-button>
							<el-button v-if="scope.row.status == 2" type="text" style="color: #666;">全部</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope" v-if="scope.row.status == 0">
							<el-button v-show="permission.indexOf('127') != -1" size="mini" type="warning" @click="bePutInStorage(scope.row.role_id)">入库</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--确定入库的弹窗-->
		<div class="model" v-show="PutInStorageModel">
			<div class="PutInStorage">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;font-size: 15px;">
						入库
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="text">
						商品入库后不可修改删除,确定入库吗?
					</el-col>
				</el-row>
				<el-row class="bottomButton" style="text-align: center;">
					<el-col :span='24'>
						<el-button @click="cancelPutInStorage" name="cancel">
							取消
						</el-button>
						<el-button type="primary" @click="sure">
							确定
						</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 调拨入库订单 -->
		<div class="tab-container" v-show="isShow == 2">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					调拨入库订单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan" name="topRightCancel">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button type="primary" @click="sureBePutInStorage">
							<svg-icon icon-class="outStore" style="margin-right: 10px;"/>
								入库
						</el-button>
						<el-button type="primary">打印</el-button>
					</el-col>
				</el-row>
			</div>
			<!--调拨入库搜索框-->
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation.document_num" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.created_at" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="调出店铺">
								<el-select v-model="forMation.shop_id" placeholder="请选择" disabled>
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.remark" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="forMation.user_id" placeholder="请选择" disabled>
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--<el-row style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="24">
					<el-button type="text"></el-button>
				</el-col>
			</el-row>-->
			<!--展示的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品名称规格" width="200" align="center">
					</el-table-column>
					<el-table-column prop="total_num" label="数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="singleton" label="吊牌价" align="center">
					</el-table-column>
					<el-table-column prop="tag_price" label="小计" align="center">
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
				permission:[],
				showSearch: false, //采购单输入
				isShow: true, //采购单是否显示
				PutInStorageModel: false, //确定入库
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
				StaticGetBillingUser:[],//制单人列表
				shopList:[],//获取店铺的列表
			}
		},
		created() {
			this.ajaxjson();
			this.getStaticGetBillingUser();//获取制单人列表
			this.getShopList();//获取调入店铺的列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			ajaxjson() {
				let postData = this.formInline;
				postData.per_page = this.per_page;
				postData.page = this.page;
				this.$post(this.$transferOutList, postData).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data.data;
						this.total = res.data.total; //多少条
						this.per_page = res.data.per_page; //当前一页多少条
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//获取店铺列表
			getShopList() {
				this.$post(this.$staticGetCompanyShop).then((res) => {
					if(res.status_code == 0) {
						this.shopList = res.data.shopList;
					}
				})
			},
			//获取制单人的列表
			getStaticGetBillingUser(){
				let postData = {
					shop_id:sessionStorage.getItem('shop_id'),
				};
				this.$post(this.$staticGetBillingUser,postData).then((res)=>{
					if(res.status_code == 0){
						this.StaticGetBillingUser = res.data.user_list;
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
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
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
						sums[index] = '合计';
						return;
					}
					if(column.property === "total_number") {
						values = data.map(item => Number(item.total_number));
					}
					if(column.property === "total_money") {
						values = data.map(item => Number(item.total_money));
					}
					if(column.property == "total_number" || column.property == "total_money") {
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
				sums[5] = sums[5]/100;
				return sums;
			},
			// 重置表单
			resetForm(formData) {
				let formInline ={
					type:1,//仓库调入
					document_num:'',//单据号
					startTime:'',//开始时间
					endTime:'',//结束时间
					shop_id:'',//调出店铺
					user_id:'',//用户id
					status:2,//状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
			// 新增采购单页面
	
			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = 1;
			},
			deleteAdd() {
				console.log("删除!")
			},
			//入库点击显示确定入库
			bePutInStorage(e) {
				this.PutInStorageId = e;
				this.PutInStorageModel = true;
			},
			sureBePutInStorage(){
				this.PutInStorageModel = true;
			},
			//确定入库
			sure(){
				let postData = {
					id:this.PutInStorageId,
				}
				this.$post(this.$transferStorageOrder,postData).then((res) =>{
					if(res.status_code == 0){
						this.$message({
							type:'success',
							message:res.message,
						});
						this.ajaxjson();
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
			//隐藏入库
			cancelPutInStorage() {
				this.PutInStorageModel = false;
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	/*添加时候的弹出框的title*/
	.search .el-select{
		min-width: 220px;
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
		background: #f4f4f4;
		padding: 20px 20px 0px;
	}
	
	.search1 {
		padding: 20px;
	}
	.search1 .el-input{
		min-width: 220px;
	}
	.search1 .el-select{
		min-width: 220px;
	}
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.tTable {
		margin-top: 20px;
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
		width: 960px;
		height: 540px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -270px;
		margin-left: -480px;
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
		width: 480px;
		height: 270px;
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
			font-size: 14px;
			text-align: center;
			height: 130px;
			line-height: 130px;
		}
	}
	.delete {
		text-align: center;
		margin-top: 50px;
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 15px;
		margin-bottom: 20px;
	}
</style>
<!--添加店铺照片时候 的样式-->
<style>
	.el-button--warning {
		background-color: #f48b25;
	}
</style>