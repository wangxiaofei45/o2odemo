<!--仓库进出存-->

<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col >
					<el-input placeholder="仓库号、货号" style="width:240px" v-model="search"></el-input>
					<el-button type="primary" icon="erp-icon-sousuo">搜索</el-button>
					<el-button type="primary" icon="erp-icon-shaixuan">筛选订单</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="search">
				<el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker  type="date" placeholder="选择日期"  v-model="forMation.dateStart">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker type="date" placeholder="选择日期" v-model="forMation.dateEnd">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="仓库">
								<el-select v-model="forMation.shop" placeholder="亿链仓库">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="货号">
								<el-select v-model="forMation.name" placeholder="">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
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
		<div class="tTable">
			<el-table :data="data" stripe border show-summary  style="width: 100%;" size="mini" @selection-change="SelectionChange">
				<el-table-column type="selection" width="60" fixed align="center">
				</el-table-column>
				<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
				</el-table-column>
				<el-table-column prop="shop_id" label="单据号" fixed width="100" align="center">
				</el-table-column>
				<el-table-column prop="name" label="单据日期" width="100" align="center">
				</el-table-column>
				<el-table-column prop="address" label="调出店铺" width="100" align="center">
				</el-table-column>
				<el-table-column prop="telphone" label="调入店铺" width="100" align="center">
				</el-table-column>
				<el-table-column prop="retailprice" label="数量" width="100" align="center">
				</el-table-column>
				<el-table-column prop="morning" label="金额" width="100" align="center">
				</el-table-column>
				<el-table-column prop="afternoon" label="制单人" width="100" align="center">
				</el-table-column>
				<el-table-column prop="allocationprice" label="摘要" min-width="200" align="center">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			search:'',
			input: '',
			input2:'',
			input3:'',	
			pay_disCount:'',
			//表单对象
			formInline: {   
				dateStart:'1',
				dateEnd:'',
				shop:'',
				supplier:'',
				Freightnumber:'',
				number:'',
				abstract:'',
				radio:3,
				user:''
			},
			forMation: {   //表单对象
				dateStart:'',
				dateEnd:'',
				documentnumber:'',
				shop:'',
				shop1:'',
				date:'',
				supplier:'',
				cost:'',
				number:'',
				abstract:'',
				user:'',
				name:'',
				shoptype:''
			},
			labelPosition: 'right', //lable对齐方式
            labelWidth: '80px' ,  //lable宽度
			value_gy:1,
			radio:1,
			isPurchaseHistory:false,
			isMerge:false,
			isDelete:false,
			isDisCount:false,
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
			data:[
				{
					role_id:10011,
					shop_id:100111,
					name:'女士内衣',
					address:'杭州市滨江区',
					telphone:'110',
					retailprice:2000,
					morning:3000,
					afternoon:'邢建辉',
					allocationprice:'衣恋集团'
				}
			],
			dataTable:[   //添加商品
				{
					role_id:'短袖',
					name:1,
					address:1,
					telphone:1,
					retailprice:1,
					morning:1
				}
			],
			dataData:[    //商品规格
				{
					color:'黑色',
					all_id:111,
					rulte_01:1,
					rulte_02:1,
					rulte_03:1,
					rulte_04:1,
					rulte_05:1,
					rulte_06:1,
					rulte_07:1,
					rulte_08:1,
					rulte_09:1,
					rulte_10:1,
					rulte_11:1,
					rulte_12:1,  
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
			if (this.$refs.formData!==undefined) {
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
		Delete(){
			this.isDelete=true;
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
	height: 132px;
	padding: 20px;
	min-width:1300px;
}


.search span {
	display: inline-block;
	margin-left: 50px;
	margin-top: 30px;
}
.tTable{
	margin-top: 20px;
	min-width: 1300px;
}
.total{
	
	width:100%;
	position: fixed;
	bottom: 30px;
	height:38px;
	padding-left: 20px;
	background: #f4f4f4;
	line-height: 38px;
}
.total .totalNum{
	width:1200px;
	display: inline-block;
	height:38px;
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
.delete{
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