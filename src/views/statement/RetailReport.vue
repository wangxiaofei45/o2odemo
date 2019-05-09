<!--零售报表-->
<template>
	<div>
		<div class="tab-container" v-show="isShow">
			<div class="title">
				<el-row>
					<el-col>
						<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="search"></el-input>
						<el-button type="primary">搜索</el-button>
						<el-button type="primary">筛选订单</el-button>
					</el-col>
				</el-row>
			</div>
			<!--头部的搜索框-->
			<div class="search">
				<el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="forMation.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="forMation.dateEnd">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="店铺">
								<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="货号">
								<el-select v-model="forMation.name" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="商品类型">
								<el-select v-model="forMation.shoptype" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="销售人">
								<el-select v-model="forMation.abstract" placeholder="邢建辉">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="自编码">
								<el-input v-model="forMation.user" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.abstract" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button type="primary" @click="submitForm('dynamicValidateForm')">确定</el-button>
								<el-button @click="resetForm('dynamicValidateForm')" style="margin-left:50px;">清空</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--头部的搜索框结束-->
			<div class="tTable">
				<el-table :data="data" stripe border show-summary style="width: 100%;" size="mini" @selection-change="SelectionChange">
					<el-table-column type="selection" width="60" fixed align="center">
					</el-table-column>
					<el-table-column prop="document_number" label="单据号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="document_time" label="单据日期" align="center">
					</el-table-column>
					<el-table-column prop="shop_name" label="店铺名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="item_number" label="货号" width="100" align="center">
					</el-table-column>
					<el-table-column prop="good_style" label="商品类别" width="100" align="center">
					</el-table-column>
					<el-table-column prop="number" label="数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="price" label="单价" width="60" align="center">
					</el-table-column>
					<el-table-column prop="discount" label="折扣" width="60" align="center">
					</el-table-column>
					<el-table-column prop="discount_price" label="折后价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="turnover" label="生意额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="integral" label="积分" width="100" align="center">
					</el-table-column>
					<el-table-column prop="member" label="会员" width="80" align="center">
					</el-table-column>
					<el-table-column prop="salesperson" label="销售人" width="80" align="center">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 单据详情 -->
		<div class="tab-container" v-show="isDtail">
			<div class="search1">
				<el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation.documentnumber" placeholder=""></el-input>
							</el-form-item>
						</el-col>

						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.date" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="店铺">
								<el-select v-model="forMation.shop1" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="销售人">
								<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="自编号">
								<el-input v-model="forMation.number" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="销售部门">
								<el-select v-model="forMation.Supplier" placeholder="销售一部">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.abstract" placeholder=""></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="会员">
								<el-select v-model="forMation.user" placeholder="邢建辉">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>

					</el-row>
					<!-- <el-row>
							<el-col align="center">
								<el-form-item label=" " align="center">
									<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
									<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
								</el-form-item> 
							</el-col>
						</el-row> -->
				</el-form>
			</div>
			<div class="tTable">
				<el-table :data="dataDtail" stripe border show-summary style="width: 100%;" size="mini" @selection-change="SelectionChange">
					<el-table-column type="selection" width="60" fixed align="center">
					</el-table-column>
					<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
					</el-table-column>
					<el-table-column prop="shop_id" label="货号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="name" label="商品名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="address" label="单位" width="100" align="center">
					</el-table-column>
					<el-table-column prop="telphone" label="颜色" width="100" align="center">
					</el-table-column>
					<el-table-column prop="retailprice" label="尺码" width="100" align="center">
					</el-table-column>
					<el-table-column prop="morning" label="折扣" width="100" align="center">
					</el-table-column>
					<el-table-column prop="afternoon" label="折后价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="allocationprice" label="金额" align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="add_goods(scope.row.role_id)">编辑</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
				search: '',
				input: '',
				input2: '',
				input3: '',
				pay_disCount: '',
				//表单对象
				formInline: {
					dateStart: '1',
					dateEnd: '',
					shop: '',
					supplier: '',
					Freightnumber: '',
					number: '',
					abstract: '',
					radio: 3,
					user: ''
				},
				forMation: { //表单对象
					dateStart: '',
					dateEnd: '',
					documentnumber: '',
					shop: '',
					shop1: '',
					date: '',
					supplier: '',
					cost: '',
					number: '',
					abstract: '',
					user: '',
					name: '',
					shoptype: ''
				},
				labelPosition: 'right', //lable对齐方式
				labelWidth: '80px', //lable宽度
				value_gy: 1,
				radio: 1,
				isPurchaseHistory: false,
				isMerge: false,
				isDelete: false,
				isShow: true,
				isDisCount: false,
				isDtail: false,
				editVisible: false,
				delVisible: false,
				idx: -1,
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
				radio2: 3,
				//表格数据
				data: [{
					document_number:'111222333',//单据号
					document_time:'2018-12-30 20:10:30',//单据日期
					shop_name:'demo店铺',//店铺名称
					item_number:'0001',//货号
					good_style:'111222333',//商品类别
					number:10,//数量
					price:100,//单价
					discount:1.0,//折扣
					discount_price:100,//折后价
					turnover:2300,//生意额
					integral:0,//积分
					member:"王demo",//会员
					salesperson:"王demo",//销售人
				}],
				dataDtail: [],
				dataTable: [ //添加商品
					{
						role_id: '短袖',
						name: 1,
						address: 1,
						telphone: 1,
						retailprice: 1,
						morning: 1
					}
				],
				dataData: [ //商品规格
					{
						color: '黑色',
						all_id: 111,
						rulte_01: 1,
						rulte_02: 1,
						rulte_03: 1,
						rulte_04: 1,
						rulte_05: 1,
						rulte_06: 1,
						rulte_07: 1,
						rulte_08: 1,
						rulte_09: 1,
						rulte_10: 1,
						rulte_11: 1,
						rulte_12: 1,
					},
				],
				new_info: {
					shop_id: sessionStorage.getItem("shop_id"),
					name: '', //公司名称
					address: '', //地址
					telphone: '', //固话
					retailprice: '', //零售价格
					allocationprice: '', //调拨价格
					morning: '', //早班时间
					afternoon: '', //午班时间
					night: '', //晚班时间
					size: '', //面积
					rent: '', //佣金
					context: '', //经营描述
					licenseimg: '', //营业执照
					is_straight: '', //是否是自营
				},
			}
		},

		methods: {
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
			resetForm(formData) {
				// 	this.$nextTick(function() {
				//   	this.$refs[formData].resetFields();
				//  })
				if(this.$refs.formData !== undefined) {
					this.$refs.formData.resetFields();
				}
			},
			SelectionChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
			},
			tableChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
			},
			getSummaries(param) {
				const {
					// columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] = '总价';
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if(!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += ' 元';
					} else {
						sums[index] = 'N/A';
					}
				});
				return sums;
			},
			Delete() {
				this.isDelete = true;
			},
			// 显示详情
			detail() {
				this.isDtail = true
				this.isShow = false
			},
			// 关闭显示详情
			detailBack() {
				this.isDtail = false,
					this.isShow = true
			},
		}
	}
</script>
<style scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		height: 50px;
		background: #f4f4f4;
		height: 198px;
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