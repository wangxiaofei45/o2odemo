<template>
	<div>
		<div class="tab-container" v-show="isShow">
			<div class="title">
				<el-row>
					<el-col :span="12">
						<el-button type="primary" @click="addPurseMan">新增</el-button>
						<el-input placeholder="载入采购单" style="width:240px" v-model="search"></el-input>
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-input placeholder="搜索单据号、供应商" style="width:240px" v-model="search"></el-input>
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
							<el-form-item label="单据号">
								<el-input placeholder="请输入" v-model="formInline.dateEnd"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
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
							<el-form-item label="状态">
								<el-radio-group v-model="formInline.radio">
									<el-radio :label="3">所有</el-radio>
									<el-radio :label="6">已入库</el-radio>
									<el-radio :label="9">未入库</el-radio>
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
					<el-table-column prop="documentNumber" label="单据号" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="documentDate" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="supplier" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="totalQuantity" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="totalMoney" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="auditStatus" label="状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.auditStatus == 1" type="text">已审核</el-button>
							<el-button v-if="scope.row.auditStatus == 2" type="text" style="color: #666;">未审核</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="preparedBy" label="制单人">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="check(scope.row.role_id)">修改</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<el-row>
				<el-col :span="24" style="text-align: right;margin-top: 15px;">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
		<!-- 新增采购单 -->
		<div class="tab-container" v-show="addPuechseMan">
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
						<el-button type="primary">保存</el-button>
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="primary" @click="ToLead">
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
								<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.date" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
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
								<el-select v-model="forMation.user" placeholder="邢建辉">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-row style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="12">
					<el-button type="text">录入排序</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-input placeholder="输入条形码" style="width: 200px;"></el-input>
					<el-button type="primary" @click="open_newInfo">添加商品</el-button>
				</el-col>
			</el-row>
			<!--添加添加后的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="条码" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="商品规格及名称" width="150" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="原价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="折扣" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="原价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="采购价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="小计">
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
		      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
		    </el-table>
			<!--添加采购订单-->
			<div class="model" v-show="new_info_model">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							添加商品
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_newInfo">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-input placeholder="搜索货号" style="width:240px"></el-input>
							<el-button type="primary">搜索</el-button>
							<el-button type="primary">添加</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="addTable" stripe border style="width: 100%;" size="mini" height="420px" highlight-current-row @current-change="addchange">
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="img" label="图片" width="100" align="center">
								<template slot-scope="scope">
									<img src="" />
								</template>
							</el-table-column>
							<el-table-column prop="numbers" label="货号" width="100" align="center">
							</el-table-column>
							<el-table-column prop="name" label="商品名称" width="100" align="center">
							</el-table-column>
							<el-table-column prop="brand" label="品牌" width="100" align="center">
							</el-table-column>
							<el-table-column prop="craneQuotation" label="吊牌价" align="right">
							</el-table-column>
						</el-table>
						<el-row style="text-align: right;margin-top: 10px;">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
							</el-pagination>
						</el-row>
					</div>
				</div>
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
								<el-button type="primary">
									下载模板
								</el-button>
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
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import UploadExcelComponent from '@/components/UploadExcel/index.vue'
	export default {
		name: 'UploadExcel',
		components: { UploadExcelComponent },
		data() {
			return {
				tableData: [],//上传表格数据
      			tableHeader: [],//上传表格头部
				search: '', //采购单输入
				isShow: false, //采购入库单
				addPuechseMan: true, //新增采购入库单
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
				forMation: { //表单对象
					documentnumber: '',
					shop: '',
					shop1: '',
					date: '',
					supplier: '',
					cost: '',
					number: '',
					abstract: '',
					user: '',
				},
				new_info_model: false, //新增订单时候的model
				open_new_rult: false, //添加商品时候的规格值
				editVisible: false,
				openToLead: false,//上传之前的提示性文字
				UploadExcel:false,
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
				newTableData: [{
					number1: "01212",
					number2: "短袖",
					number3: "公司",
					number4: "红色",
					number5: "1002",
					number6: "450",
					number7: "545",
					number8: "45",
					number9: "45",
				}, ],
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
		methods: {
			
			//上传excel表格之前
		    beforeUpload(file) {
		      const isLt1M = file.size / 1024 / 1024 < 1
		      if (isLt1M) {
		        return true
		      }
		      this.$message({
		        message: 'Please do not upload files larger than 1m in size.',
		        type: 'warning'
		      })
		      return false
		    },
		    //上传excel之后
		    handleSuccess({ results, header }) {
		    	//上传成功后的
		    	console.log(results);
		      this.tableData = results;
		      this.tableHeader = header;
		      this.UploadExcel = false;
		    },
			//添加商品是否的商品分类列表
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			//点击新增采购订单时候的显示出来
			//有问题 只能点击一次
			addchange(val) {
				console.log("选中当前行")
				this.new_info_model = false; //隐藏新增的按钮
				this.open_new_rult = true; //显示出来规格选择
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
			// 新增采购单页面
			addPurseMan() {
				this.isShow = false
				this.addPuechseMan = true
			},
			// 返回采购单页面
			back_PurchseMan() {
				this.isShow = true
				this.addPuechseMan = false
			},
			//打开新增添加 用户
			open_newInfo() {
				//获取添加商品分类的信息
				this.new_info_model = true;
				// this.$post("/goodsclass/addlist", ).then((res) => {
				// 	let data = res;
				// 	if(data.status_code == 0) {
				// 		this.options = data.data;

				// 	} else {
				// 		this.$message({
				// 			type: 'error',
				// 			message: data.message,
				// 			});
				// 		}
				// 	});
			},
			openUploadExcel(){
				this.UploadExcel = true;
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.new_info_model = false;
			},
			// 关闭添加商品规格弹窗
			cancel_new_rult() {
				this.open_new_rult = false;
			},
			//取消上传excel
			cancel_UploadExcel(){
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
			//打开新增添加 用户
			open_newInfo() {
				//获取添加商品分类的信息
				this.new_info_model = true;
				// this.$post("/goodsclass/addlist", ).then((res) => {
				// 	let data = res;
				// 	if(data.status_code == 0) {
				// 		this.options = data.data;

				// 	} else {
				// 		this.$message({
				// 			type: 'error',
				// 			message: data.message,
				// 			});
				// 		}
				// 	});
			},
			// openPurchase(){
			// 	this.isOpen=true;
			// },
			// 导入弹窗
			importData() {
				this.isImport = true;
			},
			// 导出弹窗
			exportData() {
				this.isExport = true;
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.new_info_model = false;
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
		.leadcon{
			font-size:14px;
			color: #666;
			background-color: #E0E0E0;
			padding: 15px;
			.button_con{
				margin-top: 25px;
				text-align: center;		
			}
		}
		.buttom{
			 margin-top: 15px;
			.buttoncon{
				text-align: center;
			}
		}
	}
	.UploadModel{
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