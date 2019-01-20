<!-- 应付款 -->
<template>
	<div class="tab-container">
		<!-- 默认展示的 -->
		<div v-show="show_model == 1">
			<el-form label-position="right" label-width="80px" :inline="true" :model="formInline" class="demo-form-inline">
				<div class="title">
					<el-row>
						<el-col :span="24">
							<el-button v-show="permission.indexOf('165') != -1" type="primary" @click="openReconciliation">
								对账
							</el-button>
							<el-input placeholder="搜索单据号、供应商、摘要" style="width:240px" v-model="formInline.document_num"></el-input>
							<el-button type="primary" @click='ajaxjson'>搜索</el-button>
							<el-button type="primary" @click="showModel = !showModel">筛选订单</el-button>
						</el-col>
					</el-row>
				</div>
				<div class="search" v-show="showModel">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.startTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束时间">
								<el-date-picker type="date" placeholder="选择日期" v-model="formInline.endTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="formInline.supplier_id" placeholder="请选择">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="24">
							<el-form-item label="单据状态">
								<el-radio-group v-model="formInline.status">
									<el-radio :label="3">全部</el-radio>
									<el-radio :label="1">部分付款</el-radio>
									<el-radio :label="2">已付款</el-radio>
									<el-radio :label="0">未付款</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col align="center">
							<el-form-item label=" " align="center">
								<el-button type="primary" @click="ajaxjson">确定</el-button>
								<el-button @click="resetForm">清空</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<!-- 展示出来的表格 -->
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="180" align="center">
						<template slot-scope="scope">
							<span v-if="permission.indexOf('171') != -1" style="cursor:pointer;color: #18CCBA" @click='opendetail(scope.row)'>{{scope.row.document_num}}</span>
							<span v-else style="cursor:pointer;color: #18CCBA">{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="200" align="center">
					</el-table-column>
					<el-table-column prop="supplier_name" label="供应商" width="150" align="center">
					</el-table-column>
					<el-table-column prop="money" label="金额" width="150">
						<template slot-scope="scope">
							<span>{{(scope.row.money/100).toFixed(2)}}</span>
						</template>
					</el-table-column >
					<el-table-column prop="paid_money" label="已付金额" width="150">
						<template slot-scope="scope">
							<span>{{(scope.row.paid_money/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="unpaid_money" label="未付金额" width="150">
						<template slot-scope="scope">
							<span>{{(scope.row.unpaid_money/100).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="user_name" label="制单人">
					</el-table-column>
					<el-table-column prop="status" label="单据状态" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.status == 0">未付款</span>
							<span v-if="scope.row.status == 1">部分付款</span>
							<span v-if="scope.row.status == 2">已付款</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="180" align="center">
						<template slot-scope="scope" v-show="permission.indexOf('169') != -1">
							<el-button  v-if="scope.row.status !== 2" type="warning" size="mini" @click="pay_money(scope.row)">付款</el-button>
							<!--<el-button v-if="scope.row.status == 0" type="danger" size="mini" @click="pay_money">删除</el-button>-->
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 付款 -->
		<div class="model" v-show="isPay_money">
			<div class="pay_model_con">
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
				<el-form label-width="80px" :inline="true" class="demo-form-inline">
					<el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付金额
							</el-col>
							<el-col :span="12">
								<el-form-item label="合计">
									<el-input placeholder="" v-model="payInfo.total_money" disabled></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="24" class="title">
								支付方式
							</el-col>
							<el-col :span="12">
								<el-form-item label="现金">
									<el-input placeholder="" v-model="payInfo.cash_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="微信">
									<el-input placeholder="" v-model="payInfo.wechat_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="支付宝">
									<el-input placeholder="" v-model="payInfo.alipay_pay"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="银行卡">
									<el-input placeholder=""  v-model="payInfo.bank_card"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-row>
					<el-row class="bottom">
						<el-col :span='24'>
							<el-button @click="cancel_pay_money">
								取消
							</el-button>
							<el-button type="primary" @click="surePay">
								确定
							</el-button>
							<el-button type="primary" v-show="permission.indexOf('167') != -1">
								结算并打印
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
		</div>
		<!-- 订单详情展示 -->
		<div v-show="show_model == 3">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					订单详情
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="closeDetail">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row v-if="showPay">
					<el-col :span="12">
						<el-button type="primary" @click="pay_money">付款</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="payableDetail" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="payableDetail.document_num" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="payableDetail.created_at" type="date" placeholder="选择日期" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="payableDetail.supplier_id" placeholder="请选择" disabled>
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="payableDetail.remark" placeholder="" style="width:220px;" disabled></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="制单人">
								<el-select v-model="payableDetail.user_name" placeholder="邢建辉" disabled>
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<!--采购入库单-->
			<el-table :data="purList">
				<el-table-column label="采购入库单" align="center">
					<el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
					<el-table-column prop="document_num" label="单据号"></el-table-column>
					<el-table-column prop="created_at" label="单据日期"></el-table-column>
					<el-table-column prop="join_code" label="关联采购单号"></el-table-column>
					<el-table-column prop="total_money" label="金额"></el-table-column>
					<el-table-column prop="remark" label="摘要"></el-table-column>
				</el-table-column>
			</el-table>
			<!--采购退货单-->
			<el-table :data="purReturnList" style="margin-top:15px">
				<el-table-column label="采购退货单" align="center">
					<el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
					<el-table-column prop="document_num" label="单据号"></el-table-column>
					<el-table-column prop="created_at" label="单据日期"></el-table-column>
					<el-table-column prop="join_code" label="关联采购单号"></el-table-column>
					<el-table-column prop="supplier_name" label="供应商"></el-table-column>
					<el-table-column prop="total_money" label="金额"></el-table-column>
					<el-table-column prop="remark" label="摘要"></el-table-column>
				</el-table-column>
			</el-table>
			<!--定金列表-->
			<el-table :data="earnestList" style="margin-top:15px">
				<el-table-column label="采购退货单" align="center">
					<el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
					<el-table-column prop="document_num" label="单据号"></el-table-column>
					<el-table-column prop="created_at" label="单据日期"></el-table-column>
					<el-table-column prop="join_code" label="关联采购单号"></el-table-column>
					<el-table-column prop="supplier_name" label="供应商"></el-table-column>
					<el-table-column prop="total_money" label="金额"></el-table-column>
					<el-table-column prop="remark" label="摘要"></el-table-column>
				</el-table-column>
			</el-table>
			<el-table :data="costList" style="margin-top:15px">
				<el-table-column label="其他收入单列表" align="center">
					<el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
					<el-table-column prop="document_num" label="单据号"></el-table-column>
					<el-table-column prop="created_at" label="单据日期"></el-table-column>
					<el-table-column prop="join_code" label="关联采购单号"></el-table-column>
					<el-table-column prop="supplier_name" label="供应商"></el-table-column>
					<el-table-column prop="total_money" label="金额"></el-table-column>
					<el-table-column prop="remark" label="摘要"></el-table-column>
				</el-table-column>
			</el-table>
		</div>
		<!-- 对账 -->
		<div v-show="show_model == 2">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					对账
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="closeReconciliation">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24">
						<el-button v-show="permission.indexOf('168') != -1" type="primary" @click="open_balanceShow">结存</el-button>
						<el-input style="width:200px" placeholder="搜索供应商"></el-input>
						<el-button type="primary">搜索</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form label-width="80px" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="开始日期">
								<el-date-picker v-model="forMation.startTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="" disabled>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结束日期">
								<el-date-picker v-model="forMation.endTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" @change="selectTime">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.supplier_id" placeholder="请选择供应商" @change="selectSupplier">
									<el-option v-for="(item,index) in SupplierCommonSupplierList" :label="item.name" :value="item.id" :key="item.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="摘要">
								<el-input v-model="forMation.remark" style="width: 220px;" placeholder="请输入"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<div class="tTable">
				<el-table :data="checkList" stripe border style="width: 100%;" size="mini" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" align="center">
					</el-table-column>
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="document_num" label="单据号" fixed width="200" align="center">
						<template slot-scope="scope">
							<span style="cursor:pointer;color: #18CCBA" @click='openPurchaseWarehouseEntryForm'>{{scope.row.document_num}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="created_at" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="supplier_name" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="join_code" label="关联单号" width="200" align="center">
					</el-table-column>
					<el-table-column prop="type" label="单据类型" width="150" align="center">
					</el-table-column>
					<el-table-column prop="total_money" label="应付金额" width="150" align="center">
						<template slot-scope="scope">
							<span v-if ="scope.row.type == 1">{{scope.row.total_money}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_money" label="实付金额" width="150" align="center">
						<template slot-scope="scope">
							<span v-if ="scope.row.type == 2">{{scope.row.total_money}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="total_money" label="抵扣金额" width="150" align="center">
						<template slot-scope="scope">
							<span v-if ="scope.row.type == 3">{{scope.row.total_money}}</span>
							<span v-if ="scope.row.type == 3">{{scope.row.total_money}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="remark" label="摘要" align="center">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 采购入库单 -->
		<div v-show="purchaseWarehouseEntryForm">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					采购入库单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="closePurchaseWarehouseEntryForm">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24" style="text-align:right">
						<el-button type="primary">导出</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form label-width="90px" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="关联采购单">
								<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.date" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
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
				<div class="tTable">
					<el-table :data="data" stripe border style="width: 100%;" size="mini">
						<el-table-column type="index" label="序号" fixed width="50" align="center">
						</el-table-column>
						<el-table-column prop="documentNumber" label="单据号" fixed width="120" align="center">
							<template slot-scope="scope">
								<p style="cursor:pointer" @click='opendetail'>{{scope.row.documentNumber}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="documentTime" label="单据日期" width="120" align="center">
						</el-table-column>
						<el-table-column prop="supplier" label="供应商" width="100" align="center">
						</el-table-column>
						<el-table-column prop="money" label="金额">
						</el-table-column>
						<el-table-column prop="preparedBy" width="100" label="制单人">
						</el-table-column>
						<el-table-column prop="theDocumentsState" label="单据状态" width="80" align="center">
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<!-- 采购退货单 -->
		<div v-show="purchaseReturn">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					采购退货单
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="closepurchaseReturn">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="title">
				<el-row>
					<el-col :span="24" style="text-align:right">
						<el-button type="primary">导出</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="search1">
				<el-form label-width="90px" :inline="true" :model="forMation" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item label="单据号">
								<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="关联采购单">
								<el-input v-model="forMation.documentnumber" placeholder="" style="width:220px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="日期">
								<el-date-picker v-model="forMation.date" type="date" placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="供应商">
								<el-select v-model="forMation.shop" placeholder="亿链旗舰店">
									<el-option label="区域一" value="1"></el-option>
									<el-option label="区域二" value="2"></el-option>
								</el-select>
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
			<div class="tTable">
				<el-table :data="data" stripe border style="width: 100%;" size="mini">
					<el-table-column type="index" label="序号" fixed width="50" align="center">
					</el-table-column>
					<el-table-column prop="documentNumber" label="条形码" fixed width="120" align="center">
						<template slot-scope="scope">
							<p style="cursor:pointer" @click='opendetail'>{{scope.row.documentNumber}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="documentTime" label="商品名称规格" width="120" align="center">
					</el-table-column>
					<el-table-column prop="supplier" label="数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="money" label="吊牌价">
					</el-table-column>
					<el-table-column prop="preparedBy" width="100" label="折扣">
					</el-table-column>
					<el-table-column prop="theDocumentsState" label="采购价" width="80" align="center">
					</el-table-column>
					<el-table-column prop="theDocumentsState" label="小计" width="80" align="center">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 结存 -->
		<div class="model" v-show="balanceShow">
			<div class="balance_model_con">
				<el-row class="model_title">
					<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
						结存
					</el-col>
					<el-col :span="12" style="text-align: right;">
						<el-button type="text" @click="cancel_balanceShow">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" style="text-align:center;height:120px;line-height:120px">
						是否确定结存?
					</el-col>
					<el-col style="text-align:center">
						<el-button @click="cancel_balanceShow">取消</el-button>
						<el-button type='primary' @click="sureBalance">确定</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
		<!-- 打印 -->
		<div class="print" id="printMe" v-show="false">
			<el-row class="printTitle">
				<el-col :span="6" class="titleList">供应商:亿链集团</el-col>
				<el-col :span="6" class="titleList">联系人:王蛋蛋</el-col>
				<el-col :span="6" class="titleList">联系电话:15736748856</el-col>
				<el-col :span="6" class="titleList">截止日期:2018-09-30</el-col>
			</el-row>
			<div class="tTable">
				<el-table :data="printData" stripe style="width: 100%;" show-summary :summary-method="printSummaries" size="mini">
					<el-table-column type="index" label="序号" fixed width="100" align="center">
					</el-table-column>
					<el-table-column prop="documentNumber" label="单据号" fixed width="150" align="center">
						<template slot-scope="scope">
							<!--点击单据号跳转显示单据详情-->
							<p @click="openTheoverflowofsingle(scope.row.documentNumber)" style="cursor:pointer">{{scope.row.documentNumber}}</p>
						</template>
					</el-table-column>
					<el-table-column prop="documentDate" label="单据日期" width="150" align="center">
					</el-table-column>
					<el-table-column prop="supplier" label="供应商" width="100" align="center">
					</el-table-column>
					<el-table-column prop="totalQuantity" label="总数量" width="100" align="center">
					</el-table-column>
					<el-table-column prop="totalMoney" label="总金额" width="100" align="center">
					</el-table-column>
					<el-table-column prop="auditStatus" label="审核状态" width="100" align="center">
						<template slot-scope="scope">
							<el-button v-if="scope.row.auditStatus == 1" type="text">已审核</el-button>
							<el-button v-if="scope.row.auditStatus == 2" type="text" style="color: #666;">未审核</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="preparedBy" label="制单人">
					</el-table-column>
				</el-table>
				<el-row class="sumCon">
					<el-col class="sum" :span="24">定金余额:2000.00 其他收入:2000.00</el-col>
					<el-col class="sum" :span="24">本期应付:2000.00 实际支付:2000.00</el-col>
				</el-row>
				<el-row class="signature">
					<el-col :span="12">
						<p>
							公司盖章签名<span class="line">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
						</p>
						<p>
							<span style="padding-right:50px;padding-left:80px">年</span><span style="padding-right:50px">月</span><span>日</span>
						</p>

					</el-col>
					<el-col :span="12" style="text-align:right">
						<p>
							供应商盖章签名<span class="line">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
						</p>
						<p>
							<span style="padding-right:50px">年</span><span style="padding-right:50px">月</span><span>日</span>
						</p>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission:[],
				showModel:false,
				SupplierCommonSupplierList: [], //供应商列表
				// 搜索提交的数据
				page: 1, //分页
				total: 0,
				per_page: 10,
				showPay:true,
				//首页搜索提交数据
				formInline: {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商列表
					user_id: '', //制单人
					status: 3, //单据状态
				},
				//对账
				forMation:{
					startTime:'',
					endTime:'',
					supplier_id:'',
					remark:'',//摘要
				},
				payInfo:{
					id:'',
					total_money:'',
					cash_pay:'',
					wechat_pay:'',
					alipay_pay:'',
					bank_card:'',
				},//付款信息
				show_model: 1, //显示隐藏	
				checkList:[],//对账列表
				isPay_money: false, //付款弹窗	
				reconciliation: false, //对账
				balanceShow: false, //结存
				purchaseWarehouseEntryForm: false, //采购入库单
				purchaseReturn: false, //采购退货单
				multipleSelection: [], //对账多选操作
				// 表格数据
				data: [{
					documentNumber: '1234567894110', //单据号
					documentTime: '2018-12-13', //单据日期
					supplier: '4545', //供应商
					AssociatedPurchaseOrder: '4567891234656', //关联采购单号
					money: 125, //金额
					theDocumentsState: 1, //单据状态
					preparedBy: '店员甲',
				}],
				//订单详情
				entryTable: [{
					documentNumber: '1234567894110', //单据号
					documentTime: '2018-12-13', //单据日期
					AssociatedPurchaseOrder: '4567891234656', //关联采购单号
					money: 125, //金额
					preparedBy: '店员甲', //摘要
				}],
				// 对账
				reconciliatTable: [{
					documentNumber: '1234567894110', //单据号
					documentTime: '2018-12-13', //单据日期
					supplier: '4545', //供应商
					AssociatedPurchaseOrder: '4567891234656', //关联采购单号
					money: 125, //金额
					theDocumentsState: 1, //单据状态
					preparedBy: '店员甲',
				}],
				// 打印数据
				printData: [{
					documentNumber: "123456789456",
				}], //
				payableDetail:{},//展示的详情
				purList:[],//订单详情采购入库单列表
				purReturnList:[],//订单详情 采购退货单
				earnestList:[],//定金列表
				costList:[],//其他收入列表
			}
		},
		created() {
			this.ajaxjson();
			this.getSupplierCommonSupplierList(); //获取供应商列表
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		methods: {
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			//获取供应商列表
			getSupplierCommonSupplierList() {
				this.$post(this.$supplierCommonSupplierList).then((res) => {
					if(res.status_code == 0) {
						this.SupplierCommonSupplierList = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			ajaxjson() {
				//合并提交
				let postData = Object.assign(this.formInline, {
					page: this.page,
					per_page: this.per_page,
				})
				this.$post(this.$payableList, postData).then((res) => {
					if(res.status_code == 0) {
						let datas = res.data.data;
						for(let i = 0; i < datas.length; i++) {
							datas[i].created_at = this.$formatTimestamp(datas[i].created_at);
						}
						this.data = datas;
						this.total = res.data.total;
						this.per_page = res.data.per_page;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//打印合计行
			printSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				let values = [];
				columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] = '总计';
						return;
					}
					if(column.property === "totalQuantity") {
						values = data.map(item => Number(item.totalQuantity));
					}
					if(column.property === "totalMoney") {
						values = data.map(item => Number(item.totalMoney));
					}
					if(column.property == "totalQuantity" || column.property == "totalMoney") {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if(!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
						sums[index] += '';
					} else {
						sums[index] = '--';
					}
				});
				//返回相对应合计数值
				return sums;
			},
			// 打开付款
			pay_money(e) {
				this.payInfo.id = e.id; 
				this.payInfo.total_money = e.unpaid_money/100;
				this.isPay_money = true;
			},
			// 取消付款
			cancel_pay_money() {
				this.isPay_money = false;
			},
			surePay(){
				let postData = this.$objDeepCopy(this.payInfo);
				for(var i in postData) {
				     postData[i] = postData[i]*100 +'';
				};
				postData.id = postData.id/100 +'';
				this.$post(this.$payablePayablePayment,postData).then((res)=>{
					if(res.status_code == 0) {
						this.ajaxjson();
						this.isPay_money = false;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			// 应付款首页获取订单详情
			opendetail(e) {
				let postData={
					id:e.id,
				}
				if(e.status == 2){
					this.showPay == false;
				}else{
					this.showPay == true;
				}
				this.$post(this.$payablePayableDetail,postData).then((res)=>{
					if(res.status_code == 0){
						this.show_model = 3;
						this.payableDetail = res.data.payableDetail;//头部的详情
						this.purList = res.data.purList;//采购入库单
						this.purReturnList = res.data.purReturnList;//采购退货订单
						this.earnestList = res.data.earnestList;//定金列表
						this.costList = res.data.costList;//其他收入列表
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
			// 关闭详细
			closeDetail() {
				this.show_model = 1;
			},
			// 打开对账
			openReconciliation() {
				this.show_model = 2;//显示对账的列表
			},
			//选择时间
			selectTime(){
				let postData = this.forMation;
				this.$post(this.$payableReconciliationList,postData).then((res)=>{
					if(res.status_code == 0){
						this.checkList = res.data.reconciliationList;
						this.money = res.data.total_money;
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
//		选择供应商
			selectSupplier(){
				let postData = {
					supplier_id:this.forMation.supplier_id,
				}
				this.$post(this.$payableGetLastTime,postData).then((res)=>{
					if(res.status_code == 0){
								if(res.data.balance_time){
									this.forMation.startTime = this.$formatTimestamp(res.data.balance_time);
								}else{
									this.forMation.startTime = this.$getData();
								}
								
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				})
			},
//			get 
			getlist(){
					
			},
			// 关闭对账
			closeReconciliation() {
				this.show_model = 1;
//				this.reconciliation = false;
			},
			// 打开结存
			open_balanceShow() {
				this.balanceShow = true;
			},
			// 取消结存
			cancel_balanceShow() {
				this.balanceShow = false;
			},
			// 确定结存
			sureBalance() {
				let postData = this.$objDeepCopy(this.forMation);
				postData.user_id = sessionStorage.getItem('id');
				postData.money = this.money;
				postData.startTime = Date.parse(postData.startTime)/1000;
				postData.endTime = Date.parse(postData.endTime)/1000;
				
				this.$post(this.$payablePayableBalance,postData).then((res)=>{
					if(res.status_code == 0){
							this.balanceShow = false;
							this.show_model = 1;
							this.ajaxjson();
					}else{
						this.$message({
							type:'error',
							message:res.message,
						})
					}
				
				})
				
			},
			// 打开采购入库单详情
			openPurchaseWarehouseEntryForm() {
				this.reconciliation = false;
				this.purchaseWarehouseEntryForm = true;
			},
			closePurchaseWarehouseEntryForm() {
				// 关闭采购入库单
				this.purchaseWarehouseEntryForm = false;
				this.reconciliation = true;
			},
			// 采购退货单
			closepurchaseReturn() {
				this.reconciliation = true;
				this.purchaseReturn = false;
			},
			// 表尾合计行
			getSummaries(param) {
				const {
					// columns,
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
			// 对账多选
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			resetForm() {
				let formInline =  {
					document_num: '', //单据号
					startTime: '', //开始时间
					endTime: '', //结束时间
					supplier_id: '', //供应商列表
					user_id: '', //制单人
					status: 3, //单据状态
				};
				this.formInline = formInline;
				this.ajaxjson();
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.title {
		margin-bottom: 15px;
	}
	
	.search {
		height: 50px;
		background: #f4f4f4;
		height: 190px;
		padding: 20px;
		min-width: 1300px;
	}
	
	.search span {
		display: inline-block;
		margin-left: 50px;
		margin-top: 30px;
	}
	
	.tTable {
		margin-top: 20px;
		min-width: 1300px;
	}
	
	.print {
		.printTitle {
			font-size: 14px;
			color: #666;
			margin-top: 25px;
			margin-bottom: 40px;
			.titleList {
				text-align: center;
			}
		}
		.sumCon {
			margin-top: 25px;
			.sum {
				font-size: 14px;
				color: #333;
				height: 40px;
				line-height: 40px;
			}
		}
		.signature {
			margin-top: 170px;
			color: #333333;
			font-size: 14px;
			.line {
				text-decoration: underline;
			}
		}
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
		.pay_model_con {
			width: 650px;
			height: 450px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -225px;
			margin-left: -325px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
			.bottom {
				text-align: center;
			}
			.title {
				color: #666666;
				font-size: 16px;
			}
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
		.balance_model_con {
			width: 400px;
			height: 250px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -200px;
			margin-left: -200px;
			background-color: #FFF;
			padding: 20px;
			box-sizing: border-box;
			border-radius: 15px;
		}
	}
	
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
</style>
<style type="text/css">
	.el-button--warning {
	    background-color: #f48b25;
	}
	.el-button--danger {
		background-color: #ef4d4c;
	}
</style>