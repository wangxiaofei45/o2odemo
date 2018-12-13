<!--组织架构列表-->
<template>
	<div class="container">
		<el-button type="primary" @click="addOrganization">
			新增组织
		</el-button>
		<el-row class="title">
			杭州领沃
		</el-row>
		<!--default-expand-all 是否全部展开-->
		<el-tree :data="data4" node-key="value"  :expand-on-click-node="false" :render-content="renderContent" :props="defaultProps" @node-click="handleNodeClick" style="margin-left: 50px;">
		</el-tree>
		<!--添加组织-->
		<div class="model" v-show="model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增组织
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="cancelOrganization">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="new_info" ref="new_info" :rules="new_inforules" label-width="120px">
					<el-row>
						<el-col :span="24">
							<el-form-item label="模块名称" prop="role_name">
								<el-input v-model="new_info.role_name"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button type="primary" @click="sureOrganization('new_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--添加下级组织及成员-->
		<div class="junior_model" v-show="junior_model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增下级组织及成员
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_junior_model">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="junior_info" ref="junior_info" :rules="junior_inforules" label-width="120px">
					<el-row>

						<el-col :span="12">
							<el-form-item label="上级组织" prop="TheSuperiorOrganization">
								<el-input v-model="junior_info.TheSuperiorOrganization"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组织名称" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
								<!--<el-select v-model="junior_info.organizationName" clearable placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="新增组织成员" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机" prop="phone">
								<el-input v-model="new_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="new_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input v-model="new_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="surePassword">
								<el-input v-model="new_info.surePassword"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="new_info.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="idCart">
								<el-input v-model="new_info.idCart"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设置权限" prop="permission">
								<!--<el-input v-model="new_info.permission"></el-input>-->
								<el-select v-model="new_info.permission" multiple placeholder="请选择">
									<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
										<span style="float: left">{{ item.label }}</span>
										<el-button type="text" style="float: right; color: #8492a6; font-size: 13px">
											删除
										</el-button>
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
						<!--选择框-->
						<el-row class="check_group">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in city" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button  @click="cancel_junior_model">取消</el-button>
							<el-button type="primary" @click="sure_junior_model('junior_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--二级-->
		<div class="junior_model" v-show="members_model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						新增成员
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_member_model">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="junior_info" ref="junior_info" :rules="junior_inforules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="上级组织" prop="TheSuperiorOrganization">
								<el-input v-model="junior_info.TheSuperiorOrganization"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组织名称" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
								<!--<el-select v-model="junior_info.organizationName" clearable placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="新增组织成员" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机" prop="phone">
								<el-input v-model="new_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="new_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input v-model="new_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="surePassword">
								<el-input v-model="new_info.surePassword"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="new_info.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="idCart">
								<el-input v-model="new_info.idCart"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设置权限" prop="permission">
								<!--<el-input v-model="new_info.permission"></el-input>-->
								<el-select v-model="new_info.permission" multiple placeholder="请选择">
									<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
										<span style="float: left">{{ item.label }}</span>
										<el-button type="text" style="float: right; color: #8492a6; font-size: 13px">
											删除
										</el-button>
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
						<!--选择框-->
						<el-row class="check_group">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in city" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button  @click="cancel_member_model">取消</el-button>
							<el-button type="primary" @click="sure_junior_model('junior_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
		<!--三级-->
		<div class="junior_model" v-show="amend_model">
			<div class="model_con">
				<el-row class="model_title" align="bottom">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						修改信息
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_amend_model">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form :model="junior_info" ref="junior_info" :rules="junior_inforules" label-width="120px">
					<el-row>
						<el-col :span="12">
							<el-form-item label="上级组织" prop="TheSuperiorOrganization">
								<el-input v-model="junior_info.TheSuperiorOrganization"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="组织名称" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
								<!--<el-select v-model="junior_info.organizationName" clearable placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>-->
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="新增组织成员" prop="organizationName">
								<el-input v-model="junior_info.organizationName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="手机" prop="phone">
								<el-input v-model="new_info.phone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="姓名" prop="name">
								<el-input v-model="new_info.name"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="密码" prop="password">
								<el-input v-model="new_info.password"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="确定密码" prop="surePassword">
								<el-input v-model="new_info.surePassword"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="邮箱" prop="email">
								<el-input v-model="new_info.email"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="身份证" prop="idCart">
								<el-input v-model="new_info.idCart"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="设置权限" prop="permission">
								<!--<el-input v-model="new_info.permission"></el-input>-->
								<el-select v-model="new_info.permission" multiple placeholder="请选择">
									<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
										<span style="float: left">{{ item.label }}</span>
										<el-button type="text" style="float: right; color: #8492a6; font-size: 13px">
											删除
										</el-button>
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
						<!--选择框-->
						<el-row class="check_group">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in city" :label="city" :key="city">{{city}}</el-checkbox>
							</el-checkbox-group>
						</el-row>
					</el-row>
					<el-row>
						<el-form-item>
							<el-button  @click="cancel_amend_model">取消</el-button>
							<el-button type="primary" @click="sure_junior_model('junior_info')">保存</el-button>
						</el-form-item>
					</el-row>
				</el-form>
			</div>
		</div>
	</div>

