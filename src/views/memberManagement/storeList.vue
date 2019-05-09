<template>
	<div class="container">
		<!--默认进来展示的表格-->
		<div class="showList" v-show="model == 1">
			<!-- 头部的搜索框 -->
			<el-row class="title">
				<!--新增公司-->
				<el-button type="primary" @click="addMerchant">
					<svg-icon icon-class="add" style="margin-right: 10px;"/>新增</el-button>
				<el-input class="titleInput" placeholder="请输入公司名称/联系电话" v-model="search">
					<el-button class="appendButton" slot="append" icon="el-icon-search" @click="searchShop">搜索</el-button>
				</el-input>
			</el-row>
			<el-table class="tTable" :data="tableData" stripe border style="width: 100%" :header-cell-class-name="tableheaderClassName">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.shop" :key="item.oid">
							<el-form-item label="店铺名称:">
								<span style="margin-right: 20px;">{{ item.name }}</span>
							</el-form-item>
							<el-form-item style="margin-right: 20px;" label="店铺地址:">
								<span>{{ item.address }}</span>
							</el-form-item>
							<el-form-item label="店铺电话:">
								<span style="margin-right: 20px;">{{ item.phone }}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column type="index" :index="indexMethod" label="序号" width="60" align="center" stripe>
				</el-table-column>
				<el-table-column prop="name" label="公司名称" width="230px" align="center">
					<template slot-scope="scope">
						{{scope.row.name}}
					</template>
				</el-table-column>
				<el-table-column prop="contacts_name" label="联系人" width="200px" align="center">
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="200px" align="center">
				</el-table-column>
				<el-table-column prop="address" label="地址" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center" width="300px">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="amend(scope.row.oid)">编辑</el-button>
						<el-button type="warning" size="mini" @click="addShop(scope.row.oid)">新增店铺</el-button>
						<el-button @click="deletes(scope.row.oid)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="margin-top: 15px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<div class="addMerchant" v-show="model == 2">
			<el-form ref="merchantForm" :model="merchantForm" :rules="merchantFormRules" class="login-form" label-width="80px">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;" class="title">
						公司信息
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="resetMerchantForm('merchantForm')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form-item prop="name" label="公司名称">
					<el-input v-model="merchantForm.name" placeholder="需与营业执照注册名称相同" name="name" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="address" label="经营地址">
					<el-col :span="24">
						<el-select v-model="merchantForm.province_id" placeholder="省份" style="width:300px" @change="selectOptions1">
							<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
						<el-select v-model="merchantForm.city_id" placeholder="城市" style="width:300px" @change="selectOptions2">
							<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
						<el-select v-model="merchantForm.area_id" placeholder="区县" style="width:300px">
							<el-option v-for="item in options3" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item prop="name" label="">
					<el-input v-model="merchantForm.address" placeholder="请输入详细地址" name="name" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="licenseimg" label="经营执照">
					<el-input v-model='merchantForm.licenseimg' name="licenseimg" v-show="false" style="width: 200px;"></el-input>
					<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
						<div class="upload_img">
							<img style="width: 225px;height: 300px;" v-if="centermerchant.licenseimg" :src="centermerchant.licenseimg" />
							<img v-else src="../../../static/img/uploadImg.png" />
						</div>
					</el-upload>
				</el-form-item>
				<div class="title">
					公司法人
				</div>
				<el-form-item prop="legal_person" label="公司法人">
					<el-input v-model="merchantForm.legal_person" placeholder="请输入" name="legal_person" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="positive_img" label="手持正面">
					<el-input v-model='merchantForm.positive_img' name="positive_img" v-show="false" style="width: 200px;"></el-input>
					<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_2" :before-upload="beforeAvatarUpload">
						<div class="identityCard">
							<img style="width: 240px;height: 152px;" v-if="centermerchant.positive_img" :src="centermerchant.positive_img" />
							<img v-else src="../../../static/img/uploadImg.png" />
						</div>
					</el-upload>
				</el-form-item>
				<el-form-item prop="back_img" label="手持背面">
					<el-input v-model='merchantForm.back_img' v-show="false" name="back_img" style="width: 200px;"></el-input>
					<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_3" :before-upload="beforeAvatarUpload">
						<div class="identityCard">
							<img style="width: 240px;height: 152px;" v-if="centermerchant.back_img" :src="centermerchant.back_img" />
							<img v-else src="../../../static/img/uploadImg.png" />
						</div>
					</el-upload>
				</el-form-item>
				<div class="title">
					联系人信息
				</div>
				<el-form-item prop="contacts_name" label="联系人">
					<el-input v-model="merchantForm.contacts_name" placeholder="请输入" name="contacts_name" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="phone" label="联系电话">
					<el-input v-model="merchantForm.phone" placeholder="请输入" name="phone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<div class="title">
					账号密码
				</div>
				<el-form-item prop="user_phone" label="账号">
					<el-input v-model="merchantForm.user_phone" placeholder="请输入" name="user_phone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="merchantForm.password" placeholder="请输入" name="password" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item>
					<el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="resetMerchantForm('merchantForm')">取消</el-button>
					<el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="submitMerchantForm('merchantForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 新添加店铺 -->
		<div class="addMerchant" v-show="model == 3">
			<el-form ref="shopForm" :model="shopForm" :rules="rulesshopForm" class="login-form" label-width="80px">
				<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;" class="title">
						店铺信息
					</el-col>
					<el-col :span="4" :offset="12" style="text-align: right;">
						<el-button type="text" @click="resetShopForm('shopForm')" name="topRightCancel">
							<svg-icon icon-class="cancel" />
						</el-button>
					</el-col>
				</el-row>
				<el-form-item prop="name" label="店铺名称">
					<el-input v-model="shopForm.name" placeholder="请输入" name="name" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="adress" label="经营地址">
						<el-select v-model="shopForm.province_id" placeholder="省份" style="width:298px" @change="selectOptions3">
							<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
						<el-select v-model="shopForm.city_id" placeholder="城市" style="width:298px" @change="selectOptions4">
							<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
						<el-select v-model="shopForm.area_id" placeholder="区县" style="width:298px">
							<el-option v-for="item in options3" :key="item.region_id" :label="item.region_name" :value="item.region_id">
							</el-option>
						</el-select>
				</el-form-item>
				<el-form-item prop="address">
					<el-input v-model="shopForm.address" placeholder="请输入详细地址" name="adress" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-row>
					<el-col :span="6">
						<el-form-item prop="adress" label="早班时间">
							<el-time-picker is-range v-model="shopForm.morning" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="adress" label="中班时间" label-width="80px">
							<el-time-picker is-range v-model="shopForm.afternoon" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
							</el-time-picker>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="adress" label="晚班时间" label-width="80px">
							<el-time-picker is-range v-model="shopForm.night" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
							</el-time-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="title">
					联系人信息
				</div>
				<el-form-item prop="contacts_name" label="联系人">
					<el-input v-model="shopForm.contacts_name" placeholder="请输入" name="contacts_name" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="phone" label="联系电话">
					<el-input v-model="shopForm.phone" placeholder="请输入" name="phone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="telphone" label="固定电话">
					<el-input v-model="shopForm.telphone" placeholder="请输入" name="telphone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="context" label="营业描述">
					<el-input v-model="shopForm.context" placeholder="请输入" name="context" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>

				<div class="title">
					账号密码
				</div>
				<el-form-item prop="user_phone" label="账号">
					<el-input v-model="shopForm.user_phone" placeholder="请输入" name="user_phone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="shopForm.password" placeholder="请输入" name="password" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item>
					<el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="resetShopForm('shopForm')">取消</el-button>
					<el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="submitShopForm('shopForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="addMerchant" v-show="model == 4">
			<div style="background-color: #F5F5F5;width:100%;height: 40px;margin-bottom: 15px;">
				<div @click="changeShop('shop')" v-bind:class="[index == 'shop' ? activeClass : '',list]">公司账号</div>
				<div v-for="item in shopList" v-bind:class="[index == item.oid ? activeClass : '',list]" :key="index" @click="changeShop(item.oid)">{{item.name}}</div>
				<el-button type="text" @click="cancelamendMerchantForm()" name="topRightCancel" style="float: right;margin-top: 12px;margin-right: 20px;">
					<svg-icon icon-class="cancel"/>
				</el-button>
			</div>
			<div class="addMerchant" v-show="model2 == 1">
				<el-form ref="comAmend" :model="comAmend" :rules="merchantFormRules" class="login-form" label-width="80px">
					<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;" class="title">
						公司信息
					</el-col>
					</el-row>
					<el-form-item prop="name" label="公司名称">
						<el-input v-model="comAmend.name" placeholder="需与营业执照注册名称相同" name="name" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="address" label="经营地址">
						<el-col :span="24">
								<el-select v-model="comAmend.province_id" placeholder="请选择" style="width:298px" @change="selectOptions1">
									<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
									</el-option>
								</el-select>
								<el-select v-model="comAmend.city_id" placeholder="请选择" style="width:298px" @change="selectOptions2">
									<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
									</el-option>
								</el-select>
								<el-select v-model="comAmend.area_id" placeholder="请选择" style="width:298px">
									<el-option v-for="item in options3" :key="item.region_id" :label="item.region_name" :value="item.region_id">
									</el-option>
								</el-select>
							</el-col>
						</el-col>
					</el-form-item>
					<el-form-item prop="name" label="">
						<el-input v-model="comAmend.address" placeholder="需与营业执照注册名称相同" name="name" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="licenseimg" label="经营执照">
						<el-input v-model='comAmend.licenseimg' name="licenseimg" v-show="false" style="width: 200px;"></el-input>
						<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
							<div class="upload_img">
								<img style="width: 225px;height: 300px;" v-if="centermerchant.licenseimg" :src="img_path+centermerchant.licenseimg" />
								<img v-else src="../../../static/img/uploadImg.png" />
							</div>
						</el-upload>
					</el-form-item>
					<div class="title">
						公司法人
					</div>
					<el-form-item prop="legal_person" label="公司法人">
						<el-input v-model="comAmend.legal_person" placeholder="请输入" name="legal_person" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="positive_img" label="手持正面">
						<el-input v-model='comAmend.positive_img' name="positive_img" v-show="false" style="width: 200px;"></el-input>
						<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_2" :before-upload="beforeAvatarUpload">
							<div class="identityCard">
								<img style="width: 240px;height: 152px;" v-if="centermerchant.positive_img" :src="img_path+centermerchant.positive_img" />
								<img v-else src="../../../static/img/uploadImg.png" />
							</div>
						</el-upload>
					</el-form-item>
					<el-form-item prop="back_img" label="手持背面">
						<el-input v-model='comAmend.back_img' v-show="false" name="back_img" style="width: 200px;"></el-input>
						<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_3" :before-upload="beforeAvatarUpload">
							<div class="identityCard">
								<img style="width: 240px;height: 152px;" v-if="centermerchant.back_img" :src="img_path+centermerchant.back_img" />
								<img v-else src="../../../static/img/uploadImg.png" />
							</div>
						</el-upload>
					</el-form-item>
					<div class="title">
						联系人信息
					</div>
					<el-form-item prop="contacts_name" label="联系人">
						<el-input v-model="comAmend.contacts_name" placeholder="需与营业执照注册名称相同" name="contacts_name" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="phone" label="联系电话">
						<el-input v-model="comAmend.phone" placeholder="需与营业执照注册名称相同" name="phone" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<!--<div class="title">
						账号密码
					</div>-->
					<!--<el-form-item prop="user_phone" label="账号">
					<el-input v-model="comAmend.user_phone" placeholder="需与营业执照注册名称相同" name="user_phone" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>
				<el-form-item prop="password" label="密码">
					<el-input v-model="comAmend.password" placeholder="需与营业执照注册名称相同" name="password" type="text" style="width: 900px;height: 40px;" />
				</el-form-item>-->
					<el-form-item>
						<el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="cancelamendMerchantForm('comAmend')">取消</el-button>
						<el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="amnedMerchantForm('comAmend')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- 修改店铺信息 -->
			<div class="addMerchant" v-show="model2 == 2">
				<el-form ref="shopAmend" :model="shopAmend" :rules="ruleAmendForm" class="login-form" label-width="80px">
					<el-row class="model_title" align="bottom">
					<el-col :span="8" style="border-left: #13C2C2 3px solid; padding-left: 15px;" class="title">
						店铺信息
					</el-col>
					</el-row>
					<el-form-item prop="name" label="店铺名称">
						<el-input v-model="shopAmend.name" placeholder="请输入" name="name" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="adress" label="经营地址">
							<el-select v-model="shopAmend.province_id" placeholder="请选择" style="width:298px" @change="selectOptions3">
								<el-option v-for="item in options1" :key="item.region_id" :label="item.region_name" :value="item.region_id">
								</el-option>
							</el-select>
							<el-select v-model="shopAmend.city_id" placeholder="请选择" style="width:298px" @change="selectOptions4">
								<el-option v-for="item in options2" :key="item.region_id" :label="item.region_name" :value="item.region_id">
								</el-option>
							</el-select>
							<el-select v-model="shopAmend.area_id" placeholder="请选择" style="width:298px">
								<el-option v-for="item in options3" :key="item.region_id" :label="item.region_name" :value="item.region_id">
								</el-option>
							</el-select>
					</el-form-item>
					<el-form-item prop="address">
						<el-input v-model="shopAmend.address" placeholder="请输入详细地址" name="address" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-row>
						<el-col :span="6">
							<el-form-item prop="adress" label="早班时间">
								<el-time-picker is-range v-model="shopAmend.morning" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
								</el-time-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="adress" label="中班时间" label-width="80px">
								<el-time-picker is-range v-model="shopAmend.afternoon" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
								</el-time-picker>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="adress" label="晚班时间" label-width="80px">
								<el-time-picker is-range v-model="shopAmend.night" format="HH:mm" value-format="HH:mm" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" style="width: 200px">
								</el-time-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<div class="title">
						联系人信息
					</div>
					<el-form-item prop="contacts_name" label="联系人">
						<el-input v-model="shopAmend.contacts_name" placeholder="请输入" name="contacts_name" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="phone" label="联系电话">
						<el-input v-model="shopAmend.phone" placeholder="请输入" name="phone" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="telphone" label="固定电话">
						<el-input v-model="shopAmend.telphone" placeholder="请输入" name="telphone" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="context" label="营业描述">
						<el-input v-model="shopAmend.context" placeholder="请输入" name="context" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<!--<div class="title">
						账号密码
					</div>
					<el-form-item prop="user_phone" label="账号">
						<el-input v-model="shopAmend.user_phone" placeholder="请输入" name="user_phone" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>
					<el-form-item prop="password" label="密码">
						<el-input v-model="shopAmend.password" placeholder="请输入" name="password" type="text" style="width: 900px;height: 40px;" />
					</el-form-item>-->
					<el-form-item>
						<el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="cancelamendMerchantForm()">取消</el-button>
						<el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="amendShopForm('shopAmend')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				search:'',
				index: 'shop',
				list: 'list',
				activeClass: 'active',
				comAmend: {

				},
				shopList: [],
				shopAmend: {

				},
				model2: 1,
				per_page: 10,
				page: 1,
				total: 0,
				model: 1, //1展开的是列表 2展开的是上传公司
				//默认展示出来的数据
				tableData: [],
				options1: [],
				options2: [],
				options3: [],
				postData: {}, //上传图片时携带的其他的数据
				//注册公司信息时候提交的信息
				merchantForm: {
					name: '', //名称
					province_id: '',
					city_id: '',
					area_id: '',
					address: '', //地址
					licenseimg: '', //营业执照
					legal_person: '', //公司法人
					positive_img: '', //手持正面
					back_img: '', //手持背面
					contacts_name: '', //联系人
					phone: '', //联系电话
					user_phone: '', //账号
					password: '', //密码
				},

				centermerchant: {
					licenseimg: '', //营业执照
					positive_img: '', //手持正面
					back_img: '', //手持背面
				},
				shopForm: {
					oid: '', //店铺id
					name: '', //名称
					province_id: '',
					city_id: '',
					area_id: '',
					address: '', //地址
					morning: '', //早班时间
					afternoon: '', //中班时间
					night: '', //晚班时间
					contacts_name: '', //联系人
					phone: '', //联系电话
					telphone: '', //固话
					context: '', //描述
					user_phone: '', //账号
					password: '',
				},
				ruleAmendForm: {
					user_phone: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}]
				},
				rulesshopForm: {
//					name: [{
//						required: true,
//						message: '请输入店铺名称',
//						trigger: 'blur'
//					}],
					user_phone: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
//					telphone: [{
//						required: true,
//						message: '请输入固话',
//						trigger: 'blur'
//					}],
//					context: [{
//						required: true,
//						message: '请输入描述',
//						trigger: 'blur'
//					}],
				},
				//注册时候的验证规则
				merchantFormRules: {
					name: [{
						required: true,
						message: '请输入公司名称',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入经营地址',
						trigger: 'blur'
					}],
					licenseimg: [{
						required: true,
						message: '请上传营业执照',
						trigger: 'blur'
					}],
					legal_person: [{
						required: true,
						message: '请输入公司法人名称',
						trigger: 'blur'
					}],
					positive_img: [{
						required: true,
						message: '请上传手持身份证正面照',
						trigger: 'blur'
					}],
					back_img: [{
						required: true,
						message: '请上传手持身份证背面照',
						trigger: 'blur'
					}],
					contacts_name: [{
						required: true,
						message: '请输入联系人名称',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请注入联系电话',
						trigger: 'blur'
					}],
					user_phone: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
			}
		},
		created() {
			this.ajaxjson();
			this.get_qiniu_token();
			this.getadress(); //获取地址
		},
		methods: {
			changeShop(e) {
				this.index = e;
				if(e == 'shop') {
					this.model2 = 1;
					let postData1 = {
						region_id: this.comAmend.province_id,
					};
					this.$post(this.$staticGetAddress, postData1).then((res1) => {
						let data = res1;
						if(data.status_code == 0) {
							this.options2 = data.data.address;
							let postData = {
								region_id: this.comAmend.city_id,
							};
							this.$post(this.$staticGetAddress, postData).then((res2) => {
								let data = res2;
								if(data.status_code == 0) {
									this.options3 = data.data.address;

								} else {

								}
							});
						} else {

						}
					});
				} else {
					for(let i = 0; i < this.shopList.length; i++) {
						if(e == this.shopList[i].oid) {
							//切换到店铺添加一层深从coby否则报错
							this.shopAmend = this.$objDeepCopy(this.shopList[i]);
							if(this.shopAmend.morning) {
								let morning = this.shopAmend.morning.split(',');
								this.shopAmend.morning = morning;
							}
							if(this.shopAmend.afternoon) {
								let afternoon = this.shopAmend.afternoon.split(',');
								this.shopAmend.afternoon = afternoon;
							}
							if(this.shopAmend.night) {
								let night = this.shopAmend.night.split(',');
								this.shopAmend.night = night;
							}
							let postData1 = {
								region_id: this.shopAmend.province_id,
							};
							this.$post(this.$staticGetAddress, postData1).then((res1) => {
								let data = res1;
								if(data.status_code == 0) {
									this.options2 = data.data.address;
									let postData = {
										region_id: this.shopAmend.city_id,
									};
									this.$post(this.$staticGetAddress, postData).then((res2) => {
										let data = res2;
										if(data.status_code == 0) {
											this.options3 = data.data.address;

										} else {

										}
									});
								} else {

								}
							});

						}
					}
					this.model2 = 2;
				}
			},
			searchShop(){
				this.ajaxjson();
			},
			ajaxjson() {
				let postData = {
					page: this.page,
					per_page: this.per_page,
					search: this.search,
				}
				this.$post(this.$customerList, postData).then((res) => {
					if(res.status_code == 0) {
						this.total = res.data.total;
						this.tableData = res.data.data;

					}
				})
			},
			//分页组件
			handleSizeChange(val) {
				this.per_page = val;
				this.ajaxjson();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.ajaxjson();
			},
			indexMethod(index){
				return (this.page - 1)* this.per_page+index+1;
			},
			tableheaderClassName({
				row,
				rowIndex
			}) {
				return "table_head_th";
			},
			//获取七牛上传时候的token
			get_qiniu_token() {
				this.$post(this.$qiniu).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.actionPath = data.data.QiNiuFileUrl + "erp-app"; //不知道什么用
						this.postData.token = data.data.token;
					} else {
						console.log("加载出错", res);
					}
				});
			},
			//三级联动获取地址
			getadress() {
				this.$post(this.$staticGetAddress).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options1 = data.data.address;
					} else {}
				});
			},
			selectOptions1(e) {
				let postData = {
					region_id: e,
				};
				this.options2 = [];
				this.merchantForm.city_id = '';
				this.options3 = [];
				this.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options2 = data.data.address;
					} else {}
				});
			},
			selectOptions2(e) {
				let postData = {
					region_id: e,
				};
				this.options3 = [];
				this.merchantForm.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options3 = data.data.address;
					} else {}
				});
			},
			selectOptions3(e) {
				let postData = {
					region_id: e,
				};
				this.options2 = [];
				this.shopForm.city_id = '';
				this.options3 = [];
				this.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options2 = data.data.address;
					} else {}
				});
			},
			selectOptions4(e) {
				let postData = {
					region_id: e,
				};
				this.options3 = [];
				this.shopForm.area_id = '';
				this.$post(this.$staticGetAddress, postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.options3 = data.data.address;
					} else {}
				});
			},
			//上传图片之前
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.postData.key = file.name; //上传时控制文件名
			},
			//上传营业执照
			handleAvatarSuccess_1(res, file) {
				this.centermerchant.licenseimg = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.merchantForm.licenseimg = res.key //本地地址上传展示
			},
			//上传手持身份证正面
			handleAvatarSuccess_2(res, file) {
				this.centermerchant.positive_img = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.merchantForm.positive_img = res.key //本地地址上传展示
			},
			//上传手持身份证背面
			handleAvatarSuccess_3(res, file) {
				this.centermerchant.back_img = URL.createObjectURL(file.raw) //暂时展示 的还是本地添加图片
				this.merchantForm.back_img = res.key //本地地址上传展示
			},
			///新增公司的信息
			addMerchant() {
				this.model = 2;
			},
			//上传公司信息
			submitMerchantForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.merchantForm;
						this.$post(this.$customerAdd, postData).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.$refs[e].resetFields();
								this.ajaxjson();
								this.model = 1;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//重置表单 并关闭上传公司页面
			resetMerchantForm(e) {
				this.$refs[e].resetFields();
				this.model = 1;
			},
			// 新增店铺信息
			addShop(e) {
				this.model = 3;
				this.shopForm.id = e;
			},
			CombinationOfTime(arr) {
				let str1 = arr[0];
				let str2 = arr[1];
				return str1 + "," + str2;
			},
			submitShopForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.shopForm);
						postData.morning = this.CombinationOfTime(postData.morning);
						postData.afternoon = this.CombinationOfTime(postData.afternoon);
						postData.night = this.CombinationOfTime(postData.night);
						this.$post(this.$customerAddShop, postData).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.$refs[e].resetFields();
								this.ajaxjson();
								this.model = 1;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else {
						return false;
					}
				});
			},
			resetShopForm(e) {
				this.$refs[e].resetFields();
				this.model = 1;
			},
			deletes(e) {
				console.log(e);
				let postData = {
					id: e,
				}
				this.$delete(this.$customerDel, postData)
			},
			//或去数据
			amend(e) {
				let postData = {
					oid: e,
				}
				this.$post(this.$archivesGetInfo, postData).then((res) => {
					if(res.status_code == 0) {
						this.img_path = res.data.list.img_path;
						this.shopList = res.data.list.shop;
						this.comAmend = res.data.list;
						this.centermerchant.licenseimg = this.comAmend.licenseimg;
						this.centermerchant.positive_img = this.comAmend.positive_img;
						this.centermerchant.back_img = this.comAmend.back_img;
						this.model = 4;
						//拿到省的id 请求下面的市
						let postData1 = {
							region_id: res.data.list.province_id,
						};
						this.$post(this.$staticGetAddress, postData1).then((res1) => {
							let data = res1;
							if(data.status_code == 0) {
								this.options2 = data.data.address;
								let postData = {
									region_id: res.data.list.city_id,
								};
								this.$post(this.$staticGetAddress, postData).then((res2) => {
									let data = res2;
									if(data.status_code == 0) {
										this.options3 = data.data.address;

									} else {

									}
								});
							} else {

							}
						});
					} else {

					}
				})
			},
			cancelamendMerchantForm() {
				this.model = 1;
				this.model2 = 1;
			},
			//修改公司信息
			amnedMerchantForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.comAmend;
						this.$post(this.$customerEdit, postData).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.$refs[e].resetFields();
								this.ajaxjson();
								this.model = 1;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//修改店铺信息
			amendShopForm(e) {
				this.$refs[e].validate((valid) => {
					if(valid) {
						let postData = this.$objDeepCopy(this.shopAmend);
						postData.morning = this.CombinationOfTime(postData.morning);
						postData.afternoon = this.CombinationOfTime(postData.afternoon);
						postData.night = this.CombinationOfTime(postData.night);
						this.$post(this.$archivesEditShop, postData).then((res) => {
							if(res.status_code == 0) {
								this.$message({
									type: 'success',
									message: res.message,
								});
								this.$refs[e].resetFields();
								this.ajaxjson();
								this.model = 1;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//提交公司数据

		}
	}
</script>
<style>
	.table_head_th {
		height: 40px;
		color: #333;
		background-color: #f5f5f5 !important;
		font-size: 14px;
	}
	
	.el-button--warning {
		color: #fff;
		background-color: #f58c22;
		border-color: #f58c22;
	}
	
	.el-button--warning:hover {
		background-color: #EF9E6F;
		border-color: #EF9E6F;
	}
	
	.el-button--warning:active {
		background: #f58c22;
		border-color: #f58c22;
		color: #fff;
		outline: 0
	}
	
	.el-button--danger {
		color: #fff;
		background-color: #f04d4d;
		border-color: #f04d4d;
	}
	
	.el-button--danger:hover {
		background-color: #f56c6c;
		border-color: #f56c6c;
	}
	
	.el-button--danger:active {
		background: #f04d4d;
		border-color: #f04d4d;
		color: #fff;
		outline: 0
	}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		.active {
			color: #18CCBA;
			border-top: 2px solid #18CCBA;
			background-color: #FFFFFF;
			box-sizing: border-box;
		}
		padding: 25px 40px;
		.showList {
			.title {
				display: flex;
				align-items: center;
				.add {
					margin-right: 5px;
				}
			}
			.titleInput {
				width: 375px;
				margin-left: 40px;
				.appendButton {
					background-color: #e0e0e0;
					font-size: #666666;
					border-radius: 0px;
					width: 78px;
					padding: 0px;
					height: 36px;
				}
			}
			.tTable {
				margin-top: 20px;
			}
		}
		.addMerchant {
			.list {
				height: 40px;
				line-height: 40px;
				width: 120px;
				cursor: pointer;
				text-align: center;
				float: left;
				padding-left: 10px;
				padding-right: 10px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.title {
				height: 15px;
				line-height: 15px;
				color: #333333;
				font-size: 15px;
				border-left: 2px solid #18ccba;
				padding-left: 15px;
				font-family: "微软雅黑";
				font-weight: 400;
				margin-bottom: 15px;
			}
			.avatar-uploader .el-upload {
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
				float: left;
				margin-right: 15px;
			}
			.upload_img {
				width: 225px;
				height: 300px;
				background-color: #e3e6e5;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.upload_img:hover {
				background-color: #d9d9d9;
			}
			.identityCard {
				width: 240px;
				height: 152px;
				background-color: #e3e6e5;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.identityCard:hover {
				background-color: #d9d9d9;
			}
		}
	}
</style>