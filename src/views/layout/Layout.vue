<template>
	<div :class="classObj" class="app-wrapper">
		<!--暂时先屏蔽掉-->
		<!--<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />-->
		<el-container>
			<!--头部固定的内容-->
			<el-header style='height: 80px;border-bottom: 1px solid #e3e3e3;z-index: 200'>
				<navbar/>
			</el-header>
		<div class="main-container">
			<sidebar class="sidebar-container"/>
			<tags-view style="position: fixed;top: 80px;left: 180px;z-index: 1000;"/>
			<app-main/>
		</div>
		</el-container>
	</div>
</template>
<script>
	import { Navbar, Sidebar, AppMain, TagsView } from './components'
	import ResizeMixin from './mixin/ResizeHandler'
	export default {
		name: 'Layout',
		components: {
			Navbar,
			Sidebar,
			AppMain,
			TagsView
		},
		mixins: [ResizeMixin],
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			},
			device() {
				return this.$store.state.app.device
			},
			classObj() {
				return {
//					hideSidebar: !this.sidebar.opened,
					hideSidebar: false,
					openSidebar: this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation,
//					mobile: this.device === 'mobile'
				}
			}
		},
		methods: {
			handleClickOutside() {
				this.$store.dispatch('closeSideBar', {
					withoutAnimation: false
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;
		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
	}
	
	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}
	.el-header{
	padding: 0px!important;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    background-color: #fff;
    position: fixed;
    z-index: 100;
    width: 100%;
	}
</style>