</template>
<script>
	let id = 1000;
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		data() {
			return {
				//1
				model: false, //新增组织
				//1
				show_list_1:false,//新增的下级
				junior_model: false, //新增下级组织及成员
				//下面的选择
				checkAll: false,
				checkedCities: ['上海', '北京'],
				city: cityOptions,
				isIndeterminate: true,
				//2级新增
				members_model:false,
				
				//3
				amend_model:false,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				//测试数据
				cities: [{
					value: 'Beijing',
					label: '北京'
				}, {
					value: 'Shanghai',
					label: '上海'
				}, {
					value: 'Nanjing',
					label: '南京'
				}, {
					value: 'Chengdu',
					label: '成都'
				}, {
					value: 'Shenzhen',
					label: '深圳'
				}, {
					value: 'Guangzhou',
					label: '广州'
				}],
				//options
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				//树形图
				data4: [{
					label: '一级 1',
					is_show: false,
					series: 1,
					children: [{
						label: '二级 1-1',
						is_show: false,
						series: 2,
						children: [{
							is_show: false,
							series: 3,
							label: '三级 1-1-1',
						}]
					}]
				}, {
					label: '一级 2',
					is_show: false,
					series: 1,
					children: [{
						label: '二级 2-1',
						is_show: false,
						series: 2,
						children: [{
							is_show: false,
							series: 3,
							label: '三级 2-1-1'
						}]
					}, {
						label: '二级 2-2',
						series: 2,
						is_show: false,
						children: [{
							is_show: false,
							series: 3,
							label: '三级 2-2-1'
						}]
					}]
				}, {
					label: '一级 3',
					series: 1,
					is_show: false,
					children: [{
						is_show: false,
						label: '二级 3-1',
						series: 2,
						children: [{
							is_show: false,
							label: '三级 3-1-1',
							series: 3
						}]
					}, {
						is_show: false,
						series: 2,
						label: '二级 3-2',
						children: [{
							is_show: false,
							label: '三级 3-2-1',
							series: 3
						}]
					}]
				}],
				role_id: "",
				//新增组织名称
				new_info: {
					role_name: '',
				},
				new_inforules: {
					role_name: [{
						required: true,
						message: '名称为空',
						trigger: 'blur'
					}],
				},
				//新增下级组织
				junior_info: {
					TheSuperiorOrganization: "", //上级组织
					organizationName: "", //组织名称
					phone: "", //手机
					name: "", //姓名
					password: "", //密码
					surePassword: "", //确定密码
					email: "", //邮箱
					idCart: "", //上级组织
					permission: "", //设置权限
				},
				junior_inforules: {
					TheSuperiorOrganization: [{
						required: true,
						message: '名称为空',
						trigger: 'blur'
					}],
					organizationName: [{
						required: true,
						message: '名称为空',
						trigger: 'change'
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
					surePassword: [{
						required: true,
						message: '请确定密码',
						trigger: 'blur'
					}]
				},
				amend_info: {
					role_id: '',
					role_name: '',
				},
			}
		},
		created() {
			//			this.ajaxjson(); 
			console.log(this.$organizeList)
		},
		methods: {
			//首次的默认的请求
			ajaxjson() {
				let postData = {
					level_id: 0,
				};
				this.$post(this.$organizeList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data4 = JSON.parse(JSON.stringify(data.data))
					} else {}
				});
			},
			//打开新增组织
			addOrganization() {
				this.model = true;
			},
			//取消新增组织
			cancelOrganization() {
				this.model = false;
			},
			//确定提交新增组织
			sureOrganization(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						//新增之后的操作
						this.model = false;
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			handleNodeClick(data) {
				console.log(data);
			},

			cancel_newInfo() {
				this.model = false;
			},
			//1增加结点
			open_junior_model(data) {
				this.junior_model = true;
				this.role_id = data.id;
			},
			
			cancel_junior_model() {
				this.junior_model = false;
			},
			open_check_group(){
				this.show_list_1 = true;
			},
			sure_junior_model(e){
				this.$refs[e].validate((valid) => {
					if(valid) {
						
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
			open_member_model(){
				this.members_model = true;
			},
			cancel_member_model() {
				this.members_model = false;
			},
			//三级菜单添加
			open_amend_model(){
				this.amend_model = true;
			},
			//取消
			cancel_amend_model(){
				this.amend_model = false;
			},
			//增加列表
			submitForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.new_info;
						postData.role_id = this.role_id;
						this.$post(this.$organizeListAdd, postData).then((res) => {
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
			//修改
			//删除
			remove(node, data) {
				let postData = {
					role_id: data.id + '',
				}
				this.$post(this.$organizeListDelete, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.$message({
							type: 'success',
							message: data.message,
						});
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: data.message,
						});
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
					h('span', {
						//显示名称
					}, node.label),
					h('span', {
						style: {
//							display: data.is_show ? '' : 'none',
						},
					}, [
						//第一级点击添加
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.series == 1 ? '' : 'none',
								width: '14px',
								height: '14px',
								padding:"0px",
								backgroundImage: "url(" + require("../../../static/img/newmember.png") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'

							},
							on: {
								click: () => {
									this.open_junior_model(data);
								}
							}
						},''),
						//第二级点击添加
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.series == 2 ? '' : 'none',
								width: '14px',
								height: '14px',
								padding:"0px",
								backgroundImage: "url(" + require("../../../static/img/newmember.png") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									this.open_member_model(data);
								}
							}
						},''),
						//第三级点击修改
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								display: data.series == 3 ? '' : 'none',
								width: '14px',
								height: '14px',
								padding:"0px",
								backgroundImage: "url(" + require("../../../static/img/amend.png") + ")",
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
						h('el-button', {
							props: {
								type: 'text',
								size: 'small',
							},
							style: {
								width: '14px',
								height: '14px',
								padding:"0px",
								backgroundImage: "url(" + require("../../../static/img/delete.png") + ")",
								backgroundRepeat: "no-repeat",
								backgroundPosition: 'center',
								backgroundSize: '14px 14px',
								marginLeft: '8px',
								marginRight: '8px'
							},
							on: {
								click: () => {
									this.remove(node, data)
								}
							}
						}, ""),
					]),
				]);
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		margin: 25px;
	}
	
	.title {
		background-color: #d0f4f0;
		font-size: 16px;
		line-height: 40px;
		padding-left: 50px;
		margin-top: 50px;
		margin-bottom: 25px;
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
			width: 400px;
			height: 400px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -200px;
			margin-left: -200px;
			border-radius: 15px;
			.model_title {
				border-bottom: 1px solid #d6d6d6;
				margin-bottom: 20px;
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
			width: 800px;
			height: 800px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -400px;
			margin-left: -400px;
			border-radius: 15px;
			.model_title {
				border-bottom: 1px solid #d6d6d6;
				margin-bottom: 20px;
			}
		}
		.show_list {
			border: 1px solid #E0E0E0;
			padding: 25px;
			margin-bottom: 25px;
			.check_group{
				margin-top: 20px;
				padding-bottom: 20px;
				border-bottom: 1px dashed #E0E0E0;
			}
		}
	}
</style>