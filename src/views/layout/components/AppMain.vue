<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<!--缓存router-view 可自行去除-->
			<keep-alive :include="cachedViews">
				<router-view :key="key" />
			</keep-alive>
		</transition>
	</section>
</template>
<script>
	export default {
		name: 'AppMain',
		computed: {
			cachedViews() {
				return this.$store.state.tagsView.cachedViews
			},
			key() {
				return this.$route.fullPath
			}
		}
	}
</script>

<style scoped>
	.app-main {
		min-height: calc(100vh - 110px);
		width: 100%;
		position: relative;
		overflow: hidden;
	}

</style>