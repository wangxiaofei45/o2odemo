
<template>
	<div>
		<!--采购入库单-->
		<div class="tab-container" v-show="isShow">
			<div class="title">
				<el-row>
					<el-col >
						<el-button type="primary" @click="AddPurchasingSystem" ><i class="erp-icon-xinzeng"></i>新增</el-button>
						<el-button type="primary"><i class="erp-icon-fahuo"></i>供应商发货</el-button>
						<el-button type="primary"><i class="erp-icon-bianji"></i>编辑</el-button>
						<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px"></el-input>
						<el-button type="primary"><i class="erp-icon-sousuo"></i>搜索</el-button>
						<el-button type="primary"><i class="erp-icon-shaixuan"></i>筛选订单</el-button>
						<!-- <el-button type="primary" @click="addPurseMan">新增</el-button> -->
					</el-col>
				</el-row>
			</div>
			<div class="search">
					<el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" v-model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="6">
								<el-form-item label="开始时间">
									<el-date-picker  type="date" placeholder="选择日期"  v-model="formInline.dateStart">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="结束时间">
									<el-date-picker type="date" placeholder="选择日期" v-model="formInline.dateEnd">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="店铺">
									<el-select v-model="formInline.shop" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="供应商">
									<el-select v-model="formInline.supplier" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label="货号">
									<el-select v-model="formInline.Freightnumber" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"> </el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="自编号">
									<el-input v-model="formInline.number" placeholder="审批人" style="width:220px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="摘要">
									<el-input v-model="formInline.abstract" placeholder="" style="width:200px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="采购订单">
									<el-select v-model="formInline.order" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"> </el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label="制单人">
									<el-select v-model="formInline.user" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="18">
								<el-form-item label="单据状态">
									<el-radio-group v-model="formInline.radio">
										<el-radio :label="3">所有</el-radio>
										<el-radio :label="6">未提交</el-radio>
										<el-radio :label="9">已提交</el-radio>
									</el-radio-group>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col align="center">
								<el-form-item label=" " align="center">
									<el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
									<el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
								</el-form-item> 
							</el-col>
						</el-row>
					</el-form>
			</div>
			<div class="tTable">
				<el-table :data="data" stripe border show-summary style="width: 100%;" size="mini" @selection-change="SelectionChange">
					<el-table-column type="selection" width="60" fixed align="center">
					</el-table-column>
					<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
					</el-table-column>
					<el-table-column prop="shop_id" label="单据号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="name" label="单据日期" width="100" align="center">
					</el-table-column>
					<el-table-column prop="address" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="telphone" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="retailprice" label="总数量" width="100" align="center">
					</el-table-column>
					
					<el-table-column prop="morning" label="审核状态" width="100" align="center">
					</el-table-column>
					<el-table-column prop="afternoon" label="制单人" width="100" align="center">
					</el-table-column>
					<el-table-column prop="allocationprice" label="摘要"  align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row.role_id)">修改</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 新增采购入库单 -->
		<div class="tab-container" v-show="addPurchasSystem">
			<div class="title">
				<el-row>
					<el-col >
						<el-button type="primary" ><i class="erp-icon-tijiao"></i>提交</el-button>
						<el-button type="primary" @click="pay_money"><i class="erp-icon-fukuan"></i>付款</el-button>
						<el-button type="primary" @click="openPurchase"><i class="erp-icon-common-zairushuju-copy"></i>载入采购单</el-button>
						<el-button type="primary" @click="Delete"><i class="erp-icon-shanchu"></i>删除单据</el-button>
						<el-button type="primary" @click="discount"><i class="erp-icon-discount"></i>整单打折</el-button>
						<el-button type="primary"><i class="erp-icon-dayin"></i>打印</el-button>
						<el-button type="primary" @click="importData"><i class="erp-icon-daoru"></i>导入</el-button>
						<el-button type="primary" @click="exportExcel"><i class="erp-icon-daoru"></i>导出</el-button>
						<el-button type="primary"  icon="el-icon-error" @click="back_PurchseMan" style="float:right"></el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="forMation" class="demo-form-inline">
						<el-row>
							<el-col :span="6">
								<el-form-item label="单据号">
									<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="日期">
									<el-date-picker
										v-model="forMation.date"
										type="date"
										placeholder="选择日期">
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="店铺">
									<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
								<el-col :span="6">
								<el-form-item label="供应商">
									<el-select v-model="forMation.Supplier" placeholder="">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label="费用">
									<el-input v-model="forMation.cost" placeholder="" style="width:220px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="自编号">
									<el-input v-model="forMation.number" placeholder="" style="width:220px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="摘要">
									<el-input v-model="forMation.abstract" placeholder="" style="width:220px;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="制单人">
									<el-select v-model="forMation.user" placeholder="邢建辉">
										<el-option label="区域一" value="1"></el-option>
										<el-option label="区域二" value="2"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
				</el-form>
			</div>
			<el-row style="margin-top:20px;margin-bottom:10px;">
				<el-col :span="24">
					<el-button type="primary" style="float:right;margin-right:30px" >扫码添加</el-button>
					<el-button type="primary" style="float:right;margin-right:30px" @click="open_newInfo">添加商品</el-button>
				</el-col>
			</el-row>
			<div class="tTable">
				<el-table :data="data" stripe border show-summary style="width: 100%;" size="mini" @selection-change="SelectionChange">
					<el-table-column type="selection" width="60" fixed align="center">
					</el-table-column>
					<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
					</el-table-column>
					<el-table-column prop="shop_id" label="货号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="name" label="商品名称" width="100" align="center">
					</el-table-column>
					<el-table-column prop="address" label="单位" width="100" align="center">
					</el-table-column>
					<el-table-column prop="telphone" label="颜色" width="100" align="center">
					</el-table-column>
					<el-table-column prop="retailprice" label="小计" width="100" align="center">
					</el-table-column>
					<el-table-column prop="morning" label="原价" width="100" align="center">
					</el-table-column>
					<el-table-column prop="afternoon" label="折扣" width="100" align="center">
					</el-table-column>
					<el-table-column prop="allocationprice" label="单价"  align="center">
					</el-table-column>
					<el-table-column prop="allocationprice" label="总金额"  align="center">
					</el-table-column>
					<el-table-column prop="allocationprice" label="备注"  align="center">
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" icon="el-icon-edit" @click="amend(scope.row.role_id)">修改</el-button>
							<el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--添加商品-->
			<div class="model" v-show="new_info_model">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							新增商品
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_newInfo">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
								<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px"></el-input>
								<el-button type="primary">搜索</el-button>
								<el-button type="primary">添加</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="dataTable" stripe border show-summary style="width: 100%;" size="mini" @selection-change="tableChange">
							<!-- <el-table-column type="selection" width="60" fixed align="center">
							</el-table-column> -->
							<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
							</el-table-column>
							<el-table-column prop="shop_id" label="图片"  width="100" align="center">
							</el-table-column>
							<el-table-column prop="name" label="货号" width="100" align="center">
							</el-table-column>
							<el-table-column prop="address" label="商品名称" width="100" align="center">
							</el-table-column>
							<el-table-column prop="telphone" label="品牌" width="100" align="center">
							</el-table-column>
							<el-table-column prop="retailprice" label="类型" width="100" align="center">
							</el-table-column>
							
							<el-table-column prop="morning" label="零售价" min-width="100" align="center">
							</el-table-column>
							
							<el-table-column label="操作" width="200" fixed="right" align="center">
								<template slot-scope="scope">
									<el-button size="mini" type="primary" icon="el-icon-edit" @click="addrult">添加商品规格</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<!--选择规格-->
			<div class="model" v-show="open_new_rult">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							选择商品明细：0002,休闲馆
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_new_rult">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
							<el-table :data="dataData" stripe border style="width: 100%;" max-height="300"  size="mini" border  show-summary>
								<el-table-column prop="color" label="颜色" fixed width="100" align="center" sortable>
									<template slot-scope="scope">
										<el-select size="medium" v-model="scope.row.color" >
										<el-option v-for=""  value="1">
										</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column prop="all_id" label="尺码"  width="100" align="center">
									<template slot-scope="scope">
										<el-select size="medium" v-model="scope.row.all_id" >
										<el-option v-for=""  value="1">
										</el-option>
										</el-select>
									</template>
								</el-table-column>
								<el-table-column prop="rulte_01" label="原价" width="100" align="center">
								</el-table-column>
								<el-table-column prop="rulte_02" label="折扣" width="200" align="center">
										<template slot-scope="scope">
											<el-input size="small" v-model="scope.row.rulte_02" placeholder="" align="center"></el-input>
										</template>
								</el-table-column>
								<el-table-column prop="rulte_03" label="单价" width="100" align="center">
										<template slot-scope="scope">
									<el-input size="small" v-model="scope.row.rulte_03" placeholder="" align="center"></el-input>
									</template>
								</el-table-column>
								<el-table-column prop="rulte_03" width="100" align="center">
									<template slot-scope="scope">
										<el-button type="primary" v-if="dataData.length !== 1 && scope.$index === dataData.length-2" size="mini" icon="el-icon-remove" @click="reduceRow(index)"></el-button>
										<el-button type="primary" v-if="dataData.length===1||scope.$index===dataData.length-1" size="mini" icon="el-icon-circle-plus" @click="addRow"></el-button>
									</template> 
								</el-table-column>
							</el-table>
						</div>
					<el-row>
						<el-col :span="12" style="margin-top:20px;">
							<el-row>
								<el-col :span="12">
									<el-radio v-model="radio" label="1">同款折扣</el-radio>
									<el-input v-model="input" placeholder="请输入内容" style="width:100px;"></el-input>
								</el-col>
								<el-col :span="12">
									<el-radio v-model="radio" label="2">同款单价</el-radio>
									<el-input v-model="input" placeholder="请输入内容" style="width:100px;"></el-input>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12" style="margin-top:20px;">
							<el-button type="primary" style="float:right;margin-right:30px" >确定</el-button>
							<el-button type="primary" style="float:right;margin-right:30px" @click="showPurchaseHistory">显示采购历史</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!-- 显示采购历史 -->
			<div class="model" v-show="isPurchaseHistory">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							选择商品明细：0002，休闲部
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_PurchaseHistory">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="dataTable" stripe border show-summary size="mini" @selection-change="tableChange">
							<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
							</el-table-column>
							<el-table-column prop="shop_id" label="单据号"  width="100" align="center">
							</el-table-column>
							<el-table-column prop="name" label="单据日期" width="100" align="center">
							</el-table-column>
							<el-table-column prop="address" label="颜色" width="100" align="center">
							</el-table-column>
							<el-table-column prop="telphone" label="原价" width="100" align="center">
							</el-table-column>
							<el-table-column prop="retailprice" label="折扣" width="100" align="center">
							</el-table-column>
							
							<el-table-column prop="morning" label="单价" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="总金额" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="备注" min-width="100" align="center">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<!-- 合并采购单 -->
			<div class="model" v-show="isMerge">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							合并客户订单
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_Merge">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="dataTable" stripe border show-summary style="width: 100%;" size="mini" @selection-change="tableChange">
							<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
							</el-table-column>
							<el-table-column prop="shop_id" label="单据号"  width="100" align="center">
							</el-table-column>
							<el-table-column prop="name" label="单据日期" width="100" align="center">
							</el-table-column>
							<el-table-column prop="address" label="店铺" width="100" align="center">
							</el-table-column>
							<el-table-column prop="telphone" label="客户名称" width="100" align="center">
							</el-table-column>
							<el-table-column prop="retailprice" label="总数量" width="100" align="center">
							</el-table-column>
							
							<el-table-column prop="morning" label="总金额" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="摘要" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="制单人" min-width="100" align="center">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<!-- 付款 -->
			<div class="model" v-show="isPay_money">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							付款
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="cancel_pay_money">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-form ref="form1" :model="form" label-width="80px">
						<el-row>
							<el-col :span="12">
								<el-form-item label="本单应付">
									<el-input placeholder="请输入内容" v-model="form.name">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="上次欠款">
									<el-input placeholder="请输入内容" v-model="form.money">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="整单折扣">
									<el-input v-model="form.count"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="优惠金额">
									<el-input placeholder="请输入内容" v-model="form.reduce">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24">
								<el-form-item label="累计欠数">
									<el-input placeholder="请输入内容"  style="width:200px" v-model="form.totalCount">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="现金">
									<!-- <el-input v-model="form.cashe"></el-input> -->
									<el-input placeholder="请输入内容" v-model="form.cashe">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="微信">
									<!-- <el-input v-model="form.money_wx"></el-input> -->
										<el-input placeholder="请输入内容" v-model="form.money_wx">
									<template >元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="支付宝">
									<!-- <el-input v-model="form.money_zfb"></el-input> -->
										<el-input placeholder="请输入内容" v-model="form.money_zfb">
									<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="银行卡">
										<el-input placeholder="请输入内容" v-model="form.card">
									<template >元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="12">
								<el-form-item label="付款合计">
									<el-input placeholder="请输入内容" v-model="form.totalMoney">
										<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="本单挂账">
									<el-input placeholder="请输入内容" v-model="form.money_gz">
										<template>元</template>
									</el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item>
							<el-radio-group v-model="form.radio2">
								<el-radio :label="3">备选项</el-radio>
								<el-radio :label="6">备选项</el-radio>
								<el-radio :label="9">备选项</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<!-- 载入采购单 -->
			<div class="model" v-show="isOpen">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							合并客户订单
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="isclose">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="oTable" style="margin-top:20px">
						<el-table :data="dataTable" stripe border show-summary style="width: 100%;" size="mini" @selection-change="tableChange">
							<el-table-column prop="role_id" label="序号" fixed width="100" align="center" sortable>
							</el-table-column>
							<el-table-column prop="shop_id" label="单据号"  width="100" align="center">
							</el-table-column>
							<el-table-column prop="name" label="单据日期" width="100" align="center">
							</el-table-column>
							<el-table-column prop="address" label="店铺" width="100" align="center">
							</el-table-column>
							<el-table-column prop="telphone" label="供应商" width="100" align="center">
							</el-table-column>
							<el-table-column prop="retailprice" label="总金额" width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="总金额" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="订货数" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="已发货" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="未发货" min-width="100" align="center">
							</el-table-column>
							<el-table-column prop="morning" label="制单人" min-width="100" align="center">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
			<!-- 删除单据 -->
			<div class="model" v-show="isDelete">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							删除单据
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_Deleted">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
						<p class="delete">单据信息以及商品明细将全部删除，并且不可恢复，确认删除？</p>
					<el-row>
						<el-col :span="24" align="center">
							<el-button>取消</el-button>
							<el-button>确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!-- 整单打折 -->
			<div class="model" v-show="isDisCount">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							整单打折
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_Discount">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<el-row style="margin:10px auto">
						<el-col :span="18" style="margin-top:30px" align="center">
							<label for="">
							<span>整单打折</span>
							<el-input v-model="pay_disCount" style="width:300px;"></el-input>
						</label>
						</el-col>
					</el-row>
					<el-row style="margin-top:50px;">
						<el-col :span="24" align="center">
							<el-button>取消</el-button>
							<el-button>确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!-- 导入 -->
			<!-- <div class="model" v-show="isImport">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							导入
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_import">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="information">
						<p style="width:400px;margin:20px auto;"></p>
						<el-row>
						<el-col :span="24" align="center">
							<el-button>下载模板</el-button>
							<el-button>上传文件</el-button>
						</el-col>
						</el-row>
					</div>
					<el-row>
						<el-col :span="24" align="center">
							<el-button>取消</el-button>
							<el-button>确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>	 -->
				<el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
						<div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
							<el-upload class="upload-demo"
							:action="importUrl"
							:name ="name"
							:headers="importHeaders"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-upload="beforeUpload"
							:on-error="uploadFail"
							:on-success="uploadSuccess"
							:file-list="fileList"
							:with-credentials="withCredentials">
							<!-- 是否支持发送cookie信息 -->
							<el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
							<div slot="tip" class="el-upload__tip">只能上传excel文件</div>
							</el-upload>
							<div class="download-template">
								<a class="btn-download" @click="download">
								<i class="icon-download"></i>下载模板</a>
							</div>
						</div>
						<div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
							<div class="failure-tips">
							<i class="el-icon-warning"></i>导入失败</div>
							<div class="failure-reason">
							<h4>失败原因</h4>
							<ul>
								<li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
							</ul>
							</div>
						</div>
    				</el-dialog>
			<!-- 导出 -->
			<div class="model" v-show="isExport">
				<div class="model_con">
					<el-row class="model_title">
						<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
							导出
						</el-col>
						<el-col :span="12" style="text-align: right;">
							<el-button type="text" @click="close_export">
								<svg-icon icon-class="cancel" />
							</el-button>
						</el-col>
					</el-row>
					<div class="information">
						<p style="width:400px;margin:20px auto;"></p>
						<el-row>
						<el-col :span="24" align="center">
							<el-button>下载模板</el-button>
							<el-button>上传文件</el-button>
						</el-col>
					</el-row>
					</div>
					<el-row>
						<el-col :span="24" align="center">
							<el-button>取消</el-button>
							<el-button>确定</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			 formInline: {   
				dateStart:'1',
				dateEnd:'',
				shop:'',
				supplier:'',
				Freightnumber:'',
				number:'',
				abstract:'',
				radio:3,
				user:'',
				order:'',
			 },
			 forMation: {   //表单对象
				documentnumber:'',
				shop:'',
				shop1:'',
				date:'',
				supplier:'',
				cost:'',
				number:'',
				abstract:'',
				user:'',
			 },
			 labelPosition: 'right', //lable对齐方式
			 labelWidth: '80px' ,  //lable宽度
			 input: '',
			 isShow:true,
			 addPurchasSystem:false,
			form: {
				name: '',
				money:'',
				count:'',
				reduce:'',
				totalCount:'',
				cashe:'',
				money_wx:'',
				money_zfb:'',
				card:'',
				totalMoney:'',
				money_gz:'',
				type: [],
				radio2:3,
			},
			form1: {
				name: '',
				money:'',
				count:'',
				reduce:'',
				totalCount:'',
				cashe:'',
				money_wx:'',
				money_zfb:'',
				card:'',
				totalMoney:'',
				money_gz:'',
				type: [],
			},
			pay_disCount:1.0,
			new_info_model: false,
			open_new_rult:false,
			radio:1,
			isPurchaseHistory:false,
			isMerge:false,
			isPay_money:false,
			isOpen:false,
			isDelete:false,
			isDisCount:false,
			isImport:false,
			isExport:false,
			editVisible: false,
			delVisible: false,
			idx: -1,
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
			value: '',
			data:[],
			dataTable:[   //添加商品
				{
					role_id:'短袖',
					name:1,
					address:1,
					telphone:1,
					retailprice:1,
					morning:1
				}
			],
			dataData:[    //商品规格
				{
					color:'黑色',
					all_id:111,
					rulte_01:1,
					rulte_02:1,
					rulte_03:1,
				},
				//   {
				// 	  color:'',
				// 	  all_id:111,
				// 	  rulte_01:1,
				// 	  rulte_02:1,
				// 	  rulte_03:1,
				//   },
				
			],
			new_info: {
				shop_id: sessionStorage.getItem("shop_id"),
				name: '', //公司名称
				address: '', //地址
				telphone: '', //固话
				retailprice: '', //零售价格
				allocationprice: '', //调拨价格
				morning: '', //早班时间
				afternoon: '', //午班时间
				night: '', //晚班时间
				size: '', //面积
				rent: '', //佣金
				context: '', //经营描述
				licenseimg: '', //营业执照
				is_straight: '', //是否是自营
			},
			 multipleSelection: [],
			importUrl:'www.baidu.com',//后台接口config.admin_url+'rest/schedule/import/'
			importHeaders:{
				enctype:'multipart/form-data',
				cityCode:''
			},
			name: 'import',
			fileList: [],
			withCredentials: true,
			processing: false,
			uploadTip:'点击上传',
			importFlag:1,
			dialogImportVisible:false,
			errorResults:[]
		}
	},
	methods: {
		//提交表格
		submitForm(formName) {
			// this.$refs[formName].validate((valid) => {
			// 	if (valid) {
			// 		alert('submit!');
			// 	} else {
			// 		console.log('error submit!!');
			// 		return false;
			// 	}
			// });
		},
		//重置清空表格
			resetForm(formData) {
        // 	this.$nextTick(function() {
        //   	this.$refs[formData].resetFields();
		//  })
			if (this.$refs.formData!==undefined) {
				this.$refs.formData.resetFields();
			}
      	},
		//新增页面
		AddPurchasingSystem(){
			this.isShow=false
			this.addPurchasSystem=true
		},
		
		//表格改变监控
		SelectionChange(val) {
				let arrays = [];
				for(let i = 0; i < val.length; i++) {
					arrays.push(val[i].gc_id);
				};
				this.multipleSelection = arrays;
		},
		//显示采购历史
		showPurchaseHistory(){
				this.isPurchaseHistory=true;
				this.open_new_rult = false;
			},
		// mergeOrder(){
		// 	this.isMerge=true;
		// },
		//付款
		pay_money(){
			this.isPay_money=true;
		},
		tableChange(val) {
					let arrays = [];
					for(let i = 0; i < val.length; i++) {
						arrays.push(val[i].gc_id);
					};
					this.multipleSelection = arrays;
				},
				Delete(){
					this.isDelete=true;
				},
				discount(){
					this.isDisCount=true;
		},
		//打开新增添加 用户
		open_newInfo() {
			//获取添加商品分类的信息
				this.new_info_model = true;
				// this.$post("/goodsclass/addlist", ).then((res) => {
				// 	let data = res;
				// 	if(data.status_code == 0) {
				// 		this.options = data.data;
					
				// 	} else {
				// 		this.$message({
				// 			type: 'error',
				// 			message: data.message,
				// 			});
				// 		}
				// 	});
		},
		//载入采购单
		openPurchase(){
			this.isOpen=true;
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
			//添加一行表格
		addRow(){
		  let obj={
			  color:'',
			  all_id:111,
			  rulte_01:1,
			  rulte_02:1,
			  rulte_03:1,
		  }
		  this.dataData.push(obj);
		},
		// 去掉一行表格
		reduceRow(index){
			this.dataData.pop()
		},
		// 打开导入数据弹框
		importData(){
			this.isImport=true;
		},
		// 添加商品规格
		addrult() {
			//获取添加商品分类的信息
				this.open_new_rult = true;
				this.new_info_model = false;
		},
		getSummaries(param) {
			const {
				columns,
				data
			} = param;
			const sums = [];
			columns.forEach((column, index) => {
				if(index === 0) {
					sums[index] = '总价';
					return;
				}
				const values = data.map(item => Number(item[column.property]));
				if(!values.every(value => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr);
						if(!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);
					sums[index] += ' 元';
				} else {
					sums[index] = 'N/A';
				}
			});


			return sums;
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
		//返回原来的页面
		back_PurchseMan(){
			this.isShow=true
			this.addPurchasSystem=false
		},
	
		//取消添加新的用户
		cancel_newInfo() {
			this.new_info_model = false;
		},
		// 关闭选择规格
		cancel_new_rult(){
			this.open_new_rult=false;
		},
		// 关闭显示采购历史
		close_PurchaseHistory(){
			this.isPurchaseHistory=false;
		},
		// 关闭合并订单
		close_Merge(){
			this.isMerge=false;
		},
		//取消付款
		cancel_pay_money(){
			this.isPay_money=false;
		},
		//关闭载入采购单
		isclose(){
			this.isOpen=false;
		},
		//关闭删除单据弹框
		close_Deleted(){
			this.isDelete=false;
		},
		// 关闭整单打折弹框
		close_Discount(){
			this.isDisCount=false;
		},
		// 关闭导入弹框
		close_import(){
			this.isImport=false;
		},
		// 关闭导出弹框
		close_export(){
			this.isExport=false;
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
		 

		 toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //复选框选择回填函数,val返回一整行的数据
      this.multipleSelection = val;
    },
    importData() {
      this.importFlag = 1
      this.fileList = []
      this.uploadTip = '点击上传'
      this.processing = false
      this.dialogImportVisible = true
    },
    outportData() {
      scheduleApi.downloadTemplate()
    },
    handlePreview(file) {
      //可以通过 file.response 拿到服务端返回数据
    },
    handleRemove(file, fileList) {
      //文件移除
    },
    beforeUpload(file){
      //上传前配置
      this.importHeaders.cityCode='上海'//可以配置请求头
      let excelfileExtend = ".xls,.xlsx"//设置文件格式
      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
         this.$message.error('文件格式错误')
         return false
      }
      this.uploadTip = '正在处理中...'
      this.processing = true
    },
    //上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      this.$message.error(err)
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      this.uploadTip = '点击上传'
      this.processing = false
      if (response.status === -1) {
        this.errorResults = response.data
        if (this.errorResults) {
          this.importFlag = 2
        } else {
          this.dialogImportVisible = false
          this.$message.error(response.errorMsg)
        }
      } else {
        this.importFlag = 3
        this.dialogImportVisible = false
        this.$message.info('导入成功')
        this.doSearch()
      }
    },
    //下载模板
    download() {
      //调用后台模板方法,和导出类似
      scheduleApi.downloadTemplate()
    },
  
	}
}

</script>
<style scoped>
.title {
	margin-bottom: 15px;
}
.search {
	height: 50px;
	/* background: #f4f4f4; */
	height: 240px;
	padding: 20px;
	min-width:1300px;
}
.search1 {
	height: 50px;
	/* background: #f4f4f4; */
	height: 120px;
	padding: 20px;
	min-width:1300px;
}

.search span {
	display: inline-block;
	margin-left: 50px;
	margin-top: 30px;
}
.tTable{
	margin-top: 20px;
	min-width: 1300px;
}
.total{
	
	width:100%;
	position: fixed;
	bottom: 30px;
	height:38px;
	padding-left: 20px;
	background: #f4f4f4;
	line-height: 38px;
}
.total .totalNum{
	width:1200px;
	display: inline-block;
	height:38px;
	text-align: center;
	/* background: red; */
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
.delete{
	text-align: center;
	margin-top: 50px;
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