<!-- 其他支出单 -->
<template>
	<div>
		<div class="tab-container">
			<el-form label-width="80px" :inline="true" v-model="formInline" class="demo-form-inline">
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button v-show="permission.indexOf('162') != -1" type="primary" @click="closeAnAbccount">新增</el-button>
						<el-input style="width:200px" v-model="formInline.document_num"></el-input>
						<el-button type="primary" @click="ajaxjson">搜索</el-button>
						<el-button type="primary" @click="showModel = !showModel">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search" v-show="showModel">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.startTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.endTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="24" style="text-align:center">
							<el-button @click="resetForm">清空</el-button>
							<el-button type="primary" @click="ajaxjson">确定</el-button>
						</el-col>
					</el-row>
			</div>
			</el-form>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="200" align="center">
						<template slot-scope="scope">
							<span @click="goToEditor(scope.row)" style="color: #18CCBA;cursor:pointer;">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" fixed width="180" align="center">
					</el-table-column>
					<el-table-column prop="supplier_name" label="关联供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="cost_money" label="金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-show="permission.indexOf('163') != -1" @click="deletes(scope.row.id)" type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--弹窗-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="90px" :model="accountFrom" :rules="ruleaccountFrom" ref="accountFrom" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="单据号">
								<el-input placeholder="" v-model="accountFrom.document_num" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="日期">
								<el-date-picker type="datetime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="accountFrom.storage_date" style="width:180px">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商" prop="supplier_id">
								<el-select v-model="accountFrom.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联单据号" v-model="accountFrom.join_code">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='cost_money'>
								<el-input placeholder="" v-model="accountFrom.cost_money"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="" v-model="accountFrom.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage">
								取消
							</el-button>
							<el-button type="primary" @click="AddOtherCost('accountFrom')">
								保存
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--编辑-->
		<div class="model" v-show="amendModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmend">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="90px" :model="amendInfo" :rules="ruleaccountFrom" ref="amendInfo" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="单据号">
								<el-input placeholder="" v-model="amendInfo.document_num" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="日期">
								<el-date-picker type="dateTime" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" v-model="amendInfo.storage_date" style="width:180px">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商" prop="supplier_id">
								<el-select v-model="amendInfo.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="关联供应商" v-model="amendInfo.join_code">
								<el-input placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="金额" prop='cost_money'>
								<el-input placeholder="" v-model="amendInfo.cost_money"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注">
								<el-input placeholder="" v-model="amendInfo.remark"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancelAmend">
								取消
							</el-button>
							<el-button v-show="permission.indexOf('236') != -1" type="primary" @click="amend('amendInfo')">
								保存
							</el-button>
						</el-col>
					</el-row>
				</el-form>
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
				//表单
				formInline: {
					document_num:'',
					startTime:'',
					endTime:'',
					supplier_id:'',
				},
				//添加时候的提交数据
				accountFrom: {
					document_num: '', //单据号
					storage_date: '', //日期,时间戳
					supplier_id:'',//供应商为空
					join_code: '', //关联单据号
					remark: '', //备注
					cost_money: '', //费用名称
				},
				amendInfo:{},//编辑时候的
				ruleaccountFrom: {
					cost_name: [{
						required: true,
						message: '费用名称为空',
						trigger: 'blur'
					}],
					cost_money: [{
						required: true,
						message: '费用金额为空',
						trigger: 'blur'
					}],
				},
				data: [], //展示出来的数据
				PutInStorageModel: false,
				SupplierCommonSupplierList:[],//
				amendModel:false,//修改时候的弹窗
				page: 1, //分页
				total: 0,
				per_page: 10,
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList();//获取供应商列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},

		methods: {
			ajaxjson() {
				let postData =  Object.assign(this.formInline,{page: this.page,per_page: this.per_page,})
				this.$post(this.$otherCostRevenueList, postData).then((res) => {
					if(res.status_code == 0) {
						let datas = res.data.data;
						for(let i = 0; i < datas.length; i++) {
							datas[i].created_at = this.$formatTimestamp(datas[i].created_at);
						}
						this.data = datas;
						this.total = res.data.total;
						this.per_page = res.data.per_page;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//新增
			AddOtherCost(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.accountFrom);
						this.$post(this.$otherCostAddRevenueCost,postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.PutInStorageModel = false;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//删除
			deletes(e){
				let postData = {id:e+''};
				this.$delete(this.$otherCostDelDisburseCost,postData);
			},
			//打开编辑
			goToEditor(e){
				let amendInfo = this.$objDeepCopy(e);
				amendInfo.dateTime = this.$formatTimestamp(amendInfo.created_at);
				this.amendInfo = amendInfo;
				this.amendModel = true;
			},
			//编辑
			amend(e){
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amendInfo);
						this.$post(this.$otherCostEditRevenue, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.amendModel = false;
							} else {
								this.$message({
									type: 'error',
									message: data.message,
								});
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//分页
			handleSizeChange(val) {
				this.per_page = val;
				this.getSaleInfo();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getSaleInfo();
			},
			//新增生成单号
			closeAnAbccount() {
				let postData = {
					code: 152,
				}
				this.$post(this.$storageGetBarCode, postData).then((res) => {
					if(res.status_code == 0) {
						this.accountFrom.document_num = res.data.document_num;
						this.PutInStorageModel = true;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
				this.accountFrom.storage_date = this.$getData();
			},
			//获取供应商列表
			getSupplierCommonSupplierList(){
				this.$post(this.$supplierCommonSupplierList).then((res)=>{
					if(res.status_code == 0){
						this.SupplierCommonSupplierList = res.data;
					}else{
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			cancelPutInStorage() {
				this.PutInStorageModel = false;
			},
			//取消修改
			cancelAmend(){
				this.amendModel = false;
			},
			resetForm() {
				let formInline =  {
					document_num:'',
					startTime:'',
					endTime:'',
					supplier_id:'',
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
		.model_con {
			width: 650px;
			height: 340px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -170px;
			margin-left: -325px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
			.bottom {
				text-align: center;
			}
			.title {
				color: #666666;
				font-size: 16px;
			}
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
<style type="text/css">
	.el-button--danger {
		background-color: #ef4d4c;
	}
</style>