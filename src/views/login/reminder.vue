<template>
	<div class="container">
		<div id="reminder">
			<div class="title">
				欢迎使用
			</div>
			<div class="text_con">
				请先完善资料
			</div>
			<div class="text_con">
				若资料不完整，可能影响部分功能的正常使用。
			</div>
			<div class="bottom_button">
				<el-button class="pos_fix" type="primary" @click="sure">
					我知道了
				</el-button>
			</div>

		</div>
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
	.container {
		height: 100%;
		background-image: url(../../../static/img/login/bj.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	
	#reminder {
		width: 600px;
		padding-top: 220px;
		margin: 0 auto;
		.title {
			font-size: 26px;
			color: #333;
			font-weight: bold;
			padding-bottom: 100px;
			color: #18CCBA;
			text-align: center;
		}
		
	}
	.text_con {
			font-size: 18px;
			line-height: 60px;
			color: #ffffff;
			text-align: center;
		}
	.bottom_button {
		margin-top: 80px;
		text-align: center;
	}
</style>