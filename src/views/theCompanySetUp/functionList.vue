<!--平台的功能列表 -->
<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div class="title">
        <el-button v-show="permission.indexOf('78') != -1" type="primary" @click="open_newInfo">新增</el-button>
      </div>
      <el-table :data="data_1" style="width: 100%">
        <el-table-column prop="id" label="Id" width="180">
        </el-table-column>
        <el-table-column prop="name" label="功能名称">
        	<template slot-scope="scope">
							<span style="color: #18CCBA;cursor:pointer;" @click="goToSeeOrModify(scope.row.id)">{{scope.row.name}}</span>
						</template>
        </el-table-column>
        <el-table-column prop="url" label="URL">
        </el-table-column>
        <el-table-column prop="remark" label="描述">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button v-show="permission.indexOf('79') != -1" size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row)">修改</el-button>
            <el-button v-show="permission.indexOf('80') != -1" size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tabs>
    <div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
		</div>
    <!--新增权限-->
    <div class="model" v-show="function_model">
      <div class="model_con">
        <el-row class="model_title" align="bottom">
          <el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
            新增
          </el-col>
          <el-col :span="4" :offset="12" style="text-align: right;">
            <el-button type="text" @click="cancel_newInfo">
              <svg-icon icon-class="cancel" />
            </el-button>
          </el-col>
        </el-row>
        <el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="功能分类">
                <el-select v-model="selectValue1" placeholder="请选择" @change="select_1">
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="selectValue2" placeholder="请选择" @change="select_2">
                  <el-option v-for="item in options2" :key="item.value" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="功能名称" prop="name">
                <el-input v-model="new_info.name" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="URL">
                <el-input v-model="new_info.url" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="new_info.remark" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button @click="cancel_newInfo">取消</el-button>
              <el-button type="primary" @click="submitForm('new_info')">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--修改列表-->
    <div class="model" v-show="function_amend_model">
      <div class="model_con">
        <el-row class="model_title" align="bottom">
          <el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
            修改权限
          </el-col>
          <el-col :span="4" :offset="12" style="text-align: right;">
            <el-button type="text" @click="cancel_amend_newInfo">
              <svg-icon icon-class="cancel" />
            </el-button>
          </el-col>
        </el-row>
        <el-form :model="amend_info" ref="amend_info" :rules="amend_inforules" label-width="100px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="功能名称" prop="name">
                <el-input v-model="amend_info.name" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="URL">
                <el-input v-model="amend_info.url" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="amend_info.remark" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button style="width:90px;height:40px" @click="cancel_amend_newInfo">取消</el-button>
              <el-button style="width:90px;height:40px" type="primary" @click="submitamendForm('amend_info')">保存</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		data() {
			return {
				permission:[],
				page: 1, //分页
				total: 0,
				per_page: 10,
				checkAll: false,
				checkedCities: ['上海', '北京'],
				cities: cityOptions,
				isIndeterminate: true,
				activeName: 'second',
				function_model: false, //
				function_amend_model: false, //模板列表修改
				data_1: [], //权限设置列表table
				options:[], //新增功能时候的一级选择
				options2:[],//新增的时候选择二级的选择
				selectValue1:'000',//第一级选择
				selectValue2:'',//第二级选择
				new_info: {
					type:'',//添加type
					name: '', //新增功能name
					url:'',//路径
					id:'',//id
					remark:'',//描述
				},
				new_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
				//修改模板信息
				amend_info: {
					name: '',
					remark: '',
					url: '',
					id:'',
				},
				//规则
				amend_inforules: {
					name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
			};
		},
		//页面创建完成后
		created() {
			this.ajaxjson(); //请求模板列表的数据
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//获取权限设置列表
			ajaxjson() {
				let datas = {
					page:this.page,
					per_page:this.per_page,
				};
				this.$post(this.$moduleList,datas).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data.data;
						this.options = data.data.data;
						this.total = data.data.total;
					} else {
						
					}
				});
			},
			goToSeeOrModify(e){
				let datas = {
					page:this.page,
					per_page:this.per_page,
					id:e,
				};
				this.$post(this.$moduleList,datas).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data_1 = data.data.data;
						this.options = data.data.data;
						this.total = data.data.total;
					} else {
						
					}
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
			handleClick(tab, event) {},
			// 全选
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			//表格删除用户删除操作
			deletes(e) {
				let data = {
					id:e,
				}
				this.$delete(this.$moduleDel,data)
			},
			//新增权限model显示
			open_newInfo() {
				this.function_model = true;
			},
			select_1(){
				// 选择的第一级请求下面的列表
				let datas = {page:1,id:this.selectValue1};
				this.$post(this.$moduleList,datas).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options2 = data.data;
						this.selectValue2 = '';
					} else {}
				});
			},
			//选择上一级时候下一级的选择
			select_2(){
				// console.log(this.selectValue2);
			},
			//新增权限model
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						let type = '';
						if(!this.selectValue1){
							type = "0";
							postData.id = '';
						}else if(this.selectValue1&&!this.selectValue2){
							type = '1';
							postData.id = this.selectValue1;
						}else{
							type = '2';
							postData.id = this.selectValue1 +','+this.selectValue2;
						}
						postData.type = type;
						this.$post(this.$moduleAdd, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_model = false;
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
			// 打开修改权限列表
			amend(e) {
				this.amend_info.name = e.name;
				this.amend_info.remark = e.remark;
				this.amend_info.url = e.url;
				this.amend_info.id = e.id;
				this.function_amend_model = true;
			},
			//修改权限列表
			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let data  = this.amend_info;
						this.$post(this.$moduleEdit,data).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.function_amend_model = false;
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
			//取消添加新的用户
			cancel_newInfo() {
				this.function_model = false;
			},

			//取消保存用户信息
			cancel_amend_newInfo() {
				this.function_amend_model = false;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		},
	};
</script>
<style type="text/css" scoped>
.container {
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
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -300px;
  border-radius: 8px;
  background-color: #FFF;
  padding: 20px;
  box-sizing: border-box;

}

.model_title {
  border-bottom: 1px solid #d6d6d6;
  margin-bottom: 20px;
}

.check_group {
  padding: 20px;
  border: 1px solid #E0E0E0;
  margin-bottom: 20px;
}

.check_group_con {
  margin-top: 20px;
  border-bottom: 1px dashed #E0E0E0;
  padding-bottom: 25px;
}

</style>
