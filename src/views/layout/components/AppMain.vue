<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<keep-alive>
			<!--<keep-alive :include="cachedViews">-->
				<router-view v-if="$route.meta.keepAlive" :key="key"/>
			</keep-alive>
		</transition>
		<transition name="fade-transform" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive" :key="key"/>
		</transition>
	</section>
</template>
<script>
	export default {
		name: 'AppMain',
		computed: {
			cachedViews() {
				return this.$store.state.tagsView.cachedViews;
			},
			key() {
				return this.$route.fullPath
			}
		}
	}
</script>

<style scoped>
	.app-main {
		min-height: calc(100vh - 114px);
		width: 100%;
		min-width: 1100px;
		position: relative;
		overflow: hidden;
	}

</style>