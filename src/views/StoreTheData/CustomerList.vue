<!--会员列表-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="24">
					<el-button type="primary" @click="addMember">添加会员</el-button>
					<el-input placeholder="输入搜索" style="width:240px" v-model="searchVal"></el-input>
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
				<el-table-column prop="name" label="用户名" width="150" align="center">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" min-width="180" align="center">
				</el-table-column>
				<el-table-column prop="enable" label="是否启用" width="200" align="center">
					<template slot-scope="scope">
						<el-button v-if="scope.row.enable == 1" type="text">开启</el-button>
						<el-button v-if="scope.row.enable == 2" type="text" style="color: #666;">禁用</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="balance" label="余额(元)" min-width="200" align="center">
				</el-table-column>
				<el-table-column label="操作" width="300" fixed="right" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" icon="el-icon-edit" @click="amendMember(scope.row.role_id)">编辑</el-button>
						<el-button size="mini" type="primary" @click="recharge(scope.row.role_id)">充值</el-button>
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
						添加会员
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
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="form.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="form.sex" placeholder="店长">
									<el-option label="男" value="1"></el-option>
									<el-option label="女" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="生日" prop="birthday">
								<el-input v-model="form.birthday"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="form.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="折扣" prop="discount">
								<el-input v-model="form.discount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="identityCard">
								<el-input v-model="form.identityCard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职业" prop="profession">
								<el-input v-model="form.profession"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="尺码轮廓" prop="outlineSize">
								<el-input v-model="form.outlineSize"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="地址" prop="address">
								<el-input v-model="form.address"></el-input>
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
						编辑会员
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
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="amendForm.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="amendForm.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="amendForm.sex" placeholder="店长">
									<el-option label="男" value="1"></el-option>
									<el-option label="女" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="生日" prop="birthday">
								<el-input v-model="amendForm.birthday"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="amendForm.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="折扣" prop="discount">
								<el-input v-model="amendForm.discount"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="identityCard">
								<el-input v-model="amendForm.identityCard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职业" prop="profession">
								<el-input v-model="amendForm.profession"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="尺码轮廓" prop="outlineSize">
								<el-input v-model="amendForm.outlineSize"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="住址" prop="address">
								<el-input v-model="amendForm.address"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button type="primary" @click="submitAmendForm('form')" align="center">添加</el-button>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--会员充值-->
		<div class="model" v-show="recharge_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						充值
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelRecharge">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="rechargeFrom" ref="rechargeFrom" label-width="100px">
					<el-row>
						<el-col :span="24" class="recharge_title">
							<svg-icon icon-class="dot" />支付金额
						</el-col>
						<el-col :span="12">
							<el-form-item label="充值金额" prop="phone">
								<el-input placeholder="请输入" v-model="rechargeFrom.phone">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="recharge_title">
							<svg-icon icon-class="dot" />支付方式
						</el-col>
						<el-col :span="12">
							<el-form-item label="现金" prop="cash">
								<el-input v-model="rechargeFrom.cash">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="微信" prop="WeChat">
								<el-input v-model="rechargeFrom.WeChat">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="支付宝" prop="Alipay">
								<el-input v-model="rechargeFrom.Alipay">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="银行卡" prop="bankCard">
								<el-input v-model="rechargeFrom.bankCard">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="付款合计" prop="total">
								<el-input v-model="rechargeFrom.total">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="找零" prop="change">
								<el-input v-model="rechargeFrom.change">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;">
						<el-button @click="cancelRecharge">取消</el-button>
						<el-button type="primary" @click="submitrechargeForm('rechargeFrom')" align="center">结算</el-button>
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
				new_info_model: false, //添加会员控制的弹窗
				amend_info_model: false, //修改会员信息时候的弹窗
				recharge_model: false,//会员充值时候的弹窗
				//表格数据
				data: [{
						id: 1,
						name: '王天佑',
						phone: '15736748856',
						enable: 1, //是否启用1、启用 2、不启用
						balance: 1000,
					},
					{
						id: 2,
						name: '王老爹',
						phone: '15736748866',
						enable: 2, //是否启用1、启用 2、不启用
						balance: 5000,
					}
				],
				//添加提交的表单
				form: {
					phone: '15736748899',
					name: '小狗蛋',
					sex: '',
					birthday: '', //生日
					email: '', //邮箱
					discount: '',
					identityCard: '', //身份证
					profession: '', //z职业
					outlineSize: '', //尺码轮廓
					address: '', //住址
				},
				form_rule: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, ],
					phone: {
						required: true,
						message: '输入手机号',
						trigger: 'blur'
					},
				},
				//修改信息
				amendForm: {
					phone: '15736748899',
					name: '小狗蛋',
					sex: '',
					birthday: '', //生日
					email: '', //邮箱
					discount: '',
					identityCard: '', //身份证
					profession: '', //z职业
					outlineSize: '', //尺码轮廓
					address: '', //住址
				},
				amendFormRule: {
					name: [{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}, ],
					phone: {
						required: true,
						message: '输入手机号',
						trigger: 'blur'
					},
				},
				//充值
				rechargeFrom: {
					rechargeAmount: '', //充值金额
					cash: '', //现金
					WeChat: '', //微信
					Alipay: '', //支付宝
					bankCard: '', //银行卡
					total: '', //合计
					change: '', //找零
				}

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
			//打开充值
			recharge(e) {
				this.recharge_model = true;
			},
			//取消充值信息
			cancelRecharge() {
				this.recharge_model = false;
			},
			//提交充值信息
			submitrechargeForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('充值 !');
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