
<!--职员档案-->

<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="24">
						<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="input"></el-input>
						<el-button type="primary"><i class="erp-icon-sousuo"></i>搜索</el-button>
						<el-button type="primary" style="float:right;margin-right:30px" @click="addStaff"><i class="erp-icon-xinzeng"></i>添加账号</el-button>
				</el-col>
			</el-row>
		</div>

		<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini" @selection-change="SelectionChange">
						<el-table-column type="selection" width="60" fixed align="center">
						</el-table-column>
						<el-table-column prop="role_id" label="id" width="200" align="center" sortable>
						</el-table-column>
						<el-table-column prop="shop_id" label="用户名" min-width="200" align="center">
						</el-table-column>
						<el-table-column prop="pass" label="审核状态" width="200" align="center">
						<template slot-scope="scope">
								<span v-if="scope.row.pass == 0" style="color: red;">未审核</span>
								<span v-if="scope.row.pass == 1" style="color: limegreen;">通过审核</span>
						</template>
						</el-table-column>
						<el-table-column prop="menusstate" label="是否启用">
								<template slot-scope="scope">
										<el-switch
												on-text ="是"
												off-text = "否"
												on-color="#5B7BFA"
												off-color="#dadde5"
												v-model="scope.row.menusstate" 
												@change=change(scope.$index,scope.row)                
										>
										</el-switch>
								</template>
						</el-table-column>
						<el-table-column label="操作" width="200" fixed="right" align="center">
								<template slot-scope="scope">
										<el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row.role_id)">编辑</el-button>
										<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.role_id)">删除</el-button>
								</template>
						</el-table-column>
				</el-table>
		</div>
		<!--添加账号-->
		<div class="model" v-show="new_info_model">
			<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							添加账号
						</el-col>
						<el-col :span="12" style="text-align: right;">
								<el-button type="text" @click="cancel_newInfo">
									<svg-icon icon-class="cancel" />
								</el-button>
						</el-col>
					</el-row>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="角色" prop="region">
									<el-select v-model="ruleForm.region" placeholder="店长">
											<el-option label="区域一" value="shanghai"></el-option>
											<el-option label="区域二" value="beijing"></el-option>
									</el-select>
						  </el-form-item>
							<el-form-item label="手机号" prop="phone">
									<el-input v-model="ruleForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="pwd">
									<el-input v-model="ruleForm.pwd"></el-input>
							</el-form-item>
							<el-form-item label="角色" prop="confirePwd">
									<el-input v-model="ruleForm.confirePwd"></el-input>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
									<el-input v-model="ruleForm.email"></el-input>
							</el-form-item>
							<el-form-item label="姓名" prop="name">
									<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="身份证" prop="card">
								<el-input v-model="ruleForm.card"></el-input>
							</el-form-item>
							<el-form-item align="center">
								<el-button type="primary" @click="submitForm('ruleForm')" align="center">添加</el-button>
								<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
							</el-form-item>
					</el-form>
			</div>
		</div>
		<!--结账-->
		<div class="model" v-show="is_edit">
			<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							选择商品明细：0002,休闲馆
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_edit">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<el-form-item label="角色" prop="region">
								<el-select v-model="ruleForm.region" placeholder="店长">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="ruleForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="pwd">
								<el-input v-model="ruleForm.pwd"></el-input>
							</el-form-item>
							<el-form-item label="确认密码" prop="confirePwd">
								<el-input v-model="ruleForm.confirePwd"></el-input>
							</el-form-item>
							<el-form-item label="姓名" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="身份证" prop="card">
								<el-input v-model="ruleForm.card"></el-input>
							</el-form-item>
							<el-form-item label="住址" prop="address">
								<el-input v-model="ruleForm.address"></el-input>
							</el-form-item>
							<el-form-item label="尺码轮廓" prop="size">
								<el-input v-model="ruleForm.size"></el-input>
							</el-form-item>
							<el-form-item label="财产收入" prop="income">
								<el-input v-model="ruleForm.income"></el-input>
							</el-form-item>
							<el-form-item label="家庭信息" prop="family">
								<el-input v-model="ruleForm.family"></el-input>
							</el-form-item>
							<el-form-item align="center">
								<el-button type="primary" @click="submitForm('ruleForm')" align="center">修改</el-button>
							</el-form-item>
					</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
			form: {
				name: '',
				money:'',
				count:'',
				reduce:'',
				totalCount:'',
				cashe:'',
				ispay:'100.00',
				money_wx:'',
				money_zfb:'',
				card:'',
				totalMoney:'',
				money_gz:'',
				type: [],
			},
			radio:'',
			input:'',
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
			labelPosition: 'right', //lable对齐方式
			labelWidth: '80px' ,  //lable宽度
			pay_disCount:1.0,
			radio2:3,
			new_info_model: false,
			is_edit:false,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
			editForm: {
							name: '',
							region: '',
							pwd:'',
							confirePwd:'',
							phone:'',
							card:'',
							address:'',
							size:'',
							income:'',
							family:''
			},
			rules: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			},
			ruleForm: {
						name: '',
						region: '',
						pwd:'',
						confirePwd:'',
						phone:'',
						card:'',
						email:''
			},
			rules: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			},
			data: [
					{
						selection:123456,
						role_id:1,
						shop_id:1,
						name:'卫衣',
						address:'aaaa',
						telphone:123,
						retailprice:'红色',
						morning:100,
						afternoon:80,
						allocationprice:'aaaa',
						total:1000,
						plain:'bbbb',
						menusstate:false,
						pass:1
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
				},
			],
      new_info: {
        shop_id: sessionStorage.getItem("shop_id"),
        name: "", //公司名称
        address: "", //地址
        telphone: "", //固话
        retailprice: "", //零售价格
        allocationprice: "", //调拨价格
        morning: "", //早班时间
        afternoon: "", //午班时间
        night: "", //晚班时间
        size: "", //面积
        rent: "", //佣金
        context: "", //经营描述
        licenseimg: "", //营业执照
        is_straight: "" //是否是自营
      }
    };
  },

  methods: {
		resetForm(formData) {
        // 	this.$nextTick(function() {
        //   	this.$refs[formData].resetFields();
		//  })
			if (this.$refs.formData!==undefined) {
				this.$refs.formData.resetFields();
			}
      	},
				 onSubmit() {
        console.log('submit!');
      },
	change:function(index,row){
                console.log(index,row);
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

	//添加账号
	addStaff(){
		this.new_info_model=true;
	},
	//编辑
	edit(rows_id){
		this.is_edit=true;
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
	//添加一行表格
	addRow(){
		let obj={
			color:'',
			all_id:111,
			rulte_01:1,
			rulte_02:1,
			rulte_03:1,
		}
		this.dataData.push(obj);
	},
	// 删除一行表格
	reduceRow(){
		this.dataData.pop(index);
	},

	//取消添加新的用户
	cancel_newInfo() {
		this.new_info_model = false;
	},



	// 关闭编辑
	cancel_edit(){
		this.is_pay=false;
	},

	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  

  	},
  		
}
</script>
<style scoped>
.title {
  margin-bottom: 15px;
}

.search {
  height: 50px;
  /* background: #f4f4f4; */
  height: 180px;
  padding: 20px;
  min-width: 1300px;
}
.delete{
	width:500px;
	margin: 50px auto;
}
.search span {
  display: inline-block;
  margin-left: 50px;
  margin-top: 30px;
}
.information{
	width:100%;
	padding: 10% 10% 10% 10%;
	background: #f4f4f4;
}
.tTable {
  margin-top: 20px;
  min-width: 1300px;
}
.oTable{
	position: relative;
}
.addTable{
	position:absolute;
	right:90px;
	bottom: 50px;
	
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
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 15px;
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
  border-color: #409eff;
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