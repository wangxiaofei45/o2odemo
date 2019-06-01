<template>
	<div class="TheFileFreview">
		<el-row :gutter="8" v-show="showType==1">
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title" @click="seeMore">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案柜名称</div>
					<div class="text">所属档案室</div>
					<div class="text">档案盒数量</div>
				</div>
			</el-col>
		</el-row>
		<div class="detail" v-show="showType==2">
			<el-row class="model_title">
				<el-col :span="12" style="border-left: #13C2C2 3px solid; padding-left: 15px; text-align: left;">
					XXX
				</el-col>
				<el-col :span="12" style="text-align: right;">
					<el-button type="text" @click="cancel()" name="topRightCancel">
						<svg-icon icon-class="cancel" />
					</el-button>
				</el-col>
			</el-row>
			<el-row :gutter="8" >
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title" @click="goDocumentQuery()">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
				<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
			<el-col :span="4" style="margin-bottom: 8px;">
				<div class="title">
					<img src="../../../static/img/demo.jpg" alt="">
					<div class="text">档案盒名称</div>
					<div class="text">所属档案柜</div>
					<div class="text">档案数量</div>
				</div>
			</el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				showType: 1,
			}
		},
		methods: {
			seeMore() {
				this.showType = 2;
			},
			cancel(){
				this.showType = 1;
			},
			// 跳转到档案添加与查询页面
			goDocumentQuery(){
				this.$router.push({
					path:"/archivesManagement/documentQuery",
				})
			}
		},
	}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
	.TheFileFreview{
		.title{
			border: 1px solid #e6e6e6;
			padding: 10px;
			cursor:pointer;
			img{
				width: 100%;
			}
		}
		padding: 25px;
		text-align: center;
		.model_title {
			border-bottom: 1px solid #d6d6d6;
			padding-bottom: 20px;
			margin-bottom: 20px;
		}
	}
</style>
