<template>
	<div>
		<div class="tab-container" v-show="isShow == 1">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col :span="24">
							<el-button v-show="permission.indexOf('119') != -1" type="primary" @click="addPurseMan">新增</el-button>
							<el-input placeholder="载入入库单" style="width:240px" v-model="loadPurchaseList" @keyup.enter.native="loadPurchase"></el-input>
							<el-input placeholder="搜索单据号、供应商" style="width:240px" v-model="formInline.document_num"></el-input>
							<el-button type="primary">搜索</el-button>
							<el-button type="primary" @click="showModel = !showModel">筛选订单</el-button>
						</el-col>
					</el-row>
				</div>
				<!--搜索-->
				<div class="search" v-if="showModel">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.startTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.endTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.supplier_id" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="formInline.user_id" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="2">所有</el-radio>
									<el-radio :label="1">已入库</el-radio>
									<el-radio :label="0">未入库</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button type="primary" @click="resetForm">清空</el-button>
								<el-button type="primary" @click="ajaxjson">确定</el-button>
							</el-form-item>
						</el-col>
					</el-row>

				</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="150" align="center">
						<template slot-scope="scope">
							<span v-if="permission.indexOf('120') != -1" style="color: #18CCBA;cursor:pointer;" @click="goToSeeOrModify(scope.row)">{{scope.row.document_num}}</span>
							<span v-else style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="single_person" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_num" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="total_money" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="status" label="状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.status == 0" type="text">未入库</el-button>
							<el-button v-if="scope.row.status == 1" type="text" style="color: #666;">已入库</el-button>
							<el-button v-if="scope.row.status == 2" type="text" style="color: #666;">全部</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="single_person" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope" v-if="scope.row.status == 0">
							<el-button v-show="permission.indexOf('124') != -1" size="mini" type="warning" icon="el-icon-edit" @click="bePutIntorage(scope.row.id)">入库</el-button>
							<el-button v-show="permission.indexOf('123') != -1" size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
			<!--入库弹窗-->
			<div class="model" v-show="fromAndSave">
				<div class="save_model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							确认入库
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancelSave">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col style="margin-top:20px; text-align: center;font-size: 14px;">
							是否确定入库?
						</el-col>
						<el-col :span="24" style="margin-top:20px; text-align: center;">
							<el-button style="width: 120px;" @click="cancelSave">取消</el-button>
							<el-button style="width: 120px;" type="primary" @click="sureSave">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--载入-->
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
		</div>
		<!-- 新增采购单 -->
		<div class="tab-container" v-show="isShow == 2">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					新增采购入库单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="12">
						<el-button  type="primary" @click="saveNotAudit" :disabled="disabled">保存</el-button>
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button v-show="permission.indexOf('122') != -1" type="primary" @click="ToLead" :disabled="disabled">
							导入
						</el-button>
					</el-col>
				</el-row>
			</div>
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
								<el-date-picker v-model="forMation.storage_date" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期" :disabled="disabled">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.cbid" placeholder="请选择供应商" @change="selectSupplier" style="width: 200px;" :disabled="disabled">
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.abstract" placeholder="" style="width:220px;" :disabled="disabled"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-input v-model="forMation.single_person" placeholder="" style="width:220px;" :disabled="disabled"></el-input>
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
					<el-input placeholder="请输入内容" v-model="typeAndBarCode.bar_code" class="input-with-select" :disabled="disabled" style="width: 400px;" @keyup.enter.native="addgoods">
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
			<!--导入显示出来的订单-->
			<el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item" />
			</el-table>
			<!--选择规格-->
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
			<!--导入-->
			<div class="model" v-show="openToLead">
				<div class="toLeadModel">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							导入
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_openToLead">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row class="leadcon">
						<el-col :span="4">
							图片
						</el-col>
						<el-col :span="18">
							<el-col :sapn="24">
								上传的格式只支持.xls,.xlsx,请按照文件xls,xlsx格式上传
							</el-col>
							<el-col :sapn="24" class='button_con'>
								<a href="../../static/excel/采购入库单导入文件示例.xlsx" download="采购入库单导入文件示例.xlsx">
								<el-button type="primary" >
									下载模板
								</el-button>
								</a>
								<el-button type="primary" @click="openUploadExcel">
									上传文件
								</el-button>
							</el-col>
						</el-col>
					</el-row>
					<el-row class="buttom">
						<el-col :span="24" class="buttoncon">
							<el-button>
								取消
							</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--导入excel-->
			<div class="model" v-show="UploadExcel">
				<div class="UploadModel">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							导入
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_UploadExcel">
								<svg-icon icon-class="cancel"/>
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-upload
						          ref="upload"
						          class="upload"
						          :action="uploadUrl()"
						          :on-success="handleSuccess"
						          :limit=1
						          multiple
						          method:="post"
						          :on-preview="handlePreview"
						          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
						          :file-list="fileList">
						          <el-button size="small" type="primary" plain>上传</el-button>
						</el-upload>

					</el-row>
				</div>
			</div>
			<!--上传完成的提示-->
			<div class="model" v-show="finish">
				<div class="UploadModel">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							导入
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_finish">
								<svg-icon icon-class="cancel"/>
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" v-for="(item,index) in finishMessage" :key="index">
							{{item.message}}
						</el-col>
						<el-col :span="24">
							<el-button @click="cancel_finish">
								完成
							</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

	</div>
