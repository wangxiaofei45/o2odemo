<template>
  <div class="container">
  	<el-row>
  		<el-radio-group v-model="type" style="margin-bottom:15px">
		    <el-radio :label="1">销售属性</el-radio>
		    <el-radio :label="2">类目属性</el-radio>
		 </el-radio-group>
  	</el-row>
    <el-row>
      <el-col :span="8" style="border:1px solid #e6e6e6;padding:15px;">
	        <el-row class="title">
	          <el-col :span="8">
	            <el-button v-show="permission.indexOf('181') != -1" type="text" style="font-size:40px;padding:0px" :disabled="disabled1 == 1"  @click="leval_1_add" v-if="button_1">
	              +
	            </el-button>
	             <el-button type="text" style="font-size:20px;padding:0px;" @click="leval_1_sure" v-else>
	             	完成
	            </el-button>
	          </el-col>
	          <el-col :span="8" style="text-align:center;line-height:42px">
	            一级分类
	          </el-col>
	          <el-col :span="8" style="text-align:right">
	            <el-button v-show="permission.indexOf('183') != -1" type="text" style="font-size:40px;padding:0px" :disabled="disabled1 == 1" @click="leval_1_del" v-if="button_delete1 == 1">
	              -
	            </el-button>
	             <el-button type="text" style="font-size:20px;padding:0px;" @click="leval_1_sure_delete" v-else>
	             	完成
	            </el-button>
	          </el-col>
	        </el-row>
	        <el-row>
	          <el-col :span="24">
	            <el-table v-loading="listLoading" :data="list" row-key="id" fit highlight-current-row style="width: 100%"  @current-change="selectTable1">
	              <el-table-column align="center" label="禁用" width="65" v-if="button_delete1 == 1">
	                <template slot-scope="scope" v-if="button_delete1 == 1">
	                  <el-switch v-show="permission.indexOf('182') != -1" v-model="scope.row.disabled?false:true" @change="switchChange_1(scope.row)"></el-switch>
	                </template>
	              </el-table-column>
	              <el-table-column align="center" label="" v-if="button_delete1 == 1">
	                <template slot-scope="scope" v-if="button_delete1 == 1">
	                  <el-select v-model="scope.row.style" placeholder="请选择" size="mini" style="width:80px">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
	                </template>
	              </el-table-column>
	              <el-table-column align="center" label="删除" width="65" v-if="button_delete1 == 0">
	                <template slot-scope="scope" v-if="button_delete1 == 0">
	                	<el-button type="text" size="mini" @click="delete1(scope.row.id)">
	                		删除
	                	</el-button>
	                </template>
	              </el-table-column>
	              <el-table-column min-width="150px" label="Title">
	                <template slot-scope="scope">
	                  <el-input v-if="scope.row.is_add" v-model="scope.row.name" @keyup.enter.native="keyup_1(scope.row)"></el-input>
	                  <span v-else>{{ scope.row.name }}</span>
	                </template>
	              </el-table-column>
	              <el-table-column align="center" label="Drag" width="80">
	                <template slot-scope="scope">
	                  <svg-icon class="drag-handler" icon-class="drag" />
	                </template>
	              </el-table-column>
	            </el-table>
	          <!--   <div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>
	            <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div> -->
	          </el-col>
	        </el-row>
      </el-col>
      <el-col :span="8" style="border:1px solid #e6e6e6;padding:15px;">
	      	<el-row class="title">
	          <el-col :span="8">
	            <el-button v-show="permission.indexOf('185') != -1" type="text" style="font-size:40px;padding:0px" :disabled="disabled2 == 1" @click="leval_2_add" v-if="button_2">
	              +
	            </el-button>
	             <el-button type="text" style="font-size:20px;padding:0px;" @click="leval_2_sure" v-else>
	             	完成
	            </el-button>
	          </el-col>
	          <el-col :span="8" style="text-align:center;line-height:42px">
	            二级分类
	          </el-col>
	          <el-col :span="8" style="text-align:right">
	             <el-button v-show="permission.indexOf('187') != -1" type="text" style="font-size:40px;padding:0px" :disabled="disabled2 == 1" @click="leval_2_del" v-if="button_delete2 == 1">
	              -
	            </el-button>
	             <el-button type="text" style="font-size:20px;padding:0px;" @click="leval_2_sure_delete" v-else>
	             	完成
	            </el-button>
	          </el-col>
	        </el-row>
	        <el-row>
	          <el-col id="table2" :span="24">
	            <el-table v-loading="listLoading" :data="list2" row-key="id" fit highlight-current-row style="width: 100%"  @current-change="selectTable2">
	              <el-table-column align="center" label="禁用" width="65" v-if="button_delete2 == 1">
	                <template slot-scope="scope" v-if="button_delete2 == 1">
	                  <el-switch v-show="permission.indexOf('186') != -1" v-model="scope.row.disabled?false:true" @change="switchChange_2(scope.row)"></el-switch>
	                </template>
	              </el-table-column>
	               <el-table-column align="center" label="删除" width="65" v-if="button_delete2 == 0">
	                <template slot-scope="scope" v-if="button_delete2 == 0">
	                	<el-button type="text" size="mini" @click="delete2(scope.row.id)">
	                		删除
	                	</el-button>
	                </template>
	              </el-table-column>
	              <el-table-column min-width="300px" label="Title">
	                <template slot-scope="scope">
	                  <el-input v-if="scope.row.is_add" v-model="scope.row.name" @keyup.enter.native="keyup_2(scope.row)"></el-input>
	                  <span v-else>{{ scope.row.name }}</span>
	                </template>
	              </el-table-column>
	              <el-table-column align="center" label="Drag" width="80">
	                <template slot-scope="scope">
	                  <svg-icon class="drag-handler" icon-class="drag" />
	                </template>
	              </el-table-column>
	            </el-table>
	           <!--  <div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList2 }}</div>
	            <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList2 }}</div> -->
	          </el-col>
	        </el-row>
      </el-col>
      <el-col :span="8" style="border:1px solid #e6e6e6;padding:15px;">
	      	<el-row class="title">
		          <el-col :span="8">
		            <el-button type="text" style="font-size:40px;padding:0px" :disabled="disabled3 == 1" @click="leval_3_add" v-if="button_3">
		              +
		            </el-button>
		             <el-button type="text" style="font-size:20px;padding:0px;" @click="leval_3_sure" v-else>
		             	完成
		            </el-button>
		          </el-col>
		          <el-col :span="8" style="text-align:center;line-height:42px">
		            三级分类
		          </el-col>
		          <el-col :span="8" style="text-align:right">
		            <el-button type="text" style="font-size:40px;padding:0px" :disabled="disabled3 == 1" @click="leval_3_del" v-if="button_delete3 == 1">
		              -
		            </el-button>
		             <el-button type="text" style="font-size:20px;padding:0px;"  @click="leval_3_sure_delete" v-else>
		             	完成
		            </el-button>
		          </el-col>
		    </el-row>
	        <el-row>
	          <el-col id="table3" :span="24">
	            <el-table v-loading="listLoading" :data="list3" row-key="id" fit highlight-current-row style="width: 100%">
	              <el-table-column align="center" label="禁用" width="65" v-if="button_delete3 == 1">
	                <template slot-scope="scope" v-if="button_delete3 == 1">
	                  <el-switch v-model="scope.row.disabled?false:true" @change="switchChange_2(scope.row)"></el-switch>
	                </template>
	              </el-table-column>
	               <el-table-column align="center" label="删除" width="65" v-if="button_delete3 == 0">
	                <template slot-scope="scope" v-if="button_delete3 == 0">
	                	<el-button type="text" size="mini" @click="delete3(scope.row.id)">
	                		删除
	                	</el-button>
	                </template>
	              </el-table-column>
	              <el-table-column min-width="300px" label="Title">
	                <template slot-scope="scope">
	                  <el-input v-if="scope.row.is_add" v-model="scope.row.name" @keyup.enter.native="keyup_3(scope.row)"></el-input>
	                  <span v-else>{{ scope.row.name }}</span>
	                </template>
	              </el-table-column>
	              <el-table-column align="center" label="Drag" width="80">
	                <template slot-scope="scope">
	                  <svg-icon class="drag-handler" icon-class="drag" />
	                </template>
	              </el-table-column>
	            </el-table>
	           <!--  <div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList3 }}</div>
	            <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList3 }}</div> -->
	          </el-col>
	        </el-row>
      </el-col>
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
    	permission:[],
    	type:1,
    	disabled1:0,
    	button_delete1:1,
    	disabled2:0,
    	button_delete2:1,
    	disabled3:0,
    	button_delete3:1,
    	// 按钮的显示与隐藏
      button_1:true,
      button_2:true,
      button_3:true,
      list: null,//一级
      centerList1:[],
      list2:null,//二级
      centerList2:[],//二级
      list3:null,//三级
      centerList3:[],//三级
      listLoading: true,
      sortable: null,
      oldList: [],
      newList: [],
      oldList2: [],
      newList2: [],
      oldList3: [],//三级
      newList3: [],//三级
      postData2:{},//获取二级的时候添加
      postData3:{},//获取三级的时候添加
      // 第一级添加时候选择样式的选择框
      options:[
      	{
  		  value: 1,
          label: '单选'
      	},
      	{
  		  value: 2,
          label: '多选'
      	},
      	{
  		  value: 3,
          label: '选填'
      	}
      ]
    }
  },
  created() {
    this.ajaxjson();
    let str = sessionStorage.getItem('permission');
		let permission = str.split(',');
		this.permission = permission;
  },
  methods: {
  	// 删除
  	leval_1_del(){
  		this.button_delete1 = 0;
  		this.disabled1 = 1; //等于一 禁用
  	},
  	leval_1_sure_delete(){
  		this.button_delete1 = 1;
  		this.disabled1 = 0;//=0取消禁用
  	},
  	delete1(e){
  		let postData = {
  			id :e+'',
  		};
  		this.$post(this.$attributeDelete,postData).then((res)=>{
  			console.log(res);
  			if(res.status_code == 0){
				this.$message({
					type: 'success',
					message: res.message,
				});
				this.ajaxjson();
  			}else{
  				this.$message({
					type: 'error',
					message: res.message,
				});
  			}
  		});
  	},

  	leval_2_del(){
  		this.button_delete2 = 0;
  		this.disabled2 = 1; //等于一 禁用
  	},
  	leval_2_sure_delete(){
  		this.button_delete2 = 1;
  		this.disabled2 = 0;//=0取消禁用
  	},
  	delete2(e){
  		let postData = {
  			id :e+'',
  		};
  		this.$post(this.$attributeValueDelete,postData).then((res)=>{
  			console.log(res);
  			if(res.status_code == 0){
				this.$message({
					type: 'success',
					message: res.message,
				});
				this.ajaxjson_2(this.postData2);
  			}else{
  				this.$message({
					type: 'error',
					message: res.message,
				});
  			}
  		});
  	},
  	// 3层的删除
  	leval_3_del(){
  		this.button_delete3 = 0;
  		this.disabled3 = 1; //等于一 禁用
  	},
  	leval_3_sure_delete(){
  		this.button_delete3 = 1;
  		this.disabled3 = 0;//=0取消禁用
  	},
  	delete3(e){
  		let postData = {
  			id :e+'',
  		};
  		this.$post(this.$attributeValueDelete,postData).then((res)=>{
  			console.log(res);
  			if(res.status_code == 0){
				this.$message({
					type: 'success',
					message: res.message,
				});
				this.ajaxjson_3(this.postData3);
  			}else{
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
        pid:0,
        type:this.type,
      };
      this.$post(this.$attributeList, postData).then((res) => {
        let data = res;
        if (data.status_code == 0) {
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
    selectTable1(val){
    	 //这里要存储
    	 let postData = {
    	 	pid:0,
    	 	attr_id:val.id,
    	 	type:this.type,
	      };
	     this.postData2 = postData;
    	this.ajaxjson_2(postData);
    },
    ajaxjson_2(val) {
      let postData = val;
      this.$post(this.$attributeValueList, postData).then((res) => {
        let data = res;
        if (data.status_code == 0) {
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
    selectTable2(val){
		 let postData = {
	      	attr_id:val.attr_id,
	      	pid:val.id,
	      	type:this.type,
	      };
	     this.postData3 = postData;
    	this.ajaxjson_3(postData);
    },
    // 获取及刷新3级列表
    ajaxjson_3(val) {
      let postData = val;
      this.$post(this.$attributeValueList, postData).then((res) => {
        let data = res;
        if (data.status_code == 0) {
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
	switchChange_1(e){
		let postData = {
			id : e.id,
			disabled:e.disabled?0:1,
		}
		this.$post(this.$attributeStatus, postData).then((res) => {
        let data = res;
        if (data.status_code == 0) {
          	this.ajaxjson();
        } else {

        }
      });
	},
	switchChange_2(e){
		let postData = {
			id : e.id,
			disabled:e.disabled?0:1,
		}
		this.$post(this.$goodsModifyview, postData).then((res) => {
        let data = res;
        if (data.status_code == 0) {
          	this.ajaxjson_2(this.postData2);
        } else {

        }
      });
	},
	// 一级分类添加
	leval_1_add(){
		let obj = {
			name: "",
			disabled: 0,
			is_add:true,
			style:1,
		};
		this.button_1 = false;
		this.disabled1= 1;
		this.list.push(obj);
	},
	// 第一级添加按下enter键盘 继续添加
	keyup_1(e){
		if(e.name){
			e.is_add = false;
			let obj = {
					name: "",
					disabled: 0,
					is_add:true,
					style:1,
				};
			this.list.push(obj);
			this.centerList1.push(obj);
		}else{
			this.$message({
				type: 'error',
				message: '你还没有输入分类名称',
			});
		}
	},
	// 一级分类完成
	leval_1_sure(){
		// 添加的时候是禁止排序的
		let obj = this.list[this.list.length - 1];
		if(obj.name != ''){
			// 最后一项数据添加的时候没有按键盘事件
			this.centerList1.push(obj);
			let postData = this.$coppyArray(this.centerList1);
			let datas = JSON.stringify(postData);
			let data = {
				insertData:datas,
				type:this.type,
			}
			this.$post(this.$attributeAdd, data).then((res) => {
		        if (res.status_code == 0) {
		        	this.$message({
						type: 'success',
						message: res.message,
					});
		        	this.ajaxjson();
		        } else {

		        }
	      });
		}else{
			this.list.splice(this.list.length - 1,1);
			let postData = this.$coppyArray(this.centerList1);
			if(postData.length>0){
				let datas = JSON.stringify(postData);
				let data = {
					insertData:datas,
				}
				this.$post(this.$goodsAdd, data).then((res) => {
			        if (res.status_code == 0) {
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
	leval_2_add(){
		let obj = {
			name: "",
			disabled: 0,
			is_add:true,
		};
		this.button_2 = false;
		this.disabled2= 1;
		this.list2.push(obj);
	},
	keyup_2(e){
		if(e.name){
			e.is_add = false;
			let obj = {
				name: "",
				disabled: 0,
				is_add:true,
			};
			this.list2.push(obj);
			this.centerList2.push(obj);
		}else{
			this.$message({
				type: 'error',
				message: '你还没有输入分类名称',
			});
		}
	},
	leval_2_sure(){
		// 添加的时候是禁止排序的
		let obj = this.list2[this.list2.length - 1];
		if(obj.name != ''){
			// 最后一项数据添加的时候没有按键盘事件
			this.centerList2.push(obj);
			let postData = this.$coppyArray(this.centerList2);
			let datas = JSON.stringify(postData);
			let data = {
				insertData:datas,
				pid:this.postData2.pid,
				attr_id:this.postData2.attr_id,
			}
			this.$post(this.$attributeValueAdd, data).then((res) => {
		        if (res.status_code == 0) {
		        	this.$message({
						type: 'success',
						message: res.message,
					});
		        	this.ajaxjson_2(this.postData2);
		        } else {

		        }
	      });
		}else{
			this.list2.splice(this.list2.length - 1,1);
			let postData = this.$coppyArray(this.centerList2);
			if(postData.length>0){
				let datas = JSON.stringify(postData);
				let data = {
					insertData:datas,
					pid:this.postData2.pid,
					attr_id:this.postData2.attr_id,
				}
				this.$post(this.$attributeValueAdd, data).then((res) => {
			        if (res.status_code == 0) {
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
	leval_3_add(){
		let obj = {
			name: "",
			disabled: 0,
			is_add:true,
		};
		this.button_3 = false;
		this.disabled3= 1;
		this.list3.push(obj);
	},
	keyup_3(e){
		if(e.name){
			e.is_add = false;
			let obj = {
				name: "",
				disabled: 0,
				is_add:true,
				};
			this.list3.push(obj);
			this.centerList3.push(obj);
		}else{
			this.$message({
				type: 'error',
				message: '你还没有输入分类名称',
			});
		}
	},
	leval_3_sure(){
		// 添加的时候是禁止排序的
		let obj = this.list3[this.list3.length - 1];
		if(obj.name != ''){
			// 最后一项数据添加的时候没有按键盘事件
			this.centerList3.push(obj);
			let postData = this.$coppyArray(this.centerList3);
			let datas = JSON.stringify(postData);
			let data = {
				insertData:datas,
				pid:this.postData3.pid,
				attr_id:this.postData3.attr_id,
			}
			this.$post(this.$attributeValueAdd, data).then((res) => {
		        if (res.status_code == 0) {
		        	this.$message({
						type: 'success',
						message: res.message,
					});
		        	this.ajaxjson_3(this.postData3);
		        } else {

		        }
	      });
		}else{
			this.list3.splice(this.list3.length - 1,1);
			let postData = this.$coppyArray(this.centerList3);
			if(postData.length>0){
				let datas = JSON.stringify(postData);
				let data = {
					insertData:datas,
					pid:this.postData3.pid,
					attr_id:this.postData3.attr_id,
				}
				this.$post(this.$attributeValueAdd, data).then((res) => {
			        if (res.status_code == 0) {
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
		this.disabled3= 0;
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
.container {
  margin: 25px;
}

</style>
