(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-bb2b"],{"/idF":function(t,e,a){"use strict";var n=a("8xvi");a.n(n).a},"5Bq5":function(t,e,a){},"8xvi":function(t,e,a){},NRIS:function(t,e,a){"use strict";a.r(e);var n={data:function(){return{permission:[],showSearch:!1,isShow:!0,PutInStorageModel:!1,formInline:{type:1,document_num:"",startTime:"",endTime:"",shop_id:"",user_id:"",status:2},forMation:{},data:[],newTableData:[],per_page:10,page:1,total:0,PutInStorageId:"",StaticGetBillingUser:[],shopList:[]}},created:function(){this.ajaxjson(),this.getStaticGetBillingUser(),this.getShopList();var t=sessionStorage.getItem("permission").split(",");this.permission=t},methods:{ajaxjson:function(){var t=this,e=this.formInline;e.per_page=this.per_page,e.page=this.page,this.$post(this.$transferOutList,e).then(function(e){0==e.status_code?(t.data=e.data.data,t.total=e.data.total,t.per_page=e.data.per_page):t.$message({type:"error",message:e.message})})},getShopList:function(){var t=this;this.$post(this.$staticGetCompanyShop).then(function(e){0==e.status_code&&(t.shopList=e.data.shopList)})},getStaticGetBillingUser:function(){var t=this,e={shop_id:sessionStorage.getItem("shop_id")};this.$post(this.$staticGetBillingUser,e).then(function(e){0==e.status_code&&(t.StaticGetBillingUser=e.data.user_list)})},handleSizeChange:function(t){this.per_page=t,this.ajaxjson()},handleCurrentChange:function(t){this.page=t,this.ajaxjson()},indexMethod:function(t){return(this.page-1)*this.per_page+t+1},addPurseMan:function(t){var e=this,a={id:t};this.PutInStorageId=t,this.$post(this.$transferOrderDetail,a).then(function(t){0==t.status_code?(e.forMation=t.data.transfer,e.newTableData=t.data.list,e.isShow=2):e.$message({type:"error",message:t.message}),console.log(t)})},getSummaries:function(t){var e=t.columns,a=t.data,n=[],s=[];return e.forEach(function(t,e){0!==e?("total_number"===t.property&&(s=a.map(function(t){return Number(t.total_number)})),"total_money"===t.property&&(s=a.map(function(t){return Number(t.total_money)})),"total_number"==t.property||"total_money"==t.property?(n[e]=s.reduce(function(t,e){var a=Number(e);return isNaN(a)?t:t+e},0),n[e]+=""):n[e]="--"):n[e]="合计"}),n[5]=n[5]/100,n},resetForm:function(t){this.formInline={type:1,document_num:"",startTime:"",endTime:"",shop_id:"",user_id:"",status:2},this.ajaxjson()},back_PurchseMan:function(){this.isShow=1},deleteAdd:function(){console.log("删除!")},bePutInStorage:function(t){this.PutInStorageId=t,this.PutInStorageModel=!0},sureBePutInStorage:function(){this.PutInStorageModel=!0},sure:function(){var t=this,e={id:this.PutInStorageId};this.$post(this.$transferStorageOrder,e).then(function(e){0==e.status_code?(t.$message({type:"success",message:e.message}),t.ajaxjson()):t.$message({type:"error",message:e.message})})},cancelPutInStorage:function(){this.PutInStorageModel=!1}}},s=(a("/idF"),a("Sdtd"),a("ZrdR")),l=Object(s.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:1==t.isShow,expression:"isShow == 1"}],staticClass:"tab-container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"80px",inline:!0},model:{value:t.formInline,callback:function(e){t.formInline=e},expression:"formInline"}},[a("div",{staticClass:"title"},[a("el-row",[a("el-col",[a("el-input",{staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"输入单据号"},model:{value:t.formInline.document_num,callback:function(e){t.$set(t.formInline,"document_num",e)},expression:"formInline.document_num"}},[a("el-button",{staticStyle:{"background-color":"#e0e0e0","border-radius":"0px"},attrs:{slot:"append",type:"primary"},on:{click:t.ajaxjson},slot:"append"},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"icon_search"}}),a("span",[t._v("搜索")])],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.showSearch=!t.showSearch}}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"filter"}}),t._v(" "),a("span",[t._v("筛选订单")])],1)],1)],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showSearch,expression:"showSearch"}],staticClass:"search"},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.formInline.startTime,callback:function(e){t.$set(t.formInline,"startTime",e)},expression:"formInline.startTime"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.formInline.endTime,callback:function(e){t.$set(t.formInline,"endTime",e)},expression:"formInline.endTime"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"调入店铺"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择"},model:{value:t.formInline.shop_id,callback:function(e){t.$set(t.formInline,"shop_id",e)},expression:"formInline.shop_id"}},t._l(t.shopList,function(t,e){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"制单人"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formInline.user_id,callback:function(e){t.$set(t.formInline,"user_id",e)},expression:"formInline.user_id"}},t._l(t.StaticGetBillingUser,function(t,e){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"单据状态"}},[a("el-radio-group",{model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-radio",{attrs:{label:2}},[t._v("所有")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("未入库")]),t._v(" "),a("el-radio",{attrs:{label:1}},[t._v("已入库")])],1)],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"bottomButton",attrs:{align:"center"}},[a("el-form-item",{attrs:{label:" ",align:"center"}},[a("el-button",{attrs:{name:"cancel"},on:{click:t.resetForm}},[t._v("清空")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.ajaxjson}},[t._v("确定")])],1)],1)],1)],1)]),t._v(" "),a("div",{staticClass:"tTable",attrs:{id:"printMe"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data,stripe:"",border:"","show-summary":"","summary-method":t.getSummaries,size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",index:t.indexMethod,fixed:"",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"document_num",label:"单据号",fixed:"",width:"150",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[-1!=t.permission.indexOf("126")?a("span",{staticStyle:{color:"#18CCBA",cursor:"pointer"},on:{click:function(a){t.addPurseMan(e.row.id)}}},[t._v(t._s(e.row.document_num))]):a("span",{staticStyle:{color:"#18CCBA",cursor:"pointer"}},[t._v(t._s(e.row.document_num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"单据日期",width:"150",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"shop_name",label:"调出店铺",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_number",label:"总数量",width:"100",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_money",label:"总金额",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v("\n\t\t\t\t\t\t\t"+t._s(e.row.total_money/100)+"\n\t\t\t\t\t\t")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"审核状态",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.status?a("el-button",{attrs:{type:"text"}},[t._v("未入库")]):t._e(),t._v(" "),1==e.row.status?a("el-button",{staticStyle:{color:"#666"},attrs:{type:"text"}},[t._v("已出库")]):t._e(),t._v(" "),2==e.row.status?a("el-button",{staticStyle:{color:"#666"},attrs:{type:"text"}},[t._v("全部")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"制单人"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return 0==e.row.status?[a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=t.permission.indexOf("127"),expression:"permission.indexOf('127') != -1"}],attrs:{size:"mini",type:"warning"},on:{click:function(a){t.bePutInStorage(e.row.role_id)}}},[t._v("入库")])]:void 0}}])})],1)],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.PutInStorageModel,expression:"PutInStorageModel"}],staticClass:"model"},[a("div",{staticClass:"PutInStorage"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px","font-size":"15px"},attrs:{span:12}},[t._v("\n\t\t\t\t\t入库\n\t\t\t\t")]),t._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text",name:"topRightCancel"},on:{click:t.cancelPutInStorage}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{staticClass:"text",attrs:{span:24}},[t._v("\n\t\t\t\t\t商品入库后不可修改删除,确定入库吗?\n\t\t\t\t")])],1),t._v(" "),a("el-row",{staticClass:"bottomButton",staticStyle:{"text-align":"center"}},[a("el-col",{attrs:{span:24}},[a("el-button",{attrs:{name:"cancel"},on:{click:t.cancelPutInStorage}},[t._v("\n\t\t\t\t\t\t取消\n\t\t\t\t\t")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.sure}},[t._v("\n\t\t\t\t\t\t确定\n\t\t\t\t\t")])],1)],1)],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==t.isShow,expression:"isShow == 2"}],staticClass:"tab-container"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[t._v("\n\t\t\t\t调拨入库订单\n\t\t\t")]),t._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text",name:"topRightCancel"},on:{click:t.back_PurchseMan}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),t._v(" "),a("div",{staticClass:"title"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-button",{attrs:{type:"primary"},on:{click:t.sureBePutInStorage}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"outStore"}}),t._v("\n\t\t\t\t\t\t\t入库\n\t\t\t\t\t")],1),t._v(" "),a("el-button",{attrs:{type:"primary"}},[t._v("打印")])],1)],1)],1),t._v(" "),a("div",{staticClass:"search1"},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"80px",inline:!0,model:t.forMation}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"单据号"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"",disabled:""},model:{value:t.forMation.document_num,callback:function(e){t.$set(t.forMation,"document_num",e)},expression:"forMation.document_num"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:t.forMation.created_at,callback:function(e){t.$set(t.forMation,"created_at",e)},expression:"forMation.created_at"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"调出店铺"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:t.forMation.shop_id,callback:function(e){t.$set(t.forMation,"shop_id",e)},expression:"forMation.shop_id"}},[a("el-option",{attrs:{label:"区域一",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"区域二",value:"2"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"摘要"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"",disabled:""},model:{value:t.forMation.remark,callback:function(e){t.$set(t.forMation,"remark",e)},expression:"forMation.remark"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"制单人"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""},model:{value:t.forMation.user_id,callback:function(e){t.$set(t.forMation,"user_id",e)},expression:"forMation.user_id"}},[a("el-option",{attrs:{label:"区域一",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"区域二",value:"2"}})],1)],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"tTable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.newTableData,stripe:"",border:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",fixed:"",width:"50",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"bar_code",label:"条形码",fixed:"",width:"150",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"norm",label:"商品名称规格",width:"200",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_num",label:"数量",width:"150",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"singleton",label:"吊牌价",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag_price",label:"小计",align:"center"}})],1)],1)],1)])},[],!1,null,"a4bc9102",null);l.options.__file="AllocatingStorage.vue";e.default=l.exports},Sdtd:function(t,e,a){"use strict";var n=a("5Bq5");a.n(n).a}}]);