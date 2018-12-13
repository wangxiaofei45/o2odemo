<!--往来单位-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="24">
					<el-button type="primary" @click="addMember">添加供应商</el-button>
					<el-input placeholder="输入供应商名称、手机号" style="width:240px" v-model="searchVal"></el-input>
					<el-button type="primary">搜索</el-button>
				</el-col>
			</el-row>
		</div>
		<div class="tTable">
			<el-table :data="data" stripe border style="width: 100%;" size="mini" @selection-change="SelectionChange">
				<!--<el-table-column type="selection" width="60" fixed align="center">
				</el-table-column>-->
				<el-table-column prop="id" label="id" width="60" align="center">
				</el-table-column>
				<el-table-column prop="name" label="供应商名称" width="150" align="center">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" width="180" align="center">
				</el-table-column>
				<el-table-column prop="location" label="地址" align="center">
				</el-table-column>
				<el-table-column label="操作" width="300" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="amendMember(scope.row.role_id)">编辑</el-button>
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
						添加供应商
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="form" :rules="form_rule" ref="form" label-width="100px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="供应商名称" prop="name">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系人" prop="linkMen">
								<el-input v-model="form.linkMen"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="移动电话" prop="phone">
								<el-input v-model="form.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="固定电话" prop="theFixedPhone">
								<el-input v-model="form.theFixedPhone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="价格方式" prop="priceWay">
								<el-select v-model="form.priceWay" placeholder="请选择">
									<el-option label="进价" value="1"></el-option>
									<el-option label="9折" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="进货折扣" prop="discount">
								<el-input v-model="form.discount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开户银行" prop="depositBank">
								<el-input v-model="form.depositBank"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="12">
							<el-form-item label="账号" prop="tnf">
								<el-input v-model="form.tnf"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="税号" prop="profession">
								<el-input v-model="form.profession"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="地址" prop="address">
								<el-input v-model="form.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮编" prop="postCode">
								<el-input v-model="form.postCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注" prop="remarks">
								<el-input v-model="form.remarks"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button type="primary" @click="submitForm('form')" align="center">添加</el-button>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--修改model-->
		<div class="model" v-show="amend_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑供应商
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmendInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amendForm" :rules="amendFormRule" ref="amendForm" label-width="100px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="供应商名称" prop="name">
								<el-input v-model="amendForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系人" prop="linkMen">
								<el-input v-model="amendForm.linkMen"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="移动电话" prop="phone">
								<el-input v-model="amendForm.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="固定电话" prop="theFixedPhone">
								<el-input v-model="amendForm.theFixedPhone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="价格方式" prop="priceWay">
								<el-select v-model="amendForm.priceWay" placeholder="请选择">
									<el-option label="进价" value="1"></el-option>
									<el-option label="9折" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="进货折扣" prop="discount">
								<el-input v-model="amendForm.discount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="开户银行" prop="depositBank">
								<el-input v-model="amendForm.depositBank"></el-input>
							</el-form-item>
						</el-col>
						
						<el-col :span="12">
							<el-form-item label="账号" prop="tnf">
								<el-input v-model="amendForm.tnf"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="税号" prop="profession">
								<el-input v-model="amendForm.profession"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="地址" prop="address">
								<el-input v-model="amendForm.address"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮编" prop="postCode">
								<el-input v-model="amendForm.postCode"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="备注" prop="remarks">
								<el-input v-model="amendForm.remarks"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button type="primary" @click="submitAmendForm('amendForm')" align="center">保存</el-button>
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
				searchVal: '',
				new_info_model: false, //添加供应商弹窗
				amend_info_model: false, //修改供应商弹窗
				//表格数据
				data: [{
						id: 1,
						name: '王天佑',
						phone: '15736748856',
						location:'杭州市西湖区天恒大厦1505',//地址
					},
					{
						id: 2,
						name: '王老爹',
						phone: '15736748866',
						location:'杭州市西湖区天恒大厦1506',//地址
					}
				],
				//添加提交的表单
				form: {
					name: '',//供应商名称
					linkMen:'',//联系人
					phone: '',//联系电话
					theFixedPhone:'',//固定电话
					priceWay:'',//价格方式
					discount:'',//折扣
					depositBank:'',//开户银行
					accountNumber:'',//账号
					tnf:'',//税号
					address: '', //住址
					postCode:'',//邮编
					remarks:'',//备注
				},
				form_rule: {
					name: [{
						required: true,
						message: '供应商名称为空',
						trigger: 'blur'
					}, ],
					linkMen:{
						required: true,
						message: '联系人为空',
						trigger: 'blur'
					},
					phone: {
						required: true,
						message: '手机号为空',
						trigger: 'blur'
					},
				},
				//修改信息
				amendForm: {
					name: '',//供应商名称
					linkMen:'',//联系人
					phone: '',//联系电话
					theFixedPhone:'',//固定电话
					priceWay:'',//价格方式
					discount:'',//折扣
					depositBank:'',//开户银行
					accountNumber:'',//账号
					tnf:'',//税号
					address: '', //住址
					postCode:'',//邮编
					remarks:'',//备注
				},
				amendFormRule: {
					name: [{
						required: true,
						message: '供应商名称为空',
						trigger: 'blur'
					}, ],
					linkMen:{
						required: true,
						message: '联系人为空',
						trigger: 'blur'
					},
					phone: {
						required: true,
						message: '手机号为空',
						trigger: 'blur'
					},
				},
			};
		},
		methods: {
			SelectionChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
			},
			//添加会员
			addMember() {
				this.new_info_model = true
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.new_info_model = false;
			},
			//确定添加用户
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//打开编辑
			amendMember(e) {
				console.log(e);
				this.amend_info_model = true
			},
			cancelAmendInfo() {
				this.amend_info_model = false;
			},
			submitAmendForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
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
<style type="text/css">
	.el-input-group__append {
		background-color: #FFF;
		color: #909399;
		vertical-align: middle;
		display: table-cell;
		position: relative;
		border: 0px solid #dcdfe6;
		border-radius: 4px;
		padding: 0 10px;
		width: 1px;
		white-space: nowrap;
	}
</style>
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
	
	.delete {
		width: 500px;
		margin: 50px auto;
	}
	
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.information {
		width: 100%;
		padding: 10% 10% 10% 10%;
		background: #f4f4f4;
	}
	
	.tTable {
		margin-top: 20px;
		min-width: 1300px;
	}
	
	.oTable {
		position: relative;
	}
	
	.addTable {
		position: absolute;
		right: 90px;
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
	
	.recharge_title {
		font-size: 16px;
		color: #999;
		padding-left: 20px;
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