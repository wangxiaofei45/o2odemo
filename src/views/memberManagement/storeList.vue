<template>
	<div class="container">
		<!-- 头部的搜索框 -->
		<el-row class="title">
			<el-button type="primary">新增</el-button>
			<el-input class="titleInput">
				<el-button class="appendButton" slot="append" icon="el-icon-search">搜索</el-button>
			</el-input>
		</el-row>

	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{

		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.container{
		padding: 25px 40px;
		.titleInput{
			width: 375px;
			margin-left: 40px;
			.appendButton{
				background-color: #e0e0e0;
				font-size: #666666;
				border-radius: 0px;
				width: 78px;
				padding: 0px;
				height: 36px;
			}
		}
	}
</style>