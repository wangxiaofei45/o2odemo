<template>
  <div class="login-container">
    <div class="logo"/>
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-width="60px">
      <el-row style="margin-top: 40px;">
        <el-col :span="20" :offset="4">
          <el-form-item prop="username" label="账号">
            <el-input v-model="loginForm.username" placeholder="请输入账号" name="username" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="20" :offset="4" style="margin-top: 20px;">
          <el-form-item prop="password" label="密码">
            <el-input :type="passwordType" v-model="loginForm.password" placeholder="请输入密码" name="password" @keyup.enter.native="handleLogin" />
          <!--  <router-link to="forgetpass">
              <el-button type="text" class="forgetpsw">忘记密码</el-button>
            </router-link> -->
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center; margin-top: 20px;">
          <el-button :loading="loading" type="primary" style="width: 120px;height:40px;margin-bottom:30px;" @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Login',
  components: {
    LangSelect
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '', // 平台账号
        password: '',
        type: 2
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          message: '账号为空'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: '密码为空'
        }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
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
  // 进入页面
  created() {},
  // 页面销毁
  destroyed() {},
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    register() {
      this.$router.push({
        path: '/register'
      })
    },
    // 最初 的登录时候的
    handleLogin() {
		sessionStorage.setItem('token',"123456")
      this.loading = true;
	  this.$addRoutes();
	  this.$router.push({
	  	path: '/'
	  })
   //    this.$refs.loginForm.validate(valid => {
   //      if (valid) {
   //        // 表单
   //        this.loading = true
   //        this.$store.dispatch('LoginByUsername', this.loginForm).then((res) => {
   //          this.loading = false
   //          // 这里还是要做判断 是否 路由列表加载完成
			// this.$addRoutes();
			// this.$router.push({
			// 	path: '/'
			// })
   //        }).catch(() => {
   //          this.loading = false
   //        })
   //        this.loading = false
   //      } else {
   //        return false
   //      }
   //    })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
	$bg:#ffffff;
	$light_gray:#eee;
	$cursor: #333;
	@media only screen and (max-width: 1359px){
		.login-container {
		.logo {
			width: 442px;
			height: 60px;
			margin: 0 auto;
			clear: both;
			margin-top: 10%;
			img {
				width: 442px;
				height: 60px;
			}
			.text {
				height: 150px;
				line-height: 150px;
				float: left;
				font-size: 40px;
				font-weight: 700;
			}
		}
		.el-input {
			display: inline-block;
			height: 40px;
			width: 300px;
			input {
				-webkit-appearance: none;
				padding: 12px 5px 12px 15px;
				height: 40px;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}
		/*忘记密码*/
		.forgetpsw {
			font-size: 14px;
			color: #18ccba;
			font-family: "微软雅黑";
			margin-left: 20px;
			cursor: pointer;
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
	}
	@media only screen and (min-width: 1360px) {
		.login-container {
		.logo {
			width: 442px;
			height: 60px;
			margin: 0 auto;
			clear: both;
			margin-top: 10%;
			img {
				width: 442px;
				height: 60px;
			}
			.text {
				height: 150px;
				line-height: 150px;
				float: left;
				font-size: 40px;
				font-weight: 700;
			}
		}
		.el-input {
			display: inline-block;
			height: 40px;
			width: 300px;
			input {
				-webkit-appearance: none;
				padding: 12px 5px 12px 15px;
				height: 40px;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}
		/*忘记密码*/
		.forgetpsw {
			font-size: 14px;
			color: #18ccba;
			font-family: "微软雅黑";
			margin-left: 20px;
			cursor: pointer;
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
	}

	@media only screen and (min-width: 1680px) {
		.login-container {
		.logo {
			width: 442px;
			height: 60px;
			margin: 0 auto;
			clear: both;
			margin-top: 10%;
			img {
				width: 442px;
				height: 60px;
			}
			.text {
				height: 150px;
				line-height: 150px;
				float: left;
				font-size: 40px;
				font-weight: 700;
			}
		}
		.el-input {
			display: inline-block;
			height: 40px;
			width: 300px;
			input {
				-webkit-appearance: none;
				padding: 12px 5px 12px 15px;
				height: 40px;
				&:-webkit-autofill {
					-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}
		/*忘记密码*/
		.forgetpsw {
			font-size: 14px;
			color: #18ccba;
			font-family: "微软雅黑";
			margin-left: 20px;
			cursor: pointer;
		}
		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
	}
	/*1920*/
	@media only screen and (min-width: 1920px) {
		.login-container {
			.logo {
				width: 442px;
				height: 60px;
				margin: 0 auto;
				clear: both;
				margin-top: 10%;
				img {
					width: 442px;
					height: 60px;
				}
				.text {
					height: 150px;
					line-height: 150px;
					float: left;
					font-size: 40px;
					font-weight: 700;
				}
			}
			.el-input {
				display: inline-block;
				height: 40px;
				width: 300px;
				input {
					-webkit-appearance: none;
					padding: 12px 5px 12px 15px;
					height: 40px;
					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
						-webkit-text-fill-color: $cursor !important;
					}
				}
			}
			/*忘记密码*/
			.forgetpsw {
				font-size: 14px;
				color: #18ccba;
				font-family: "微软雅黑";
				margin-left: 20px;
				cursor: pointer;
			}
			.el-form-item {
				border: 1px solid rgba(255, 255, 255, 0.1);
				border-radius: 5px;
				color: #454545;
			}
		}
	}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
	$bg:#222b2a;
	$dark_gray:#889aa4;
	$light_gray:#eee;
	.login-container {
		position: fixed;
		height: 100%;
		width: 100%;
		background-image: url(../../../static/img/login/bjs.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.login-form {
			position: absolute;
			left: 0;
			right: 0;
			width: 39%;
			min-width: 516px;
			max-width: 750px;
			height: 370px;

			background-color: #FFFFFF;
			padding: 35px 35px 15px 35px;
			margin: 60px auto;
			border-radius: 10px;
			/*border:1px solid darkslategray;*/
            box-shadow: #e0e0e0 6px 6px 30px 5px
		}
		.tips {
			font-size: 14px;
			color: #fff;
			margin-bottom: 10px;
			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: $dark_gray;
			vertical-align: middle;
			width: 30px;
			display: inline-block;
			&_login {
				font-size: 20px;
			}
		}
		.title-container {
			position: relative;
			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}
			.set-language {
				color: #fff;
				position: absolute;
				top: 5px;
				right: 0px;
			}
		}
		.show-pwd {
			position: absolute;
			right: 10px;
			top: 7px;
			font-size: 16px;
			color: $dark_gray;
			cursor: pointer;
			user-select: none;
		}
		.thirdparty-button {
			position: absolute;
			right: 35px;
			bottom: 28px;
		}
	}
</style>
