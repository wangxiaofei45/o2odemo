<!--商品类型-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="12">
					<el-button type="primary" @click="open_newInfo">添加</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="danger" @click="muchDelete()">删除</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table :data="data" stripe border style="width: 100%;" size="mini" @selection-change="SelectionChange">
			<el-table-column type="selection" width="40" align="center">
			</el-table-column>
			<el-table-column prop="gc_id" label="商品分类ID" width="100" align="center">
			</el-table-column>
			<el-table-column prop="gc_name" width="100" label="分类名称" align="center">
			</el-table-column>
			<el-table-column prop="gc_sort" width="100" label="排序数值" align="center">
			</el-table-column>
			<el-table-column prop="gc_description" label="描述">
			</el-table-column>
			<el-table-column prop="disabled" width="100" label="是否显示">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row.gc_id)">修改</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.gc_id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--新增商品分类-->
		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增商品分类
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_newInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="80px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="分类" prop="gc_parent_id">
								<el-input v-model="new_info.gc_parent_id" v-show="false"></el-input>
								<el-cascader :options="options" change-on-select @change="select_gc_parent_id"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类名称" prop="gc_name">
								<el-input v-model="new_info.gc_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="描述" prop="gc_description">
								<el-input v-model="new_info.gc_description"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="排序数值" prop="gc_sort">
								<el-input v-model="new_info.gc_sort"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="反比" prop="commis_rate">
								<el-input-number v-model="new_info.commis_rate" controls-position="right" :min="0" :max="100"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否允许发布虚拟商品" prop="gc_virtual">
								<el-radio-group v-model="new_info.gc_virtual">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否显示" prop="disabled">
								<el-radio-group v-model="new_info.disabled">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="submitForm('new_info')">保存</el-button>
							<el-button @click="resetForm('new_info')">重置</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--修改客户信息-->
		<div class="model" v-show="amend_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						修改商品分类
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amendInfo">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="amend_info" ref="amend_info" :rules="new_inforules" label-width="80px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="分类" prop="gc_parent_id">
								<el-input v-model="amend_info.gc_parent_id" v-show="false"></el-input>
								<el-cascader :options="options" change-on-select @change="select_gc_parent_id"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类名称" prop="gc_name">
								<el-input v-model="amend_info.gc_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="描述" prop="gc_description">
								<el-input v-model="amend_info.gc_description"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="排序数值" prop="gc_sort">
								<el-input v-model="amend_info.gc_sort"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="反比" prop="commis_rate">
								<el-input-number v-model="amend_info.commis_rate" controls-position="right" :min="0" :max="100"></el-input-number>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否允许发布虚拟商品" prop="gc_virtual">
								<el-radio-group v-model="amend_info.gc_virtual">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="是否显示" prop="disabled">
								<el-radio-group v-model="amend_info.disabled">
									<el-radio :label="0">否</el-radio>
									<el-radio :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="amendForm('amend_info')">保存</el-button>
							<el-button @click="resetForm('amend_info')">重置</el-button>
						</el-form-item>
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
				data: [], //表格数据
				new_info_model: false,
				amend_info_model: false,
				customer_id: '',
				//新添加表格数据
				new_info: {
					gc_parent_id: '', //required[第一级为0]
					gc_name: '123', //Stringrequired[商品名称]
					commis_rate: '', //Numberrequired[between: 0, 100 返比]
					gc_sort: '', //Number排序数值
					gc_virtual: '', //Numberrequired[ in (0, 1)] 是否允许发布虚拟商品(0 否 1 是)
					gc_description: '', //String描述
					disabled: '', //Numberrequired[ in (0, 1)] 是否显示(0 否 1 是)
				},
				amend_info: {}, //修改顾客信息
				//绑定新增表单验证规则
				new_inforules: {
					role_name: [{
						required: true,
						message: '名字不能为空',
						trigger: 'blur'
					}],
				},
				options: [], //请求到并替换掉
				options_data: [], //获取最终的选择的值
			}
		},
		//页面加载之前
		created() {
			this.ajaxjson(); //请求顾客数据
		},
		//计算属性
		computed: {},
		//方法
		methods: {
			//请求数据
			ajaxjson() {
				let postData = {
					gc_id: 0,
					page: 1,
				};
				//调用post请求方法
				this.$post(this.$GoodClassList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//打开新增添加 用户
			open_newInfo() {
				//获取添加商品分类的信息
				this.$post(this.$GoodClassAddList, ).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options = data.data;
						this.new_info_model = true;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			//添加数据
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						if(postData.gc_parent_id == '') {
							postData.gc_parent_id = "0";
						};
						this.$post(this.$GoodClassAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.new_info_model = false;
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
			//修改顾客信息
			amendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						postData.role_id = postData.id;
						postData.name = postData.role_name;
						delete postData.role_name;
						this.$post(this.$GoodClassModify, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.amend_info_model = false;
								this.ajaxjson();
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
			//点击进入下一级查看商品信息
			show_good(e) {
				let postData = {
					gc_id: e,
				}
				this.$post(this.$GoodClassInfo, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {

					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			//选择改变时就触发改变
			select_gc_parent_id(e) {
				this.options_data = e;
				//pop()方法出现问题,采用获取数组最后一位的方法
				this.new_info.gc_parent_id = e[e.length - 1];
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.new_info_model = false;
			},
			cancel_amendInfo() {
				this.amend_info_model = false;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//修改名称
			amend(e) {
				let postData = {
					gc_id: e,
				};
				this.$post(this.$GoodClassInfo, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.amend_info = data.data;
						this.amend_info_model = true;
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
					}
				});
			},
			//多选操作取值id
			SelectionChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
			},
			//多选删除
			muchDelete() {
				this.$delete(this.$GoodClassDelete, {
					gc_id: this.multipleSelection.join(',')
				});
			},
			//单个删除
			deletes(e) {
				this.$delete(this.$GoodClassDelete, {
					gc_id: e + '',
				});
			},

		}
	}
</script>
<style scoped>
	.title {
		margin-bottom: 15px;
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