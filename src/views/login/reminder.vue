<template>
	<div id="reminder">
		<div class="title">
			欢迎使用ERP系统
		</div>
		<div class="text_con">
			为了保证系统更好的使用,请先完善组织设置、联系人管理、商品管理信息、若信息不完整，可能影响部分功能的正常使用。
		</div>
		<el-button class="pos_fix"  type="primary" @click="sure">
			我知道了
		</el-button>
	</div>
</template>
<script>
	export default {
		methods: {
			//跳转到完善信息页面
			sure() {
				this.$router.push({
					path: '/perfectInfo'
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	#reminder {
		width: 600px;
		padding-top: 150px;
		margin: 0 auto;
		.title {
			font-size: 26px;
			color: #333;
			font-weight: bold;
			padding-bottom: 100px;
		}
		.text_con {
			font-size: 22px;
			text-indent: 44px;
			line-height: 60px;
		}
	}
	.pos_fix{
		position: fixed;
		bottom: 150px;
		right: 150px;
	}
</style>