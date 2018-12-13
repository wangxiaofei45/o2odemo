<!--收银盘点-->
<template>
	<div class="tab-container">
		<div class="title">
			<el-row>
				<el-col :span="24">
					<el-button type="primary" @click="exportExcel"><i class="erp-icon-export"></i>导出</el-button>
				</el-col>
			</el-row>
		</div>
		<el-table :data="data" stripe border show-summary style="width: 100%;" size="mini" @selection-change="SelectionChange">
			<el-table-column type="selection" width="40" align="center">
			</el-table-column>
			<el-table-column prop="brand_id" label="序号" width="100" align="center">
			</el-table-column>
			<el-table-column prop="brand_name" width="100" label="货号" align="center">
			</el-table-column>
			<el-table-column prop="brand_class" width="100" label="商品" align="center">
			</el-table-column>
			<el-table-column prop="brand_introduction" label="总数量">
			</el-table-column>
			<el-table-column prop="brand_sort" width="100" label="总金额">
			</el-table-column>
			<el-table-column prop="brand_apply" width="100" label="审核是否通过">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row.brand_id)">修改</el-button>
					<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--新增品牌分类-->
		<div class="model" v-show="new_info_model">
			<div class="model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增品牌
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
							<el-form-item label="分类id" prop="class_id">
								<el-input v-model="new_info.class_id" v-show="false"></el-input>
								<el-cascader :options="options" change-on-select @change="select_class_id"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="品牌名称" prop="brand_name">
								<el-input v-model="new_info.brand_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类名称" prop="brand_class">
								<el-input v-model="new_info.brand_class"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="描述" prop="brand_introduction">
								<el-input v-model="new_info.brand_introduction"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="排序数值" prop="brand_sort">
								<el-input v-model="new_info.brand_sort"></el-input>
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
						修改品牌分类
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
							<el-form-item label="分类id" prop="class_id">
								<el-input v-model="amend_info.class_id" v-show="false"></el-input>
								<el-cascader :options="options" v-model="defaultOption" change-on-select @change="select_class_id"></el-cascader>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="品牌名称" prop="brand_name">
								<el-input v-model="amend_info.brand_name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类名称" prop="brand_class">
								<el-input v-model="amend_info.brand_class"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="描述" prop="brand_introduction">
								<el-input v-model="amend_info.brand_introduction"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="排序数值" prop="brand_sort">
								<el-input v-model="amend_info.brand_sort"></el-input>
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
				editVisible: false,
				delVisible: false,
				idx: -1,
				customer_id: '',
				//新添加表格数据
				new_info: {
					class_id: '', //分类id
					brand_name: '123', //[品牌名称]
					brand_class: '', //分类名称
					brand_introduction: '', //描述
					brand_sort: '', //排序数值
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
				defaultOption: [], //修改信息时候的显示出来的默认值
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
					page: 1,
				};
				//调用post请求方法
				this.$post("/brand/list", postData).then((res) => {
					console.log(res)
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//打开新增添加 用户
			open_newInfo() {
				//获取添加品牌分类的信息
				this.get_options();
				this.new_info_model = true;
			},
			//获取商品分类列表
			get_options() {
				this.$post("/goodsclass/addlist", ).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options = data.data;
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
				// this.$refs[e].validate((valid) => {
				// 	if(valid) {
				// 		let postData = this.new_info;
				// 		if(postData.class_id == '') {
				// 			postData.class_id = "0";
				// 		};
				// 		this.$post("/brand/add", postData).then((res) => {
				// 			let data = res;
				// 			if(data.status_code == 0) {
				// 				this.$message({
				// 					type: 'success',
				// 					message: data.message,
				// 				});
				// 				this.ajaxjson();
				// 				this.new_info_model = false;
				// 			} else {
				// 				this.$message({
				// 					type: 'error',
				// 					message: data.message,
				// 				});
				// 			}
				// 		});
				// 	} else {
				// 		console.log('error submit!!');
				// 		return false;
				// 	}
				// });
			},
			//修改顾客信息
			amendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						postData.role_id = postData.id;
						postData.name = postData.role_name;
						delete postData.role_name;
						this.$post("/goodsclass/modify", postData).then((res) => {
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
			//选择改变时就触发改变
			select_class_id(e) {
				this.options_data = e;
				//pop()方法出现问题,采用获取数组最后一位的方法
				this.new_info.class_id = e[e.length - 1];
			},
			//取消添加新的用户
			cancel_newInfo() {
				this.new_info_model = false;
			},
			cancel_amendInfo() {
				this.amend_info_model = false;
			},
			// 导出Excel
			exportExcel () {
				/* generate workbook object from table */
				var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
				/* get binary string as output */
				var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
				try {
					FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
				} catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
				return wbout
			},
			//重置表单
				resetForm(formData) {
        // 	this.$nextTick(function() {
        //   	this.$refs[formData].resetFields();
		//  })
			if (this.$refs.formData!==undefined) {
				this.$refs.formData.resetFields();
			}
		  },
		  // 删除一行
			 handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
		},
			 // 确定删除
        deleteRow(){
                this.data.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
		},
		 handleEdit(index, row) {
                this.idx = index;
                const item = this.data[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
        },
			//修改名称
			amend(e) {
				//重新获取商品的信息
				this.get_options();
				let postData = {
					brand_id: e,
				};
				this.$post("/brand/info", postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.amend_info = data.data;
						let str = data.data.gc_parent_str;
						let arr = str.split('->');
						let new_arr = [];
						//选择默认的选择的一定要和options对应的类型保持一致
						for(let i = 0; i < arr.length; i++) {
							new_arr.push(Number(arr[i]));
						}
						this.defaultOption = new_arr;
						this.amend_info_model = true; //选择级显示
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
					arrays.push(val[i].brand_id);
				};
				this.multipleSelection = arrays;
			},
			//多选删除
			muchDelete() {
				this.$delete("/brand/delete", {
					brand_id: this.multipleSelection.join(',')
				});
			},
			//单个删除
			deletes(e) {
				this.$delete("/brand/delete", {
					brand_id: e + '',
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