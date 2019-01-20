<template>
	<div>
		<!--采购单-->
		<div class="tab-container" v-show="isShow == 1">
			<div class="title">
				<el-row>
					<el-col>
						<el-button v-show="permission.indexOf('226') != -1" type="primary" @click="purchasereturnAdd">新增</el-button>
						<el-input v-show="permission.indexOf('231') != -1" placeholder="载入入库单" style="width:240px" v-model="Loadthwarehousereceipt" @keyup.enter.native="Loadwarehousereceipt"></el-input>
						<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px"></el-input>
						<el-button type="primary">搜索</el-button>
						<el-button type="primary" @click="searchModel = !searchModel">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<!--搜索-->
			<div class="search" v-show="searchModel">
				<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInline.startDate">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formInline.endDate">
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
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="formInline.user_id" placeholder="请选择">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="100">所有</el-radio>
									<el-radio :label="0">未退货</el-radio>
									<el-radio :label="1">已退货</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button @click="resetForm">清空</el-button>
								<el-button type="primary" @click="ajaxjson">确定</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" show-summary :summary-method="getSummaries" size="mini">
					<el-table-column type="index" label="序号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="150" align="center">
						<template slot-scope="scope">
							<span v-if="permission.indexOf('227') != -1" style="color: #18CCBA;cursor:pointer;" @click="goToSeeOrModify(scope.row)">{{scope.row.document_num}}</span>
							<span v-else style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="cb_name" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_price" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="is_pass" label="审核状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.is_pass == 0" type="text">未审核</el-button>
							<el-button v-if="scope.row.is_pass == 1" type="text">已审核</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope" v-if="scope.row.is_pass == 0">
							<el-button v-show="permission.indexOf('229') != -1" size="mini" type="warning" icon="el-icon-edit" @click="returnedGoods(scope.row.id)">退货</el-button>
							<el-button v-show="permission.indexOf('230') != -1" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="model" v-show="Loadwarehousereceiptmodel">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							入库单
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_new_rult">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="selectData" stripe border max-height="450" size="mini" border  @selection-change="handleSelectionChange">
							<el-table-column
						      type="selection"
						      width="55">
						   </el-table-column>
							<el-table-column prop="barcode" label="条形码" fixed width="100" align="center">
							</el-table-column>
							<el-table-column prop="goods_name" label="商品规格名称" width="100" align="center">
							</el-table-column>
							<el-table-column prop="stock" label="数量" width="100" align="center">
							</el-table-column>
							<el-table-column prop="price" label="吊牌价" width="100" align="center">
							</el-table-column>
							<el-table-column prop="discount" label="折扣" width="100" align="center">
							</el-table-column>
							<el-table-column prop="unit_price" label="采购价" width="100" align="center">
							</el-table-column>
							<el-table-column prop="total_price" label="小计" align="center">
							</el-table-column>
						</el-table>
					</div>
					<el-row>
						<el-col :span="24" style="margin-top:20px; text-align: right;">
							<el-button type="primary" style="float:right;margin-right:30px" @click="determineLoad">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 新增采购单 -->
		<div class="tab-container" v-show="isShow == 2">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					新增采购退货单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button v-show="permission.indexOf('226') != -1" type="primary" @click="saveNotAudit">保存</el-button>
						<el-button v-show="permission.indexOf('229') != -1" type="primary" @click="openSave">确认退货</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation.document_num" placeholder="" disabled style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.created_at" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="入库单号">
								<el-input v-model="forMation.join_order_sn" placeholder="" disabled style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.cbid" placeholder="请选择供应商" @change="selectSupplier" style="width: 200px;">
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.abstract" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="forMation.user_name" placeholder="邢建辉">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-row class="search2" style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="12">
					<el-button type="text">录入排序</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-input placeholder="请输入内容" v-model="typeAndBarCode.bar_code" class="input-with-select" style="width: 400px;" @keyup.enter.native="addgoods">
						<el-select v-model="typeAndBarCode.type" slot="prepend" placeholder="请选择">
							<el-option label="条码" value="1"></el-option>
							<el-option label="货号" value="2"></el-option>
						</el-select>
					</el-input>
				</el-col>
			</el-row>
			<!--添加添加后的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="barcode" label="条形码" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="goods_name" label="商品规格名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="数量" width="100" align="center">
						<template slot-scope="scope">
							<el-input size="small" v-model="scope.row.stock" placeholder="" align="center" @blur="multiply(scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="100" align="center">
					</el-table-column>
					<el-table-column prop="unit_price" label="采购价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_price" label="小计" align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteAdd()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--通过货号添加-->
			<div class="model" v-show="open_new_rult">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							<!--虚拟的值-->
							选择商品明细：0002,休闲馆
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_new_rult">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="specificationOfGoods" stripe border max-height="450" size="mini" border>
							<el-table-column prop="color" label="颜色" fixed width="100" align="center">
								<template slot-scope="scope">
									<el-select size="medium" v-model="scope.row.color" value-key="index" @change="sureColor($event, scope.row,scope.$index)">
										<el-option v-for="item in color" :value="item" :label="item" :key="item">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="size" label="尺码" width="100" align="center">
								<template slot-scope="scope">
									<el-select size="medium" v-model="scope.row.size" @change="sureSize($event, scope.row,scope.$index)">
										<el-option v-for="item in size" :value="item" :label="item" :key="item">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="stock" label="数量" width="100" align="center">
								<template slot-scope="scope">
									<el-input size="small" v-model="scope.row.stock" placeholder="请输入" align="center"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="price" label="吊牌价" width="100" align="center">
							</el-table-column>
							<el-table-column prop="discount" label="折扣" width="100" align="center">
							</el-table-column>
							<el-table-column prop="unit_price" label="采购价" width="100" align="center">
							</el-table-column>
							<el-table-column label="操作" align="center">
								<template slot-scope="scope">
									<el-button type="text" v-if="specificationOfGoods.length != 1" icon="el-icon-remove" @click="reduceRow(scope.$index)"></el-button>
									<el-button type="text" v-if="specificationOfGoods.length ==1||scope.$index == specificationOfGoods.length-1" icon="el-icon-circle-plus" @click="addRow(scope.row)"></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-row>
						<el-col :span="24" style="margin-top:20px; text-align: right;">
							<el-button type="primary" style="float:right;margin-right:30px" @click="sureAddNext">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>

		</div>
		<!--确定退货-->
		<div class="model" v-show="fromAndSave">
			<div class="save_model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						确认退货
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelSave">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col style="margin-top:20px; text-align: center;font-size: 14px;">
						是否确定退货?
					</el-col>
					<el-col :span="24" style="margin-top:20px; text-align: center;">
						<el-button style="width: 120px;" @click="cancelSave">取消</el-button>
						<el-button style="width: 120px;" type="primary" @click="sureSave">确定</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission:[],
				page: 1, //分页
				total: 0,
				per_page: 10,
				is_load: 0, //区分是否是载入
				prid: '', //本地暂时存储新增订单的id
				//添加单据号 或者是 货号去添加退货的下拉选择
				typeAndBarCode: {
					type: '',
					bar_code: '',
				},
				search: '', //采购单输入
				Loadthwarehousereceipt: '', //载入入库单
				isShow: 1, //采购单是否显示
				fromAndSave: false, //保存并提交
				//筛选时候的表单
				formInline: {
					startDate:'',//开始时间
					endDate:'',//结束时间
					cbid:'',//供应商id
					user_id:'',//制单人
					status:100,//单据状态
				},
				forMation: {},
				editVisible: false,
				data: [], //展示出来的数据
				supplierCommonSupplierList: [], //获取的供应商列表
				currentVendor: {}, //存储选择好的供应商
				newTableData: [], //新增的时候的暂存列表
				color: [], //选择规格颜色选项
				size: [], //选择规格尺码选项
				sku_data: [], //选择规格中间查询
				open_new_rult: false, //添加商品时候的规格值
				specificationOfGoods: [ //商品规格
					{
						color: '', //颜色
						size: '', //尺码
						stock: '', //数量
						total_price: '',
					},
				],
				returnedGoodsId: '', //退货的id
				Loadwarehousereceiptmodel: false, //载入时候的model
				selectData: [], //载入时候的
				multipleSelection: [],//选中的数据
				join_order_sn:'',
				cbid:0,
				user_name:'',
				searchModel:false,//显示搜索
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//刷新获取页面数据
			ajaxjson() {
				let postData = Object.assign(this.formInline, {
					page: this.page,
					per_page: this.per_page,
				});
				this.$post(this.$purchasereturnList, postData).then((res) => {
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
			//获取供应商列表
			getSupplierCommonSupplierList() {
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.supplierCommonSupplierList = res.data;
					}
				})
			},
			//获取选择供应商
			selectSupplier(e) {
				for(var i = 0; i < this.supplierCommonSupplierList.length; i++) {
					if(e == this.supplierCommonSupplierList[i].id) {
						this.currentVendor = this.supplierCommonSupplierList[i];
					}
				}
			},
			//载入入库单
			Loadwarehousereceipt() {
				this.is_load = 1;
				let postData = {
					document_num: this.Loadthwarehousereceipt,
				}
				this.$post(this.$purchasereturnLoad, postData).then((res) => {
					if(res.status_code == 0) {
						this.join_order_sn = res.data.document_num;
						this.currentVendor.id = res.data.supplier_id;
						this.cbid =  res.data.supplier_id;
						this.user_name = res.data.supplier_name;
						let data = res.data.data;
						for(let i = 0; i < data.length; i++) {
							data[i].barcode = data[i].bar_code;
							delete data[i].bar_code;
							data[i].goods_name = data[i].norm;
							delete data[i].norm;
							data[i].stock = 1;
							delete data[i].total_num;
							data[i].discount = data[i].discount / 100;
							data[i].price = data[i].tag_price / 100;
							delete data[i].tag_price;
							data[i].unit_price = data[i].singleton / 100;
							delete data[i].singleton;
							data[i].total_price = data[i].count_money / 100;
							delete data[i].count_money;
							delete data[i].created_at;
							delete data[i].pur_id;
							delete data[i].return_number;
							delete data[i].updated_at;
						}
						this.selectData = data;
						this.Loadwarehousereceiptmodel = true;
						console.log(this.forMation);
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			handleSelectionChange(val) {
		       this.multipleSelection = val;
		   	},
		   	//确定入库
		   	determineLoad(){
		   		this.Loadwarehousereceiptmodel = false;
		   		this.newTableData = this.multipleSelection;
		   		this.purchasereturnAdd();
		   	},
			//新增采购退货单
			purchasereturnAdd() {
				let postData = {
					is_load: this.is_load,
				}
				this.$post(this.$purchasereturnAdd,postData).then((res) => {
					if(res.status_code == 0) {
						this.prid = res.data.prid;
						this.isShow = 2;
						this.purchasereturnInfo(this.prid);
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//根据订单号获取订单详情 新增 或者修改都走这一步
			purchasereturnInfo(e) {
				let postData = {
					id: e
				}
				this.$post(this.$purchasereturnInfo, postData).then((res) => {
					if(res.status_code == 0) {
						this.forMation = res.data;
						this.forMation.join_order_sn = this.join_order_sn;
						if(this.user_name){
							this.forMation.cbid = this.cbid;
							this.forMation.user_name = this.user_name;
						}
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//去修改或者是查看
			goToSeeOrModify(e) {
				console.log(e);
				if(e.is_pass == 0) {
					let postData = {
						id: e.id,
					}
					this.$post(this.$purchasereturnInfo, postData).then((res) => {
						if(res.status_code == 0) {
							this.currentVendor.id = res.data.cbid
							this.forMation = res.data;
							this.isShow = 2;
							this.newTableData = res.data.goodsData;
						}
					})
				} else {
					console.log("查看")
				}
			},
			//
			addgoods() {
				if(this.currentVendor.id) {
					let postData = this.typeAndBarCode;
					if(postData.type == 1) {
						this.$post(this.$staticGetCodeGoods, postData).then((res) => {
							if(res.status_code == 0) {
								let datas = res.data;
								datas.stock = '';
								datas.discount = this.currentVendor.discounts / 100;
								datas.price = datas.sku_price / 100;
								datas.unit_price = datas.price * datas.discount;
								datas.goods_name = datas.goods_name + '|' + datas.specnamestr;
								let canAdd = true;
								for(let i = 0; i < this.newTableData.length; i++) {
									if(datas.id == this.newTableData[i].id) {
										canAdd = false;
									}
								};
								if(canAdd) {
									this.newTableData.push(datas);
								} else {
									this.$message({
										type: 'error',
										message: "您已经添加过该商品了",
									})
								}
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else if(postData.type == 2) {
						this.$post(this.$staticGetCodeGoods, postData).then((res) => {
							if(res.status_code == 0) {
								this.color = res.data.sale_attrs[0].data;
								this.size = res.data.sale_attrs[1].data;
								this.sku_data = res.data.sku_data;
								this.open_new_rult = true;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					}
				} else {
					this.$message({
						type: 'error',
						message: "请先选择供应商",
					})
				}
			},
			sureColor(e, item, index) {
				if(item.size) {
					let canAdd = true;
					let str = item.color + '|' + item.size;
					for(let i = 0; i < this.specificationOfGoods.length; i++) {
						if(this.specificationOfGoods[i].specnamestr == str) {
							canAdd = false;
						}
					};
					if(canAdd) {

						for(let i = 0; i < this.sku_data.length; i++) {
							if(this.sku_data[i].specnamestr == str) {
								item = Object.assign(item, this.sku_data[i]);
								item.discount = this.currentVendor.discounts / 100;
								item.price = item.sku_price / 100;
								item.unit_price = item.price * item.discount;
							};
							return;
						}
					} else {
						this.$message({
							type: 'error',
							message: '您已添加过该商品,请勿重复添加!'
						})
					}

				}

			},
			//确定选择的颜色
			sureSize(e, item, index) {
				if(item.color) {
					let canAdd = true;
					let str = item.color + '|' + item.size;
					for(let i = 0; i < this.specificationOfGoods.length; i++) {
						if(this.specificationOfGoods[i].specnamestr == str) {
							canAdd = false;
						}
					};
					if(canAdd) {
						for(let i = 0; i < this.sku_data.length; i++) {
							if(this.sku_data[i].specnamestr == str) {
								item = Object.assign(item, this.sku_data[i]);
								item.discount = this.currentVendor.discounts / 100;
								item.price = item.sku_price / 100;
								item.unit_price = item.price * item.discount;
							}
						}
					} else {
						this.$message({
							type: 'error',
							message: '您已添加过该商品,请勿重复添加!'
						})
					}
				}
			},
			//添加退货单的时候添加一条数据
			addRow(e) {
				if(e.sku_price) {
					let obj = {
						color: '',
						size: '',
						stock: '',
						total_price: '',
					}
					this.specificationOfGoods.push(obj);
				} else {
					this.$message({
						type: 'error',
						message: '请先完善该条信息!'
					})
				}
			},
			//删除当前行
			reduceRow(index) {
				this.specificationOfGoods.splice(index, 1); //删除最后一个
			},
			//取消通过货号添加货号的弹窗
			cancel_new_rult() {
				this.open_new_rult = false;
			},
			//货号添加时候点击确定按钮
			sureAddNext() {
				let Arr = this.$coppyArray(this.specificationOfGoods);
				let newTableData = this.$coppyArray(this.newTableData);
				console.log(Arr);
				for(let i = 0; i < Arr.length; i++) {
					Arr[i].goods_name = Arr[i].goods_name + '|' + Arr[i].specnamestr;
					delete Arr[i].color;
					delete Arr[i].size;
					delete Arr[i].specnamestr;
				}
				this.newTableData = newTableData.concat(Arr);
			},
			//保存没有退货
			saveNotAudit() {
				let newTableData = this.$coppyArray(this.newTableData);
				let postData = {
					id: this.prid, //采购单id
					cbid: this.currentVendor.id, //供应商id
					abstract: '', //摘要,
					join_order_sn: this.join_order_sn,
					goodsData: JSON.stringify(newTableData), //商品数据
				}
				this.$post(this.$purchasereturnModify, postData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						})
						this.isShow = 1;
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//退货弹窗
			returnedGoods(e) {
				this.returnedGoodsId = e,
					this.fromAndSave = true;
			},
			//确定退货
			sureSave() {
				let postData = {
					id: this.returnedGoodsId,
				}
				this.$post(this.$purchasereturnAudit, postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						})
						this.fromAndSave = false;
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})

			},
			//取消退货
			cancelSave() {
				this.fromAndSave = false;
			},
			//采购退货单删除
			handleDelete(e) {
				console.log(e);
				let postData = {
					id: e,
				}
				this.$delete(this.$purchasereturnDelete, postData);
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
			// 重置表单
			resetForm(formData) {
				let formInline = {
					startDate:'',//开始时间
					endDate:'',//结束时间
					cbid:'',//供应商id
					user_id:'',//制单人
					status:100,//单据状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = 1
			},
			//
			deleteAdd() {
				console.log("删除!")
			},
			//保存并提交
			openSave() {
				this.fromAndSave = true;
			},

		}
	}
</script>
<style scoped>
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
	.search2 .el-select .el-input {
		width: 100px;
	}
	
	.search2 .input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
	
	.el-button--warning {
		background-color: #f48b25;
	}
	
	.el-button--danger {
		background-color: #ef4d4c;
	}
</style>