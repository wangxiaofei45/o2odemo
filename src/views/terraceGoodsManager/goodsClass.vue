<template>
	<div class="container">
		<el-row class="box1">
			<el-row style="height:300px;">
				<el-col :span="8" style="border:1px solid #e6e6e6;">
					<el-row class="title">
						<el-col :span="8">
							<el-button v-show="permission.indexOf('174') != -1" type="text" style="padding:0px" :disabled="disabled1 == 1" @click="leval_1_add" v-if="button_1">
								<svg-icon icon-class="typeAdd" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_1_sure" v-else>
								完成
							</el-button>
						</el-col>
						<el-col :span="8" style="text-align:center;">
							一级分类
						</el-col>
						<el-col :span="8" style="text-align:right">
							<el-button v-show="permission.indexOf('176') != -1" type="text" style="padding:0px" :disabled="disabled1 == 1" @click="leval_1_del" v-if="button_delete1 == 1">
								<svg-icon icon-class="typejian" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_1_sure_delete" v-else>
								完成
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<el-table class="newTable" height="300" v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row style="width: 100%" @current-change="selectTable1">
								<el-table-column align="center" label="禁用" width="65" v-if="button_delete1 == 1">
									<template slot-scope="scope" v-if="button_delete1 == 1">
										<el-switch v-show="permission.indexOf('175') != -1" v-model="scope.row.disabled?false:true" @change="switchChange_1(scope.row)"></el-switch>
									</template>
								</el-table-column>
								<el-table-column align="center" label="删除" width="65" v-if="button_delete1 == 0">
									<template slot-scope="scope" v-if="button_delete1 == 0">
										<el-button type="text" size="mini" @click="delete1(scope.row.id)" style="padding:0px !important">
											<svg-icon icon-class="icon_reduce" />
										</el-button>
									</template>
								</el-table-column>
								<el-table-column label="Title">
									<template slot-scope="scope">
										<el-input v-if="scope.row.is_add" placeholder="请输入" v-model="scope.row.name" @keyup.enter.native="keyup_1(scope.row)"></el-input>
										<span v-else>{{ scope.row.name }}</span>
									</template>
								</el-table-column>
								<!--<el-table-column align="center" label="Drag" width="80">
									<template slot-scope="scope">
										<svg-icon class="drag-handler" icon-class="drag" />
									</template>
								</el-table-column>-->
							</el-table>
							<!--<div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>
	            <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div> -->
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="8" style="border:1px solid #e6e6e6;">
					<el-row class="title">
						<el-col :span="8">
							<el-button type="text" style="padding:0px" :disabled="disabled2 == 1" @click="leval_2_add" v-if="button_2">
								<svg-icon icon-class="typeAdd" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_2_sure" v-else>
								完成
							</el-button>
						</el-col>
						<el-col :span="8" style="text-align:center;">
							二级分类
						</el-col>
						<el-col :span="8" style="text-align:right">
							<el-button type="text" style="padding:0px" :disabled="disabled2 == 1" @click="leval_2_del" v-if="button_delete2 == 1">
								<svg-icon icon-class="typejian" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_2_sure_delete" v-else>
								完成
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col id="table2" :span="24">
							<el-table class="newTable" height="300" v-loading="listLoading" :data="list2" row-key="id" fit highlight-current-row style="width: 100%" @current-change="selectTable2">
								<el-table-column align="center" label="禁用" width="65" v-if="button_delete2 == 1">
									<template slot-scope="scope" v-if="button_delete2 == 1">
										<el-switch v-model="scope.row.disabled?false:true" @change="switchChange_2(scope.row)"></el-switch>
									</template>
								</el-table-column>
								<el-table-column align="center" label="删除" width="65" v-if="button_delete2 == 0">
									<template slot-scope="scope" v-if="button_delete2 == 0">
										<el-button type="text" size="mini" @click="delete2(scope.row.id)" style="padding:0px !important">
											<svg-icon icon-class="icon_reduce" />
										</el-button>
									</template>
								</el-table-column>
								<el-table-column label="Title">
									<template slot-scope="scope">
										<el-input v-if="scope.row.is_add" placeholder="请输入" v-model="scope.row.name" @keyup.enter.native="keyup_2(scope.row)"></el-input>
										<span v-else>{{ scope.row.name }}</span>
									</template>
								</el-table-column>
								<!--<el-table-column align="center" label="Drag" width="80">
									<template slot-scope="scope">
										<svg-icon class="drag-handler" icon-class="drag" />
									</template>
								</el-table-column>-->
							</el-table>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="8" style="border:1px solid #e6e6e6">
					<el-row class="title">
						<el-col :span="8">
							<el-button type="text" style="padding:0px" :disabled="disabled3 == 1" @click="leval_3_add" v-if="button_3">
								<svg-icon icon-class="typeAdd" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_3_sure" v-else>
								完成
							</el-button>
						</el-col>
						<el-col :span="8" style="text-align:center;">
							三级分类
						</el-col>
						<el-col :span="8" style="text-align:right">
							<el-button type="text" style="padding:0px" :disabled="disabled3 == 1" @click="leval_3_del" v-if="button_delete3 == 1">
								<svg-icon icon-class="typejian" style="margin-right: 10px;" />
							</el-button>
							<el-button type="text" style="font-size:15px;padding:0px;" @click="leval_3_sure_delete" v-else>
								完成
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col id="table3" :span="24">
							<el-table class="newTable" height="300" v-loading="listLoading" :data="list3" row-key="id" fit highlight-current-row @current-change="selectTable3" style="width: 100%">
								<el-table-column align="center" label="禁用" width="65" v-if="button_delete3 == 1">
									<template slot-scope="scope" v-if="button_delete3 == 1">
										<el-switch v-model="scope.row.disabled?false:true" @change="switchChange_2(scope.row)"></el-switch>
									</template>
								</el-table-column>
								<el-table-column align="center" label="删除" width="65" v-if="button_delete3 == 0">
									<template slot-scope="scope" v-if="button_delete3 == 0">
										<el-button type="text" size="mini" @click="delete3(scope.row.id)" name="topRightCancel" style="padding:0px !important">
											<svg-icon icon-class="icon_reduce" />
										</el-button>
									</template>
								</el-table-column>
								<el-table-column label="Title">
									<template slot-scope="scope">
										<el-input v-if="scope.row.is_add" placeholder="请输入" v-model="scope.row.name" @keyup.enter.native="keyup_3(scope.row)"></el-input>
										<span v-else>{{ scope.row.name }}</span>
									</template>
								</el-table-column>
								<!--<el-table-column align="center" label="Drag" width="80">
									<template slot-scope="scope">
										<svg-icon class="drag-handler" icon-class="drag" />
									</template>
								</el-table-column>-->
							</el-table>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-row>
		<el-row v-if="disabled1 == disabled2 == disabled3 == 0" style="margin-top: 20px;">
			<el-checkbox v-if="class_id !=''" v-model="addSpecification" @change="addSpecificat">添加规格</el-checkbox>
		</el-row>
		<!--添加分类的 规格值-->
		<el-row class="attribute" v-if="disabled1 == disabled2 == disabled3 == 0&&showAddDelete">
			<el-row class="headerTitle" v-if="showAddDelete">
				<span v-if="selectTableName1 != ''">{{selectTableName1}}</span>
				<span v-if="selectTableName2 != ''">>{{selectTableName2}}</span>
				<span v-if="selectTableName3 != ''">>{{selectTableName3}}</span>
			</el-row>
			<el-row v-if="showAddDelete">
				<el-col :span="11" class="list">
					<el-row v-for="(item,index) in attributeList" :key="item.name">
						<el-col :span="24" class="name">{{item.name}}</el-col>
						<el-col :span="24" v-for="(j,z) in item.data" :key="j.id" v-bind:class="[j.checked ? 'actives' : '', 'detail']" @click.native.ctrl.exact="doSomething(j,1)">
							{{j.name}}
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="2" style="text-align: center;">
					<el-button style="color: #333333;margin-top: 100px;" v-show="permission.indexOf('179') != -1" type="text" @click="classattributesave">
						<p><svg-icon icon-class="icon_add_del"/></p>						
						<p>添加/清除</p>
					</el-button>
				</el-col>
				<el-col :span="11" class="list">
					<el-row>
						<el-col :span="24" v-for="(item,index) in attributeRight" :key="item.name" v-bind:class="[item.checked ? 'actives' : '', 'detail']" @click.native.ctrl.exact="doSomething(item,2)">
							{{item.name}}
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>
<script>
	import { fetchList } from '@/api/article'
	import Sortable from 'sortablejs'
	export default {
		filters: {
			statusFilter(status) {
				const statusMap = {
					published: 'success',
					draft: 'info',
					deleted: 'danger'
				}
				return statusMap[status]
			}
		},
		data() {
			return {
				permission: [],
				addSpecification: false,
				// 删除的控制
				disabled1: 0,
				button_delete1: 1,
				disabled2: 0,
				button_delete2: 1,
				disabled3: 0,
				button_delete3: 1,
				// 按钮的显示与隐藏
				button_1: true,
				button_2: true,
				button_3: true,
				list: [], //一级
				centerList1: [],
				list2: [], //二级
				centerList2: [], //二级
				list3: [], //三级
				centerList3: [], //三级
				listLoading: true,
				sortable: null,
				oldList: [],
				newList: [],
				oldList2: [],
				newList2: [],
				oldList3: [], //三级
				newList3: [], //三级
				postData2: {}, //获取二级的时候添加
				postData3: {}, //获取三级的时候添加
				attributeList: [], //获取到的数据 
				attributeRight: [], //添加属性时右边的展示
				class_id: '', //添加删除分类属性时候的class_id;
				type: 0, //新增时候判断是添加还是删除
				showAddDelete: false,
				selectTableName1: '',
				selectTableName2: '',
				selectTableName3: '',
			}
		},
		created() {
			this.ajaxjson();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			// 添加商品规格 勾选添加规则时候获取
			addSpecificat(e) {
				if(e) {
					// 点击新增 判断是否有选择的值 如果没有 禁用 选择 请求接口
					this.$post(this.$attributeGetAll).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							let datas = data.data;
							for(let i = 0; i < datas.length; i++) {
								for(let j = 0; j < datas[i].data.length; j++) {
									datas[i].data[j].checked = false;
								}
							};
							this.attributeList = datas;
							this.showAddDelete = true;
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					});
					this.attributeClassattribute();
				} else {
					this.showAddDelete = false;
					this.attributeList = [];
					this.attributeRight = [];
				}
			},
			//分类绑定属性 删除属性
			classattributesave() {
				if(this.type == 1) {
					let datas = this.$coppyArray(this.attributeList);
					let centerArr = [];
					for(let i = 0; i < datas.length; i++) {
						for(let j = 0; j < datas[i].data.length; j++) {
							if(datas[i].data[j].checked == true) {
								centerArr.push(datas[i].data[j].id)
							}
						}
					};
					let postData = {
						class_id: this.class_id,
						attr_id: centerArr.join(','),
						type: this.type,
					};
					this.$post(this.$attributeClassattributesave, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							this.$message({
								type: 'success',
								message: res.message,
							})
							this.addSpecificat(true); //商品分类左边的列表
							this.attributeClassattribute(); //获取商品分类右边的列表
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					});
				} else if(this.type == 2) {
					let datas = this.$coppyArray(this.attributeRight);
					let centerArr = [];
					for(let i = 0; i < datas.length; i++) {
						if(datas[i].checked == true) {
							centerArr.push(datas[i].id)
						}
					};
					let postData = {
						class_id: this.class_id,
						attr_id: centerArr.join(','),
						type: this.type,
					};
					this.$post(this.$attributeClassattributesave, postData).then((res) => {
						let data = res;
						if(data.status_code == 0) {
							this.$message({
								type: 'success',
								message: res.message,
							})
							this.attributeClassattribute();
						} else {
							this.$message({
								type: 'error',
								message: res.message,
							})
						}
					});
				}
			},
			//获取
			attributeClassattribute() {
				let postData = {
					class_id: this.class_id,
				};
				this.$post(this.$attributeClassattribute, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						let datas = data.data;
						for(let i = 0; i < datas.length; i++) {
							datas[i].checked = false;
						}
						this.attributeRight = datas;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				});
			},
			doSomething(e, z) {
				if(e.checked) {
					e.checked = false;
				} else {
					e.checked = true;
				};
				this.type = z;
			},
			// 删除
			leval_1_del() {
				this.button_delete1 = 0;
				this.disabled1 = 1; //等于一 禁用
			},
			leval_1_sure_delete() {
				this.button_delete1 = 1;
				this.disabled1 = 0; //=0取消禁用
			},
			delete1(e) {
				let postData = {
					id: e + '',
				};
				this.$post(this.$goodsDelete, postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						this.ajaxjson();
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						});
					}
				});
			},

			leval_2_del() {
				this.button_delete2 = 0;
				this.disabled2 = 1; //等于一 禁用
			},
			leval_2_sure_delete() {
				this.button_delete2 = 1;
				this.disabled2 = 0; //=0取消禁用
			},
			delete2(e) {
				let postData = {
					id: e + '',
				};
				this.$post(this.$goodsDelete, postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						this.ajaxjson_2(this.postData2);
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						});
					}
				});
			},
			// 3层的删除
			leval_3_del() {
				this.button_delete3 = 0;
				this.disabled3 = 1; //等于一 禁用
			},
			leval_3_sure_delete() {
				this.button_delete3 = 1;
				this.disabled3 = 0; //=0取消禁用
			},
			delete3(e) {
				let postData = {
					id: e + '',
				};
				this.$post(this.$goodsDelete, postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						this.$message({
							type: 'success',
							message: res.message,
						});
						this.ajaxjson_3(this.postData3);
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						});
					}
				});
			},
			ajaxjson() {
				let postData = {
					page: 1,
					pid: 0,
				};
				this.$post(this.$goodsclassList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.list = data.data;
						this.listLoading = false
						this.oldList = this.list.map(v => v.id)
						this.newList = this.oldList.slice()
						this.$nextTick(() => {
							this.setSort()
						})
					} else {

					}
				});
			},
			// 获取二级分类
			selectTable1(val) {
				//这里要存储
				let postData = {
					page: 1,
					pid: val.id,
				};
				this.selectTableName1 = val.name;
				this.selectTableName2 = '';
				this.selectTableName3 = '';
				this.addSpecification = false;
				this.attributeList = [];
				this.attributeRight = [];
				this.class_id = val.id;
				this.postData2 = postData;
				this.ajaxjson_2(postData);
			},
			ajaxjson_2(val) {
				let postData = val;
				this.$post(this.$goodsclassList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.list2 = data.data;
						this.listLoading = false
						this.oldList2 = this.list2.map(v => v.id)
						this.newList2 = this.oldList2.slice()
						this.$nextTick(() => {
							this.setSort2()
						})
					} else {

					}
				});
			},
			// 获取三级分类
			selectTable2(val) {
				let postData = {
					page: 1,
					pid: val.id,
				};
				this.selectTableName2 = val.name;
				this.selectTableName3 = '';
				this.addSpecification = false;
				this.attributeList = [];
				this.attributeRight = [];
				this.class_id = val.id;
				this.postData3 = postData;
				this.ajaxjson_3(postData);
			},
			selectTable3(val) {
				this.selectTableName3 = val.name;
				this.class_id = val.id;
				this.addSpecification = false;
				this.attributeList = [];
				this.attributeRight = [];
			},
			// 获取及刷新3级列表
			ajaxjson_3(val) {
				let postData = val;
				this.$post(this.$goodsclassList, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.list3 = data.data;
						this.listLoading = false
						this.oldList3 = this.list3.map(v => v.id)
						this.newList3 = this.oldList3.slice()
						this.$nextTick(() => {
							this.setSort3()
						})
					} else {

					}
				});
			},
			// 一级分类是否展示
			switchChange_1(e) {
				let postData = {
					id: e.id,
					disabled: e.disabled ? 0 : 1,
				}
				this.$post(this.$goodsModifyview, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.ajaxjson();
					} else {

					}
				});
			},
			switchChange_2(e) {
				let postData = {
					id: e.id,
					disabled: e.disabled ? 0 : 1,
				}
				this.$post(this.$goodsModifyview, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.ajaxjson_2(this.postData2);
					} else {

					}
				});
			},
			// 一级分类添加
			leval_1_add() {
				this.centerList1 = this.$coppyArray(this.list);
				let obj = {
					pid: '0',
					name: "",
					disabled: 0,
					level: 1,
					sort: 150,
					is_add: true,
				};
				this.button_1 = false;
				this.disabled1 = 1;
				this.list.push(obj);
			},
			// 第一级添加按下enter键盘 继续添加
			keyup_1(e) {
				if(e.name) {
					e.is_add = false;
					let obj = {
						pid: '0',
						name: "",
						disabled: 0,
						level: 1,
						sort: 150,
						is_add: true,
					};
					this.list.push(obj);
				} else {
					this.$message({
						type: 'error',
						message: '你还没有输入分类名称',
					});
				}
			},
			// 一级分类完成
			leval_1_sure() {
				// 添加的时候是禁止排序的
				let obj = this.list[this.list.length - 1]; //获取到添加元素的最后一位
				if(obj.name != '') {
					// 最后一项数据添加的时候没有按键盘事件
					let centerList1 = this.$coppyArray(this.centerList1);
					let list = this.$coppyArray(this.list);
					for(var i = 0; i < centerList1.length; i++) {
						for(var j = 0; j < list.length; j++) {
							if(list[j].id === centerList1[i].id) {
								list.splice(j, 1);
								j--;
							}
						}
					}
					let datas = JSON.stringify(list);
					let data = {
						insertData: datas,
					}
					this.$post(this.$goodsclassAdd, data).then((res) => {
						if(res.status_code == 0) {
							this.$message({
								type: 'success',
								message: res.message,
							});
							this.ajaxjson();
						} else {

						}
					});
				} else {
					this.list.splice(this.list.length - 1, 1);
					let centerList1 = this.$coppyArray(this.centerList1);
					let list = this.$coppyArray(this.list);
					for(var i = 0; i < centerList1.length; i++) {
						for(var j = 0; j < list.length; j++) {
							if(list[j].id === centerList1[i].id) {
								list.splice(j, 1);
								j--;
							}
						}
					}
					if(list.length > 0) {
						let datas = JSON.stringify(list);
						let data = {
							insertData: datas,
						}
						this.$post(this.$goodsclassAdd, data).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.ajaxjson();
							} else {

							}
						});
					}
				}
				this.button_1 = true;
				this.disabled1 = 0;
			},
			// 二级分类添加
			leval_2_add() {
				this.centerList2 = this.$coppyArray(this.list2);
				let obj = {
					pid: this.postData2.pid,
					name: "",
					disabled: 0,
					level: 2,
					sort: 150,
					is_add: true,
				};
				this.button_2 = false;
				this.disabled2 = 1;
				this.list2.push(obj);
			},
			keyup_2(e) {
				if(e.name) {
					e.is_add = false;
					let obj = {
						pid: e.pid,
						name: "",
						disabled: 0,
						level: 2,
						sort: 0,
						is_add: true,
					};
					this.list2.push(obj);
				} else {
					this.$message({
						type: 'error',
						message: '你还没有输入分类名称',
					});
				}
			},
			leval_2_sure() {
				// 添加的时候是禁止排序的
				let obj = this.list2[this.list2.length - 1];
				if(obj.name != '') {
					let centerList2 = this.$coppyArray(this.centerList2);
					let list2 = this.$coppyArray(this.list2);
					for(var i = 0; i < centerList2.length; i++) {
						for(var j = 0; j < list2.length; j++) {
							if(list2[j].id === centerList2[i].id) {
								list2.splice(j, 1);
								j--;
							}
						}
					}
					// 最后一项数据添加的时候没有按键盘事件
					let datas = JSON.stringify(list2);
					let data = {
						insertData: datas,
					}
					this.$post(this.$goodsclassAdd, data).then((res) => {
						if(res.status_code == 0) {
							this.$message({
								type: 'success',
								message: res.message,
							});
							this.ajaxjson_2(this.postData2);
						} else {

						}
					});
				} else {
					this.list2.splice(this.list2.length - 1, 1);
					let centerList2 = this.$coppyArray(this.centerList2);
					let list2 = this.$coppyArray(this.list2);
					for(var i = 0; i < centerList2.length; i++) {
						for(var j = 0; j < list2.length; j++) {
							if(list2[j].id === centerList2[i].id) {
								list2.splice(j, 1);
								j--;
							}
						}
					}
					if(list2.length > 0) {
						let datas = JSON.stringify(list2);
						let data = {
							insertData: datas,
						}
						this.$post(this.$goodsclassAdd, data).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.ajaxjson_2(this.postData2);
							} else {

							}
						});
					}

				}
				this.button_2 = true;
				this.disabled2 = 0;
			},
			leval_3_add() {
				this.centerList3 = this.$coppyArray(this.list3);
				let obj = {
					pid: this.postData3.pid,
					name: "",
					disabled: 0,
					level: 3,
					sort: 150,
					is_add: true,
				};
				this.button_3 = false;
				this.disabled3 = 1;
				this.list3.push(obj);
			},
			keyup_3(e) {
				if(e.name) {
					e.is_add = false;
					let obj = {
						pid: e.pid,
						name: "",
						disabled: 0,
						level: 3,
						sort: 0,
						is_add: true,
					};
					this.list3.push(obj);
				} else {
					this.$message({
						type: 'error',
						message: '你还没有输入分类名称',
					});
				}
			},
			leval_3_sure() {
				// 添加的时候是禁止排序的
				let obj = this.list3[this.list3.length - 1];
				if(obj.name != '') {
					// 最后一项数据添加的时候没有按键盘事件
					let centerList3 = this.$coppyArray(this.centerList3);
					let list3 = this.$coppyArray(this.list3);
					for(var i = 0; i < centerList3.length; i++) {
						for(var j = 0; j < list3.length; j++) {
							if(list3[j].id === centerList3[i].id) {
								list3.splice(j, 1);
								j--;
							}
						}
					}
					let datas = JSON.stringify(list3);
					let data = {
						insertData: datas,
					}
					this.$post(this.$goodsclassAdd, data).then((res) => {
						if(res.status_code == 0) {
							this.$message({
								type: 'success',
								message: res.message,
							});
							this.ajaxjson_3(this.postData3);
						} else {

						}
					});
				} else {
					this.list3.splice(this.list3.length - 1, 1);
					let centerList3 = this.$coppyArray(this.centerList3);
					let list3 = this.$coppyArray(this.list3);
					for(var i = 0; i < centerList3.length; i++) {
						for(var j = 0; j < list3.length; j++) {
							if(list3[j].id === centerList3[i].id) {
								list3.splice(j, 1);
								j--;
							}
						}
					}
					if(list3.length > 0) {
						let datas = JSON.stringify(list3);
						let data = {
							insertData: datas,
						}
						this.$post(this.$goodsclassAdd, data).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.ajaxjson_3(this.postData3);
							} else {

							}
						});
					}
				}
				this.button_3 = true;
				this.disabled3 = 0;
			},
			// 排序
			setSort() {
				const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
				this.sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost',
					setData: function(dataTransfer) {
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {
						const targetRow = this.list.splice(evt.oldIndex, 1)[0]
						this.list.splice(evt.newIndex, 0, targetRow)
						const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
						this.newList.splice(evt.newIndex, 0, tempIndex)
					}
				})
			},
			// 二级排序
			setSort2() {
				const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[1]
				this.sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost',
					setData: function(dataTransfer) {
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {
						const targetRow = this.list.splice(evt.oldIndex, 1)[0]
						this.list2.splice(evt.newIndex, 0, targetRow)
						const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
						this.newList2.splice(evt.newIndex, 0, tempIndex)
					}
				})
			},
			// 3级排序
			setSort3() {
				const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[2]
				this.sortable = Sortable.create(el, {
					ghostClass: 'sortable-ghost',
					setData: function(dataTransfer) {
						dataTransfer.setData('Text', '')
					},
					onEnd: evt => {
						const targetRow = this.list.splice(evt.oldIndex, 1)[0]
						this.list3.splice(evt.newIndex, 0, targetRow)
						const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
						this.newList3.splice(evt.newIndex, 0, tempIndex)
					}
				})
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.title {
		height: 50px;
		line-height: 50px;
		z-index: 100;
		background-color: #F5F5F5;
		padding: 0px 20px;
	}
	
	.container {
		margin: 25px;
	}
	
	.newTable {
		margin-top: -50px;
	}
	
	.box1 {
		background-color: #fff;
	}
	
	.attribute {
		border: 1px solid #e6e6e6;
		background-color: #F5F5F5;
		box-sizing: border-box;
		.headerTitle {
			height: 50px;
			line-height: 50px;
			padding: 0px 20px;
			background-color: #F5F5F5;
			font-size: 15px;
			color: #333333;
		}
		margin-top: 20px;
		.showSelect {
			padding: 15px;
		}
		.list {
			background-color: #FFFFFF;
			height: 300px;
			overflow-y: scroll;
			.name {
				padding: 15px;
				font-size: 14px;
				color: #666666;
				box-sizing: border-box;
			}
			.detail {
				height: 30px;
				line-height: 30px;
				font-size: 14px;
				color: #333333;
				padding-left: 48px;
				box-sizing: border-box;
				cursor: pointer
			}
			.detail:hover {
				background-color: #18ccba;
				color: #fff;
			}
			.actives {
				background-color: #18ccba;
				color: #fff;
			}
		}
	}
</style>