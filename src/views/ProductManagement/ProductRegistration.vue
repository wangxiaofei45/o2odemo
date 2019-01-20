<!--商品注册-->
<template>
	<div class="step_con">
		<!--列表页-->
		<div class="tablist" v-show="showModel == 1">
			<el-row style="margin-bottom: 15px;">
				<el-col :span="12">
					<el-button v-show="permission.indexOf('198') != -1" @click="addGoods" type="primary">
						<svg-icon icon-class="add" /> 
						新增
					</el-button>
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="primary">
						导入
					</el-button>
				</el-col>
			</el-row>
			<el-table :data="tableData" border style="width: 100%" :height="tablehight">
				<el-table-column type="index" label="序号" width="80" align="center">
				</el-table-column>
				<el-table-column type="index" label="商品主图" width="120">
					<template slot-scope="scope">
						<img style="height: 30px;" :src="scope.row.image_url" />
					</template>
				</el-table-column>
				<el-table-column prop="freight_number" label="货号" width="150" align='center'>
					<template slot-scope="scope">
						<span style="cursor:pointer;color: #18CCBA" @click="edit(scope.row.id)">{{scope.row.freight_number}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称" width="200" align='center'>
				</el-table-column>
				<el-table-column prop="min_price" label="最小价格" width="90" align='center'>
				</el-table-column>
				<el-table-column prop="max_price" label="最大价格" width="90" align='center'>
				</el-table-column>
				<el-table-column prop="p_category_name" label="一级分类" width="150" align='center'>
				</el-table-column>
				<el-table-column prop="category_name" label="二级分类" width="150" align='center'>
				</el-table-column>
				<el-table-column prop="brand_name" label="品牌">
				</el-table-column>
			</el-table>
			<div class="block" style="padding: 15px; background-color: #fff;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--编辑-->
		<div v-show="showModel == 3">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					修改
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<div class="form">
				<el-form :model="amendInfo" ref="amendInfo" :rules="rulefromItem" label-width="80px">
					<el-row class="step2_info">
						<el-row class="step2_info_1">
							<el-row class="content_2_title" id="basicMessage">
								基本信息
							</el-row>
							<el-form-item label="商品分类" prop="good_class">
								<el-input v-model="amendInfo.categoryName" style="width: 200px;" disabled></el-input>
							</el-form-item>
							<el-form-item label="商品名称" prop="goods_name">
								<el-input v-model="amendInfo.goods_name" style="width: 200px;" placeholder="请输入" disabled></el-input>
								<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
							</el-form-item>
							<el-form-item label="货号" prop="freight_number">
								<el-input v-model="amendInfo.freight_number" style="width: 200px;" placeholder="请输入" maxlength="8" disabled></el-input>
								<div class="hint">货号最长8位</div>
							</el-form-item>
							<el-form-item label="类目属性">
								<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
							</el-form-item>
							<el-row class="type">
								<el-col :span="12" v-for="(item,index) in categoryAttributes" :key="item.id">
									<el-form-item :label="item.name">
										<el-select v-model="item.modelName" placeholder="请选择">
											<el-option v-for="(j,z) in item.child" :label="j.name" :value="j.id" :key="j.id">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
						</el-row>
						<el-row class="step2_info_2">
							<el-row class="content_2_title" id="salesMessage">
								销售信息
							</el-row>
							<el-row>
								<el-form-item label="颜色分类">
									<div class="hint">选择标准色可增加搜索/导购机会,标准色还可以填写颜色备注行信息(偏深,偏亮等)</div>
									<div class="selectColor" v-for="(item,index) in amendCenterColor.data">
										<el-input  v-model="item.name" style="width: 200px;" placeholder="选择或输入主色" disabled></el-input>
										<el-input style="width: 200px; height: 36px;" v-model="item.colorRemark" placeholder="备注(如偏深偏浅等)" disabled></el-input>
										<img v-if="item.img" style="width: 36px;height: 36px;position: absolute;top: auto; margin-left: 15px;" :src="item.img" />
										<el-upload v-else style="display: inline-block" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
											<el-button size="small" type="primary" @click="upLoadListImg(item,index)">上传图片</el-button>
										</el-upload>
									</div>
								</el-form-item>
								<el-form-item label="尺码">
									<div class="hint">选择标准尺码可增加搜索/导购机会,标准尺码还可填写尺码备注信息(偏小,偏大等)</div>
									<div class="size">
										<!--这个地方出错-->
										{{secondInfo.name}}
									</div>
									<div class="check_group" >
										<el-checkbox-group v-model="checkedSize" style="width: 800px;">
											<el-checkbox style="width: 140px;padding: 0px;margin: 0px;" v-for="(item,index) in amendCenterSizeArr.arr2" :key="item.id" checked disabled>
												{{item.name}}
											</el-checkbox>
										</el-checkbox-group>
									</div>
								</el-form-item>
								<el-table :data="sku_value" max-height="600" border style="width: 760px;" v-show="sku_value.length">
									<el-table-column prop="attr1Value" label="颜色" width="100" align="center">
									</el-table-column>
									<el-table-column prop="attr2Value" label="尺码" width="100" align="center">
									</el-table-column>
									<el-table-column prop="sku_price" label="价格" width="160" align="center">
										<template slot-scope="scope">
											<span>{{scope.row.sku_price/100}}</span>
										</template>
									</el-table-column>
									<el-table-column prop="stock" label="库存" width="200" align="center">
									</el-table-column>
									<el-table-column prop="shop_code" label="商家编码" width="200" align="center">
									</el-table-column>
								</el-table>
								<el-form-item style="margin-top: 15px;" label="商品库存" prop="stock">
									<el-input v-model="amendInfo.stock" style="width: 200px;" disabled></el-input>
								</el-form-item>
							</el-row>
						</el-row>
						<el-row class="step2_info_3">
							<el-row class="content_2_title" id="imgMessage">
								图文描述
							</el-row>
							<el-form-item label="商品图片">
								<div class="hint">商品主图不能超过1mb,建议尺寸700*700像素</div>
								<div v-for="(item,index) in amendShowImg" :key="index" style="float: left;margin-right: 15px;">
									<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
										<img v-if="amendShowImg.length" :src="item.image_url" class="avatar">
										<div v-else class="upload_img" @click="upList(index)">
											上传图片
										</div>
									</el-upload>
								</div>
							</el-form-item>
						</el-row>
						<el-row class="submit">
							<el-col :sapn="24" style="text-align: center;">
								<el-button type="primary" @click="amend" style='width: 400px;'>
									提交
								</el-button>
							</el-col>
						</el-row>

					</el-row>
				</el-form>
			</div>
		</div>
		<!--商品新增-->
		<div v-show="showModel == 2">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px;">
					新增商品
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="back">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<el-steps :active="active" align-center>
				<el-step title="步骤1" description="选择商品分类"></el-step>
				<el-step title="步骤2" description="填写商品详情	"></el-step>
			</el-steps>
			<!--商品添加第一步-->
			<div class="step_1" v-show="active == 0">
				<el-row class="contnet_1_title">
					当前选择:{{show_value}}
				</el-row>
				<div class="content_1">
					<!--第一层循环-->
					<el-row>
						<el-col :span="8">一级分类</el-col>
						<el-col :span="8">二级分类</el-col>
						<el-col :span="8">品牌分类</el-col>
					</el-row>
					<el-row class="content_2">
						<el-col :span="8" class="content_3">
							<div v-bind:class="[isActive == index ? actives : '', select]" v-for="(i,index) in list_1_options" @click="select_1(i,index)" :key="i.value">
								{{i.name}}
							</div>
						</el-col>
						<!--第二层循环-->
						<el-col :span="8" class="content_3">
							<div v-bind:class="[isActive_2 == index_2 ? actives : '', select]" v-for="(j,index_2) in list_2_options" @click="select_2(j,index_2)" :key="j.value">
								{{j.name}}
							</div>
						</el-col>
						<!--第三层循环-->
						<el-col :span="8" class="content_3">
							<el-row>
								<div v-bind:class="[isActive_3 == index_3 ? actives : '', select]" class="select" v-for="(z,index_3) in brandlist" @click="select_3(z,index_3)" :key="z.brand_id">
									{{z.brand_name}}
								</div>
							</el-row>
							<!--<el-button type="primary">申请添加品牌</el-button>-->
						</el-col>

					</el-row>
				</div>
				<el-row>
					<el-col :span="8" :offset="8">
						<el-button type="primary" style="width: 100%;" @click="next(1)">
							下一步
						</el-button>
					</el-col>
				</el-row>
			</div>
			<div class="step_2" v-show="active == 1">
				<div class="form">
					<el-form :model="fromItem" ref="fromItem" :rules="rulefromItem" label-width="80px">
						<!--锚点-->
						<el-row class="aAnchor">
							<a href="javascript:void(0)" @click="goAnchor('basicMessage')">
								<el-col v-bind:class="[titleActive == 'basicMessage' ? activeClass : '',list]" :span="2">
									基本信息
								</el-col>
							</a>
							<a href="javascript:void(0)" @click="goAnchor('salesMessage')">
								<el-col v-bind:class="[titleActive == 'salesMessage' ? activeClass : '',list]" :span="2">销售信息</el-col>
							</a>
							<a href="javascript:void(0)" @click="goAnchor('imgMessage')">
								<el-col v-bind:class="[titleActive == 'imgMessage' ? activeClass : '',list]" :span="2">图文描述</el-col>
							</a>
						</el-row>
						<!--锚点-->
						<el-row class="step2_info">
							<el-row class="step2_info_1">
								<el-row class="content_2_title" id="basicMessage">
									基本信息
								</el-row>
								<el-form-item label="商品分类" prop="good_class">
									<el-input v-model="show_value" style="width: 200px;" disabled></el-input>
								</el-form-item>
								<el-form-item label="商品名称" prop="goods_name">
									<el-input v-model="fromItem.goods_name" style="width: 200px;" placeholder="请输入"></el-input>
									<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
								</el-form-item>
								<el-form-item label="货号" prop="freight_number">
									<el-input v-model="fromItem.freight_number" style="width: 200px;" placeholder="请输入" maxlength="8"></el-input>
									<div class="hint">货号最长8位</div>
								</el-form-item>
								<el-form-item label="类目属性">
									<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
								</el-form-item>

								<el-row class="type">
									<el-col :span="12" v-for="(item,index) in categoryAttributes" :key="item.id">
										<el-form-item :label="item.name">
											<el-select v-model="item.modelName" placeholder="请选择">
												<el-option v-for="(j,z) in item.child" :label="j.name" :value="j.id" :key="j.id">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
							</el-row>
							<!--第二部分-->
							<el-row class="step2_info_2">
								<el-row class="content_2_title" id="salesMessage">
									销售信息
								</el-row>
								<el-row>
									<el-form-item label="颜色分类">
										<div class="hint">选择标准色可增加搜索/导购机会,标准色还可以填写颜色备注行信息(偏深,偏亮等)</div>
										<!--修改-->
										<div class="selectColor" v-for="(item,index) in centerColor">
											<el-input @focus="showColor(item,index)" @blur="closeColor(item,index)" v-model="item.colorName" style="width: 200px;" placeholder="选择或输入主色"></el-input>
											<el-input style="width: 200px; height: 36px;" v-model="item.colorRemark" placeholder="备注(如偏深偏浅等)"></el-input>
											<img v-if="item.showImg" style="width: 36px;height: 36px;position: absolute;top: auto; margin-left: 15px;" :src="item.showImg" />
											<el-upload v-else style="display: inline-block" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
												<el-button size="small" type="primary" @click="upLoadListImg(item,index)">上传图片</el-button>
											</el-upload>
											<!--定位元素-->
											<div class="colorArr" v-show="showColorModel == index">
												<!--<div class="colorArr">-->
												<!--左边的鼠标移动上去-->
												<div class="left">
													<div class="list" v-for="(item,index) in colorArrs" :key="item.id" v-bind:class="[showGroupId == item.id ? actives : '', select]" @mouseenter="sidebarHover(item)">
														<div class="titleColor" :style="{backgroundColor:item.rgb}"></div>
														<span class="text">{{item.name}}</span>
													</div>
												</div>
												<!--右边的显示-->
												<div class="right">
													<p class="title">常用标准颜色</p>
													<el-row v-for="(item,index) in colorArrs" :key="item.id" v-show="showGroupId==item.id">
														<el-col :span="6" v-for="(i,j) in item.child" :key="i.name">
															<div class="list" @mousedown="sureColor(i)">
																<div class="titleColor" :style="{backgroundColor:i.rgb}"></div>
																<span class="text">{{i.name}}</span>
															</div>
														</el-col>
													</el-row>
												</div>
											</div>
										</div>
									</el-form-item>
									<el-form-item label="尺码">
										<div class="hint">选择标准尺码可增加搜索/导购机会,标准尺码还可填写尺码备注信息(偏小,偏大等)</div>
										<div class="size">
											<el-radio-group v-model="size">
												<el-radio v-for="(item,index) in sizeArr" :key="item.id" :label="item.id">{{item.name}}</el-radio>
											</el-radio-group>
										</div>
										<div class="diySize">
											<el-input placeholder="请输入自定义项" v-model="customSize" style="width: 200px;"></el-input>
											<el-button @click="customAdd">添加</el-button>
										</div>
										<div class="check_group" v-for="(item,index) in sizeArr" :key="item.value">
											<div v-show="item.id == size">
												<el-checkbox-group v-model="checkedSize" style="width: 800px;">
													<el-checkbox style="width: 140px;padding: 0px;margin: 0px;" v-for="j in item.child" :label="j.name" :key="j.id" @change="uniterming(j,item)">{{j.name}}
														<!--<el-input v-show="j.checked" style="width: 90px;" size="mini" placeholder="请输入备注"></el-input>-->
													</el-checkbox>
												</el-checkbox-group>
											</div>
										</div>
									</el-form-item>
									<!--总数量-->
									<!--:span-method="objectSpanMethod"-->
									<el-table :data="fromTable" max-height="600" border style="width: 760px;" v-show="fromTable.length">
										<el-table-column prop="colorName" label="颜色" width="80">
										</el-table-column>
										<el-table-column prop="size" label="尺码" width="80">
										</el-table-column>
										<el-table-column prop="sku_price" label="价格" width="200" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.sku_price"></el-input>
											</template>
										</el-table-column>
										<el-table-column prop="stock" label="库存" width="200" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.stock"></el-input>
											</template>
										</el-table-column>
										<el-table-column prop="shop_code" label="商家编码" width="200" align="center">
											<template slot-scope="scope">
												<el-input v-model="scope.row.shop_code"></el-input>
											</template>
										</el-table-column>
									</el-table>
									<el-form-item style="margin-top: 15px;" label="商品库存" prop="stock">
										<el-input v-model="good_info.stock" style="width: 200px;" disabled></el-input>
									</el-form-item>
								</el-row>
							</el-row>
							<!--第三部分-->
							<el-row class="step2_info_3">
								<el-row class="content_2_title" id="imgMessage">
									图文描述
								</el-row>
								<el-form-item label="商品图片">
									<div class="hint">商品主图不能超过1mb,建议尺寸700*700像素</div>
									<div v-for="(item,index) in imageUrl_1" :key="index" style="float: left;margin-right: 15px;">
										<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
											<img v-if="item.showImg" :src="item.showImg" class="avatar">
											<div v-else class="upload_img" @click="upList(index)">
												上传图片
											</div>
										</el-upload>
									</div>
								</el-form-item>
							</el-row>
							<el-row class="submit">
								<el-col :sapn="24" style="text-align: center;">
									<el-button type="primary" @click="submit" style='width: 400px;'>
										提交
									</el-button>
								</el-col>
							</el-row>

						</el-row>
					</el-form>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				permission:[],
				clientHeight: document.documentElement.clientHeight,
				tablehight: document.documentElement.clientHeight - 220, //表格高度
				tableData: [],
				total: 0,
				page: 1, //分页
				per_page: 10, //每页几条
				showModel: 1, //显示列表新增 修改 
				amendInfo: {}, //修改信息
				//提交的数据
				fromItem: {
					category_id: '', //分类Id
					brand_id: '', //品牌Id
					goods_name: '', //商品名称
					freight_number: '', //货号
					basic_attr_value: '', //类目属性 字符串
					sale_attr_value: '', //销售属性
					stock: '1',
					skuData: '', //
					imgData: ['', '', '', '', ''], //图片信息
					min_price: '1', //价格最小值
					max_price: '100', //价格最大值
				},
				rulefromItem: {
					goods_name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					freight_number: [{
						required: true,
						message: '请输入货号',
						trigger: 'blur'
					}]
				},
				sku_value:[],//修改选择时候的sku表格
				good_info: {
					goods_images: [], //商品图片
				},
				//选择分类列表
				list_1_options: [], //第一级分类选择
				list_2_options: [], //第二级分类选择
				brandlist: [], //品牌列表
				//选择分类时候的高亮
				name1: '请选择', //一级分类名称
				name2: '请选择', //二级分类名称
				name3: '请选择', //品牌分类名称

				isActive: -1, //第一层高亮
				isActive_2: -1, //第二层高亮
				isActive_3: -1, //第三层循环
				UploadImgIndex: '', //添加颜色上传图片时候的中间变量
				categoryAttributes: [], //类目属性
				//静态之前
				showGroupId: '', //鼠标hover事件显示的颜色组
				showValue: '', //点击选择颜色的时候
				amendIndex: '', //点击选择的中间变量
				amendItem: '', //点击选择的中间Item变量
				salesProperty: '', //提交时组装销售信息中介项
				//颜色组
				colorArrs: [],
				//选择颜色
				showColorModel: '-1',
				centerColor: [{
					color: "",
					colorName: '',
					colorRemark: '',
					color_attr_name: '',
					color_attr_id: '',
					id: '',
					imgUrl: '',
					showImg: '',
				}, ],
				amendCenterColor:[],//修改时候的显示颜色的数组
				amendCenterSizeArr:[],//修改时候的选择的size
				amendShowImg:[],
				secondInfo:{},//
				//选择尺码
				customSize: '',
				size: 1,
				checkedSize: [], //选择之后的尺码
				sizeArr: [], //尺码组
				centerSizeArr: [], //判断的尺码组
				checkList: [], //选择时候 的选择框
				fromTable: [], //最终提交的数据
				select: 'select',
				list: 'list',
				activeClass: 'active',
				titleActive: 'basicMessage', //锚点的信息
				actives: 'active',
				select1: 0,
				select2: 0,
				select3: 0,
				options_data: [], //选择最终确定的值
				show_value: '', //显示出来的值
				active: 0,
				//第二层添加图片
				postData: {}, //上传图片时携带的其他的数据
				UploadImgNumber: '', //上传图片时候 的控制
				imageUrl_1: [{
					showImg: ''
				}, {
					showImg: ''
				}, {
					showImg: ''
				}, {
					showImg: ''
				}, {
					showImg: ''
				}], // 图片上传完成后显示出来的照片
				//添加商品信息
				rowList: [],
				spanArr: [],
				position: 0,

			}
		},
		created() {
			this.getListOne(); //首次进来 获取列表第一级列表
			this.get_qiniu_token(); //获取七牛上传信息
			this.getGoodsList();
			let str = sessionStorage.getItem('permission');
			let permission = str.split(',');
			this.permission = permission;
		},
		mounted() {
			this.clientHeight = document.documentElement.clientHeight;
			const that = this;
			window.onresize = function temp() {
				that.clientHeight = document.documentElement.clientHeight;
				that.tablehight = that.clientHeight - 220;
			};
		},
		//计算属性
		methods: {
			//打开添加
			addGoods() {
				this.showModel = 2;
			},
			//取消添加
			back() {
				this.showModel = 1;
			},
			//打开编辑
			edit(e) {
				//展示显示
				let postData = {
					id: e,
				}
				this.$post(this.$goodsEdit, postData).then((res) => {
					if(res.status_code == 0) {
						let saleAttrs = res.data.saleAttrs;
						this.amendCenterColor = saleAttrs[0];
						this.amendCenterSizeArr = saleAttrs[1];
						let arr_1 = this.amendCenterSizeArr.data;
						let arr2 = [];
						for(let i=0;i<arr_1.length;i++){
							arr2.push(arr_1[i].data[0]);
						}
						this.amendCenterSizeArr.arr2 = arr2;
						let basic_attr_value = res.data.basic_attr_value;
					
						this.secondInfo = this.amendCenterSizeArr.secondInfo;
						this.sku_value = res.data.skus;
						this.amendShowImg = res.data.spuImages;
						let arr = JSON.parse(basic_attr_value);
						
						//这里去秦秋该类目下面的类目属性
						let postDatas = {
							type: 2,
							class_id: res.data.category_id,
						};
						this.$post(this.$goodsGetattribute, postDatas).then((res) => {
							if(res.status_code == 0) {
								let centerArr = res.data;
								for(let i = 0; i < centerArr.length; i++) {
									for(let j = 0; j < arr.length; j++) {
										if(arr[j].id == centerArr[i].id) {
											centerArr[i].modelName = arr[j].data[0].id;
										} 
									}
								}
								this.categoryAttributes = centerArr;//中间变量获取类目属性时从中获取
								this.showModel = 3;
							} else {
								this.$message({
									type: 'error',
									message: res.message,
								})
							}
						})
						this.amendInfo = res.data;
						

					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//首页获取商品的列表
			getGoodsList() {
				let postData = {
					page: this.page,
					per_page: this.per_page,
				}
				this.$post(this.$goodsList, postData).then((res) => {
					if(res.status_code == 0) {
						this.tableData = res.data.data;
						this.total = res.data.total;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			handleSizeChange(val) {
				this.per_page = val;
				this.getGoodsList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getGoodsList();
			},
			//首次进入获取的第一级的分类
			getListOne() {
				let postData = {
					pid: 0,
				};
				this.$post(this.$goodsclassGetlist, postData).then((res) => {
					if(res.status_code == 0) {
						this.list_1_options = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//获取销售属性
			goodsGetColor() {
				let postData = {
					type: 1,
					class_id: this.fromItem.category_id,
				};
				this.$post(this.$goodsGetattribute, postData).then((res) => {
					if(res.status_code == 0) {
						this.salesProperty = res.data;
						this.colorArrs = res.data[0].child;
						this.sizeArr = res.data[1].child;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			//获取类目属性
			goodsGetSize() {
				let postData = {
					type: 2,
					class_id: this.fromItem.category_id,
				};
				this.$post(this.$goodsGetattribute, postData).then((res) => {
					if(res.status_code == 0) {
						let centerArr = res.data;
						for(let i = 0; i < centerArr.length; i++) {
							centerArr[i].modelName = '';
						}
						this.categoryAttributes = centerArr;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
			},
			// 点击一级分类获取二级分类
			select_1(i, index) {
				this.isActive = index;
				this.name1 = i.name;
				this.name2 = '请选择';
				this.name3 = '请选择';
				this.isActive_2 = -1;
				this.isActive_3 = -1;
				this.fromItem.category_id = '';
				this.fromItem.brand_id = '';
				let postData = {
					pid: i.id,
				};
				//获取二级分类列表
				this.$post(this.$goodsclassGetlist, postData).then((res) => {
					if(res.status_code == 0) {
						this.list_2_options = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				})
				//获取品牌列表
				let postDatas = {
					class_id: i.id,
				};
				this.$post(this.$goodsbrandGetlist, postDatas).then((res) => {
					if(res.status_code == 0) {
						this.brandlist = res.data;
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				});
				this.GetTheValue();
			},
			//第二层选择
			select_2(i, index) {
				this.isActive_2 = index;
				this.name2 = i.name;
				this.isActive_3 = -1;
				this.name3 = '请选择';
				this.fromItem.category_id = i.id;
				this.fromItem.brand_id = '';
				this.GetTheValue();
			},
			//第三层选择
			select_3(i, index) {
				this.isActive_3 = index;
				this.fromItem.brand_id = i.brand_id;
				this.name3 = i.brand_name;
				this.GetTheValue();
			},
			//获取最终的想要获取的值,方法被调用
			GetTheValue() {
				let showArr = [this.name1, this.name2, this.name3];
				this.show_value = showArr.join('->');
			},
			upLoadListImg(e, index) {
				this.UploadImgIndex = index;
			},
			//上传图片之前
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.postData.key = file.name; //上传时控制文件名
			},
			//上传图片成功  身份证与人合照
			handleAvatarSuccess(res, file) {
				this.centerColor[this.UploadImgIndex].showImg = URL.createObjectURL(file.raw);
				this.centerColor[this.UploadImgIndex].imgUrl = res.key;

			},
			//自定义添加尺码
			customAdd() {
				let index = '';
				let isAdd = true;
				//查出来想要向那一个数组中添加
				for(var i = 0; i < this.sizeArr.length; i++) {
					if(this.sizeArr[i].id == this.size) {
						index = i;
					}
				}
				let obj = {
					checked: false,
					name: this.customSize
				};
				let objs = this.$objDeepCopy(obj);
				for(var i = 0; i < this.sizeArr[index].child.length; i++) {
					if(this.sizeArr[index].child[i].name == objs.name) {
						isAdd = false;
					}
				}
				if(isAdd) {
					this.sizeArr[index].child.push(objs);
				} else {
					//这里的提示
					this.$message({
						type: 'error',
						message: '您添加的元素已存在',
					})
				}

			},
			//获取焦点打开颜色的熟悉选择
			showColor(item, index) {
				this.showColorModel = index;
				this.amendIndex = index;
				this.amendItem = item;
			},
			//合并单元格
			rowspan() {
				this.fromTable.forEach((item, index) => {
					if(index === 0) {
						this.spanArr.push(1);
						this.position = 0;
					} else {
						if(this.fromTable[index].colorName === this.fromTable[index - 1].colorName) {
							this.spanArr[this.position] += 1;
							this.spanArr.push(0);
						} else {
							this.spanArr.push(1);
							this.position = index;
						}
					}
				})
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {    
				if(columnIndex === 0) {        
					const _row = this.spanArr[rowIndex];        
					const _col = _row > 0 ? 1 : 0;        
					return {            
						rowspan: _row,
						colspan: _col        
					}    
				}
			},
			//高亮显示的内容
			sidebarHover(item) {
				this.showGroupId = item.id;
			},
			//点击色块选择颜色
			sureColor(i) {
				//判断
				let obj = {};
				if(this.UploadImgIndex == '') {
					obj = {
						color: "#e4e4e4",
						colorName: i.name,
						colorRemark: i.value,
						color_attr_name: i.attr_name,
						color_attr_id: i.attr_id,
						id: i.id,
						imgUrl: '',
						showImg: '',
					}
				} else {
					obj = {
						color: "#e4e4e4",
						colorName: i.name,
						colorRemark: i.value,
						color_attr_name: i.attr_name,
						color_attr_id: i.attr_id,
						id: i.id,
						imgUrl: this.centerColor[this.UploadImgIndex].imgUrl,
						showImg: this.centerColor[this.UploadImgIndex].showImg,
					}
				}

				this.amendItem = obj
				//点击添加同样需要判断
				this.showColorModel = -1;
				if(this.checking(this.amendItem, this.amendIndex)) {
					//如果不是在最后一行添加的就不添加
					this.centerColor[this.amendIndex] = obj;
					if(this.amendIndex + 1 == this.centerColor.length) {
						let obj = {
							color: "",
							colorName: '',
							colorRemark: '',
							color_attr_name: '',
							color_attr_id: '',
							id: '',
							imgUrl: '',
							showImg: '',
						};
						this.centerColor.push(obj);
					}
					//组合
					this.combination(this.centerColor, this.centerSizeArr);
				}
			},
			//失去焦点时触发
			closeColor(item, index) {
				let _this = this;
				this.showColorModel = -1;
				//判断如果不为空就往centerColor添加 同时判断是否已经存在
				if(item.colorName != '') {
					if(this.checking(item, index)) {
						//如果不是在最后一行添加的就不添加
						if(index + 1 == this.centerColor.length) {
							let obj = {
								color: "",
								colorName: '',
								colorRemark: '',
								id: '',
								imgUrl: '',
								showImg: '',
							};
							this.centerColor.push(obj);
						}
						//这里去计算
						this.combination(this.centerColor, this.centerSizeArr);
					}
				} else {
					return;
				}
			},
			//判断是否存在
			checking(item, index) {
				let newArr = this.$coppyArray(this.centerColor);
				newArr.splice(index);
				if(newArr.length == 0) {
					return true;
				} else {
					for(let i = 0; i < newArr.length; i++) {
						if(newArr[i].colorName == item.colorName && newArr[i].colorRemark == item.colorRemark) {
							return false;
							break; //阻断
						} else {
							return true;
							break; //阻断
						}
					}
				}

			},
			//选中尺码
			uniterming(val, item) {
				console.log(item);
				//点击是显示还是隐藏输入框
				val.checked = !val.checked;
				let obj = {
					id: val.id,
					name: val.name,
					size_attr_id: val.attr_id,
					size_attr_name: val.attr_name,
					size_center_id: item.id,
					size_center_name: item.name,
				}
				if(val.checked) {
					this.centerSizeArr.push(obj);
				} else {
					let index = '';
					for(let i = 0; i < this.centerSizeArr; i++) {
						if(obj.id == this.centerSizeArr[i].id) {
							index = i;
							return;
						}
					}
					this.centerSizeArr.splice(index, 1);
				};
				this.combination(this.centerColor, this.centerSizeArr);
			},
			//组合尺码组
			combination(colorArr, sizeArr) {
				if(colorArr.length == 1) {
					return;
				} else {
					let allcenterArr = [];
					for(var i = 0; i < colorArr.length - 1; i++) {
						let Xindex = {};
						for(var j = 0; j < sizeArr.length; j++) {
							colorArr[i].sku_price = ''; //价格
							colorArr[i].stock = ''; //库存
							colorArr[i].shop_code = ''; //条形码
							colorArr[i].size = sizeArr[j].name;
							colorArr[i].sizeId = sizeArr[j].id;
							colorArr[i].size_attr_id = sizeArr[j].size_attr_id;
							colorArr[i].size_attr_name = sizeArr[j].size_attr_name;
							Xindex = colorArr[i];
							//对象的深copy
							let centerXindex = this.$objDeepCopy(Xindex);
							allcenterArr.push(centerXindex);
						}
					}
					//数组的深从copy
					this.fromTable = this.$coppyArray(allcenterArr);
					//this.rowspan();
				}
			},
			//vue使用的是hash值使用的锚点定位出现问题,模拟实现锚点定位
			goAnchor(e) {
				var elements = document.getElementById(e);
				this.titleActive = e;
				document.documentElement.scrollTop = elements.offsetTop;  
			},
			//全选
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//点击下一步
			next(e) {
				if(!this.fromItem.category_id) {
					this.$message({
						type: 'error',
						message: '请先选择商品分类',
					})
				} else if(!this.fromItem.brand_id) {
					this.$message({
						type: 'error',
						message: '请选择品牌分类',
					})
				} else {
					this.goodsGetColor(); //获取颜色属性
					this.goodsGetSize(); //获取尺码属性
					this.active++;
				}
				if(e >= 3) {
					console.log("已经完成,点击跳转!");
				}
			},
			//继续添加
			ContinueToAdd(FormName) {
				this.active = 0;
				this.$refs[FormName].resetFields();
			},

			//上传图片
			get_qiniu_token() {
				this.$post(this.$qiniu).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.actionPath = data.data.QiNiuFileUrl + "erp-app";
						this.postData.token = data.data.token;
					} else {
						console.log("加载出错", res);
					}
				});
			},

			//上传图片之前
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.postData.key = file.name; //上传时控制文件名
			},
			upList(index) {
				this.UploadImgNumber = index;
				console.log(this.UploadImgNumber);
			},
			//上传图片成功  身份证与人合照
			handleAvatarSuccess_1(res, file) {
				this.imageUrl_1[this.UploadImgNumber].showImg = URL.createObjectURL(file.raw);
				this.fromItem.imgData[this.UploadImgNumber] = res.key;
				this.UploadImgNumber = -1;
			},
			//提交
			submit() {
				let postData = this.$objDeepCopy(this.fromItem);
				//类目属性
				let centerArr = this.$coppyArray(this.categoryAttributes);
				let Arr1 = [];
				for(let i = 0; i < centerArr.length; i++) {

					let obj = {};
					obj.id = centerArr[i].id;
					obj.name = centerArr[i].name;
					obj.data = [];
					for(let j = 0; j < centerArr[i].child.length; j++) {
						if(centerArr[i].modelName == centerArr[i].child[j].id) {
							let objs = {
								id: centerArr[i].child[j].id,
								name: centerArr[i].child[j].name,
							};
							obj.data.push(objs);
						} else {}
					}
					Arr1.push(obj)
				}
				//类目属性
				postData.basic_attr_value = JSON.stringify(Arr1);
				//销售信息颜色
				let salesProperty = this.salesProperty;
				let Arr2 = [];
				let obj1 = {
					id: salesProperty[0].id,
					name: salesProperty[0].name,
					data: [],
				};
				for(let i = 0; i < this.centerColor.length - 1; i++) {
					let obj = {
						id: this.centerColor[i].id,
						name: this.centerColor[i].colorName,
					}
					obj1.data.push(obj);
				};
				Arr2.push(obj1);
				let sizeArr = {
					id: salesProperty[1].id,
					name: salesProperty[1].name,
					data: [],
				};
				for(let i = 0; i < this.centerSizeArr.length; i++) {
					let obj = {
						id: this.centerSizeArr[i].size_center_id,
						name: this.centerSizeArr[i].size_center_name,

						data: [{
							id: this.centerSizeArr[i].id,
							name: this.centerSizeArr[i].name,
						}]
					}
					sizeArr.data.push(obj);
				}
				Arr2.push(sizeArr);
				postData.sale_attr_value = JSON.stringify(Arr2);
				//sku组合
				let fromTable = this.$coppyArray(this.fromTable);
				for(let i = 0; i < fromTable.length; i++) {
					delete fromTable[i].showImg;
					delete fromTable[i].colorRemark;
					delete fromTable[i].color;
					fromTable[i].specnamestr = fromTable[i].colorName + '|' + fromTable[i].size;
					fromTable[i].sale_attrs = [{
							attr_id: fromTable[i].color_attr_id,
							attr_name: fromTable[i].color_attr_name,
							data: {
								id: fromTable[i].id,
								name: fromTable[i].colorName,
							}
						},
						{
							attr_id: fromTable[i].size_attr_id,
							attr_name: fromTable[i].size_attr_name,
							data: {
								id: fromTable[i].sizeId,
								name: fromTable[i].size,
							}
						},
					];
					fromTable[i].img_url = fromTable[i].imgUrl;
					fromTable[i].sku_price = fromTable[i].sku_price * 100;
					delete fromTable[i].colorName;
					delete fromTable[i].color_attr_id;
					delete fromTable[i].color_attr_name;
					delete fromTable[i].size_attr_name;
					delete fromTable[i].id;
					delete fromTable[i].size;
					delete fromTable[i].sizeId;
					delete fromTable[i].size_attr_id;
					delete fromTable[i].imgUrl;
				}
				postData.skuData = JSON.stringify(fromTable);
				let imgdata = postData.imgData;
				let obj3 = {
					default: '',
					list: []
				};
				obj3.default = imgdata[0];
				console.log(imgdata);
				obj3.list = postData.imgData;
				postData.imgData = JSON.stringify(obj3);
				this.$post(this.$goodsAdd, postData).then((res) => {
					console.log(res);
					if(res.status_code == 0) {
						console.log(res)
					} else {
						this.$message({
							type: 'error',
							message: res.message,
						})
					}
				});
			},
			amend(){
				let postData = {};
				postData.id = this.amendInfo.id;
				let centerArr = this.$coppyArray(this.categoryAttributes);
				let Arr1 = [];
				for(let i = 0; i < centerArr.length; i++) {
					let obj = {};
					obj.id = centerArr[i].id;
					obj.name = centerArr[i].name;
					obj.data = [];
					for(let j = 0; j < centerArr[i].child.length; j++) {
						if(centerArr[i].modelName == centerArr[i].child[j].id) {
							let objs = {
								id: centerArr[i].child[j].id,
								name: centerArr[i].child[j].name,
							};
							obj.data.push(objs);
						} else {}
					}
					Arr1.push(obj)
				}
				//类目属性
				postData.basic_attr_value = JSON.stringify(Arr1);
				let sku = this.$coppyArray(this.sku_value);
				postData.skuData = JSON.stringify(sku);
				//图片
				let imgData =  this.$coppyArray(this.amendShowImg)
				let obj3 = {
					default: '',
					list: []
				};
				obj3.default = imgData[0].image_url;
				for(let i=0;i<imgData.length;i++){
					if(imgData[i].default == 1){
						obj3.default = imgData[i].image_url;
					}else{
						obj3.list.push(imgData[i].image_url);
					}
				}
				postData.imgData = JSON.stringify(obj3);
				this.$post(this.$goodsUpdate,postData).then((res)=>{
					console.log(res);
				})
			}
			
		}
	}
</script>

<style scoped="scoped">
	.model_title {
		border-bottom: 1px solid #d6d6d6;
		margin-bottom: 20px;
	}
	
	.recharge_title {
		font-size: 16px;
		color: #999;
		padding-left: 20px;
		margin-bottom: 20px;
	}
	
	.title {
		margin-bottom: 15px;
	}
	
	.submit {
		background-color: #FFFFFF;
		padding: 15px;
	}
	
	.selectColor {
		position: relative;
		margin-bottom: 10px;
	}
	
	.selectColor .colorArr {
		position: absolute;
		left: 0px;
		top: 36px;
		width: 600px;
		height: 400px;
		background-color: #fff;
		border: 1px solid #E0E0E0;
		border-radius: 4px;
		z-index: 10;
		clear: both;
	}
	
	.selectColor .colorArr .left {
		width: 150px;
		height: 100%;
		border-right: 1px solid #E0E0E0;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	
	.selectColor .colorArr .right {
		padding: 15px;
		font-size: 12px;
		width: 450px;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	
	.selectColor .colorArr .right .title {
		font-size: 14px;
		padding: 0px;
		margin: 0px;
		line-height: 24px;
	}
	
	.selectColor .colorArr .left .list {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
	}
	
	.selectColor .colorArr .left .list:hover {
		cursor: pointer;
	}
	
	.selectColor .colorArr .left .titleColor {
		width: 16px;
		height: 16px;
		float: left;
		display: block;
		margin-top: 7px;
		margin-left: 15px;
		margin-right: 10px;
		border: 1px solid #E0E0E0;
	}
	
	.selectColor .colorArr .right .list {
		height: 30px;
		line-height: 30px;
		cursor: pointer;
	}
	
	.selectColor .colorArr .right .list:hover {
		background-color: #D6D6D6;
	}
	
	.selectColor .colorArr .right .titleColor {
		width: 16px;
		height: 16px;
		float: left;
		display: block;
		margin-top: 7px;
		margin-left: 15px;
		margin-right: 10px;
		border: 1px solid #E0E0E0;
	}
	/*设置当前页面的背景颜色*/
	
	.step_con {
		background-color: #ffffff;
		padding: 40px 15px;
		box-sizing: border-box;
	}
	/*第二部头部的样式*/
	
	.aAnchor {
		background-color: #FFFFFF;
		margin-bottom: 15px;
	}
	
	.aAnchor .list {
		font-size: 16px;
		color: #333333;
		height: 50px;
		line-height: 50px;
		text-align: center;
		box-sizing: border-box;
	}
	/*第二部高亮样式*/
	.aAnchor .active {
		background-color: #D6D6D6 !important;
		border-top: 3px solid #000;
	}
	/*第二部*/
	
	.step2_info {}
	
	.step2_info_1 {
		background-color: #FFFFFF;
		padding: 15px;
	}
	
	.step2_info_2 {
		background-color: #FFFFFF;
		padding: 15px;
		/*margin-top: 15px;*/
	}
	
	.step2_info_3 {
		background-color: #FFFFFF;
		padding: 15px;
		/*margin-top: 15px;*/
	}
	/*类目属性中间显示的部分*/
	
	.type {
		margin-left: 80px;
		margin-right: 80px;
		padding: 15px;
		background-color: #fafafa;
	}
	/*选择的标题的title*/
	
	.contnet_1_title {
		/*width: 900px;*/
		margin: 0 auto;
		margin-top: 25px;
		margin-bottom: 15px;
		font-size: 16px;
		background-color: #eeeeee;
		padding: 10px;
	}
	/*选择包含的内容*/
	
	.content_1 {
		/*width: 900px;*/
		margin: 0 auto;
		margin-bottom: 25px;
		background-color: #EEEEEE;
		text-align: center;
		padding: 20px;
	}
	
	.content_2 {
		background-color: #FFFFFF;
	}
	
	.content_3 {
		padding: 10px;
		height: 300px;
		overflow-y: scroll;
	}
	
	.content_3::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}
	
	.content_3::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}
	
	.content_3::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}
	
	.select {
		line-height: 30px;
		color: #333333;
		font-size: 14px;
		cursor: pointer;
	}
	/*步骤一 选择时候 的添加高亮样式*/
	
	.active {
		background-color: #18ccba;
		color: #fff;
	}
	/*第一步的样式列表完成*/
	/*步骤2样式*/
	
	.step_2 {
		padding: 25px;
	}
	/*input下面的提示性的文字*/
	
	.content_2_title {
		border-left: 4px solid #222325;
		padding-left: 15px;
		margin-bottom: 25px;
	}
	
	.checkbox_list {
		margin-top: 15px;
		margin-bottom: 15px;
		border: 1px solid #D6D6D6;
		padding: 5px;
	}
	
	.hint {
		color: #999;
		font-size: 12px;
	}
</style>
<!--照片样式-->

<style scoped="scoped">
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
	}
	
	.upload_img {
		width: 178px;
		height: 178px;
		line-height: 178px;
		border: 1px dashed #d9d9d9;
	}
	
	.upload_img:hover {
		background-color: #d9d9d9;
	}
</style>