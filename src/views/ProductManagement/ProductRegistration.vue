<!--商品注册-->
<template>
	<div class="step_con">
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
					<el-col :span="8">三级分类</el-col>
				</el-row>
				<el-row class="content_2">
					<el-col :span="8" class="content_3">
						<div v-bind:class="[isActive == index ? actives : '', select]" v-for="(i,index) in options" @click="select_1(i,index)" :key="i.value">
							{{i.label}}
						</div>
					</el-col>
					<!--第二层循环-->
					<el-col :span="8" class="content_3">
						<div v-bind:class="[isActive_2 == index_2 ? actives : '', select]" v-for="(j,index_2) in options[select1].children" @click="select_2(j,index_2)" :key="j.value">
							{{j.label}}
						</div>
					</el-col>
					<!--第三层循环-->
					<el-col :span="8" class="content_3">
						<el-row>
							<div v-bind:class="[isActive_3 == index_3 ? actives : '', select]" class="select" v-for="(z,index_3) in options[select1].children[select2].children" @click="select_3(z,index_3)" :key="z.value">
								{{z.label}}
							</div>
						</el-row>
						<!--<el-button type="primary">申请添加品牌</el-button>-->
					</el-col>

				</el-row>
			</div>
			<!--下一步点击按钮-->
			<el-row>
				<el-button type="info" plain style="width: 100%;" @click="next(1)" long>
					下一步
				</el-button>
			</el-row>

		</div>
		<div class="step_2" v-show="active == 1">
			<div class="form">
				<el-form :model="good_info" ref="good_info" label-width="80px">
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
							<el-form-item label="商品名称" prop="good_name">
								<el-input v-model="good_info.good_name" style="width: 200px;" min="3" max="50" placeholder="请输入"></el-input>
								<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
							</el-form-item>
							<el-form-item label="类目属性">
								<div class="hint">商品标题名称长度至少3个字符,最长50个汉字</div>
							</el-form-item>
							<el-row class="type">
								<el-col :span="12">
									<el-form-item label="品牌" prop="good_name">
										<el-input v-model="good_info.good_name" style="width: 200px;" min="3" max="50" placeholder="请输入"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="衣长" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="货号" prop="good_name">
										<el-input v-model="good_info.good_name" style="width: 200px;" min="3" max="50" placeholder="请输入"></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="图案" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="流行元素" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="质地" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="风格" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="成分含量" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="服装版型" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="克重" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="款式" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="使用年龄" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="组合方式" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
											</el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="年份季节" prop="good_name">
										<el-select v-model="good_info.good_name" placeholder="请选择">
											<el-option label="454545" value="454545">
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
										<el-button>上传图片</el-button>
										<!--定位元素-->
										<div class="colorArr" v-show="showColorModel == index">
											<!--<div class="colorArr">-->
											<!--左边的鼠标移动上去-->
											<div class="left">
												<div class="list" v-for="(item,index) in colorArrs" :key="item.groupId" v-bind:class="[showGroupId == item.groupId ? actives : '', select]" @mouseenter="sidebarHover(item)">
													<div class="titleColor" :style="{backgroundColor:item.rgb}"></div>
													<span class="text">{{item.text}}</span>
												</div>
											</div>
											<!--右边的显示-->
											<div class="right">
												<p class="title">常用标准颜色</p>
												<el-row v-for="(item,index) in colorArrs" :key="item.groupId" v-show="showGroupId==item.groupId">
													<el-col :span="6" v-for="(i,j) in item.colors" :key="i.value">
														<div class="list" @mousedown="sureColor(i)">
															<div class="titleColor" :style="{backgroundColor:i.rgb}"></div>
															<span class="text">{{i.text}}</span>
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
											<el-radio v-for="(item,index) in sizeArr" :key="item.value" :label="item.value">{{item.label}}</el-radio>
										</el-radio-group>
									</div>
									<div class="diySize">
										<el-input placeholder="请输入自定义项" v-model="customSize" style="width: 200px;"></el-input>
										<el-button @click="customAdd">添加</el-button>
									</div>
									<div class="check_group" v-for="(item,index) in sizeArr" :key="item.value">
										<div v-show="item.value == size">
											<el-checkbox-group v-model="checkedSize" style="width: 800px;">
												<el-checkbox style="width: 140px;padding: 0px;margin: 0px;" v-for="j in item.size" :label="j.value" :key="j.value" @change="uniterming(j)">{{j.value}}
													<el-input v-show="j.checked" style="width: 90px;" size="mini" placeholder="请输入备注"></el-input>
												</el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
								</el-form-item>
								<!--总数量-->
								<!--:span-method="objectSpanMethod"-->
								<el-table :data="fromTable" max-height="600" border style="width: 760px" v-show="fromTable.length">
									<el-table-column prop="colorName" label="颜色" width="80">
									</el-table-column>
									<el-table-column prop="size" label="尺码" width="80">
									</el-table-column>
									<el-table-column prop="price" label="价格" width="150" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.price"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="number" label="数量" width="150" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.number"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="code" label="商家编码" width="150" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.code"></el-input>
										</template>
									</el-table-column>
									<el-table-column prop="barCode" label="商品条形码" width="150" align="center">
										<template slot-scope="scope">
											<el-input v-model="scope.row.barCode"></el-input>
										</template>
									</el-table-column>
								</el-table>
								<el-form-item label="商品库存" prop="commodity_stocks">
									<el-input v-model="good_info.commodity_stocks" style="width: 200px;" disabled></el-input>
								</el-form-item>
							</el-row>
						</el-row>
						<!--第三部分-->
						<el-row class="step2_info_3">
							<el-row class="content_2_title" id="imgMessage">
								图文描述
							</el-row>
							<el-form-item label="商品图片">
								<div v-if="imageUrl_1.length>0" v-for="(item,index) in imageUrl_1" :key="index">
									<img :src="item" class="avatar">
								</div>
								<el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
									<div class="upload_img">
										上传图片
									</div>
								</el-upload>
							</el-form-item>
						</el-row>
					</el-row>
				</el-form>
			</div>
			<!--<el-button type="primary" @click="next(2)">
				下一步
			</el-button>-->
		</div>
		<div class="step_3" v-show="active == 2">
			步骤3
			<el-button @click="next(3)">
				完成
			</el-button>
			<el-button @click="ContinueToAdd('good_info')">
				继续添加
			</el-button>
		</div>
	</div>
