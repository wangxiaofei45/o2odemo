<template>
	<div>
		<!--报损单-->
		<div class="tab-container" v-show="isShow == 1">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col>
							<el-button v-show="permission.indexOf('146') != -1" type="primary" @click="addPurseMan">新增</el-button>
							<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="formInline.document_num"></el-input>
							<el-button type="primary" @click="ajaxjson">搜索</el-button>
							<el-button type="primary" @click="showSearch = !showSearch">筛选订单</el-button>
						</el-col>
					</el-row>
				</div>
				<!--搜索-->
				<div class="search" v-show="showSearch">
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
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="2">全部</el-radio>
									<el-radio :label="0">未报溢</el-radio>
									<el-radio :label="1">已报溢</el-radio>
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
				</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable" id="printMe">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="150" align="center">
						<template slot-scope="scope">
							<!--点击单据号跳转显示单据详情-->
							<span v-if="permission.indexOf('147') != -1" @click="goToSeeEditor(scope.row)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
							<span v-else style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="updated_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="type" label="盘点类型" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 0">抽盘</span>
							<span v-if="scope.row.type == 1">全盘</span>
						</template>
					</el-table-column>
					<el-table-column prop="number" label="总数量" width="200" align="center">
					</el-table-column>
					<el-table-column prop="money" label="总金额" width="150" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.money/100}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="单据状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.status == 0" type="text">未报溢</el-button>
							<el-button v-if="scope.row.status == 1" type="text">已报溢</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope" v-if="scope.row.status == 0">
							<el-button v-show="permission.indexOf('149') != -1" size="mini" type="warning" @click="bePutInStorage(scope.row.id)">报损</el-button>
							<el-button v-show="permission.indexOf('234') != -1" size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
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
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						提交
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="text">
						确定报损?
					</el-col>
				</el-row>
				<el-row class="bottom">
					<el-col :span='24'>
						<el-button @click="cancelPutInStorage">
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
					新增报溢单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row v-show="!disabled">
					<el-col :span="24">
						<!--新增时候的保存-->
						<el-button type="primary" @click="saveNotAudit" v-if="showSave == 1">保存</el-button>
						<!--编辑时候的保存-->
						<el-button v-show="permission.indexOf('148') != -1" type="primary" @click="EditOutOrder" v-if="showSave == 2">编辑保存</el-button>
						<!--查看的时候没有保存-->
						<el-button type="primary" @click="sureBePutInStorage">提交</el-button>
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
								<el-date-picker v-model="forMation.storage_date" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.abstract" placeholder="" style="width:220px;" :disabled="disabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="forMation.user_id" placeholder="请选择" :disabled="disabled">
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
					<el-input placeholder="请输入内容" v-model="typeAndBarCode.bar_code" class="input-with-select" style="width: 400px;" @keyup.enter.native="addgoods" :disabled="disabled">
						<el-select v-model="typeAndBarCode.type" slot="prepend" placeholder="请选择">
							<el-option label="条码" value="1"></el-option>
							<el-option label="货号" value="2"></el-option>
						</el-select>
					</el-input>
				</el-col>
			</el-row>
			<!--展示的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品规格名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="total_num" label="数量" width="150" align="center">
						<template slot-scope="scope">
							<el-input size="small" v-model="scope.row.total_num" placeholder="" align="center" @change="multiply(scope.row)"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="tag_price" label="吊牌价" width="200" align="center">
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="200" align="center">
					</el-table-column>
					<el-table-column prop="singleton" label="折后价" align="center">
					</el-table-column>
					<el-table-column prop="count_money" label="小计" align="center">
					</el-table-column>
					<!--判断是否允许删除-->
					<el-table-column label="操作" width="200" fixed="right" align="center" v-if="!disabled">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteAdd()">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--选择规格-->
			<div class="model" v-show="open_new_rult">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							<!--虚拟的值-->
							选择商品明细
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
							<el-table-column prop="stock" label="数量" width="150" align="center">
								<template slot-scope="scope">
									<el-input size="small" v-model="scope.row.stock" placeholder="请输入" align="center"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="reserve_count" label="库存" width="150" align="center">
							</el-table-column>
							<el-table-column prop="price" label="吊牌价" width="150" align="center">
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
		<!--库存盘点那边增加的-->
		<div class="tab-container" v-show="isShow == 3">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					报溢单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<!--调拨入库搜索框-->
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMations" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMations.document_num" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMations.storage_date" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="盘点类型">
								<el-select v-model="forMations.type" placeholder="请选择" @change="selectSupplier" style="width: 200px;" :disabled="disabled">
									<el-option label="全盘" value="1"></el-option>
									<el-option label="抽盘" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMations.abstract" placeholder="" style="width:220px;" :disabled="disabled"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="forMations.user_id" placeholder="请选择" :disabled="disabled">
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
			</el-row>
			<!--展示的表格-->
			<div class="tTable">
				<el-table :data="newTableDatas" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="bar_code" label="条形码" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="norm" label="商品规格名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="number" label="数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="200" align="center">
					</el-table-column>
					<el-table-column prop="inventory_number" label="盘点数量" width="150" align="center">
						<!--<template slot-scope="scope">
							<el-input size="small" v-model="scope.row.inventory_number" placeholder="" align="center" @change="multiply(scope.row)"></el-input>
						</template>-->
					</el-table-column>
					<el-table-column prop="contrast_number" label="盘亏数量" width="200" align="center">
					</el-table-column>
					<el-table-column prop="contrast_money" label="盘亏金额" align="center">
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
				showSave: 1,
				showSearch: false, //采购单输入
				isShow: 1, //采购单是否显示
				PutInStorageModel: false, //确定入库
				open_new_rult: false, //选择规格的弹窗
				//添加商品时候的搜索
				typeAndBarCode: {
					type: '',
					bar_code: '',
				},
				//筛选时候的表单
				formInline: {
					value: 0,
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					user_id: '', //用户id
					status: 2, //状态
				},
				forMation: { //表单对象
					document_num: '', //单据号
					storage_date: '', //日期
					user_id: '', //用户id
					type: '', //盘点类型
					abstract: '', //描述
				},

				data: [], //展示出来的数据
				newTableData: [], //新增时候的暂时组合的table
				forMations: {}, //库存盘点带过来的
				newTableDatas: [], //库存盘点带过来的
				color: [], //选择规格颜色选项
				size: [], //选择规格尺码选项
				sku_data: [], //选择规格中间查询
				specificationOfGoods: [ //商品规格
					{
						color: '', //颜色
						size: '', //尺码
						stock: '', //数量
						total_price: '',
					},
				],
				disabled: false,
				per_page: 10,
				page: 1,
				total: 0,
				PutInStorageId: '', //入库id中间变量
				shopList: [],
				currentVendor: {},
			}
		},
		created() {
			this.ajaxjson();
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
				this.$post(this.$inventoryContrastList, postData).then((res) => {
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
			deletes(e) {
				let postData = {
					id: e,
				}
				this.$delete(this.$inventoryInventoryDel, postData)
			},
			addPurseMan() {
				this.$post(this.$storageGetBarCode).then((res) => {
					if(res.status_code == 0) {
						this.forMation.document_num = res.data.document_num;
						this.isShow = 2;
						this.disabled = false;
						this.showSave = 1;
					}
				})
			},

			getShopList() {
				this.$post(this.$staticGetCompanyShop).then((res) => {
					if(res.status_code == 0) {
						this.shopList = res.data.shopList;
					}
				})
			},
			//获取选择的
			selectSupplier(e) {
				if(e == 1) {
					this.$post(this.$inventoryAllReserve).then((res) => {

						if(res.status_code == 0) {
							let datas = res.data;
							for(let i = 0; i < datas.length; i++) {
								datas[i].number = datas[i].reserve_count;
								datas[i].price = datas[i].tag_price / 100;
								datas[i].inventory_number = 0; //盘点数量
								datas[i].contrast_number = 0; //盘亏数量
								datas[i].contrast_money = 0; //盘亏金额
							}
							this.newTableData = datas;
							console.log(datas);
						}

					})
				} else {
					console.log("抽盘")
				}
			},
			multiply(e) {
				let singleton = Number(e.singleton);
				let total_num = Number(e.total_num);
				e.count_money = singleton * total_num;
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
			//打开查看详情 查看
			goToSeeEditor(e) {
				let postData = {
					id: e.id,
				};
				//已入库的不允许编辑
				if(e.status == 1) {
					this.disabled = true;
				} else {
					this.disabled = false;
				}
				this.showSave = 2;
				if(e.is_inventory != 0) {
					this.PutInStorageId = e.id;
					this.$post(this.$inventoryContrastDetail, postData).then((res) => {
						if(res.status_code == 0) {
							this.forMations = res.data.reserveContrast;
							this.newTableDatas = res.data.list;
							this.isShow = 3;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
						console.log(res);
					})
				} else {
					this.PutInStorageId = e.id;
					this.$post(this.$inventoryContrastDetail, postData).then((res) => {
						if(res.status_code == 0) {
							this.forMation = res.data.reserveContrast;
							this.newTableData = res.data.list;
							this.isShow = 2;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
						console.log(res);
					})
				}

			},

			//确定键
			addgoods() {
				//				if(this.currentVendor.id) {
				let postData = this.typeAndBarCode;
				if(postData.type == 1) {
					this.$post(this.$staticGetCodeGoods, postData).then((res) => {
						if(res.status_code == 0) {
							let datas = res.data;
							//吊牌价
							datas.tag_price = datas.sku_price / 100;
							datas.bar_code = datas.barcode; //条码
							datas.norm = datas.goods_name; //规格名称
							datas.total_num = 0; //数量
							datas.discount = 1;
							datas.singleton = datas.tag_price*datas.discount;
							datas.count_money = 0;
							let canAdd = true;
							for(let i = 0; i < this.newTableData.length; i++) {
								if(datas.id == this.newTableData[i].id) {
									canAdd = false;
								}
							};
							if(canAdd) {
								console.log(datas);

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
				//				} else {
				//					this.$message({
				//						type: 'error',
				//						message: "请先选择供应商",
				//					})
				//				}
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
								item.price = item.sku_price / 100;
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
			reduceRow(index) {
				this.specificationOfGoods.splice(index, 1); //删除最后一个
			},
			//选择完商品后去添加到暂存的表格
			sureAddNext() {
				let Arr = this.$coppyArray(this.specificationOfGoods);
				let newTableData = this.$coppyArray(this.newTableData);
				console.log(Arr);
				for(let i = 0; i < Arr.length; i++) {
					Arr[i].bar_code = Arr[i].barcode; //条码
					Arr[i].norm = Arr[i].goods_name + '|' + Arr[i].specnamestr; //商品规格名称
					Arr[i].tag_price = Arr[i].price;
					Arr[i].discount = 1;
					Arr[i].total_num = Number(Arr[i].stock); //数量数量
					Arr[i].singleton = Number(Arr[i].tag_price)*Arr[i].discount;
					Arr[i].count_money = Arr[i].total_num * Arr[i].singleton;
					delete Arr[i].color;
					delete Arr[i].size;
					delete Arr[i].specnamestr;
					delete Arr[i].total_price;
					delete Arr[i].sku_price;
				}
				this.newTableData = newTableData.concat(Arr);
			},
			saveNotAudit() {
				let newTableData = this.$objDeepCopy(this.forMation);
				if(newTableData.user_id == '') {
					newTableData.user_id = sessionStorage.getItem("id");
				}
				let arrData = this.$coppyArray(this.newTableData);
				newTableData.shopArr = JSON.stringify(arrData);
				newTableData.value = 0;
				this.$post(this.$inventoryAddContrast, newTableData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						//新增完成 刷新首页的页面
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//编辑
			EditOutOrder() {
				let newTableData = this.$objDeepCopy(this.forMation);
				if(newTableData.user_id == '') {
					newTableData.user_id = sessionStorage.getItem("id");
				}
				let arrData = this.$coppyArray(this.newTableData);
				newTableData.shopArr = JSON.stringify(arrData);
				newTableData.value = 0;
				this.$post(this.$inventoryAddContrast, newTableData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						//新增完成 刷新首页的页面
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
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
				let formInline =  {
					value: 0,
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					user_id: '', //用户id
					status: 2, //状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
			// 新增采购单页面

			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = 1;
			},
			//取消规格的弹窗
			cancel_new_rult() {
				this.open_new_rult = false;
			},
			deleteAdd() {
				console.log("删除!")
			},
			//入库点击显示确定入库
			bePutInStorage(e) {
				this.PutInStorageId = e;
				this.PutInStorageModel = true;
			},
			sureBePutInStorage() {
				this.PutInStorageModel = true;
			},
			//确定入库
			sure() {
				let postData = {
					id: this.PutInStorageId,
				}
				this.$post(this.$inventoryConfirmContrast, postData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});

						this.ajaxjson();

					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
					this.PutInStorageModel = false;
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
	
	.search2 .el-select .el-input {
		width: 100px;
	}
	
	.search2 .input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>