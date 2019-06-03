<template>
	<!-- 档案室管理 -->
	<div>
		<div class="tab-container">
		<!-- 	<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button  type="primary" @click="closeAnAbccount" style="margin-right: 20px;">
							<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>添加用户</span>
						</el-button>
						<el-input placeholder="输入 档案室/真实姓名/用户名" style="width:350px;margin-right: 20px;">
							<el-button slot="append" type="primary" @click='ajaxjson' style="background-color: #e0e0e0;border-radius: 0px;">
								<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
							</el-button>
						</el-input>
					</el-col>
				</el-row>
			</div> -->
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" :index="indexMethod" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="nickName" label="用户名" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="name" label="真实姓名" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="phone" label="联系电话" align="center">
					</el-table-column>
					<el-table-column prop="duty" label="职务" width="200" align="center">
					</el-table-column>
					<el-table-column prop="type" label="状态" width="200" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 1">启用</span>
							<span v-if="scope.row.type == 2">禁用</span>
						</template> 
					</el-table-column>
					<el-table-column prop="role" label="角色" width="200" align="center">
					</el-table-column>
					<el-table-column prop="archivesRoom" label="档案室" width="200" align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template slot-scope="scope">
							<el-button @click="goToEditor(scope.row)" type="warning" size="mini">编辑</el-button>
							<el-button @click="deletes(scope.row.id)" type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--添加档案室-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						添加用户
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage('accountFrom')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="100px" :model="accountFrom" :rules="ruleaccountFrom" ref="accountFrom" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="角色" prop="join_code">
								<el-select placeholder="请选择" v-model="accountFrom.role">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案室" prop="archivesRoom">
								<el-select placeholder="请选择" v-model="accountFrom.archivesRoom">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="用户名" prop="nickName">
								<el-input placeholder="请输入" v-model="accountFrom.nickName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input placeholder="请输入" v-model="accountFrom.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="真是姓名" prop="name">
								<el-input placeholder="请输入" v-model="accountFrom.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="phone">
								<el-input placeholder="请输入" v-model="accountFrom.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职务" prop="duty">
								<el-select placeholder="请选择" v-model="accountFrom.duty">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="账号状态" prop="type">
								<el-radio-group v-model="accountFrom.type">
									<el-radio :label="1" :value="1">启用</el-radio>
									<el-radio :label="2" :value="2">禁用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注" prop="remark">
								<el-input type="textarea" placeholder="请输入" v-model="accountFrom.remark"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="档案盒" prop="fileBox">
								<el-input placeholder="请输入" v-model="accountFrom.fileBox"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom bottomButton">
						<el-col :span='24'>
							<el-button @click="cancelPutInStorage('accountFrom')" name="cancel">
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
						编辑用户
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmend" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="120px" :model="amendInfo" :rules="ruleaccountFrom" ref="amendInfo" class="demo-form-inline">
					<el-row>
						<el-col :span="12">
							<el-form-item label="角色" prop="join_code">
								<el-select placeholder="请选择" v-model="amendInfo.role">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案室" prop="archivesRoom">
								<el-select placeholder="请选择" v-model="amendInfo.archivesRoom">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="用户名" prop="nickName">
								<el-input placeholder="请输入" v-model="amendInfo.nickName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input placeholder="请输入" v-model="amendInfo.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="真是姓名" prop="name">
								<el-input placeholder="请输入" v-model="amendInfo.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="联系电话" prop="phone">
								<el-input placeholder="请输入" v-model="amendInfo.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="职务" prop="duty">
								<el-select placeholder="请选择" v-model="amendInfo.duty">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="账号状态" prop="type">
								<el-radio-group v-model="amendInfo.type">
									<el-radio :label="1" :value="1">启用</el-radio>
									<el-radio :label="2" :value="2">禁用</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注" prop="remark">
								<el-input type="textarea" placeholder="请输入" v-model="amendInfo.remark"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="档案盒" prop="fileBox">
								<el-input placeholder="请输入" v-model="amendInfo.fileBox"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="bottom bottomButton" v-if="disabled == 0">
						<el-col :span='24'>
							<el-button @click="cancelAmend" name="cancel">
								取消
							</el-button>
							<el-button type="primary" @click="amend('amendInfo')">
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
				 options: [{
					  value: '选项1',
					  label: '黄金糕'
					}, {
					  value: '选项2',
					  label: '双皮奶'
					}],
				//展示出来的数据
				data: [
					{
						name:"真实姓名",
						nickName:"用户名",
						phone:"18888888888",
						duty:"中央党委书记",
						type:1,
						role:"档案管理员",
						archivesRoom:"王XX"
					},
					{
						name:"真实姓名",
						nickName:"用户名",
						phone:"18888888888",
						duty:"中央党委书记",
						type:2,
						role:"档案管理员",
						archivesRoom:"王XX"
					},
				], 
				//添加时候的提交数据
				accountFrom: {
					role:"档案管理员",
					archivesRoom:"王XX",
					nickName:"用户名",
					password:"123456",
					name:"真实姓名",
					phone:"18888888888",
					duty:"中央党委书记",
					type:1,
					remark:"备注",
					fileBox:"档案盒",
				},
				ruleaccountFrom: {
					nickName: [{
						required: true,
						message: '档案简称为空',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '档案名称为空',
						trigger: 'blur'
					}],
					unitName: [{
						required: true,
						message: '使用单位为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '单位联系人电话为空',
						trigger: 'blur'
					}],
				},
				// 编辑时候的信息
				amendInfo: {
					role:"档案管理员",
					archivesRoom:"王XX",
					nickName:"用户名",
					password:"123456",
					name:"真实姓名",
					phone:"18888888888",
					duty:"中央党委书记",
					type:1,
					remark:"备注",
					fileBox:"档案盒",
				}, //编辑时候的
				PutInStorageModel: false,
				amendModel: false, //修改时候的弹窗
				page: 1, //分页
				total: 0,
				per_page: 10,
				disabled: false,
			}
		},
		created() {
			// this.ajaxjson();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			ajaxjson() {
				//合并提交
				let postData = Object.assign({
					page: this.page,
					per_page: this.per_page,
				})
				this.$post(this.$earnestList, postData).then((res) => {
					if(res.status_code == 0) {
						let datas = res.data.data;
						//						for(let i = 0; i < datas.length; i++) {
						//							datas[i].created_at = this.$formatTimestamp(datas[i].created_at);
						//						}
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
					// 表单的验证 规则
					if(valid) {
						let postData = this.$objDeepCopy(this.accountFrom);
						postData.user_id = sessionStorage.getItem('id');
						postData.earnest_money = postData.earnest_money * 100 + '';
						this.$post(this.$earnestAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.$refs[e].resetFields();
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
			deletes(e) {
				let postData = {
					id: e + ''
				};
				console.log("删除!")
				// this.$delete(this.$earnestDelEarnest, postData);
			},
			//打开编辑
			goToEditor(e) {
				let amendInfo = this.$objDeepCopy(e);
				amendInfo.dateTime = this.$formatTimestamp(amendInfo.created_at);
				if(amendInfo.status == 1) {
					this.disabled = true;
				} else {
					this.disabled = false;
				}
				amendInfo.earnest_money = amendInfo.earnest_money / 100;
				this.amendInfo = amendInfo;
				this.amendModel = true;
			},
			//编辑
			amend(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.amendInfo);
						postData.earnest_money = postData.earnest_money * 100 + '';
						this.$post(this.$earnestEditEarnest, postData).then((res) => {
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
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
			},
			//新增生成单号
			closeAnAbccount() {
				this.PutInStorageModel = true;
			},
			cancelPutInStorage(e) {
				this.$refs[e].resetFields();
				this.PutInStorageModel = false;
			},
			//取消修改
			cancelAmend() {
				this.amendModel = false;
			},
			// 重置表单
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.title {
		margin-bottom: 15px;
	}
	.search {
		background: #f4f4f4;
		padding: 20px 20px 20px;
	}
	.search .el-input{
		min-width: 220px;
	}
	.search .el-select{
		min-width: 220px;
	}
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.tTable {
		margin-top: 20px;
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
			width: 900px;
			height: 500px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -450px;
			margin-top: -250px;
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
		.model_con .el-input {
			width: 300px;
		}
		.model_con .el-select {
			width: 300px;
		}
	}
	.delete {
		text-align: center;
		margin-top: 50px;
	}
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 20px;
		margin-bottom: 20px;
	}
</style>