</template>
<script>
	import Tinymce from '@/components/Tinymce';

	function coppyArray(arr) {
		return arr.map((e) => {
			if(typeof e === 'object') {
				return Object.assign({}, e);
			} else {
				return e;
			}
		})
	};

	function objDeepCopy(source) {
		var sourceCopy = {};
		for(var item in source) sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
		return sourceCopy;
	}
	export default {
		name: 'TinymceDemo',
		components: {
			Tinymce
		},
		data() {
			return {
				showGroupId: '', //鼠标hover事件显示的颜色组
				showValue: '', //点击选择颜色的时候
				amendIndex: '', //点击选择的中间变量
				amendItem: '', //点击选择的中间Item变量
				//颜色组
				colorArrs: [{
					"groupId": 19547332,
					"text": "白色系",
					"rgb": "#ffffff",
					"colors": [{
						"value": 28321,
						"text": "乳白色",
						"rgb": "#fffbf0"
					}, {
						"value": 28320,
						"text": "白色"
					}, {
						"value": 4266701,
						"text": "米白色",
						"rgb": "#eedeb0"
					}]
				}, {
					"groupId": 8121627,
					"text": "灰色系",
					"rgb": "#808080",
					"colors": [{
						"value": 28332,
						"text": "浅灰色",
						"rgb": "#e4e4e4"
					}, {
						"value": 3232478,
						"text": "深灰色",
						"rgb": "#666666"
					}, {
						"value": 28334,
						"text": "灰色",
						"rgb": "#808080"
					}, {
						"value": 28330,
						"text": "银色",
						"rgb": "#c0c0c0"
					}]
				}, {
					"groupId": 3516042,
					"text": "黑色系",
					"rgb": "#000000",
					"colors": [{
						"value": 28341,
						"text": "黑色",
						"rgb": "#000000"
					}]
				}, {
					"groupId": 3325939,
					"text": "红色系",
					"rgb": "#ff0000",
					"colors": [{
						"value": 4950473,
						"text": "桔红色",
						"rgb": "#ff7500"
					}, {
						"value": 3594022,
						"text": "玫红色",
						"rgb": "#df1b76"
					}, {
						"value": 3232480,
						"text": "粉红色",
						"rgb": "#ffb6c1"
					}, {
						"value": 28326,
						"text": "红色",
						"rgb": "#ff0000"
					}, {
						"value": 4464174,
						"text": "藕色",
						"rgb": "#eed0d8"
					}, {
						"value": 3743025,
						"text": "西瓜红",
						"rgb": "#f05654"
					}, {
						"value": 28327,
						"text": "酒红色",
						"rgb": "#990000"
					}]
				}, {
					"groupId": 3427736,
					"text": "黄色系",
					"rgb": "#ffff00",
					"colors": [{
						"value": 28331,
						"text": "卡其色",
						"rgb": "#c3b091"
					}, {
						"value": 15409374,
						"text": "姜黄色",
						"rgb": "#ffc773"
					}, {
						"value": 20412615,
						"text": "明黄色",
						"rgb": "#ffff01"
					}, {
						"value": 30155,
						"text": "杏色",
						"rgb": "#f7eed6"
					}, {
						"value": 132476,
						"text": "柠檬黄",
						"rgb": "#ffec43"
					}, {
						"value": 90554,
						"text": "桔色",
						"rgb": "#ffa500"
					}, {
						"value": 60092,
						"text": "浅黄色",
						"rgb": "#faff72"
					}, {
						"value": 6134424,
						"text": "荧光黄",
						"rgb": "#eaff56"
					}, {
						"value": 28328,
						"text": "金色",
						"rgb": "#ffd700"
					}, {
						"value": 130166,
						"text": "香槟色"
					}, {
						"value": 28324,
						"text": "黄色",
						"rgb": "#ffff00"
					}]
				}, {
					"groupId": 6303197,
					"text": "绿色系",
					"rgb": "#008000",
					"colors": [{
						"value": 3232483,
						"text": "军绿色",
						"rgb": "#5d762a"
					}, {
						"value": 80557,
						"text": "墨绿色",
						"rgb": "#'057748"
					}, {
						"value": 30156,
						"text": "浅绿色",
						"rgb": "#98fb98"
					}, {
						"value": 28335,
						"text": "绿色",
						"rgb": "#008000"
					}, {
						"value": 8588036,
						"text": "翠绿色",
						"rgb": "#0aa344"
					}, {
						"value": 6535235,
						"text": "荧光绿",
						"rgb": "#23fa07"
					}, {
						"value": 3455405,
						"text": "青色",
						"rgb": "#00e09e"
					}]
				}, {
					"groupId": 3547657,
					"text": "蓝色系",
					"rgb": "#0000fe",
					"colors": [{
						"value": 3232484,
						"text": "天蓝色",
						"rgb": "#44cef6"
					}, {
						"value": 5138330,
						"text": "孔雀蓝",
						"rgb": "#00a4c5"
					}, {
						"value": 3707775,
						"text": "宝蓝色",
						"rgb": "#4b5cc4"
					}, {
						"value": 28337,
						"text": "浅蓝色",
						"rgb": "#d2f0f4"
					}, {
						"value": 28340,
						"text": "深蓝色",
						"rgb": "#041690"
					}, {
						"value": 5483105,
						"text": "湖蓝色",
						"rgb": "#30dff3"
					}, {
						"value": 28338,
						"text": "蓝色",
						"rgb": "#0000fe"
					}, {
						"value": 28866,
						"text": "藏青色",
						"rgb": "#2e4e7e"
					}]
				}, {
					"groupId": 3560058,
					"text": "紫色系",
					"rgb": "#800080",
					"colors": [{
						"value": 4104877,
						"text": "浅紫色",
						"rgb": "#ede0e6"
					}, {
						"value": 3232479,
						"text": "深紫色",
						"rgb": "#430653"
					}, {
						"value": 5167321,
						"text": "紫红色",
						"rgb": "#8b0062"
					}, {
						"value": 80882,
						"text": "紫罗兰",
						"rgb": "#b7ace4"
					}, {
						"value": 28329,
						"text": "紫色",
						"rgb": "#800080"
					}]
				}, {
					"groupId": 5497335,
					"text": "棕色系",
					"rgb": "#7c4b00",
					"colors": [{
						"value": 129819,
						"text": "咖啡色",
						"rgb": "#603912"
					}, {
						"value": 3232481,
						"text": "巧克力色",
						"rgb": "#d2691e"
					}, {
						"value": 6071353,
						"text": "栗色",
						"rgb": "#60281e"
					}, {
						"value": 30158,
						"text": "浅棕色",
						"rgb": "#b35c44"
					}, {
						"value": 3232482,
						"text": "深卡其布色",
						"rgb": "#bdb76b"
					}, {
						"value": 6588790,
						"text": "深棕色",
						"rgb": "#7c4b00"
					}, {
						"value": 132069,
						"text": "褐色",
						"rgb": "#855b00"
					}, {
						"value": 3224419,
						"text": "驼色",
						"rgb": "#a88462"
					}]
				}, {
					"groupId": 14089179,
					"text": "花色系",
					"rgb": "assortment",
					"colors": [{
						"value": 130164,
						"text": "花色"
					}]
				}, {
					"groupId": 15495009,
					"text": "透明系",
					"rgb": "transparent",
					"colors": [{
						"value": 107121,
						"text": "透明",
						"rgb": "transparent"
					}]
				}],

				//选择颜色
				showColorModel: '-1',
				centerColor: [{
					color: "",
					colorName: '',
					colorRemark: '',
				}, ],
				//选择尺码
				customSize:'',
				size: 1,
				checkedSize: [], //选择之后的尺码
				sizeArr: [{
						label: "美国码",
						value: 1,
						size: [{
								checked: false,
								value: 0
							},
							{
								checked: false,
								value: 2
							},
							{
								checked: false,
								value: 4
							},
							{
								checked: false,
								value: 6
							},
							{
								checked: false,
								value: 8
							},
							{
								checked: false,
								value: 10
							},
							{
								checked: false,
								value: 12
							},
							{
								checked: false,
								value: 14
							},
							{
								checked: false,
								value: 16
							}
						],
					},
					{
						label: "中国码",
						value: 2,
						size: [{
								checked: false,
								value: "xxs"
							},
							{
								checked: false,
								value: "xs"
							},

							{
								checked: false,
								value: "s"
							},
							{
								checked: false,
								value: "m"
							},
							{
								checked: false,
								value: "l"
							},
							{
								checked: false,
								value: "xl"
							},
							{
								checked: false,
								value: "2xl"
							},
							{
								checked: false,
								value: "3xl"
							},
							{
								checked: false,
								value: "4xl"
							},
							{
								checked: false,
								value: "5xl"
							},
							{
								checked: false,
								value: "6xl"
							}
						],
					}
				],

				checkList: [], //选择时候 的选择框
				fromTable: [], //最终提交的数据
				select: 'select',
				list: 'list',
				activeClass: 'active',
				titleActive: 'basicMessage', //锚点的信息
				actives: 'active',
				isActive: 0, //第一层高亮
				isActive_2: 0, //第二层高亮
				isActive_3: 0, //第三层循环
				select1: 0,
				select2: 0,
				select3: 0,
				options_data: [], //选择最终确定的值
				show_value: '', //显示出来的值
				active: 1,
				//第二层添加图片
				postData: {}, //上传图片时携带的其他的数据
				imageUrl_1: [], // 图片上传完成后显示出来的照片
				//选择商品信息
				options: [{
						value: 'zhinan',
						label: '指南',
						children: [{
								value: 'shejiyuanze',
								label: '设计原则',
								children: [{
									value: 'yizhi',
									label: '一致'
								}, {
									value: 'fankui',
									label: '反馈'
								}, {
									value: 'xiaolv',
									label: '效率'
								}, {
									value: 'kekong',
									label: '可控'
								}, ]
							},
							{
								value: 'daohang',
								label: '导航',
								children: [{
										value: 'cexiangdaohang',
										label: '侧向导航'
									},
									{
										value: 'dingbudaohang',
										label: '顶部导航'
									}
								]
							}
						]
					},
					{
						value: 'zujian',
						label: '组件',
						children: [{
								value: 'basic',
								label: 'Basic',
								children: [{
									value: 'layout',
									label: 'Layout 布局'
								}, {
									value: 'color',
									label: 'Color 色彩'
								}, {
									value: 'typography',
									label: 'Typography 字体'
								}, {
									value: 'icon',
									label: 'Icon 图标'
								}, {
									value: 'button',
									label: 'Button 按钮'
								}]
							},
							{
								value: 'form',
								label: 'Form',
								children: [{
									value: 'radio',
									label: 'Radio 单选框'
								}, {
									value: 'checkbox',
									label: 'Checkbox 多选框'
								}, {
									value: 'input',
									label: 'Input 输入框'
								}, {
									value: 'input-number',
									label: 'InputNumber 计数器'
								}, {
									value: 'select',
									label: 'Select 选择器'
								}, {
									value: 'cascader',
									label: 'Cascader 级联选择器'
								}, {
									value: 'switch',
									label: 'Switch 开关'
								}, {
									value: 'slider',
									label: 'Slider 滑块'
								}, {
									value: 'time-picker',
									label: 'TimePicker 时间选择器'
								}, {
									value: 'date-picker',
									label: 'DatePicker 日期选择器'
								}, {
									value: 'datetime-picker',
									label: 'DateTimePicker 日期时间选择器'
								}, {
									value: 'upload',
									label: 'Upload 上传'
								}, {
									value: 'rate',
									label: 'Rate 评分'
								}, {
									value: 'form',
									label: 'Form 表单'
								}]
							},
							{
								value: 'data',
								label: 'Data',
								children: [{
									value: 'table',
									label: 'Table 表格'
								}, {
									value: 'tag',
									label: 'Tag 标签'
								}, {
									value: 'progress',
									label: 'Progress 进度条'
								}, {
									value: 'tree',
									label: 'Tree 树形控件'
								}, {
									value: 'pagination',
									label: 'Pagination 分页'
								}, {
									value: 'badge',
									label: 'Badge 标记'
								}]
							},
							{
								value: 'notice',
								label: 'Notice',
								children: [{
									value: 'alert',
									label: 'Alert 警告'
								}, {
									value: 'loading',
									label: 'Loading 加载'
								}, {
									value: 'message',
									label: 'Message 消息提示'
								}, {
									value: 'message-box',
									label: 'MessageBox 弹框'
								}, {
									value: 'notification',
									label: 'Notification 通知'
								}]
							},
							{
								value: 'navigation',
								label: 'Navigation',
								children: [{
									value: 'menu',
									label: 'NavMenu 导航菜单'
								}, {
									value: 'tabs',
									label: 'Tabs 标签页'
								}, {
									value: 'breadcrumb',
									label: 'Breadcrumb 面包屑'
								}, {
									value: 'dropdown',
									label: 'Dropdown 下拉菜单'
								}, {
									value: 'steps',
									label: 'Steps 步骤条'
								}]
							},
							{
								value: 'others',
								label: 'Others',
								children: [{
									value: 'dialog',
									label: 'Dialog 对话框'
								}, {
									value: 'tooltip',
									label: 'Tooltip 文字提示'
								}, {
									value: 'popover',
									label: 'Popover 弹出框'
								}, {
									value: 'card',
									label: 'Card 卡片'
								}, {
									value: 'carousel',
									label: 'Carousel 走马灯'
								}, {
									value: 'collapse',
									label: 'Collapse 折叠面板'
								}]
							}
						]
					}, {
						value: 'ziyuan',
						label: '资源',
						children: [{
							value: 'axure',
							label: 'Axure Components'
						}, {
							value: 'sketch',
							label: 'Sketch Templates'
						}, {
							value: 'jiaohu',
							label: '组件交互文档'
						}]
					}
				],
				//添加商品信息
				good_info: {
					good_class: '', //商品分类
					good_name: '', //商品名称

					//规格选择
					commodity_stocks: '', //商品库存
					goods_images: [], //商品图片
				},

				rowList: [],
				spanArr: [],
				position: 0,

			}
		},
		created() {
			this.GetTheValue();
			//this.get_qiniu_token();
		},
		//计算属性
		methods: {
			//自定义添加尺码
			customAdd(){
				let index = '';
				let isAdd = true;
				for(var i=0;i<this.sizeArr.length;i++){
					if(this.sizeArr[i].value == this.size){
					 	index = i;
					}
				}
				let obj={
					checked: false,
					value: this.customSize
				};
				let objs = objDeepCopy(obj);
				for(var i=0;i<this.sizeArr[index].size.length;i++){
					if(this.sizeArr[index].size[i].value == objs.value){
						isAdd = false;
					}
				}
				if(isAdd){
					this.sizeArr[index].size.push(objs);
				}else{
					alert("您添加的元素已存在!")
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
			
			sidebarHover(item) {
				this.showGroupId = item.groupId;
			},
			//点击色块选择颜色
			sureColor(i) {
				let obj = {
					color: "#e4e4e4",
					colorName: i.text,
					colorRemark: i.value,
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
						};
						this.centerColor.push(obj);
					}
					this.combination(this.centerColor, this.checkedSize);
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
							};
							this.centerColor.push(obj);
						}
						//这里去计算
						this.combination(this.centerColor, this.checkedSize);
					}
				} else {
					return;
				}
			},
			//判断是否存在
			checking(item, index) {
				let newArr = coppyArray(this.centerColor);
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
			uniterming(val) {
				//点击是显示还是隐藏输入框
				val.checked = !val.checked;
				this.combination(this.centerColor, this.checkedSize);
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
							console.log(j, sizeArr[j])
							//赋值出错
							colorArr[i].size = sizeArr[j];
							colorArr[i].price = '';
							colorArr[i].number = '';
							colorArr[i].code = '';
							colorArr[i].barCode = '';
							Xindex = colorArr[i];
							//对象的深copy
							let centerXindex = objDeepCopy(Xindex);
							allcenterArr.push(centerXindex);
						}
					}
					//数组的深从copy
					this.fromTable = coppyArray(allcenterArr);
					this.rowspan();
				}
			},
			//vue使用的是hash值使用的锚点定位出现问题,模拟实现锚点定位
			goAnchor(e) {
				var elements = document.getElementById(e);
				this.titleActive = e;
				document.documentElement.scrollTop   = elements.offsetTop  ;
				  
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
				this.active++;
				if(e >= 3) {
					console.log("已经完成,点击跳转!");
				}
			},
			//继续添加
			ContinueToAdd(FormName) {
				this.active = 0;
				this.$refs[FormName].resetFields();
			},
			//选择第一步
			select_1(i, index) {
				this.isActive = index;
				this.select1 = index;
				this.isActive_2 = 0; //点击切换的时候的高亮显示
				this.isActive_3 = 0; //点击切换的时候的高亮的显示
				this.select2 = 0; //点击切换的时候渲染的第二层为第一个
				this.select3 = 0; //点击切换的时候渲染的第三层为第一个
				this.GetTheValue();
			},
			//第二层选择
			select_2(i, index) {
				this.isActive_2 = index;
				this.isActive_3 = 0;
				this.select2 = index;
				this.GetTheValue();
			},
			//第三层选择
			select_3(i, index) {
				this.isActive_3 = index;
				this.GetTheValue();
			},
			//获取最终的想要获取的值,方法被调用
			GetTheValue() {
				let arr = [];
				let obj_1 = {};
				//获取第一层的值
				obj_1.id = this.options[this.isActive].value;
				obj_1.name = this.options[this.isActive].label;
				arr.push(obj_1);
				let obj_2 = {};
				obj_2.id = this.options[this.isActive].children[this.isActive_2].value;
				obj_2.name = this.options[this.isActive].children[this.isActive_2].label;
				arr.push(obj_2);
				let obj_3 = {};
				obj_3.id = this.options[this.isActive].children[this.isActive_2].children[this.isActive_3].value;
				obj_3.name = this.options[this.isActive].children[this.isActive_2].children[this.isActive_3].label;
				arr.push(obj_3);
				this.options_data = arr;
				let showArr = [];
				for(let i = 0; i < arr.length; i++) {
					showArr.push(arr[i].name);
				}
				this.show_value = showArr.join('->');
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
			//上传图片成功  身份证与人合照
			handleAvatarSuccess_1(res, file) {
				this.imageUrl_1.push(URL.createObjectURL(file.raw)) //暂时展示 的还是本地添加图片
				let arr = [];
				arr.push(res.key);
				this.good_info.goods_images = arr //本地地址上传展示

			},
		}
	}
</script>

<style scoped="scoped">
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
		background-color: #e0e0e0;
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
		font-size: 16px;
		cursor: pointer;
	}
	/*步骤一 选择时候 的添加高亮样式*/
	
	.active {
		background-color: #eeeeee;
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
		float: left;
		margin-right: 15px;
	}
	
	.upload_img {
		width: 178px;
		height: 178px;
		line-height: 178px;
		/*background-color: #D6D6D6;*/
		border: 1px dashed #d9d9d9;
	}
	
	.upload_img:hover {
		background-color: #d9d9d9;
	}
</style>