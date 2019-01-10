<!--收银盘点-->
<template>
	<div class="tab-container">
		<div v-if="showModel == 1">
			<div class="title">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker v-model="formInline.begin_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="selectTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker v-model="formInline.end_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" @change="selectTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table :data="data" stripe border show-summary style="width: 100%;" size="mini">
				<el-table-column type="index" label="序号" width="60" align="center">
				</el-table-column>
				<el-table-column prop="document_num" width="200" label="货号" align="center">
					<template slot-scope="scope">
						<span @click="detail(scope.row)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" width="200" label="单据日期" align="center">
				</el-table-column>
				<el-table-column prop="tb" width="200" label="单据类型_id" align="center">
				</el-table-column>
				<el-table-column prop="type_name" width="200" label="单据类型" align="center">
				</el-table-column>
				<el-table-column prop="num" width="200" label="总数量" align="center">
				</el-table-column>
				<el-table-column prop="amount" width="200" label="总金额" align="center">
					<template slot-scope="scope">
						<span>{{(scope.row.scope/100).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" label="制单人">
				</el-table-column>
			</el-table>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--报溢报损-->
		<div class="tab-container" v-show="showModel == 4">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					报溢单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<!--调拨入库搜索框-->
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMation4" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation4.document_num" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation4.storage_date" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="盘点类型">
								<el-select v-model="forMation4.type" placeholder="请选择" style="width: 200px;" disabled>
									<el-option label="全盘" value="1"></el-option>
									<el-option label="抽盘" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation4.abstract" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-input v-model="forMation4.user_id" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--展示的表格-->
			<div class="tTable">
				<el-table :data="newTableData4" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品规格名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="number" label="数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="200" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="inventory_number" label="盘点数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="contrast_number" label="盘亏数量" width="200" align="center">
					</el-table-column>
					<el-table-column prop="contrast_money" label="盘亏金额" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.contrast_money/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="tab-container" v-show="showModel == 2">

				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						入库单
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="back">
							<svg-icon icon-class="cancel"/>
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="80px" :inline="true" :model="forMation2" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation2.document_num" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<!--<el-date-picker v-model="forMation2.storage_date" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" disabled>
								</el-date-picker>-->
								<el-date-picker v-model="forMation2.storage_date" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation2.cbid" placeholder="请选择供应商" style="width: 200px;" disabled>
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation2.abstract" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-input v-model="forMation2.single_person" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="tTable">
				<el-table :data="newTableData2" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品规格名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_num" label="数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="tag_price" label="吊牌价" width="100" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.tag_price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="100" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.discount/100}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="unit_price" label="采购价" width="100" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.unit_price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="count_money" label="小计" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.count_money/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!--退货-->
		<div class="tab-container" v-show="showModel == 3">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					采购退货单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMation3" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation3.document_num" placeholder="" disabled style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation3.created_at" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="入库单号">
								<el-input v-model="forMation3.join_order_sn" placeholder="" disabled style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation3.cbid" placeholder="请选择供应商" style="width: 200px;" disabled>
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation3.abstract" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人" disabled>
								<el-input v-model="forMation3.user_name" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--添加添加后的表格-->
			<div class="tTable">
				<el-table :data="newTableData3" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="80" align="center">
					</el-table-column>
					<el-table-column prop="barcode" label="条形码" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="goods_name" label="商品规格名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="150" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="150" align="center">
					</el-table-column>
					<el-table-column prop="unit_price" label="采购价" width="150" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.unit_price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_price" label="小计" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.total_price/100).toFixed(2)}}</span>
						</template>
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
				formInline: {
					begin_date: '', //开始时间
					end_date: '', //结束时间
				},
				value: '', //时间
				data: [], //表格数据
				supplierCommonSupplierList: [], //供应商列表
				per_page: 10,
				page: 1,
				total: 0,
				showModel: 1,
				forMation2:{},//入库
				newTableData2:[],//入库
				forMation3: {}, //退货
				newTableData3: [], //退货
				forMation4: {}, //报溢报损
				newTableData4: [], //报溢报损
			}
		},
		//页面加载之前
		created() {
			this.getData();
			this.getSupplierCommonSupplierList(); //获取供应商列表
		},
		//计算属性
		computed: {},
		//方法
		methods: {
			//请求数据
			ajaxjson() {
				let postData = this.formInline;
				postData.page = this.page;
				postData.per_page = this.per_page;
				//调用post请求方法
				this.$post(this.$retailopenbillToday, postData).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data.data;
						this.total = res.data.total;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				});
			},
			getData() {
				let date = new Date();
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let dataStr = Y + M + D;
				this.formInline.begin_date = dataStr;
				this.formInline.end_date = dataStr;
				this.ajaxjson();
			},
			selectTime(e) {
				this.ajaxjson();
			},
			//获取供应商列表
			getSupplierCommonSupplierList() {
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.supplierCommonSupplierList = res.data;
					}
				})
			},
			detail(e) {
				let id = e.id;
				let type = e.tb;
				let postData = {
					id: id,
				}
				//				2采购退货 3报溢报损 4零售开单零售退货
				switch(type) {
					case 1:
						//仓库入库单
						this.$post(this.$storageOrderDetail, postData).then((res) => {
							if(res.status_code == 0) {
								this.showModel = 2;
								this.forMation2 = res.data.purInfo; //
								this.newTableData2 = res.data.shop_list; //
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
						break;
					case 2:
						//采购退货
						this.$post(this.$purchasereturnInfo, postData).then((res) => {
							if(res.status_code == 0) {
								this.showModel = 3;
								this.forMation3 = res.data; //
								this.newTableData3 = res.data.goodsData; //
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
						break;
						//报溢报损单
					case 3:
						this.$post(this.$inventoryContrastDetail, postData).then((res) => {
							if(res.status_code == 0) {
								this.showModel = 4;
								this.forMation4 = res.data.reserveContrast; //
								this.newTableData4 = res.data.list; //
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
						break;
						//					case 4:
						//					this.$post(,postData).then((res)=>{
						//						
						//					})
						//					break;
				}
			},
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			back() {
				this.showModel = 1;
			}
		}
	}
</script>
<style scoped>
	.title {
		margin-bottom: 15px;
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
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
</style>

<!--添加店铺照片时候 的样式-->
<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>