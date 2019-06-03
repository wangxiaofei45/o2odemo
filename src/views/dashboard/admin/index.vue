<template>
	<!-- 档案室管理 -->
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button  type="primary" @click="closeAnAbccount" style="margin-right: 20px;">
							<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>添加档案室</span>
						</el-button>
						<el-input placeholder="输入单据号" style="width:300px;margin-right: 20px;">
							<el-button slot="append" type="primary" @click='ajaxjson' style="background-color: #e0e0e0;border-radius: 0px;">
								<svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
							</el-button>
						</el-input>
					</el-col>
				</el-row>
			</div>
			<!--展示出来的表格-->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" :index="indexMethod" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="nickName" label="档案室简称" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="name" label="档案室名称" fixed width="200" align="center">
					</el-table-column>
					<el-table-column prop="unitName" label="使用单位名称" width="200" align="center">
					</el-table-column>
					<el-table-column prop="phone" label="使用单位联系人电话" align="center">
					</el-table-column>
					<el-table-column label="操作" width="300" align="center">
						<template slot-scope="scope">
							<el-button @click="seemaster" type="primary" size="mini">查看管理员</el-button>
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
						添加档案室
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelPutInStorage('accountFrom')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="120px" :model="accountFrom" :rules="ruleaccountFrom" ref="accountFrom" class="demo-form-inline">
					<el-row>
						<el-col :span="24">
							<el-form-item label="档案室名称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="简称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.nickName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="使用单位名称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.unitName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="单位联系人电话" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注">
								<el-input placeholder="请输入" v-model="accountFrom.remark"></el-input>
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
						编辑档案室
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancelAmend" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form label-width="120px" :model="amendInfo" :rules="ruleaccountFrom" ref="amendInfo" class="demo-form-inline">
					<el-row>
						<el-col :span="24">
							<el-form-item label="档案室名称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="简称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.nickName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="使用单位名称" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.unitName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="单位联系人电话" prop="join_code">
								<el-input placeholder="请输入" v-model="accountFrom.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注">
								<el-input placeholder="请输入" v-model="accountFrom.remark"></el-input>
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
				//展示出来的数据
				data: [
					{
						nickName:"wxf12",
						name:"测试档案",
						unitName:"测试的使用单位",
						phone:"18888888888"
					}
				], 
				//添加时候的提交数据
				accountFrom: {
					nickName:"wxf12",
					name:"测试档案",
					unitName:"测试的使用单位",
					phone:"18888888888",
					remark:"",
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
					nickName:"wxf12",
					name:"测试档案",
					number:"12234",
					unitName:"测试的使用单位",
					phone:"18888888888",
					remark:"",
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
			// let str = sessionStorage.getItem('permission');
			// let permission = str.split(',');
			// this.permission = permission;
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
			// 跳转到用户管理的页面
			seemaster(){
				this.$router.push({
					path:"/user"
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
			width: 550px;
			height: 450px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -225px;
			margin-left: -275px;
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
			// width: 300px;
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