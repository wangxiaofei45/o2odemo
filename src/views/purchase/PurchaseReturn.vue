<template>
	<div>
		<!--采购单-->
		<div class="tab-container" v-show="isShow">
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
					<el-table-column prop="auditStatus" label="审核状态" width="100" align="center">
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

		</div>
		<!-- 新增采购单 -->
		<div class="tab-container" v-show="addPuechseMan">
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
						<el-button type="primary">保存</el-button>
						<el-button type="primary" @click="openSave">确认退货</el-button>
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
							<el-form-item label="关联单号">
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
					<el-button type="primary" @click="add_newInfo">添加</el-button>
				</el-col>
			</el-row>
			<!--添加添加后的表格-->
			<div class="tTable">
				<el-table :data="newTableData" stripe border  style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="货号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="商品名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number1" label="单位" width="100" align="center">
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

			<!--提交并保存-->
			<div class="model" v-show="fromAndSave">
				<div class="save_model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							确认退货
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text"  @click="cancelSave">
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

	</div>
</template>
<script>
	export default {
		data() {
			return {
				search: '', //采购单输入
				isShow: true, //采购单是否显示
				addPuechseMan: false, //新增采购单显示隐藏
				fromAndSave:false,//保存并提交
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
				editVisible: false,
				data:[],//展示出来的数据
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
					 number1:"01212",	
					 number2:"短袖",	
					 number3:"公司",	
					 number4:"红色",	
					 number5:"1002",	
					 number6:"450",	
					 number7:"545",	
					 number8:"45",	
					 number9:"45",	
				},
				],
				//添加商品时候的表格
				addTable: [{
					img: "", //商品图片
					numbers: "0001", //货号
					name: "短袖", //商品名称
					brand: '品牌', //品牌
					craneQuotation: '1000', //吊牌价
				}],
			}
		},
		methods: {
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
			add_newInfo() {
				console.log("添加")
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
			deleteAdd(){
				console.log("删除!")
			},
			//保存并提交
			openSave(){
				this.fromAndSave = true;
			},
			sureSave(){
				console.log("保存");
				this.fromAndSave = false;
			},
			cancelSave(){
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
	.save_model_con{
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