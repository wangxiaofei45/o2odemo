<template>
	<!-- 档案添加与查询 -->
	<div>
		<div class="tab-container">
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button  type="primary" @click="closeAnAbccount" style="margin-right: 20px;">
							<svg-icon icon-class="add" style="margin-right: 10px;" /> <span>添加档案</span>
						</el-button>
						<el-input placeholder="档案搜索" style="width:350px;margin-right: 20px;">
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
					<el-table-column prop="number" label="编号" fixed width="60" align="center">
					</el-table-column>
					<el-table-column prop="name" label="名称" fixed width="150" align="center">
					</el-table-column>
					<el-table-column prop="sort" label="排列顺序(权重)" width="150" align="center">
					</el-table-column>
					<el-table-column prop="filebox" label="档案盒" width="100" align="center">
					</el-table-column>
					<el-table-column prop="filecabinet" label="档案柜" width="100" align="center">
					</el-table-column>
					<el-table-column prop="confidentiality" width="80" label="保密等级" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.confidentiality==1">绝密</span>
							<span v-if="scope.row.confidentiality==2">公开</span>
							<span v-if="scope.row.confidentiality==3">内部</span>
						</template>
					</el-table-column>
					<el-table-column prop="adress" label="存放位置" width="150" align="center">
					</el-table-column>
					<el-table-column prop="type" label="文档类型" width="100" align="center">
					</el-table-column>
					<el-table-column prop="readnumber" label="阅读次数" width="100" align="center">
					</el-table-column>
					<el-table-column prop="downloadnumber" label="下载次数" width="100" align="center">
					</el-table-column>
					<el-table-column prop="remake" label="备注" align="center">
					</el-table-column>
					<el-table-column label="操作" width="300" align="center">
						<template slot-scope="scope">
							<el-button @click="gotosee(scope.row)" type="primary" size="mini">查看</el-button>
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
		<!--添加档案-->
		<div class="model" v-show="PutInStorageModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						添加档案
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
							<el-form-item label="档案室" prop="fileroom">
								<el-select placeholder="请选择" v-model="accountFrom.fileroom">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案柜" prop="filecabinet">
								<el-select placeholder="请选择" v-model="accountFrom.filecabinet">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案盒" prop="filebox">
								<el-select placeholder="请选择" v-model="accountFrom.filebox">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="名称" prop="name">
								<el-input placeholder="请输入" v-model="accountFrom.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="简称" prop="nickName">
								<el-input placeholder="请输入" v-model="accountFrom.nickName"></el-input>
							</el-form-item>
						</el-col>
					
						<el-col :span="12">
							<el-form-item label="顺序" prop="sort">
								<el-input placeholder="请输入" v-model="accountFrom.sort"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="保密等级" prop="confidentiality">
								<el-select placeholder="请选择" v-model="accountFrom.confidentiality">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="年度" prop="adress">
								 <el-date-picker v-model="accountFrom.time" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="类型" prop="type">
								<el-select placeholder="请选择" v-model="accountFrom.type">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="存放位置" prop="adress">
								<el-input placeholder="请输入" v-model="accountFrom.adress"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="选择文件" prop="adress">
								<el-input placeholder="请输入" v-model="accountFrom.file"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注" prop="remark">
								<el-input type="textarea" placeholder="请输入" v-model="accountFrom.remark"></el-input>
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
		<!--编辑档案-->
		<div class="model" v-show="amendModel">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑档案
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
							<el-form-item label="档案室" prop="fileroom">
								<el-select placeholder="请选择" v-model="amendInfo.fileroom">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案柜" prop="filecabinet">
								<el-select placeholder="请选择" v-model="amendInfo.filecabinet">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="档案盒" prop="filebox">
								<el-select placeholder="请选择" v-model="amendInfo.filebox">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="编号" prop="number">
								<el-input placeholder="请输入" disabled="" v-model="amendInfo.number"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="名称" prop="name">
								<el-input placeholder="请输入" v-model="amendInfo.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="简称" prop="nickName">
								<el-input placeholder="请输入" v-model="amendInfo.nickName"></el-input>
							</el-form-item>
						</el-col>
											
						<el-col :span="12">
							<el-form-item label="顺序" prop="sort">
								<el-input placeholder="请输入" v-model="amendInfo.sort"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="保密等级" prop="confidentiality">
								<el-select placeholder="请选择" v-model="amendInfo.confidentiality">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="年度" prop="adress">
								 <el-date-picker v-model="amendInfo.time" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="类型" prop="type">
								<el-select placeholder="请选择" v-model="amendInfo.type">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="存放位置" prop="adress">
								<el-input placeholder="请输入" v-model="amendInfo.adress"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="选择文件" prop="file">
								<el-input placeholder="请输入" v-model="amendInfo.file"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="备注" prop="remark">
								<el-input type="textarea" placeholder="请输入" v-model="amendInfo.remark"></el-input>
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
						number:1,
						name:"真实姓名",
						sort:23,
						filebox:"bbs234",//档案盒
						filecabinet:"2号柜",//档案柜
						confidentiality:1,//保密等级
						adress:"室内",//存放位置
						type:1,//文档类型
						readnumber:123,//阅读次数
						downloadnumber:89,//下载次数
						remake:"备注",//备注
					},
					{
						number:1,
						name:"真实姓名",
						sort:23,
						filebox:"bbs234",//档案盒
						filecabinet:"2号柜",//档案柜
						confidentiality:2,//保密等级
						adress:"室内",//存放位置
						type:1,//文档类型
						readnumber:123,//阅读次数
						downloadnumber:89,//下载次数
						remake:"备注",//备注
					},
					{
						number:1,
						name:"真实姓名",
						sort:23,
						filebox:"bbs234",//档案盒
						filecabinet:"2号柜",//档案柜
						confidentiality:3,//保密等级
						adress:"室内",//存放位置
						type:1,//文档类型
						readnumber:123,//阅读次数
						downloadnumber:89,//下载次数
						remake:"备注",//备注
					},
				], 
				//添加时候的提交数据
				accountFrom: {
					name:"真实姓名",
					nickName:"",//简称
					sort:23,
					fileroom:"dasd",//档案室
					filebox:"bbs234",//档案盒
					filecabinet:"2号柜",//档案柜
					confidentiality:1,//保密等级
					adress:"室内",//存放位置
					file:"",//文件
					type:1,//文档类型				
					remake:"备注",//备注
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
					number:"",//编号
					name:"真实姓名",
					nickName:"",//简称
					sort:23,
					fileroom:"dasd",//档案室
					filebox:"bbs234",//档案盒
					filecabinet:"2号柜",//档案柜
					confidentiality:1,//保密等级
					adress:"室内",//存放位置
					type:1,//文档类型
					file:"",//文件
					remake:"备注",//备注
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
			// 跳转到档案查询页
			gotosee(e){
				this.$router.push({
					path:"/fileForDetails",
				})
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
			height: 550px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -450px;
			margin-top: -275px;
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
		.model_con .el-input[type='textarea'] {
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