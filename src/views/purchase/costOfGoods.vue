<template>
		<!--采购单-->
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col>
						<el-input placeholder="输入条码" style="width:300px;margin-right: 20px;" v-model="formInline.barcode">
							<el-button slot="append" type="primary" @click='ajaxjson' style="background-color: #e0e0e0;border-radius: 0px;">
								<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
							</el-button>
						</el-input>
						<el-button type="primary" @click="modelSearch = !modelSearch">
							<svg-icon icon-class="filter" style="margin-right: 10px;" /> <span>筛选订单</span>
						</el-button>
					</el-col>
				</el-row>
			</div>
			<!--搜索-->
			<div class="search" v-if="modelSearch">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.startDate">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.endDate">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.cbid" placeholder="请选择">
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label="" align="center" class="bottomButton">
								<el-button  @click="resetForm" name="cancel">清空</el-button>
								<el-button type="primary" @click="ajaxjson">确定</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" :index="indexMethod" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="sku_img" label="图片" fixed width="80" align="center">
						<template slot-scope="scope">
					      <img  :src="scope.row.sku_img" alt="" style="width: 50px;">
					    </template>
					</el-table-column>
					<el-table-column prop="barcode" label="条形码" fixed width="120" align="center">
					</el-table-column>
					<el-table-column prop="goods_name" label="商品名称规格" width="120" align="center">
					</el-table-column>
					<el-table-column prop="cb_name" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="price" label="上次采购价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="updated_at" label="上次采购时间">
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="page"
			      :page-sizes="[10, 20, 30, 40]"
			      :page-size="100"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
  			</div>			
		</div>

</template>
<script>
	export default {
		data() {
			return {
				page:1,//分页
				total:0,
				per_page:10,
				search: '', //采购单输入
				modelSearch:false,
				//表单
				formInline: {
					barcode:'',//条形码
					startDate: '',//开始时间
					endDate: '',//结束时间
					cbid: '',//供应商id
				},
				supplierCommonSupplierList:[],//供应商列表
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
		created(){
			this.ajaxjson();
			this.getSupplierCommonSupplierList(); //获取供应商列表
		},
		methods: {
			//有问题 只能点击一次
			addchange(val) {
				console.log("选中当前行")
		  	},
		  	//获取供应商列表
			getSupplierCommonSupplierList() {
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.supplierCommonSupplierList = res.data;
					}
				})
			},
			//首次加载
			ajaxjson() {
				let postData = Object.assign(this.formInline,{page: this.page,per_page:this.per_page,});
				this.$post(this.$purchaseCost, postData).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data.data;
						this.total = res.data.total;//多少条
						this.per_page = res.data.per_page;//当前一页多少条
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
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
			// 重置表单
			resetForm(formData) {
				let formInline = {
					barcode:'',//条形码
					startDate: '',//开始时间
					endDate: '',//结束时间
					cbid: '',//供应商id
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
		}
	}
</script>
<style scoped>
	.title {
		margin-bottom: 15px;
	}
	.bottomButton .el-button{
		width: 120px;
		height: 40px;
	}
	.search {
		background: #f4f4f4;
		padding: 20px 20px 0px;
		min-width: 1300px;
	}
	.search .el-input,.el-select{
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
