<!-- 平台的权限设置 -->
<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div class="title">
        <el-button v-show="permission.indexOf('73') != -1" type="primary" @click="open_newInfo">新增权限</el-button>
      </div>
      <el-table :data="data_1" style="width: 100%">
        <el-table-column prop="id" label="Id" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="权限组">
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button v-show="permission.indexOf('74') != -1" size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row)">修改</el-button>
            <el-button v-show="permission.indexOf('76') != -1" size="mini" type="danger" icon="el-icon-delete" @click="deletes(scope.row.id)">删除</el-button>
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
            新增权限
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
              <el-form-item label="权限组名称" prop="role_name">
                <el-input v-model="new_info.role_name" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="check_group">
            <el-checkbox-group v-model="checkList">
              <el-row v-for="(item,index) in checkGroup" :key="item.id">
                <el-checkbox style="margin:15px 0px" :label="item.id" @change="check1(item)">{{item.name}}</el-checkbox>
                <el-row v-if="item.children" style="margin:15px 0px;padding-left:25px">
                  <el-checkbox v-for="j in item.children" :key="j.id" :label="j.id" @change="check2(j)">{{j.name}}</el-checkbox>
                </el-row>
              </el-row>
            </el-checkbox-group>
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
    <!--模板列表-->
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
              <el-form-item label="权限组名称" prop="role_name">
                <el-input v-model="amend_info.role_name" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="check_group">
           <el-checkbox-group v-model="anemdCheckList">
              <el-row v-for="(item,index) in checkGroup" :key="item.id">
                <el-checkbox style="margin:15px 0px" :label="item.id" @change="check3(item)">{{item.name}}</el-checkbox>
                <el-row v-if="item.children" style="margin:15px 0px;padding-left:25px">
                  <el-checkbox v-for="j in item.children" :key="j.id" :label="j.id" @change="check3(j)">{{j.name}}</el-checkbox>
                </el-row>
              </el-row>
            </el-checkbox-group>
          </el-row>
          <el-row>
            <el-form-item>
              <el-button type="primary" @click="submitamendForm('amend_info')">保存</el-button>
              <el-button @click="resetForm('amend_info')">重置</el-button>
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
				page: 1, //分页
				total: 0,
				per_page: 10,
				permission:[],
				checkAll: false,
				checkedCities: ['上海', '北京'],
				cities: cityOptions,
				isIndeterminate: true,
				activeName: 'second',
				function_model: false, //
				function_amend_model: false, //模板列表修改

				data_1: [], //权限设置列表table
				checkGroup:[],//新增权限时候的checkgroup
				checkList:[],//多选框选择后的值
				anemdCheckList:[],//多选的时候默认选择到的
				new_info: {
					role_name: '', //新增权限的name
					allId:'',
				},
				new_inforules: {
					role_name: [{
						required: true,
						message: '模块名称为空',
						trigger: 'blur'
					}],
				},
				//修改模板信息
				amend_info: {
					role_id:'',
					role_name: 'dsada', //新增权限的name
					allId:'',
				},
				//规则
				amend_inforules: {
					role_name: [{
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
				let postData = {
					page: this.page,
					per_page: this.per_page,
				};
				this.$post(this.$groupList,postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.total = data.data.total;
						this.data_1 = data.data.data;
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
					role_id:e,
				}
				this.$delete(this.$groupDel,data)
			},
			//新增权限model显示
			open_newInfo() {
				this.function_model = true;
				//获取结点权限
				this.$post(this.$groupAllRole).then((res) => {
					if (res.status_code == 0) {
						let that = this;
						that.checkGroup = res.data;
					}else{
						this.$message({
				          showClose: true,
				          message: res.errorMsg,
				          type: 'error'
				        });
					}
				});
			},
			// 选择后的
			check1(val){
				let str = this.checkList.join(",");
				this.new_info.allId = str;
			},
			check2(){
				let str = this.checkList.join(",");
				this.new_info.allId = str;
			},
			check3(){
				let str = this.anemdCheckList.join(",");
				this.amend_info.allId = str;
			},
			//新增权限model
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						console.log(postData);
						this.$post(this.$groupAdd, postData).then((res) => {
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
				this.amend_info.role_id = e.id;
				this.amend_info.role_name = e.role_name;
				let param = {role_id:e.id};
				this.$post(this.$groupAllRole,param).then((res) => {
					if (res.status_code == 0) {
						this.checkGroup = res.data;
						let that = this;
						let datas = res.data;
						let arr = [];
						for (var i = 0; i < datas.length; i++) {
							if(datas[i].is_hide == 1){
								arr.push(datas[i].id);
							}
							if(datas[i].children){
								for (var j = 0; j < datas[i].children.length; j++) {
									if(datas[i].children[j].is_hide == 1){
										arr.push(datas[i].children[j].id);
									}
									
								}
							}
						}
						this.anemdCheckList = arr;
						this.function_amend_model = true;
						this.amend_info.allId = arr.join(",");
						console.log(this.amend_info);
					}else{

					}
				});
			},

			//修改权限列表
			submitamendForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.amend_info;
						this.$post(this.$groupEdit, postData).then((res) => {
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
  width: 100%;
  height: 100%;
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
