(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-496b"],{"2Zyn":function(e,t,a){"use strict";a.r(t);var s=a("omC7"),n=a.n(s),o=a("6ZY3"),i=a.n(o),r={data:function(){return{takeStore:[{name:"全盘",value:1},{name:"抽盘",value:0}],permission:[],showSave:1,showSearch:!1,isShow:1,PutInStorageModel:!1,open_new_rult:!1,typeAndBarCode:{type:"",bar_code:""},formInline:{type:"",document_num:"",startTime:"",endTime:"",user_id:"",status:2},forMation:{document_num:"",storage_date:"",user_id:"",type:"",abstract:""},data:[],newTableData:[],color:[],size:[],sku_data:[],specificationOfGoods:[{color:"",size:"",stock:"",total_price:""}],disabled:!1,typeDisabled:!1,per_page:10,page:1,total:0,PutInStorageId:"",currentVendor:{},StaticGetBillingUser:[]}},created:function(){this.ajaxjson(),this.getStaticGetBillingUser();var e=sessionStorage.getItem("permission").split(",");this.permission=e},methods:{ajaxjson:function(){var e=this,t=this.formInline;t.per_page=this.per_page,t.page=this.page,this.$post(this.$inventoryList,t).then(function(t){0==t.status_code?(e.data=t.data.data,e.total=t.data.total,e.per_page=t.data.per_page):e.$message({type:"error",message:t.message})})},deletes:function(e){var t={id:e};this.$delete(this.$inventoryInventoryDel,t)},addPurseMan:function(){var e=this;this.$post(this.$storageGetBarCode).then(function(t){0==t.status_code&&(e.forMation.document_num=t.data.document_num,e.isShow=2,e.disabled=!1,e.showSave=1)})},getStaticGetBillingUser:function(){var e=this,t={shop_id:sessionStorage.getItem("shop_id")};this.$post(this.$staticGetBillingUser,t).then(function(t){0==t.status_code&&(e.StaticGetBillingUser=t.data.user_list)})},selectSupplier:function(e){var t=this;1==e?(this.typeDisabled=!0,this.$post(this.$inventoryAllReserve).then(function(e){if(0==e.status_code){for(var a=e.data,s=0;s<a.length;s++)a[s].number=a[s].reserve_count,a[s].price=a[s].tag_price/100,a[s].inventory_number="",a[s].contrast_number=0,a[s].contrast_money=0;t.newTableData=a,console.log(a)}})):(this.typeDisabled=!1,this.newTableData=[])},multiply:function(e){var t=Number(e.inventory_number),a=Number(e.number),s=Number(e.price);Number(e.contrast_number),Number(e.contrast_money);e.contrast_number=t-a,e.contrast_money=e.contrast_number*s},handleSizeChange:function(e){this.per_page=e,this.ajaxjson()},handleCurrentChange:function(e){this.page=e,this.ajaxjson()},indexMethod:function(e){return(this.page-1)*this.per_page+e+1},goToSeeEditor:function(e){var t=this,a={id:e.id};1==e.status?this.disabled=!0:this.disabled=!1,this.showSave=2,this.PutInStorageId=e.id,this.$post(this.$inventoryShopDetail,a).then(function(e){0==e.status_code?(t.forMation=e.data.inventory,t.newTableData=e.data.list,t.isShow=2):t.$message({type:"error",message:e.message}),console.log(e)})},addgoods:function(){var e=this,t=this.typeAndBarCode;1==t.type?this.$post(this.$staticGetCodeGoods,t).then(function(t){if(0==t.status_code){var a=t.data;a.price=a.sku_price/100,a.bar_code=a.barcode,a.norm=a.goods_name,a.number=a.reserve_count,a.inventory_number=0,a.contrast_number=0,a.contrast_money=0;for(var s=!0,n=0;n<e.newTableData.length;n++)a.id==e.newTableData[n].id&&(s=!1);s?(console.log(a),e.newTableData.push(a)):e.$message({type:"error",message:"您已经添加过该商品了"})}else e.$message({type:"error",message:t.message})}):2==t.type&&this.$post(this.$staticGetCodeGoods,t).then(function(t){0==t.status_code?(e.color=t.data.sale_attrs[0].data,e.size=t.data.sale_attrs[1].data,e.sku_data=t.data.sku_data,e.open_new_rult=!0):e.$message({type:"error",message:t.message})})},sureColor:function(e,t,a){if(t.size){for(var s=!0,n=t.color+"|"+t.size,o=0;o<this.specificationOfGoods.length;o++)this.specificationOfGoods[o].specnamestr==n&&(s=!1);if(s)for(var r=0;r<this.sku_data.length;r++)return void(this.sku_data[r].specnamestr==n&&((t=i()(t,this.sku_data[r])).price=t.sku_price/100,t.unit_price=t.price*t.discount,t.total_price=t.price*t.stock));else this.$message({type:"error",message:"您已添加过该商品,请勿重复添加!"})}},sureSize:function(e,t,a){if(t.color){for(var s=!0,n=t.color+"|"+t.size,o=0;o<this.specificationOfGoods.length;o++)this.specificationOfGoods[o].specnamestr==n&&(s=!1);if(s)for(var r=0;r<this.sku_data.length;r++)this.sku_data[r].specnamestr==n&&((t=i()(t,this.sku_data[r])).price=t.sku_price/100);else this.$message({type:"error",message:"您已添加过该商品,请勿重复添加!"})}},addRow:function(e){if(e.sku_price){this.specificationOfGoods.push({color:"",size:"",stock:"",total_price:""})}else this.$message({type:"error",message:"请先完善该条信息!"})},reduceRow:function(e){this.specificationOfGoods.splice(e,1)},sureAddNext:function(){var e=this.$coppyArray(this.specificationOfGoods),t=this.$coppyArray(this.newTableData),a=[];this.specificationOfGoods=[{color:"",size:"",stock:"",total_price:""}];for(var s=0;s<e.length;s++)if(e[s].bar_code=e[s].barcode,e[s].norm=e[s].goods_name+"|"+e[s].specnamestr,e[s].number=e[s].reserve_count,e[s].inventory_number=Number(e[s].stock),e[s].contrast_number=e[s].inventory_number-Number(e[s].number),e[s].contrast_money=e[s].contrast_number*Number(e[s].price),delete e[s].color,delete e[s].size,delete e[s].specnamestr,delete e[s].total_price,delete e[s].sku_price,0==t.length)a.push(e[s]);else for(var n=0;n<t.length;n++)e[s].sku_id==t[n].sku_id?(t[n].inventory_number=Number(t[n].inventory_number)+Number(e[s].inventory_number),t[n].contrast_number=Number(t[n].contrast_number)+Number(e[s].contrast_number)):a.push(e[s]);this.newTableData=t.concat(a)},saveNotAudit:function(){var e=this,t=this.$objDeepCopy(this.forMation);""==t.user_id&&(t.user_id=sessionStorage.getItem("id"));var a=this.$coppyArray(this.newTableData);t.shopArr=n()(a),this.$post(this.$inventoryAddInventory,t).then(function(t){0==t.status_code?(e.$message({type:"success",message:t.message}),e.isShow=1,e.newTableData=[],e.ajaxjson()):e.$message({type:"error",message:t.message})})},saveandsubmit:function(){var e=this,t=this.$objDeepCopy(this.forMation);""==t.user_id&&(t.user_id=sessionStorage.getItem("id"));var a=this.$coppyArray(this.newTableData);t.shopArr=n()(a),this.$post(this.$inventoryAddInventory,t).then(function(t){if(0==t.status_code){var a={id:t.data.inventory_id};e.$post(e.$inventoryBalance,a).then(function(t){0==t.status_code?(e.$message({type:"success",message:t.message}),e.isShow=1,e.newTableData=[],e.ajaxjson()):e.$message({type:"error",message:t.message})})}else e.$message({type:"error",message:t.message})})},EditOutOrder:function(){var e=this,t=this.$objDeepCopy(this.forMation);""==t.user_id&&(t.user_id=sessionStorage.getItem("id"));var a=this.$coppyArray(this.newTableData);t.shopArr=n()(a),this.$post(this.$inventoryEditInventory,t).then(function(t){0==t.status_code?(e.$message({type:"success",message:t.message}),e.ajaxjson()):e.$message({type:"error",message:t.message})})},resetForm:function(e){this.formInline={type:"",document_num:"",startTime:"",endTime:"",user_id:"",status:2},this.ajaxjson()},back_PurchseMan:function(){this.isShow=1},cancel_new_rult:function(){this.open_new_rult=!1},deleteAdd:function(){console.log("删除!")},bePutInStorage:function(e){this.PutInStorageId=e,this.PutInStorageModel=!0},sureBePutInStorage:function(){this.PutInStorageModel=!0},sure:function(){var e=this,t={id:this.PutInStorageId};this.$post(this.$inventoryBalance,t).then(function(t){0==t.status_code?(e.$message({type:"success",message:t.message}),e.ajaxjson()):e.$message({type:"error",message:t.message}),e.PutInStorageModel=!1})},cancelPutInStorage:function(){this.PutInStorageModel=!1}}},l=(a("zTHF"),a("5nbe"),a("ZrdR")),c=Object(l.a)(r,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.isShow,expression:"isShow == 1"}],staticClass:"tab-container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"80px",inline:!0},model:{value:e.formInline,callback:function(t){e.formInline=t},expression:"formInline"}},[a("div",{staticClass:"title"},[a("el-row",[a("el-col",[a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("136"),expression:"permission.indexOf('136') != -1"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:e.addPurseMan}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"add"}}),e._v(" "),a("span",[e._v("新增")])],1),e._v(" "),a("el-input",{staticStyle:{width:"300px","margin-right":"20px"},attrs:{placeholder:"输入单据号"},model:{value:e.formInline.document_num,callback:function(t){e.$set(e.formInline,"document_num",t)},expression:"formInline.document_num"}},[a("el-button",{staticStyle:{"background-color":"#e0e0e0","border-radius":"0px"},attrs:{slot:"append",type:"primary"},on:{click:e.ajaxjson},slot:"append"},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"icon_search"}}),a("span",[e._v("搜索")])],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.showSearch=!e.showSearch}}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"filter"}}),e._v(" "),a("span",[e._v("筛选订单")])],1)],1)],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],staticClass:"search"},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"开始时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.formInline.startTime,callback:function(t){e.$set(e.formInline,"startTime",t)},expression:"formInline.startTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"结束时间"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:e.formInline.endTime,callback:function(t){e.$set(e.formInline,"endTime",t)},expression:"formInline.endTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"盘点类型"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},[a("el-option",{attrs:{label:"全盘",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"抽盘",value:"0"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"制单人"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formInline.user_id,callback:function(t){e.$set(e.formInline,"user_id",t)},expression:"formInline.user_id"}},e._l(e.StaticGetBillingUser,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"单据状态"}},[a("el-radio-group",{model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status"}},[a("el-radio",{attrs:{label:2}},[e._v("全部")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("已提交")]),e._v(" "),a("el-radio",{attrs:{label:0}},[e._v("未提交")])],1)],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"bottomButton",attrs:{align:"center"}},[a("el-form-item",{attrs:{label:" ",align:"center"}},[a("el-button",{attrs:{name:"cancel"},on:{click:e.resetForm}},[e._v("清空")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.ajaxjson}},[e._v("确定")])],1)],1)],1)],1)]),e._v(" "),a("div",{staticClass:"tTable",attrs:{id:"printMe"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.data,stripe:"",border:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",index:e.indexMethod,fixed:"",width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"document_num",label:"单据号",fixed:"",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[-1!=e.permission.indexOf("138")?a("span",{staticStyle:{color:"#18CCBA",cursor:"pointer"},on:{click:function(a){e.goToSeeEditor(t.row)}}},[e._v(e._s(t.row.document_num))]):a("span",{staticStyle:{color:"#18CCBA",cursor:"pointer"}},[e._v(e._s(t.row.document_num))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"单据日期",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"type",label:"盘点类型",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.type?a("span",[e._v("抽盘")]):e._e(),e._v(" "),1==t.row.type?a("span",[e._v("全盘")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"number",label:"盈亏数量",width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"money",label:"盈亏金额",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.money/100))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"审核状态",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?a("span",{attrs:{type:"text"}},[e._v("未提交")]):e._e(),e._v(" "),1==t.row.status?a("span",{attrs:{type:"text"}},[e._v("已提交")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"制单人"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return 0==t.row.status?[a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("139"),expression:"permission.indexOf('139') != -1"}],attrs:{size:"mini",type:"warning"},on:{click:function(a){e.bePutInStorage(t.row.id)}}},[e._v("提交")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("235"),expression:"permission.indexOf('235') != -1"}],attrs:{size:"mini",type:"danger"},on:{click:function(a){e.deletes(t.row.id)}}},[e._v("删除")])]:void 0}}])})],1)],1),e._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"15px"}},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[10,20,30,40],"page-size":100,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.PutInStorageModel,expression:"PutInStorageModel"}],staticClass:"model"},[a("div",{staticClass:"PutInStorage"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[e._v("\n\t\t\t\t\t提交\n\t\t\t\t")]),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text",name:"topRightCancel"},on:{click:e.cancelPutInStorage}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"text",attrs:{span:24}},[e._v("\n\t\t\t\t\t确定提交?\n\t\t\t\t")])],1),e._v(" "),a("el-row",{staticClass:"bottomButton bottom"},[a("el-col",{attrs:{span:24}},[a("el-button",{attrs:{name:"cancel"},on:{click:e.cancelPutInStorage}},[e._v("\n\t\t\t\t\t\t取消\n\t\t\t\t\t")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.sure}},[e._v("\n\t\t\t\t\t\t确定\n\t\t\t\t\t")])],1)],1)],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.isShow,expression:"isShow == 2"}],staticClass:"tab-container"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[e.disabled?e._e():a("span",[e._v("新增")]),e._v("库存盘点单\n\t\t\t")]),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text",name:"topRightCancel"},on:{click:e.back_PurchseMan}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"title"},[a("el-row",{directives:[{name:"show",rawName:"v-show",value:!e.disabled,expression:"!disabled"}]},[a("el-col",{attrs:{span:24}},[1==e.showSave?a("el-button",{attrs:{type:"primary"},on:{click:e.saveNotAudit}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"icon_save"}}),e._v(" "),a("span",[e._v("保存")])],1):e._e(),e._v(" "),1==e.showSave?a("el-button",{attrs:{type:"primary"},on:{click:e.saveandsubmit}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"icon_submit"}}),e._v(" "),a("span",[e._v("提交")])],1):e._e(),e._v(" "),2==e.showSave?a("el-button",{directives:[{name:"show",rawName:"v-show",value:-1!=e.permission.indexOf("137"),expression:"permission.indexOf('137') != -1"}],attrs:{type:"primary"},on:{click:e.EditOutOrder}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"icon_save"}}),e._v(" "),a("span",[e._v("保存")])],1):e._e(),e._v(" "),2==e.showSave?a("el-button",{attrs:{type:"primary"},on:{click:e.sureBePutInStorage}},[a("svg-icon",{staticStyle:{"margin-right":"10px"},attrs:{"icon-class":"icon_submit"}}),e._v(" "),a("span",[e._v("提交")])],1):e._e()],1)],1)],1),e._v(" "),a("div",{staticClass:"search1"},[a("el-form",{staticClass:"demo-form-inline",attrs:{"label-width":"80px",inline:!0,model:e.forMation}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"单据号"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"",disabled:""},model:{value:e.forMation.document_num,callback:function(t){e.$set(e.forMation,"document_num",t)},expression:"forMation.document_num"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"选择日期",disabled:""},model:{value:e.forMation.storage_date,callback:function(t){e.$set(e.forMation,"storage_date",t)},expression:"forMation.storage_date"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"盘点类型"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择",disabled:e.disabled},on:{change:e.selectSupplier},model:{value:e.forMation.type,callback:function(t){e.$set(e.forMation,"type",t)},expression:"forMation.type"}},e._l(e.takeStore,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"摘要"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"请输入",disabled:e.disabled},model:{value:e.forMation.abstract,callback:function(t){e.$set(e.forMation,"abstract",t)},expression:"forMation.abstract"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"制单人"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:e.disabled},model:{value:e.forMation.user_id,callback:function(t){e.$set(e.forMation,"user_id",t)},expression:"forMation.user_id"}},e._l(e.StaticGetBillingUser,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1)],1)],1)],1),e._v(" "),a("el-row",{staticClass:"search2",staticStyle:{"margin-top":"20px","margin-bottom":"10px"}},[a("el-col",{attrs:{span:12}},[a("el-button",{attrs:{type:"text"}})],1),e._v(" "),a("el-col",{directives:[{name:"show",rawName:"v-show",value:!e.typeDisabled,expression:"!typeDisabled"}],staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-input",{staticClass:"input-with-select",staticStyle:{width:"400px"},attrs:{placeholder:"请输入内容",disabled:e.disabled},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.addgoods(t):null}},model:{value:e.typeAndBarCode.bar_code,callback:function(t){e.$set(e.typeAndBarCode,"bar_code",t)},expression:"typeAndBarCode.bar_code"}},[a("el-select",{attrs:{slot:"prepend",placeholder:"请选择",disabled:e.disabled},slot:"prepend",model:{value:e.typeAndBarCode.type,callback:function(t){e.$set(e.typeAndBarCode,"type",t)},expression:"typeAndBarCode.type"}},[a("el-option",{attrs:{label:"条码",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"货号",value:"2"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"tTable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.newTableData,stripe:"",border:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",fixed:"",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"bar_code",label:"条形码",fixed:"",width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"norm",label:"商品规格名称",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"number",label:"库存数量",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"吊牌价",width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"inventory_number",label:"盘点数量",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.disabled?a("span",[e._v(e._s(t.row.inventory_number))]):a("el-input",{attrs:{size:"small",placeholder:"",align:"center"},on:{change:function(a){e.multiply(t.row)}},model:{value:t.row.inventory_number,callback:function(a){e.$set(t.row,"inventory_number",a)},expression:"scope.row.inventory_number"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"contrast_number",label:"盘亏数量",width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contrast_money",label:"盘亏金额",align:"center"}}),e._v(" "),e.disabled?e._e():a("el-table-column",{attrs:{label:"操作",width:"200",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e.typeDisabled?void 0:[a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){e.deleteAdd()}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.open_new_rult,expression:"open_new_rult"}],staticClass:"model"},[a("div",{staticClass:"model_con"},[a("el-row",{staticClass:"model_title"},[a("el-col",{staticStyle:{"border-left":"#13C2C2 3px solid","padding-left":"15px"},attrs:{span:12}},[e._v("\n\t\t\t\t\t\t选择商品明细\n\t\t\t\t\t")]),e._v(" "),a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[a("el-button",{attrs:{type:"text",name:"topRightCancel"},on:{click:e.cancel_new_rult}},[a("svg-icon",{attrs:{"icon-class":"cancel"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"oTable",staticStyle:{"margin-top":"20px"}},[a("el-table",{attrs:{data:e.specificationOfGoods,stripe:"",border:"","max-height":"400",size:"mini",border:""}},[a("el-table-column",{attrs:{prop:"color",label:"颜色",fixed:"",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{size:"medium","value-key":"index"},on:{change:function(a){e.sureColor(a,t.row,t.$index)}},model:{value:t.row.color,callback:function(a){e.$set(t.row,"color",a)},expression:"scope.row.color"}},e._l(e.color,function(e){return a("el-option",{key:e,attrs:{value:e,label:e}})}))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"size",label:"尺码",width:"120",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{attrs:{size:"medium"},on:{change:function(a){e.sureSize(a,t.row,t.$index)}},model:{value:t.row.size,callback:function(a){e.$set(t.row,"size",a)},expression:"scope.row.size"}},e._l(e.size,function(e){return a("el-option",{key:e,attrs:{value:e,label:e}})}))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"stock",label:"数量",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{size:"small",placeholder:"请输入",align:"center"},model:{value:t.row.stock,callback:function(a){e.$set(t.row,"stock",a)},expression:"scope.row.stock"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"reserve_count",label:"库存",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",label:"吊牌价",width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1!=e.specificationOfGoods.length?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.reduceRow(t.$index)}}},[a("svg-icon",{attrs:{"icon-class":"icon_reduce"}})],1):e._e(),e._v(" "),1==e.specificationOfGoods.length||t.$index==e.specificationOfGoods.length-1?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.addRow(t.row)}}},[a("svg-icon",{attrs:{"icon-class":"icon_increase"}})],1):e._e()]}}])})],1)],1),e._v(" "),a("el-row",[a("el-col",{staticClass:"bottomButton",staticStyle:{"margin-top":"20px","text-align":"right"},attrs:{span:24}},[a("el-button",{attrs:{name:"cancel"},on:{click:e.cancel_new_rult}},[e._v("取消")]),e._v(" "),a("el-button",{staticStyle:{float:"right","margin-right":"30px"},attrs:{type:"primary"},on:{click:e.sureAddNext}},[e._v("确定")])],1)],1)],1)])],1)])},[],!1,null,"e4d859a0",null);c.options.__file="StockTaking.vue";t.default=c.exports},"5nbe":function(e,t,a){"use strict";var s=a("sSxC");a.n(s).a},NRzf:function(e,t,a){},sSxC:function(e,t,a){},zTHF:function(e,t,a){"use strict";var s=a("NRzf");a.n(s).a}}]);