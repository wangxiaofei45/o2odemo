<!-- 平台的组织架构列表 -->
<template>
	<div class="container">
		<el-button v-show="permission.indexOf('82') != -1" type="primary" @click="addOrganization">
			<svg-icon icon-class="add" style="margin-right: 10px;" />新增组织
		</el-button>
		<el-row class="title" style="font-size: 16px;">
			平台组织
		</el-row>
		<!--default-expand-all 是否全部展开-->
		<el-tree :props="props1" node-key="index" :load="loadNode1" lazy :render-content="renderContent" style="margin-left: 50px;">
		</el-tree>
		<el-row class="title" style="font-size: 15px;">
			渠道组织
		</el-row>
		<el-tree :props="defaultProps" :data="treeData2" node-key="index2" lazy :load="loadNode2" style="margin-left: 50px;">
		</el-tree>
		<!--添加组织-->
		<div class="model" v-show="model == 1">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增组织
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancelOrganization('new_info')"  name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="100px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="组织名称" prop="name">
								<el-input v-model="new_info.name" style="width: 780px;"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton" align="center" style="margin-top: 50px;">
							<el-button @click="cancelOrganization('new_info')" name="cancel">取消</el-button>
							<el-button type="primary" @click="sureOrganization('new_info')">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--组织下面新增成员-->
		<div class="junior_model" v-show="model == 2">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增成员
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_member_model('junior_info')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="junior_info" ref="junior_info" :rules="junior_inforules" label-width="120px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="上级组织" prop="oid">
								<el-input v-model="junior_info.oid" v-show="false"></el-input>
								<el-input v-model="junior_role_name" style="width: 760px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input placeholder="请输入" v-model="junior_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机" prop="phone">
								<el-input placeholder="请输入" v-model="junior_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input placeholder="请输入" type="password" v-model="junior_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="password_two">
								<el-input placeholder="请输入" type="password" v-model="junior_info.password_two"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="junior_info.sex" placeholder="请选择">
									<el-option label="女" value="0">
									</el-option>
									<el-option label="男" value="1">
									</el-option>
									<el-option label="保密" value="2">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="idcard">
								<el-input placeholder="请输入" v-model="junior_info.idcard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设置权限">
								<el-select v-model="select" multiple placeholder="请选择">
									<el-option v-for="item in options" :key="item.role_name" :label="item.role_name" :value="item.id">
									</el-option>
								</el-select>
								<el-button type="text" @click="open_check_group">
									<i class="el-icon-circle-plus" style="font-size: 20px;"></i>
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton" align="center">
							<el-button @click="cancel_member_model('junior_info')" name="cancel">取消</el-button>
							<el-button type="primary" @click="sureJunior('junior_info')">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--修改用户信息-->
		<div class="junior_model" v-show="model == 3">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						编辑信息
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amend_model" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form  :model="amend_info" ref="amend_info" :rules="amend_inforules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="amend_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机" prop="phone">
								<el-input  placeholder="请输入" v-model="amend_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input placeholder="请输入" type="password" v-model="amend_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="password_two">
								<el-input placeholder="请输入" type="password" v-model="amend_info.password_two"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="性别" prop="sex">
								<el-select v-model="amend_info.sex" placeholder="请选择">
									<el-option v-for="item in sexOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="idcard">
								<el-input placeholder="请输入" v-model="amend_info.idcard"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设置权限" prop="permission">
								<el-select v-model="amendSelect" multiple placeholder="请选择">
									<el-option v-for="item in options" :key="item.role_name" :label="item.role_name" :value="item.id">
									</el-option>
								</el-select>
								<el-button type="text" @click="open_check_group">
									<i class="el-icon-circle-plus" style="font-size: 20px;"></i>
								</el-button>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row class="show_list" v-show="show_list_1">
						<el-input style="width: 200px;" placeholder="新增权限组名称"></el-input>
						<el-row class="check_group">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in city" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-row>
					<el-row>
						<el-col :span="24" class="bottomButton" align="center">
							<el-button @click="cancel_amend_model" name="cancel">取消</el-button>
							<el-button type="primary" @click="sureAmend('amend_info')">保存</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
	let id = 1000;
	const cityOptions = ['上海', '北京', '广州', '深圳'];

	function coppyArray(arr) {
		return arr.map((e) => {
			if(typeof e === 'object') {
				return Object.assign({}, e);
			} else {
				return e;
			}
		})
	};

	function objDeepCopy(source) {
		var sourceCopy = {};
		for(var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
		return sourceCopy;
	}
	export default {
		data() {
			return {
				permission:[],
				props1: {
					label: 'name',
					children: 'zones',
					isLeaf: 'leaf'
				},
				model: 0, //新增组织
				show_list_1: false, //新增的下级
				//下面的选择
				checkAll: false,
				checkedCities: ['上海', '北京'],
				city: cityOptions,
				isIndeterminate: true,
				//2级新增
				members_model: false,
				amend_model: false,
				defaultProps: {
					label: 'name',
					children: 'zones',
					isLeaf: 'leaf'
				},
				treeData1: [], //树形图
				treeData2: [],
				junior_role_name: "",
				//新增组织名称
				new_info: {
					name: '',
				},
				new_inforules: {
					name: [{
						required: true,
						message: '名称为空',
						trigger: 'blur'
					}],
				},
				options: [], //选择添加的权限组
				//性别选择
				sexOptions:[
					{
				        value: 0,
				        label: '女'
				    },
				    {
				        value: 1,
				        label: '男'
				     },
				     {
				        value: 2,
				        label: '保密'
				      }
				],
				//新增成员
				junior_info: {
					oid: '', //上级id
					role_id: '', //权限组的id
					phone: '', //手机
					name: '', //姓名
					idcard: '', //身份证
					password: '', //密码
					password_two: '', //确认密码
					sex: '', //性别
				},
				select: [], //选择的权限
				amendSelect:[],//修改的选择
				// 新增成员验证
				junior_inforules: {
					oid: [{
						required: true,
						message: '上级名称为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '手机号为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '姓名为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码为空',
						trigger: 'blur'
					}],
					password_two: [{
						required: true,
						message: '请确认密码',
						trigger: 'blur'
					}],
//					sex: [{
//						required: true,
//						message: '请选择性别',
//						trigger: 'change'
//					}],
					role_id:[{
						required: true,
						message: '请选择权限',
						trigger: 'blur'
					}]
				},
				// 修改时候的验证
				amend_info: {
					role_id: '', //权限组的id
					phone: '', //手机
					name: '', //姓名
					idcard: '', //身份证
					password: '', //密码
					password_two: '', //确认密码
					sex: '', //性别
				},
				// 新增成员验证
				amend_inforules: {
					oid: [{
						required: true,
						message: '上级名称为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '手机号为空',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '姓名为空',
						trigger: 'blur'
					}],
//					password: [{
//						required: true,
//						message: '密码为空',
//						trigger: 'blur'
//					}],
//					password_two: [{
//						required: true,
//						message: '请确认密码',
//						trigger: 'blur'
//					}],
//					sex: [{
//						required: true,
//						message: '请选择性别',
//						trigger: 'change'
//					}]
				},
			}
		},
		created() {
			this.ajaxjson();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			//点击事件 的懒加载
			loadNode1(node, resolve) {
				if(node.level === 0) {
					let postData = {
						page: 1,
					};
					this.$post(this.$platformList, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = JSON.parse(JSON.stringify(data.data));
							let data1 = [];
							data1.push(datas[0]);
							return resolve(data1);
						} else {}
					});
				}
				// 请求平台下面的组织
				if(node.level == 1) {
					let postData = {
						id: node.data.id
					}
					this.$post(this.$platformChildrenList, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = JSON.parse(JSON.stringify(data.data));
							resolve(datas);
						} else {

						}
					});
					return resolve([]);
				} else if(node.level == 2) {
					// 请求组织下面的成员
					let postData = {
						id: node.data.id,
					}
					this.$post(this.$platformOrgUser, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = JSON.parse(JSON.stringify(data.data));
							for(var i = 0; i < datas.length; i++) {
								// 添加没有下一级
								datas[i].leaf = true;
							}
							resolve(datas);
						} else {

						}
					});
				}
			},
			//懒加载渠道组织
			loadNode2(node, resolve) {
				if(node.level === 0) {
					let postData = {
						page: 1,
					};
					this.$post(this.$platformList, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = JSON.parse(JSON.stringify(data.data));
							let data1 = [];
							data1.push(datas[0]);
							return resolve(data1);
						} else {}
					});
				}else{
					let postData = {
						id: node.data.id
					}
					this.$post(this.$platformChildrenList, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = JSON.parse(JSON.stringify(data.data));
							resolve(datas);
						} else {

						}
					});
					return resolve([]);
				}
			},
			//首次的默认的请求
			ajaxjson() {
				let postData = {
					page: 1,
				};
				this.$post(this.$platformList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						let datas = JSON.parse(JSON.stringify(data.data));
						let data1 = [];
						let data2 = [];
						data1.push(datas[0]);
						data2.push(datas[1]);
						this.treeData1 = data1;
						this.treeData2 = data2;
					} else {

					}
				});
			},
			//打开新增组织
			addOrganization() {
				this.model = 1;
			},
			//取消新增组织
			cancelOrganization(e) {
				this.model = 0;
				this.$refs[e].resetFields();
			},
			//确定提交平台下面新增组织
			sureOrganization(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						//新增之后的操作
						let postData = this.new_info;
						this.$post(this.$platformAddGroup, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.model = 0;
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.$router.go(0);
								this.$refs[e].resetFields();
								this.ajaxjson();
							} else {
								this.$message.error(res.message);
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//平台组织下面添加成员
			open_junior_model(data) {
				this.model = 2;
				this.junior_role_name = data.label;
				this.junior_info.oid = data.id;
				this.getRoleGroup();
			},
			//获取平台的权限组
			getRoleGroup(){
				this.$post(this.$platformRoleGroup).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options = data.data;
					} else {

					}
				});
			},
			cancel_junior_model() {
				this.model = 0;
			},
			//跳转到新增权限
			open_check_group() {
				this.$router.push({
					path: 'permissionSetting'
				})
			},
			sureJunior(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let select = coppyArray(this.select);
						let postData = this.junior_info;
						postData.role_id = select.join(',');
						this.$post(this.$platformAddUser, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.model = 0;
								this.$message({
									message: data.message,
									type: 'success'
								});
								this.$refs[e].resetFields();
								this.$router.go(0);
								this.ajaxjson();
								this.model = 0;
								
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
			//全选
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			//二级菜单添加
			open_member_model() {
				this.model = 2;
			},
			cancel_member_model(e) {
				this.$refs[e].resetFields();
				this.model = 0;
			},
			//修改
			open_amend_model(e) {
				let postData = {
					id: e.id
				};
				//获取平台的全部权限
				this.getRoleGroup();
				this.$post(this.$platformGetOrgMember, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.model = 3;
						this.amend_info = data.data;
						let arr = data.data.user_role;
						let newArr = [];
						for(let i= 0;i<arr.length;i++){
							newArr.push(arr[i].role_id);
						}
						this.amendSelect = newArr;
						
					} else {
						this.$message.error(data.message);
					}
				});
			},
			//取消
			cancel_amend_model() {
				this.model = 0;
			},
			//确认修改用户的信息
			sureAmend(e){
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = objDeepCopy(this.amend_info);
						let arr = coppyArray(this.amendSelect);
						postData.role_id = arr.join(",");
						delete postData.user_role;
						this.$post(this.$platformEditOrgMember, postData).then((res) => {
							let data = res;
							if(data.status_code == 0) {
								this.$message({
									type: 'success',
									message: data.message,
								});
								this.ajaxjson();
								this.model = false;
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
			//自定义的样式表
			renderContent(h, {
				node,
				data,
				store
			}) {
				return h('span', {
					style: {},
					//这里添加hover事件
					on: {
						'mouseenter': () => {
							data.is_show = true;
						},
						//鼠标离开
						'mouseleave': () => {
							data.is_show = false;
						}
					}
				}, [
					// 显示的名字
					h('span', {
						style: {
							color: "#333",
							fontSize:"14px"
						},
					}, data.name),

					h('span', {
						style: {
							display: data.is_show ? '' : 'none',
						},
					}, [
						//第一级点击添加
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: !data.pid&&this.permission.indexOf('84') != -1 ? 'none' : '',
								width: '14px',
								height: '14px',
								padding: "0px",
								backgroundImage: "url(" + require("../../../static/img/icon_add_people.svg") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									console.log(node);
									this.open_junior_model(data);
								}
							}
						}, ''),

						//用户的修改
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.phone&&this.permission.indexOf('89') != -1? '' : 'none',
								width: '14px',
								height: '14px',
								padding: "0px",
								backgroundImage: "url(" + require("../../../static/img/icon_edit_group.svg") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									this.open_amend_model(data)
								}
							}
						}, ""),
						// 删除组织
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.pid == 15&&this.permission.indexOf('89') != -87? '' : 'none',
								width: '14px',
								height: '14px',
								padding: "0px",
								backgroundImage: "url(" + require("../../../static/img/icon_del_group.svg") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									let postData = {
										oid: data.id,
									}
									this.$post(this.$platformDelOrg, postData).then((res) => {
										let data = res;
										if(data.status_code == 0) {
											this.$message({
												type: 'success',
												message: data.message,
											});
											this.ajaxjson();
											this.$router.go(0);
										} else {
											this.$message({
												type: 'error',
												message: data.message,
											});
										}
									});

								}
							}
						}, ""),
						// 删除成员
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.phone&&this.permission.indexOf('88') != -1? '' : 'none',
								width: '14px',
								height: '14px',
								padding: "0px",
								backgroundImage: "url(" + require("../../../static/img/icon_del_group.svg") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									let postData = {
										id: data.id,
									}
									this.$post(this.$platformDelreMember, postData).then((res) => {
										let data = res;
										if(data.status_code == 0) {
											this.$message({
												type: 'success',
												message: data.message,
											});
											this.ajaxjson();
											this.$router.go(0);
										} else {
											this.$message({
												type: 'error',
												message: data.message,
											});
										}
									});

								}
							}
						}, ""),
					]),
				]);
			},

		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		margin: 25px;
	}
	
	.title {
		border-left:2px solid #18CCBA;
		padding-left: 20px;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	/*新增组织*/
	.model {
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.4);
		.model_con {
			width: 960px;
			height: 260px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -130px;
			margin-left: -480px;
			border-radius: 15px;
			.model_title {
				border-bottom: 1px solid #d6d6d6;
				margin-bottom: 20px;
				padding-bottom: 20px;
			}
		}
	}
	/*新增下级组织*/
	
	.junior_model {
		position: absolute;
		left: 0px;
		top: 0px;
		right: 0px;
		bottom: 0px;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.4);
		.model_con {
			width: 960px;

			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -220px;
			margin-left: -400px;
			border-radius: 15px;
			.model_title {
				border-bottom: 1px solid #d6d6d6;
				padding-bottom: 20px;
				margin-bottom: 20px;
			}
		}
		.el-input{
			width: 300px;
		}
		.el-select{
			min-width: 300px;
		}
		.show_list {
			border: 1px solid #E0E0E0;
			padding: 25px;
			margin-bottom: 25px;
			.check_group {
				margin-top: 20px;
				padding-bottom: 20px;
				border-bottom: 1px dashed #E0E0E0;
			}
		}
	}
</style>