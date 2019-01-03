<template>
	<div>
		<div class="tab-container" v-show="isShow == 1">
			<div class="title">
				<el-row>
					<el-col>
						<el-button type="primary" @click="addPurseMan">新增</el-button>
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
								<!--<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
									<el-option v-for="(item,index) in supplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="formInline.user" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.radio">
									<el-radio :label="3">所有</el-radio>
									<el-radio :label="6">未提交</el-radio>
									<el-radio :label="9">已提交</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button type="primary" @click="submitForm('dynamicValidateForm')">清空</el-button>
								<el-button type="primary" @click="resetForm('dynamicValidateForm')">确定</el-button>
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
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="cb_name" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="price" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="audit_status" label="审核状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.audit_status == 0" type="text">未审核</el-button>
							<el-button v-if="scope.row.audit_status == 1" type="text">审核通过</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column prop="audit_status" label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope" v-if="scope.row.audit_status == 0">
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="openAudit(scope.row.id)">审核</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

		</div>
		<!-- 新增采购单 -->
		<div class="tab-container" v-show="isShow ==2">
			<!--title-->
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					新增采购订单
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
						<el-button type="primary">保存</el-button>
						<el-button type="primary" @click="openSave">提交并审核</el-button>
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
								<el-date-picker v-model="forMation.created_at" type="date" placeholder="选择日期">
								</el-date-picker>
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
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-input v-model="forMation.user_name" placeholder="" style="width:220px;" disabled></el-input>
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
					<el-input placeholder="请输入内容" v-model="typeAndBarCode.bar_code" class="input-with-select"style="width: 400px;" @keyup.enter.native="addgoods">
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
					<el-table-column prop="specnamestr" label="商品规格名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="stock" label="数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="颜色" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="小计" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="原价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="折扣" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="单价" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="总金额" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="备注" align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
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
							选择商品明细：0002,休闲馆
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_new_rult">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="specificationOfGoods" stripe border style="width: 100%;height: 450px;" size="mini" border show-summary>
							<el-table-column prop="color" label="颜色" fixed width="100" align="center">
								<template slot-scope="scope">
									<el-select size="medium" v-model="scope.row.color">
										<el-option v-for="" value="1">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="demoNumber_1" label="尺码" width="100" align="center">
								<template slot-scope="scope">
									<el-select size="medium" v-model="scope.row.all_id">
										<el-option v-for="" value="1">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="demoNumber_2" label="数量" width="100" align="center">
								<template slot-scope="scope">
									<el-input size="small" v-model="scope.row.rulte_02" placeholder="" align="center"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="demoNumber_3" label="吊牌价" width="100" align="center">
							</el-table-column>
							<el-table-column prop="demoNumber_4" label="折扣" width="100" align="center">
							</el-table-column>
							<el-table-column prop="demoNumber_5" label="采购价" width="100" align="center">
							</el-table-column>
							<el-table-column label="单价" align="center">
								<template slot-scope="scope">
									<el-button type="primary" v-if="specificationOfGoods.length===1||scope.$index===specificationOfGoods.length-1" size="mini" icon="el-icon-circle-plus" @click="addRow"></el-button>
									<el-button type="primary" v-if="specificationOfGoods.length !== 1 && scope.$index === specificationOfGoods.length-2" size="mini" icon="el-icon-remove" @click="reduceRow(index)"></el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>

					<el-row>
						<el-col :span="24" style="margin-top:20px; text-align: right;">
							<el-button type="primary" style="float:right;margin-right:30px">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--提交并保存-->
			<div class="model" v-show="fromAndSave">
				<div class="save_model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							提交并审核
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancelSave">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col style="margin-top:20px; text-align: center;font-size: 14px;">
							确定提交并审核?
						</el-col>
						<el-col :span="24" style="margin-top:20px; text-align: center;">
							<el-button style="width: 120px;" @click="cancelSave">取消</el-button>
							<el-button style="width: 120px;" type="primary" @click="sureSave">确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<!--公用的审核-->
		<div class="model" v-show="modelShow ==4">
			<div class="save_model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;font-size: 14px;">
						审核
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col style="margin-top:10px; text-align: center;font-size: 14px;color: #333333;">
						确定审核?
					</el-col>
					<el-col :span="24" style="margin-top:20px; text-align: center;">
						<el-button style="width: 120px;" @click="cancel">取消</el-button>
						<el-button style="width: 120px;" type="primary" @click="sureAudit">确定</el-button>
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
				search: '', //采购单输入
				isShow: 2, //采购单是否显示
				fromAndSave: false, //保存并提交
				modelShow: -1,
				currentPage4: 4, //
				//筛选时候的表单
				formInline: {
					dateStart: '1',
					dateEnd: '',
					shop: '',
					Freightnumber: '',
					radio: 3,
					user: ''
				},
				forMation: {}, //新增采购订单表单
				supplierCommonSupplierList: [], //供应商下拉选择的列表
				//添加商品时候的搜索
				typeAndBarCode: {
					type: '',
					bar_code: '',
				},
				currentVendor:{},//存储选择的供应商
				open_new_rult: false, //添加商品时候的规格值
				editVisible: false,
				data: [], //展示出来的数据
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				newTableData: [],
				//添加商品时候的表格
				addTable: [{
					img: "", //商品图片
					numbers: "0001", //货号
					name: "短袖", //商品名称
					brand: '品牌', //品牌
					craneQuotation: '1000', //吊牌价
				}],
				specificationOfGoods: [ //商品规格
					{
						color: '黑色',
						demoNumber_1: '', //尺码
						demoNumber_2: '', //数量
						demoNumber_3: '', //吊牌价
						demoNumber_4: '', //折扣
						demoNumber_5: '', //采购价
					},
				],
			}
		},
		created() {
			this.ajaxjson(); //获取到的数据
			this.addPurseMan();
		},
		methods: {
			ajaxjson() {
				let postData = {
					page: 1,
				}
				this.$post(this.$purchaseList, postData).then((res) => {
					if(res.status_code == 0) {
						this.data = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//打开审核的弹窗
			openAudit(e) {
				this.id = e;
				this.modelShow = 4;
			},
			cancel() {
				this.modelShow = -1;
			},
			//确定审核
			sureAudit() {
				this.Audit(this.id);
			},
			//审核
			Audit(e) {
				let postData = {
					id: e,
				};
				this.$post(this.$purchaseAudit, postData).then((res) => {
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						})
						this.ajaxjson();
						this.modelShow = -1;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
						this.modelShow = -1;
					}
				})
			},
			// 新增采购单页面
			addPurseMan() {
				this.$post(this.$purchaseAdd).then((res) => {
					if(res.status_code == 0) {
						let postData = {
							id: res.data.purchase_id,
						}
						this.$post(this.$purchaseInfo, postData).then((res) => {
							if(res.status_code == 0) {
								this.forMation = res.data;
								this.isShow = 2;
							}
						})
					}
				})
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.supplierCommonSupplierList = res.data;
					}
				})

			},
			selectSupplier(e){
				for(var i=0;i<this.supplierCommonSupplierList.length;i++){
					if(e == this.supplierCommonSupplierList[i].id){
						this.currentVendor = this.supplierCommonSupplierList[i];
					}
				}
			},
			//添加商品 判断是条码 还是货号添加
			addgoods(){
				if(this.currentVendor.id){
					let postData = this.typeAndBarCode;
					this.$post(this.$staticGetCodeGoods,postData).then((res)=>{
						if(res.status_code == 0){
							let datas = res.data;
							datas.stock = '';
							let canAdd = true;
							for(let i=0;i<this.newTableData.length;i++){
								if(datas.id == this.newTableData[i].id){
									canAdd = false;
								}
							};
							if(canAdd){
								this.newTableData.push(datas);
							}else{
								this.$message({
									type:'error',
									message:"您已经添加过该商品了",
								})
							}
						}else{
							this.$message({
								type:'error',
								message:res.message,
							})
						}
					})
				}else{
					this.$message({
						type:'error',
						message:"请先选择供应商",
					})
				}
			},
			//添加商品是否的商品分类列表
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			//点击新增采购订单时候的显示出来
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

			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = 1
			},
			// 关闭添加商品规格弹窗
			cancel_new_rult() {
				this.open_new_rult = false;
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
			// 打开删除单据
			Delete() {
				this.isDelete = true;
			},
			//保存并提交
			openSave() {
				this.fromAndSave = true;
			},
			sureSave() {
				console.log("保存");
				this.fromAndSave = false;
			},
			cancelSave() {
				this.fromAndSave = false;
			}
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
</style>