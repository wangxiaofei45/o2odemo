<template>
  <div class="navbar">
  	<!--侧边栏打开折叠-->
    <!--<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>-->
		<!--面包屑-->
    <!--<breadcrumb class="breadcrumb-container"/>-->
		<div class="img" >
			<img src="../../../../static/img/login/banner_logo.png" style="height: 40px; margin-top: 20px;"/>
		</div>
		<div class="title">
			杭州领沃电子商务有限公司
		</div>
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../../../static/img/login/user.png" style="display: inline-block;" class="user-avatar">
          <span class="avatar_text">{{names}}</span>
          <img src="../../../../static/img/login/arrowhead.png"/>
        </div>
        <el-dropdown-menu slot="dropdown">
        	<!--跳转到首页-->
          <router-link to="/">
            <el-dropdown-item>
             	 首页
            </el-dropdown-item>
          </router-link>
          <!--跳转到项目的地址-->
          <!--<a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>-->
          <!--退出登录-->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">
            	退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker
  },
  data() {
			return {
				names:sessionStorage.getItem("name"),
			}
		},
  
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
  	
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        height:80px;
        line-height:80px;
        display:flex;
        justify-content: center;
      align-items: center;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .avatar_text{
        	font-size: 18px;
        	padding-left:10px;
        	padding-right: 10px;
        	color: #333333;
        	font-family: "微软雅黑";
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .img{
  	background-color: #314240;
  	border-bottom: 1px solid #242827;
  	width: 180px; 
  	height: 80px; 
  	display: inline-block;
  	text-align: center;
  	float: left;
  }
  .title{
  	float: left;
  	font-size: 18px;
  	color: #333333;
		font-family: "微软雅黑";
		line-height: 80px;
		font-weight: 500;
		padding-left: 20px;
  }
}
</style>