</template>
<script>

	export default {
		data() {
			return {
				permission:[],
				showModel:false,
				page: 1, //分页
				total: 0,
				per_page: 10,
				supplierCommonSupplierList: [], //供应商下拉选择的列表
				//添加商品时候的搜索
				typeAndBarCode: {
					type: '',
					bar_code: '',
				},
				type: 0,
				fromAndSave:false,
				Loadwarehousereceiptmodel:false,
				tableData: [], //上传表格数据
				tableHeader: [], //上传表格头部
				search: '', //采购单输入
				isShow: 1, //采购入库单
				currentPage4: 4, //
				//筛选时候的表单
				formInline: {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商
					user_id: '', //制单人
					status: 2, //状态
				},
				forMation: { //表单对象
					document_num: '',
					purchase_code: '',
					storage_date: '2018/12/18',
					user_id: '43',
					single_person: '',
					supplier_id: '',
					supplier_name: '',
					abstract: '', //摘要
					type: this.type,
					shopArr: '', //字符串
				},
				loadPurchaseList:'',//载入采购单
				new_info_model: true, //新增订单时候的model
				open_new_rult: false, //添加商品时候的规格值
				editVisible: false,
				openToLead: false, //上传之前的提示性文字
				UploadExcel: false,
				currentVendor: {},
				data: [], //展示出来的数据
				newTableData: [],
				color: [], //选择规格颜色选项
				size: [], //选择规格尺码选项
				sku_data: [], //选择规格中间查询
				addTable: [{
					img: "", //商品图片
					numbers: "0001", //货号
					name: "短袖", //商品名称
					brand: '品牌', //品牌
					craneQuotation: '1000', //吊牌价
				}],
				specificationOfGoods: [ //商品规格
					{
						color: '', //颜色
						size: '', //尺码
						stock: '', //数量
						total_price: '',
					},
				],
				selectData: [], //载入时候的
				multipleSelection:[],//选中的
				disabled:false,
				fileList:[],//上传的文件列表
				finishMessage:[],//上传提示的信息
				finish:false,
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList(); //获取供应商列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},

		methods: {
			//上传之前
			 handlePreview(file){
			 	console.log(file);
                //上传前要处理的事handlePreview
           },
			 //上传成功后
			handleSuccess(res, file){
				console.log(res)
                //上传成功要处理的事
                this.finishMessage = res.data.arr;
                let datas = res.data.shop
				for(let i=0;i<datas.length;i++){
					datas[i].barcode = datas[i].bar_code;
					datas[i].goods_name = datas[i].norm;
					datas[i].stock = datas[i].total_num;
					datas[i].price = datas[i].tag_price/100;
					datas[i].unit_price = datas[i].singleton;
					datas[i].total_price = datas[i].count_money;
				}
				this.newTableData = datas;
				this.UploadExcel = false;
				this.finish = true;
            },
            cancel_finish(){
            	this.finish = false;
            },
           uploadUrl(){
           	return this.$storageImportPurchase;
           },
			//首次进入的时候获取的
			ajaxjson() {
				let postData = this.formInline;
				postData.per_page = this.per_page;
				postData.page = this.page;
				this.$post(this.$storageList, postData).then((res) => {
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
			//分页
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			//入库
			bePutIntorage(e) {
				this.PutIntorageId = e;
				this.fromAndSave = true;
			},
			//查看
			goToSeeOrModify(e) {
					if(e.status == 0){
						this.disabled = false;
					}else{
						this.disabled = true;
					}
					let postData = {
						id: e.id,
					}
					this.$post(this.$storageOrderDetail, postData).then((res) => {
						if(res.status_code == 0) {
							this.currentVendor.id = res.data.purInfo.supplier_id;
							this.forMation = res.data.purInfo;
							this.forMation.cbid = this.forMation.supplier_id;
							this.forMation.abstract = this.forMation.remark
							let datas = res.data.shop_list
							for(let i=0;i<datas.length;i++){
								datas[i].barcode = datas[i].bar_code;
								datas[i].goods_name = datas[i].norm;
								datas[i].stock = datas[i].total_num;
								datas[i].price = datas[i].tag_price/100;
								datas[i].unit_price = datas[i].singleton;
								datas[i].total_price = datas[i].count_money;
							}
							this.newTableData = datas;
							this.isShow = 2;
						}
					})
				
			},
			sureSave() {
				let postData = {
					id: this.PutIntorageId,
				}
				this.$post(this.$storageConfirmStorage, postData).then((res) => {
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
			handleDelete(e){
				let postData= {
					id:e,
				}
				this.$delete(this.$storageDelPurchase,postData)
			},
			loadPurchase(){
				this.is_load = 1;
				let postData = {
					document_num:this.loadPurchaseList,
					page:this.page,
					per_page:this.per_page,
				}
				this.$post(this.$storageLoadPurchaseList,postData).then((res)=>{
					if(res.status_code == 0) {
						this.forMation = res.data.info;
						this.join_order_sn = res.data.info.document_num;
						this.currentVendor.id = res.data.info.cbid;
						this.cbid =  res.data.info.cbid;
						let data = res.data.list.data;
						for(let i = 0; i < data.length; i++) {
							data[i].price = data[i].price / 100;
							data[i].unit_price = data[i].unit_price / 100;
							data[i].discount = data[i].discount / 100;
							data[i].total_price = data[i].total_price / 100;
						}
						this.selectData = data;
						this.Loadwarehousereceiptmodel = true;
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
	   		determineLoad(){
		   		this.Loadwarehousereceiptmodel = false;
		   		this.newTableData = this.multipleSelection;
		   		this.isShow = 2;
		   	},
			//打开新增入库单 时候先获取单据号
			addPurseMan() {
				let postData = {
					code:121,
				}
				this.$post(this.$storageGetBarCode,postData).then((res) => {
					if(res.status_code == 0) {
						this.forMation.document_num = res.data.document_num;
						this.isShow = 2;
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
			selectSupplier(e) {
				for(var i = 0; i < this.supplierCommonSupplierList.length; i++) {
					if(e == this.supplierCommonSupplierList[i].id) {
						this.currentVendor = this.supplierCommonSupplierList[i];
						console.log(this.currentVendor);
					}
				}
			},
			//确定键
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
								item.total_price = item.price * item.stock;
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
								item.stock = 1;
								item.price = item.sku_price / 100;
								item.total_price = item.price * item.stock;
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
			// 本地添加一行如果此条信息没有完善 不允许添加
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
			//选择完商品后去添加到暂存的表格
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
			//失去焦点时去触发
			multiply(e) {
				e.total_price = Number(e.stock) * e.unit_price;
			},
			saveNotAudit() {
				let newTableData = this.$objDeepCopy(this.forMation);
				let arrData = this.$coppyArray(this.newTableData);
				newTableData.supplier_id = this.currentVendor.id;
				newTableData.supplier_name = this.currentVendor.name;
				newTableData.type = this.type;
				for(let i = 0; i < arrData.length; i++) {
					arrData[i].bar_code = arrData[i].barcode;
					arrData[i].norm = arrData[i].goods_name;
					arrData[i].tag_price = arrData[i].price;
					arrData[i].singleton = arrData[i].unit_price;
					arrData[i].total_num = arrData[i].stock;
					arrData[i].count_money = arrData[i].total_price;
				}
				newTableData.shopArr = JSON.stringify(arrData);
				this.$post(this.$storageAddOrder, newTableData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						})
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},		
			// 重置表单
			resetForm(formData) {
				let formInline = {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商
					user_id: '', //制单人
					status: 2, //状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},

			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = 1
			},
			openUploadExcel() {
				this.UploadExcel = true;
				this.openToLead = false;
			},
			
			// 关闭添加商品规格弹窗
			cancel_new_rult() {
				this.open_new_rult = false;
			},
			//取消上传excel
			cancel_UploadExcel() {
				this.UploadExcel = false;
			},
			// 添加一行
			addRow() {
				let obj = {
					color: '',
					all_id: 111,
					rulte_01: 1,
					rulte_02: 1,
					rulte_03: 1,
				}
				this.specificationOfGoods.push(obj);
			},

			deleteAdd() {

			},
			reduceRow(index) {
				this.specificationOfGoods.pop()
			},
			// 导入弹窗
			importData() {
				this.isImport = true;
			},
			// 导出弹窗
			exportData() {
				this.isExport = true;
			},
			// isclose(){
			// 	this.isOpen=false;
			// },
			// 关闭导入页面
			close_import() {
				this.isImport = false;
			},
			// 关闭导出页面
			close_export() {
				this.isExport = false;
			},
			// 打开删除单据
			Delete() {
				this.isDelete = true;
			},
			//打开导入
			ToLead() {
				this.openToLead = true;
			},
			//取消导入
			cancel_openToLead() {
				this.openToLead = false;
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
	/*导入的引导*/
	
	.toLeadModel {
		width: 500px;
		height: 300px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -250px;
		margin-left: -200px;
		background-color: #FFF;
		padding: 20px;
		box-sizing: border-box;
		border-radius: 15px;
		.leadcon {
			font-size: 14px;
			color: #666;
			background-color: #E0E0E0;
			padding: 15px;
			.button_con {
				margin-top: 25px;
				text-align: center;
			}
		}
		.buttom {
			margin-top: 15px;
			.buttoncon {
				text-align: center;
			}
		}
	}
	
	.UploadModel {
		width: 640px;
		background-color: #FFF;
		padding: 20px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -300px;
		margin-left: -320px;
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
<style type="text/css">
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