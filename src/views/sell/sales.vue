<template>
	<div>
		<!--采购单-->
		<div class="tab-container" v-show="isShow == 1">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col>
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
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.startDate" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.endDate" value-format="yyyy-MM-dd">
								</el-date-picker>
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
						<el-col :span="6">
							<el-form-item label="会员">
								<el-select v-model="formInline.member_id" placeholder="请选择">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="100">全部</el-radio>
									<el-radio :label="0">未付</el-radio>
									<el-radio :label="1">已付</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="类型">
								<el-radio-group v-model="formInline.type">
									<el-radio :label="100">全部</el-radio>
									<el-radio :label="0">零售</el-radio>
									<el-radio :label="1">退货</el-radio>
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
					<el-table-column prop="document_num" label="单据号" fixed width="180" align="center">
						<template slot-scope="scope">
							<!--点击单据号跳转显示单据详情-->
							<span v-if="permission.indexOf('244') != -1" @click="goToSeeEditor(scope.row)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
							<span v-else style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="180" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="总数量" width="80" align="center">
					</el-table-column>
					<el-table-column prop="payment" label="总金额" width="80" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.payment/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="member_name" label="会员" width="100" align="center">
					</el-table-column>
					<el-table-column prop="preferential" label="优惠金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="sales_name" label="营业员" width="100" align="center">
					</el-table-column>
					<el-table-column prop="type" label="单据类型" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 0" type="text">销售开单</span>
							<span v-if="scope.row.type == 1" type="text">退单</span>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="单据状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 0" type="text">未支付</span>
							<span v-if="scope.row.status == 1" type="text">已支付</span>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" width="100" align="center" label="收银员">
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
						退单
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" class="text">
						确定退单?
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
		<!--退单的详情-->
		<div class="tab-container" v-show="isShow == 2">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					订单详情
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
						<el-button v-show="permission.indexOf('245') != -1" type="primary" @click="salesReturn" v-if="showSave == 1">退单</el-button>
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
			<!--展示的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="barcode" label="条形码" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="goods_name" label="商品规格名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="数量" width="150" align="center">
					</el-table-column>
					<el-table-column prop="price" label="吊牌价" width="200" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.price/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="200" align="center">
					</el-table-column>
					<el-table-column prop="unit_price" label="折后价" align="center">
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

		<!--订单未完成-->
		<div class="tab-container" v-show="isShow == 3">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					订单详情
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back_PurchseMan">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="tab-container">
				<div class="title">
					<el-row>
						<el-col>
							<el-button v-if="can_update" type="primary" @click="upDataAbccount">结算</el-button>
							<el-button v-else type="primary" @click="closeAnAbccount">结算</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="search">
					<el-form label-width="80px" :inline="true" v-model="forMations" class="demo-form-inline">
						<el-row>
							<el-col :span="6">
								<el-form-item label="单据号">
									<el-input v-model="forMations.document_num" placeholder="请输入单据号" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="日期">
									<el-date-picker v-model="forMations.created_at" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" disabled>
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="会员">
									<!--<el-input v-model="forMations.memberInfo.name" placeholder="" disabled></el-input>-->
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="营业员">
									<el-input v-model="forMations.sales_name" placeholder="" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="摘要">
									<el-input v-model="forMations.remark" disabled></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="收银员">
									<el-input v-model="forMations.user_name" disabled></el-input>
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
						<el-input :disabled="!can_update" placeholder="请输入内容" v-model="bar_code" class="input-with-select" style="width: 400px;" @keyup.enter.native="addgoods">
						</el-input>
					</el-col>
				</el-row>
				<!--展示出来的表格-->
				<div class="tTable">
					<el-table :data="datas" stripe border style="width: 100%;" size="mini" show-summary :summary-method="getSummaries">
						<el-table-column type="index" label="序号" fixed width="80" align="center">
						</el-table-column>
						<el-table-column prop="barcode" label="条形码" fixed width="150" align="center">
						</el-table-column>
						<el-table-column prop="norm" label="商品名称规格" width="150" align="center">
							<template slot-scope="scope">
								{{scope.row.goods_name}},{{scope.row.norm}}
							</template>
						</el-table-column>
						<el-table-column prop="stock" label="数量" width="150" align="center">
							<template slot-scope="scope">
								<el-input v-if="can_update" size="mini" v-model="scope.row.stock" @blur="multiply(scope.row)"></el-input>
								<span v-else>{{scope.row.stock}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="price" label="吊牌价" width="150" align="center">
							<template slot-scope="scope">
								<span>{{(scope.row.price/100).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="discount" width="150" label="折扣" align="center">
							<template slot-scope="scope">
								<el-input v-if="can_update" size="mini" v-model="scope.row.discount" @blur="multiply(scope.row)"></el-input>
								<span v-else>{{scope.row.discount}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="unit_price" width="150" label="折后价" align="center">
							<template slot-scope="scope">
								<span>{{(scope.row.unit_price/100).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="total_price" label="小计">
							<template slot-scope="scope">
								<span>{{(scope.row.total_price/100).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<!--真实金额  datas.total_really_money = 0;-->
					</el-table>
				</div>
			</div>
			<!--弹窗-->
			<div class="model" v-show="PutInStorageModel">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							结账
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancelPutInStorage">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-form label-width="80px" :inline="true" v-model="accountFrom" class="demo-form-inline">
						<el-row>
							<el-row>
								<el-col :span="24" class="title">
									支付金额
								</el-col>
								<el-col :span="12">
									<el-form-item label="合计金额">
										<el-input placeholder="" v-model='accountFrom.need_pay/100' disabled></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="整单打折">
										<el-input placeholder="" v-model='accountFrom.discount/100' :disabled="!can_update"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="优惠金额">
										<el-input placeholder="" v-model='accountFrom.preferential' :disabled="!can_update"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="应付金额">
										<el-input placeholder="" v-model="accountFrom.payment/100"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" class="title">
									支付方式
								</el-col>
								<el-col :span="12" v-for="(item,index) in accountFrom.payment_method" :key="item.id">
									<el-form-item :label="item.name">
										<el-input placeholder="" v-model="item.amount"></el-input>
									</el-form-item>
								</el-col>

								<el-col :span="12">
									<el-form-item label="付款合计">
										<el-input placeholder="" v-model="accountFrom.total_payment"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="找零">
										<el-input placeholder="" v-model="accountFrom.give_change" disabled></el-input>
									</el-form-item>
								</el-col>
							</el-row>
						</el-row>
						<el-row class="bottom">
							<el-col :span='24'>
								<el-button @click="cancelPutInStorage">
									取消
								</el-button>
								<el-button type="primary" @click="pay">
									确定
								</el-button>
								<el-button type="primary">
									结算并打印
								</el-button>
							</el-col>
						</el-row>
					</el-form>
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
					document_num: '',
					startDate: '', //开始时间
					endDate: '', //结束时间
					user_id: '', //营业员
					member_id: '', //member_id
					status: 100, //状态 100所有 0未付 1已付
					type: 100, //类型（100 所有 0 零售 1退货）
				},
				
				forMation: {}, //销售开单
				newTableData: [], //新增时候的暂时组合的table
				data: [], //展示出来的数据

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

				can_update:false,
				//未完成的订单
				memberList: [],
				loading: false,
				accountFrom: {},
				seller: [],
				datas: [], //展示出来的数据
				PutInStorageModel: false,
				bar_code:'',//条码
				need_pay:'',
				stock:'',
			}
		},
		created() {
			this.ajaxjson();
			this.getSeller(); //获取营业员
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			ajaxjson() {
				let postData = this.formInline;
				postData.per_page = this.per_page;
				postData.page = this.page;
				this.$post(this.$retailopenbillList, postData).then((res) => {
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
			getSeller() {
				this.$post(this.$retailopenbillGetSeller).then((res) => {
					if(res.status_code == 0) {
						this.seller = res.data
					}
				})
			},
			//计算
			multiply(e){
				e.unit_price = Number(e.discount)*Number(e.price);//折后价
				e.total_price = Number(e.stock)*Number(e.unit_price);//小计
				e.total_really_money = Number(e.stock)*Number(e.unit_price);//真实金额
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
				//销售开单
				if(e.type == 1) {
					this.showSave = 1;
					this.PutInStorageId = e.id;
					this.$post(this.$retailopenbillinfo, postData).then((res) => {
						if(res.status_code == 0) {
							this.forMation = res.data;
							this.newTableData = res.data.goodsData;
							this.isShow = 2;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					})
				} else {
					//
					this.showSave = 0;
					this.PutInStorageId = e.id;
					this.$post(this.$retailopenbillinfo, postData).then((res) => {
						if(res.status_code == 0) {
							this.forMations = res.data;
							this.datas = res.data.goodsData;
							this.can_update = res.data.can_update;
							this.isShow = 3;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					})
				}
			},

			//确定键
			addgoods(e){
				let postData = {
					type: '1',
					bar_code: this.bar_code,
				}
				this.$post(this.$staticGetCodeGoods, postData).then((res) => {
							if(res.status_code == 0) {
								let datas = res.data;
								datas.norm = datas.specnamestr;//商品名称
								datas.stock = 1;//数量
								datas.price = datas.sku_price;//吊牌价
								datas.discount = 1.00;
								datas.unit_price = Number(datas.discount)*Number(datas.price);//折后价
								datas.total_price = Number(datas.stock)*Number(datas.unit_price);//小计
								datas.total_really_money = Number(datas.stock)*Number(datas.unit_price);//真实金额
								datas.total_really_money = datas.total_really_money/100;
								let canAdd = true;
								for(let i = 0; i < this.datas.length; i++) {
									if(datas.sku_id == this.datas[i].sku_id) {
										canAdd = false;
									}
								};
								if(canAdd) {
									this.datas.push(datas);
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
			},
			reduceRow(index) {
				this.specificationOfGoods.splice(index, 1); //删除最后一个
			},
			// 结算
			closeAnAbccount() {
				let postDatas = {
					id:this.PutInStorageId,
				}
				this.$post(this.$retailopenbillPayInfo,postDatas).then((res) =>{
					if(res.status_code == 0){
						this.accountFrom = res.data;
						this.PutInStorageModel = true;
					}else{
						
					}
				})
			},
//			真正的支付
			pay(){
				let postData = this.$objDeepCopy(this.accountFrom);
				let payment_method = postData.payment_method;
				for(let i=0;i<payment_method.length;i++){
					payment_method[i].amount = (Number(payment_method[i].amount))*100;
				}
				postData.payment_method = JSON.stringify(postData.payment_method); 
				this.$post(this.$retailopenbillComplete,postData).then((res)=>{
					if(res.status_code == 0){
						this.$message({
							type:'success',
							message:res.message,
						})
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
			//更新并结算
			upDataAbccount(){
				let postData = {
					id:this.PutInStorageId,
					stock:this.stock,
					need_pay:this.need_pay,
					goodsData:'',
				};
				let Arrs = this.$coppyArray(this.datas);
				
				postData.goodsData = JSON.stringify(Arrs);
				this.$post(this.$retailopenbillUpdate,postData).then((res)=>{
					let postDatas = {
						id:res.data.rob_id,
					}
					this.$post(this.$retailopenbillPayInfo,postDatas).then((res) =>{
						if(res.status_code == 0){
							this.accountFrom = res.data;
							this.PutInStorageModel = true;
						}else{
							
						}
					})
				})
				
			},
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
					if(column.property === "stock") {
						values = data.map(item => Number(item.stock));
					}
					if(column.property === "total_price") {
						values = data.map(item => Number(item.total_price));
					}
					if(column.property == "stock") {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								this.stock = prev + curr;
								return prev + curr;
							} else {
								this.stock = prev;
								return prev;
							}
						}, 0);
						sums[index] += '';
					} else if(column.property == "total_price"){
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								this.need_pay = prev + curr;
								return prev + curr/100;
							} else {
								this.need_pay = prev;
								return prev/100;
							}
						}, 0);
						sums[index] += '';
					} else{
						sums[index] = '--';
					}
				});
				//返回相对应合计数值
				return sums;
			},
			// 重置表单
			resetForm(formData) {
				let formInline =  {
					startDate: '', //开始时间
					endDate: '', //结束时间
					user_id: '', //营业员
					member_id: '', //member_id
					status: 100, //状态 100所有 0未付 1已付
					type: 100, //类型（100 所有 0 零售 1退货）
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
			salesReturn() {
				this.PutInStorageModel = true;
			},
			//确定入库
			sure() {
				let postData = {
					rob_id: this.PutInStorageId,
				}
				this.$post(this.$retailopenbillReturn, postData).then((res) => {
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