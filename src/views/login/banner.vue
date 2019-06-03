 <template>
	 <div class="swiperCon">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>
				<img @click="login" src="../../../static/img/banner/timg.jpg" alt="">
			</swiper-slide>
			<swiper-slide>
				<img  @click="login" src="../../../static/img/banner/timg1.jpg" alt="">
			</swiper-slide>
			<swiper-slide>
				<img  @click="login" src="../../../static/img/banner/timg2.jpg" alt="">
			</swiper-slide>
			<swiper-slide>
				<img  @click="login" src="../../../static/img/banner/timg3.jpg" alt="">
			</swiper-slide>
		</swiper>
	</div>
 </template>
<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	.swiperCon{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		cursor:pointer;
	}
	.swiper{
		width: 100vw;
		height: 100vh;
	}
	.swiper-slide{
		overflow: hidden;
	}
	img{
		width: 100vw;
		height: 100vh;
	}
</style>
 <script>
	  export default{
		  data() {
		  	return {
				swiperOption:{
					loop:true,
					autoplay:true,
					pagination: {
					  el: '.swiper-pagination'
					},
				},
				redirect:undefined,
		  	}
		  },
		  watch: {
		    $route: {
		      handler: function(route) {
		        this.redirect = route.query && route.query.redirect
		      },
		      immediate: true
		    }
		  },
		  methods: {
		  	login() {
		  		this.$router.push({
					path:"/login",
				})
		  	}
		  },
	  }
 </script>
 