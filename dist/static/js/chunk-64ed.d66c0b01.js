(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-64ed"],{"1v/u":function(e,t,a){"use strict";a.r(t);var n={data:function(){return{step:.01,permission:[],searchVal:"",new_info_model:!1,amend_info_model:!1,data:[],form:{name:"",contacts_name:"",contacts_tel:"",contacts_phone:"",price_type:"",discounts:1,bankname:"",bankcode:"",dutycode:"",address:"",zipcode:"",remark:""},form_rule:{name:[{required:!0,message:"供应商名称为空",trigger:"blur"}],contacts_name:{required:!0,message:"联系人为空",trigger:"blur"},contacts_tel:{required:!0,message:"手机号为空",trigger:"blur"}},options:[{value:1,label:"进价"},{value:2,label:"零售价"}],amendForm:{},amendFormRule:{name:[{required:!0,message:"供应商名称为空",trigger:"blur"}],contacts_name:{required:!0,message:"联系人为空",trigger:"blur"},contacts_tel:{required:!0,message:"手机号为空",trigger:"blur"}},page:1,total:0,per_page:10,currentPage4:4}},created:function(){this.ajaxjson();var e=sessionStorage.getItem("permission").split(",");this.permission=e},methods:{ajaxjson:function(){var e=this,t={page:this.page,per_page:this.per_page,search:this.searchVal};this.$post(this.$supplierSupplierList,t).then(function(t){var a=t;0==a.status_code?(e.data=a.data.data,e.total=a.data.total):e.$message({type:"error",message:t.message})})},handleSizeChange:function(e){this.per_page=e,this.ajaxjson()},handleCurrentChange:function(e){this.page=e,this.ajaxjson()},SelectionChange:function(e){for(var t=[],a=0;a<e.length;a++)t.push(e[a].gc_id);this.multipleSelection=t},addMember:function(){this.new_info_model=!0},cancel_newInfo:function(e){this.$refs[e].resetFields(),this.new_info_model=!1},submitForm:function(e){var t=this;this.$refs[e].validate(function(a){if(!a)return console.log("error submit!!"),!1;var n=t.$objDeepCopy(t.form);n.discounts=100*n.discounts,t.$post(t.$supplierAddSupplier,n).then(function(a){var n=a;0==n.status_code?(t.$message({message:n.message,type:"success"}),t.ajaxjson(),t.$refs[e].resetFields(),t.new_info_model=!1):t.$message.error(n.message)})})},deletes:function(e){var t={id:e};this.$delete(this.$supplierDelSupplier,t)},amendMember:function(e){this.amendForm=e,this.amendForm.discounts=this.amendForm.discounts/100,this.amend_info_model=!0},cancelAmendInfo:function(){this.amend_info_model=!1},submitAmendForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;var a=t.amendForm;a.discounts=100*Number(a.discounts),t.$post(t.$supplierEditSupplier,a).then(function(e){var a=e;0==a.status_code?(t.$message({message:a.message,type:"success"}),t.ajaxjson(),t.amend_info_model=!1):t.$message.error(a.message)})})}}},o=(a("WaTQ"),a("9tsx"),a("ZrdR")),s=Object(o.a)(n,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tab-container"},[a("div",{staticClass:"title"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("111"),expression:"permission.indexOf('111') != -1"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:e.addMember}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"add"}}),e._v(" "),a("span",[e._v("新增")])],1),e._v(" "),a("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"输入供应商/手机号"},model:{value:e.searchVal,callback:function(t){e.searchVal=t},expression:"searchVal"}},[a("template",{slot:"append"},[a("el-button",{staticStyle:{"background-color":"#e0e0e0","border-radius":"0px"},on:{click:e.ajaxjson}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"icon_search"}}),a("span",[e._v("搜索")])],1)],1)],2)],1)],1)],1),e._v(" "),a("div",{staticClass:"tTable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.data,stripe:"",border:"",size:"mini"},on:{"selection-change":e.SelectionChange}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"60",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"供应商",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contacts_tel",label:"手机号",width:"180",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"address",label:"地址",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"300",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("112"),expression:"permission.indexOf('112') != -1"}],attrs:{size:"mini",type:"primary"},on:{click:function(a){e.amendMember(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("113"),expression:"permission.indexOf('113') != -1"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){e.deletes(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{"current-page":e.currentPage4,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.new_info_model,expression:"new_info_model"}],staticClass:"model"},[a("div",{staticClass:"model_con"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[e._v("\n\t\t\t\t\t\t新增\n\t\t\t\t\t")]),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text"},on:{click:function(t){e.cancel_newInfo("form")}}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),e._v(" "),a("el-form",{ref:"form",attrs:{model:e.form,rules:e.form_rule,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"供应商名称",prop:"name"}},[a("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系人",prop:"contacts_name"}},[a("el-input",{model:{value:e.form.contacts_name,callback:function(t){e.$set(e.form,"contacts_name",t)},expression:"form.contacts_name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号",prop:"contacts_tel"}},[a("el-input",{model:{value:e.form.contacts_tel,callback:function(t){e.$set(e.form,"contacts_tel",t)},expression:"form.contacts_tel"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"固定电话",prop:"contacts_phone"}},[a("el-input",{model:{value:e.form.contacts_phone,callback:function(t){e.$set(e.form,"contacts_phone",t)},expression:"form.contacts_phone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"价格方式",prop:"price_type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.price_type,callback:function(t){e.$set(e.form,"price_type",t)},expression:"form.price_type"}},[a("el-option",{attrs:{label:"进价",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"零售价",value:"2"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"进货折扣",prop:"discounts"}},[a("el-input-number",{staticStyle:{width:"200px"},attrs:{step:.01,"controls-position":"right",min:0,max:1},model:{value:e.form.discounts,callback:function(t){e.$set(e.form,"discounts",t)},expression:"form.discounts"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户银行",prop:"bankname"}},[a("el-input",{model:{value:e.form.bankname,callback:function(t){e.$set(e.form,"bankname",t)},expression:"form.bankname"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行账号",prop:"bankcode"}},[a("el-input",{model:{value:e.form.bankcode,callback:function(t){e.$set(e.form,"bankcode",t)},expression:"form.bankcode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"税号",prop:"dutycode"}},[a("el-input",{model:{value:e.form.dutycode,callback:function(t){e.$set(e.form,"dutycode",t)},expression:"form.dutycode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"地址",prop:"address"}},[a("el-input",{model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"邮编",prop:"zipcode"}},[a("el-input",{model:{value:e.form.zipcode,callback:function(t){e.$set(e.form,"zipcode",t)},expression:"form.zipcode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1),e._v(" "),a("el-row",{staticClass:"bottomButton",staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{name:"cancel"},on:{click:function(t){e.cancel_newInfo("form")}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",align:"center"},on:{click:function(t){e.submitForm("form")}}},[e._v("保存")])],1)],1)],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.amend_info_model,expression:"amend_info_model"}],staticClass:"model"},[a("div",{staticClass:"model_con"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[e._v("\n\t\t\t\t\t\t编辑\n\t\t\t\t\t")]),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text"},on:{click:e.cancelAmendInfo}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),e._v(" "),a("el-form",{ref:"amendForm",attrs:{model:e.amendForm,rules:e.amendFormRule,"label-width":"100px"}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"供应商名称",prop:"name"}},[a("el-input",{model:{value:e.amendForm.name,callback:function(t){e.$set(e.amendForm,"name",t)},expression:"amendForm.name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"联系人",prop:"contacts_name"}},[a("el-input",{model:{value:e.amendForm.contacts_name,callback:function(t){e.$set(e.amendForm,"contacts_name",t)},expression:"amendForm.contacts_name"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"手机号",prop:"contacts_tel"}},[a("el-input",{model:{value:e.amendForm.contacts_tel,callback:function(t){e.$set(e.amendForm,"contacts_tel",t)},expression:"amendForm.contacts_tel"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"固定电话",prop:"contacts_phone"}},[a("el-input",{model:{value:e.amendForm.contacts_phone,callback:function(t){e.$set(e.amendForm,"contacts_phone",t)},expression:"amendForm.contacts_phone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"价格方式",prop:"price_type"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.amendForm.price_type,callback:function(t){e.$set(e.amendForm,"price_type",t)},expression:"amendForm.price_type"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"进货折扣",prop:"discounts"}},[a("el-input-number",{attrs:{precision:2,step:.01,"controls-position":"right",min:0,max:1},model:{value:e.amendForm.discounts,callback:function(t){e.$set(e.amendForm,"discounts",t)},expression:"amendForm.discounts"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开户银行",prop:"bankname"}},[a("el-input",{model:{value:e.amendForm.bankname,callback:function(t){e.$set(e.amendForm,"bankname",t)},expression:"amendForm.bankname"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"银行账号",prop:"bankcode"}},[a("el-input",{model:{value:e.amendForm.bankcode,callback:function(t){e.$set(e.amendForm,"bankcode",t)},expression:"amendForm.bankcode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"税号",prop:"dutycode"}},[a("el-input",{model:{value:e.amendForm.dutycode,callback:function(t){e.$set(e.amendForm,"dutycode",t)},expression:"amendForm.dutycode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"地址",prop:"address"}},[a("el-input",{model:{value:e.amendForm.address,callback:function(t){e.$set(e.amendForm,"address",t)},expression:"amendForm.address"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"邮编",prop:"zipcode"}},[a("el-input",{model:{value:e.amendForm.zipcode,callback:function(t){e.$set(e.amendForm,"zipcode",t)},expression:"amendForm.zipcode"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:e.amendForm.remark,callback:function(t){e.$set(e.amendForm,"remark",t)},expression:"amendForm.remark"}})],1)],1)],1),e._v(" "),a("el-row",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary",align:"center"},on:{click:function(t){e.submitAmendForm("amendForm")}}},[e._v("保存")])],1)],1)],1)])])},[],!1,null,"efcaba18",null);s.options.__file="TradingUnit.vue";t.default=s.exports},"9tsx":function(e,t,a){"use strict";var n=a("wrPi");a.n(n).a},S5jL:function(e,t,a){},WaTQ:function(e,t,a){"use strict";var n=a("S5jL");a.n(n).a},wrPi:function(e,t,a){}}]);