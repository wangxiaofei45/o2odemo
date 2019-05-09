
<template>
	<div class="tab-container">
		<div v-show="isShow == 1">
		<div class="title">
			<el-row>
				<el-col :span="24">
					<el-button style="margin-right: 20px;" type="primary" @click="addMember" v-show="permission.indexOf('105') != -1">
						<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>新增</span>
					</el-button>
					<el-input placeholder="输入姓名/手机号" style="width:300px" v-model="searchVal">
						<el-button slot="append" @click='searchMember' style="background-color: #e0e0e0;border-radius: 0px">
							<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
						</el-button>
					</el-input>
				</el-col>
			</el-row>
		</div>
		<div class="tTable">
			<el-table :data="data" stripe border size="mini" max-height="1050px">
				<el-table-column type="index" label="序号" width="60" align="center">
				</el-table-column>
				<el-table-column prop="name" label="姓名" align="center">
					<template slot-scope="scope">
						<span style="color: #18CCBA;cursor:pointer;" @click="goToSee(scope.row)">{{scope.row.name}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="phone" label="手机号" align="center">
				</el-table-column>
				<el-table-column prop="enable" label="是否启用" align="center">
					<template slot-scope="scope">
						<span v-if="permission.indexOf('109') != -1">
							<el-button v-if="scope.row.status == 0" @click="SiteMember(scope.row)" type="text">开启</el-button>
							<el-button v-if="scope.row.status == 1" @click="SiteMember(scope.row)" type="text" style="color: #666;">禁用</el-button>
						</span>
						<span v-else>
							<el-button v-if="scope.row.status == 0" type="text">开启</el-button>
							<el-button v-if="scope.row.status == 1" type="text" style="color: #666;">禁用</el-button>
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="balance" label="会员折扣" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.discount/100}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="balance" label="会员余额" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.revenue/100}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button v-show="permission.indexOf('106') != -1" size="mini" type="primary" @click="amendMember(scope.row.id)">编辑</el-button>
						<el-button v-show="permission.indexOf('107') != -1" size="mini" type="warning" @click="recharge(scope.row.id)">充值</el-button>
						<el-button v-show="permission.indexOf('115') != -1" size="mini" type="danger" @click="deletes(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--添加账号-->
		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo('form')">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="form" :rules="form_rule" ref="form" label-width="90px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="form.name" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="form.phone" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="会员等级" prop="member_grade">
								<el-select v-model="form.member_grade" placeholder="请选择">
									<el-option label="普通会员" value="0"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="form.sex" placeholder="请选择">
									<el-option label="男" value="1"></el-option>
									<el-option label="女" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="生日">
								<el-date-picker type="date" placeholder="选择日期" v-model="form.birth_time" value-format="timestamp">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="form.email" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="折扣" prop="discount">
								<el-input-number v-model="form.discount" :precision="2" :step="0.01" controls-position="right" :min="0" :max="1"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="id_card">
								<el-input v-model="form.id_card" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职业" prop="job">
								<el-input v-model="form.job" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="尺码轮廓" prop="size">
								<el-input v-model="form.size" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="地址" prop="address">
								<el-input v-model="form.address" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;" class="bottomButton">
						<el-button name="cancel" @click="cancel_newInfo('form')">取消</el-button>
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
						编辑
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
							<el-form-item label="姓名" prop="name">
								<el-input v-model="amendForm.name" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机号" prop="phone">
								<el-input v-model="amendForm.phone" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="会员等级" prop="member_grade">
								<el-select v-model="amendForm.member_grade" placeholder="请选择">
									<el-option v-for="item in memberOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="amendForm.sex" placeholder="请选择">
									<el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="生日">
								<el-date-picker type="date" placeholder="选择日期" v-model="amendForm.birth_time" value-format="yyyy-MM-dd">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="amendForm.email" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<!--<el-form-item label="折扣" prop="discount">
								<el-input v-model="amendForm.discount" placeholder="请输入"></el-input>
							</el-form-item>-->
							<el-form-item label="折扣" prop="discount">
								<el-input-number v-model="amendForm.discount" :precision="2" :step="0.01" controls-position="right" :min="0" :max="1"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="id_card">
								<el-input v-model="amendForm.id_card" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职业" prop="job">
								<el-input v-model="amendForm.job" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="尺码轮廓" prop="size">
								<el-input v-model="amendForm.size" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="住址" prop="address">
								<el-input v-model="amendForm.address" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;" class="bottomButton">
						<el-button name="cancel" @click="cancelAmendInfo">取消</el-button>
						<el-button type="primary" @click="submitAmendForm('amendForm')" align="center">保存</el-button>
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
						<el-button type="text" @click="cancelRecharge('rechargeFrom')">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="rechargeFrom" ref="rechargeFrom" :rules="rechargeRule" label-width="100px">
					<el-row>
						<el-col :span="24" class="recharge_title">
							<svg-icon icon-class="dot" />充值金额
						</el-col>
						<el-col :span="12">
							<el-form-item label="充值金额" prop="pay_money">
								<el-input placeholder="请输入" v-model="rechargeFrom.pay_money">
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
							<el-form-item label="现金" prop="cash_pay">
								<el-input v-model="rechargeFrom.cash_pay" placeholder="请输入">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="微信" prop="wechat_pay">
								<el-input v-model="rechargeFrom.wechat_pay" placeholder="请输入">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="支付宝" prop="alipay_pay">
								<el-input v-model="rechargeFrom.alipay_pay" placeholder="请输入">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="银行卡" prop="bank_card">
								<el-input v-model="rechargeFrom.bank_card" placeholder="请输入">
									<template slot="append" class="append">元</template>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row style="text-align: center;" class="bottomButton">
						<el-button name="cancel" @click="cancelRecharge('rechargeFrom')">取消</el-button>
						<el-button type="primary" @click="submitrechargeForm('rechargeFrom')" align="center">结算</el-button>
					</el-row>
				</el-form>
			</div>
		</div>
		</div>
		<div v-show= "isShow == 2">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					充值记录
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="tTable">
			<el-table :data="rechargeTb" stripe border style="width: 100%;" size="mini">
				<el-table-column type="index" label="序号" width="60" align="center">
				</el-table-column>
				<el-table-column prop="order_number" label="交易单号" min-width="180" align="center">
				</el-table-column>
				<el-table-column prop="created_at" label="交易单号" min-width="180" align="center">
				</el-table-column>
				<el-table-column prop="total_money" label="余额余额" min-width="200" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.total_money/100}}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChanges" @current-change="handleCurrentChanges" :current-page="currentPage4" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="reTotal">
				</el-pagination>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isShow:1,
				permission: [],
				searchVal: '',
				new_info_model: false, //添加会员控制的弹窗
				amend_info_model: false, //修改会员信息时候的弹窗
				recharge_model: false, //会员充值时候的弹窗
				data: [], //表格数据
				//添加提交的表单
				form: {
					name: '', //姓名
					phone: '', //手机号
					member_grade: '', //会员等级
					sex: '',
					birth_time: '', //生日
					discount: 1, //折扣
					email: '', //邮箱
					id_card: '', //身份证
					job: '', //职业
					size: '', //尺码轮廓
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
					name: '', //姓名
					phone: '', //手机号
					member_grade: '', //会员等级
					sex: '',
					birth_time: '', //生日
					discount: '', //折扣
					email: '', //邮箱
					id_card: '', //身份证
					job: '', //职业
					size: '', //尺码轮廓
					address: '', //住址
				},
				memberOptions: [{
					value: 0,
					label: "普通会名"
				}, ],
				sexOptions: [{
						value: 1,
						label: "男"
					},
					{
						value: 2,
						label: "女"
					},
				],
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
					id: '',
					pay_money: '', //充值金额
					cash_pay: '', //现金
					wechat_pay: '', //微信
					alipay_pay: '', //支付宝
					bank_card: '', //银行卡
					// total: '', //合计
					// change: '', //找零
				},
				rechargeRule: {
					pay_money: {
						required: true,
						message: '请输入充值金额',
						trigger: 'blur'
					},
				},
				rechargeTb:[],
				page: 1, //分页
				total: 0,
				per_page: 10,
				currentPage4: 4,
				rePage: 1, //分页
				reTotal: 0,
				re_per_page: 10,
				rechargeId:'',
			};
		},
		created() {
			this.ajaxjson(); //请求模板列表的数据
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//查看会员充值记录
			goToSee(e){
				this.rechargeId = e;
				this.postSee();
			},
			postSee(){
				let postData = {
					id:this.rechargeId,
					page:this.rePage,
				}
				this.$post(this.$memberMemberRechargeList,postData).then((res)=>{
					if(res.status_code == 0){
						this.rechargeTb = res.data.data;
						this.isShow = 2;
						this.reTotal = res.data.total;
					}
				})
			},
			handleSizeChanges(val) {
				console.log(val);
				this.re_per_page = val;
				this.postSee();
			},
			handleCurrentChanges(val) {
				this.rePage = val;
				this.postSee();
			},
			back(){
				this.isShow = 1;
			},
			// 首次进入加载的数据
			ajaxjson() {
				let postData = {
					page: this.page,
					per_page: this.per_page,
				};
				this.$post(this.$memberMemberList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data.data;
						this.total = data.data.total;
					} else {}
				});
			},
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			// 会员设置开启和禁用
			SiteMember(e) {
				let postData = {
					id: e.id
				}
				this.$post(this.$memberSiteMember, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.$message({
							message: data.message,
							type: 'success'
						});
						this.ajaxjson();
					} else {
						this.$message.error(data.message);
					}
				});
			},
			// 搜索会员
			searchMember() {
				let postData = {
					search: this.searchVal,
					page: '1',
					pageNum: '20',
				};
				this.$post(this.$memberSearchMember, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//添加会员
			addMember() {
				this.new_info_model = true
			},
			//取消添加新的用户
			cancel_newInfo(formName) {
				this.$refs[formName].resetFields();
				this.new_info_model = false;
			},
			//确定添加用户
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.form);
						postData.discount = postData.discount*100;
						postData.birth_time = postData.birth_time/1000;
						this.$post(this.$memberAddMember, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									message: data.message,
									type: 'success'
								});
								this.$refs[formName].resetFields();
								this.ajaxjson();
								this.new_info_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			// 删除会员
			deletes(e) {
				let data = {
					id: e,
				}
				this.$delete(this.$memberDelMember, data)
			},
			//打开编辑
			amendMember(e) {
				let postData = {
					id: e,
				};
				this.$post(this.$memberMemberDetail, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						console.log(data);
						this.amendForm = data.data;
						this.amendForm.birth_time = this.$formatTimes(this.amendForm.birth_time);
						this.amendForm.discount = this.amendForm.discount / 100;
						this.amend_info_model = true
					} else {
						this.$message.error(data.message);
					}
				});
			},
			// 取消修改会员信息
			cancelAmendInfo() {
				this.amend_info_model = false;
			},
			// 编辑会员信息
			submitAmendForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amendForm);
						postData.discount = postData.discount * 100;
						postData.birth_time = Date.parse(postData.birth_time)/1000;
						this.$post(this.$memberEditMember, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									message: data.message,
									type: 'success'
								});
								this.ajaxjson();
								this.amend_info_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//打开充值
			recharge(e) {
				this.rechargeFrom.id = e;
				this.recharge_model = true;
			},
			//取消充值信息
			cancelRecharge(formName) {
				this.recharge_model = false;
				this.$refs[formName].resetFields();
			},
			//提交充值信息
			submitrechargeForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.rechargeFrom);
						for(let i in postData){
							postData[i] =  postData[i]*100+'';
						}
						postData.id = postData.id/100;
						this.$post(this.$memberRecharge, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									message: data.message,
									type: 'success'
								});
								this.ajaxjson();
								this.$refs[formName].resetFields();
								this.recharge_model = false;
							} else {
								this.$message.error(data.message);
							}
						});
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
	.el-button--warning {
		background-color: #f48b25;
	}
	.model .el-input-group__append {
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
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
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
		width: 960px;
		position: absolute;
		left: 50%;
		margin-left: -480px;
		transform: translateY(40%);
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
<style type="text/css" scoped>
	.model_con .el-input,.el-select,.el-input-number{
		width: 300px !important;
	}
	.bottomButton .el-button{
		width: 120px;
		height: 40px;
	}
	.el-button[name = "cancel"]{
		background-color: #cacccc;
		color: #FFFFFF;
		margin-right: 20px;
	}
	.el-button[name = "cancel"]:hover{
		color: #FFFFFF;
		border: none;
	}
</style>