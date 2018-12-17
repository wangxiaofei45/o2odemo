<template>
  <div class="container">
    <!--默认进来展示的表格-->
    <div class="showList" v-show="model == 1">
      <!-- 头部的搜索框 -->
      <el-row class="title">
        <!--新增企业-->
        <el-button type="primary" @click="addMerchant">
          <svg-icon class="add" icon-class="tianjia_write" />新增</el-button>
        <el-input class="titleInput">
          <el-button class="appendButton" slot="append" icon="el-icon-search">搜索</el-button>
        </el-input>
      </el-row>
      <el-table class="tTable" :data="tableData" height="250" border style="width: 100%" :header-cell-class-name="tableheaderClassName">
        <el-table-column type="index" label="ID" width="110" align="center" stripe>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="230px" align="center">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-button type="text" style="color: #979999;">
              <svg-icon class="add" icon-class="tianjia" />
            </el-button>
            <el-button type="text" style="color: #979999;">
              <svg-icon class="add" icon-class="jian" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="linkMen" label="联系人" width="190px" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="220px" align="center">
        </el-table-column>
        <el-table-column prop="adress" label="地址" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="385px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="warning" size="mini" @click="addShop">新增店铺</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="addMerchant" v-show="model == 2">
      <el-form ref="merchantForm" :model="merchantForm" :rules="merchantFormRules" class="login-form" label-width="80px">
        <div class="title">
          企业信息
        </div>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="merchantForm.name" placeholder="需与营业执照注册名称相同" name="name" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="adress" label="经营地址">
          <el-input v-model="merchantForm.adress" v-show="false " style="width: 300px;" placeholder="" name="adress" type="text"></el-input>
          <el-select v-model="merchantForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
          <el-select v-model="merchantForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
          <el-select v-model="merchantForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="adress">
          <el-input v-model="merchantForm.adress" placeholder="请输入详细地址" name="adress" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="businessLicense" label="经营执照">
          <el-input v-model='merchantForm.businessLicense' name="businessLicense" v-show="false" style="width: 200px;"></el-input>
          <el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
            <div class="upload_img">
              <img src="../../../static/img/uploadImg.png" />
						</div>
          </el-upload>
        </el-form-item>
        <div class="title">
          企业法人
        </div>
        <el-form-item prop="businessEntity" label="企业法人">
          <el-input v-model="merchantForm.businessEntity" placeholder="请输入" name="businessEntity" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="holdingApositive" label="手持正面">
          <el-input v-model='merchantForm.holdingApositive' name="holdingApositive" v-show="false" style="width: 200px;"></el-input>
          <el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
            <div class="identityCard">
              <img src="../../../static/img/uploadImg.png" />
						</div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="onTheBackOfHand" label="手持背面">
          <el-input v-model='merchantForm.onTheBackOfHand' v-show="false" name="onTheBackOfHand" style="width: 200px;"></el-input>
          <el-upload class="avatar-uploader" :multiple="true" action="http://up.qiniu.com/" accept="image/jpeg,image/gif,image/png,image/bmp" :data="postData" :show-file-list="false" :on-success="handleAvatarSuccess_1" :before-upload="beforeAvatarUpload">
            <div class="identityCard">
              <img src="../../../static/img/uploadImg.png" />
						</div>
          </el-upload>
        </el-form-item>
        <div class="title">
          联系人信息
        </div>
        <el-form-item prop="linkMen" label="联系人">
          <el-input v-model="merchantForm.linkMen" placeholder="需与营业执照注册名称相同" name="linkMen" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="linkPhone" label="联系电话">
          <el-input v-model="merchantForm.linkPhone" placeholder="需与营业执照注册名称相同" name="linkPhone" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <div class="title">
          账号密码
        </div>
        <el-form-item prop="accountNumber" label="账号">
          <el-input v-model="merchantForm.accountNumber" placeholder="需与营业执照注册名称相同" name="accountNumber" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="merchantForm.password" placeholder="需与营业执照注册名称相同" name="password" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="resetMerchantForm('merchantForm')">取消</el-button>
          <el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="submitMerchantForm('merchantForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 新添加店铺 -->
    <div class="addMerchant" v-show="model == 3">
      <el-form ref="shopForm" :model="shopForm" :rules="merchantFormRules" class="login-form" label-width="80px">
        <div class="title">
          店铺信息
        </div>
        <el-form-item prop="name" label="店铺名称">
          <el-input v-model="shopForm.name" placeholder="请输入" name="name" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="adress" label="经营地址">
          <el-input v-model="shopForm.adress" v-show="false " style="width: 300px;" placeholder="" name="adress" type="text"></el-input>
          <el-select v-model="shopForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
          <el-select v-model="shopForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
          <el-select v-model="shopForm.phone" placeholder="请选择" style="width: 294px;height: 40px;">
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
            <el-option label="选项1" value="选项1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="adress">
          <el-input v-model="shopForm.adress" placeholder="请输入详细地址" name="adress" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="adress" label="早班时间">
              <el-date-picker type="date" style="width:230px" placeholder="选择时间" v-model="shopForm.theEarlyTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="adress" label="中班时间" label-width="80px">
              <el-date-picker type="date" style="width:230px" placeholder="选择时间" v-model="shopForm.middleShiftTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="adress" label="晚班时间" label-width="80px">
              <el-date-picker type="date" style="width:230px" placeholder="选择时间" v-model="shopForm.nightTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title">
          联系人信息
        </div>
        <el-form-item prop="linkMen" label="联系人">
          <el-input v-model="shopForm.linkMen" placeholder="请输入" name="linkMen" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="linkPhone" label="联系电话">
          <el-input v-model="shopForm.linkPhone" placeholder="请输入" name="linkPhone" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
         <el-form-item prop="fixedLineTelephone" label="固定电话">
          <el-input v-model="shopForm.fixedLineTelephone" placeholder="请输入" name="fixedLineTelephone" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
         <el-form-item prop="description" label="营业描述">
          <el-input v-model="shopForm.description" placeholder="请输入" name="description" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <div class="title">
          账号密码
        </div>
        <el-form-item prop="accountNumber" label="账号">
          <el-input v-model="shopForm.accountNumber" placeholder="请输入" name="accountNumber" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="shopForm.password" placeholder="请输入" name="password" type="text" style="width: 900px;height: 40px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="info" style="width:120px;height:40px;margin-bottom:30px;" @click="resetMerchantForm('shopForm')">取消</el-button>
          <el-button type="primary" style="width:120px;height:40px;margin-bottom:30px;" @click="submitMerchantForm('shopForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: 3, //1展开的是列表 2展开的是上传企业
      //默认展示出来的数据
      tableData: [{
        name: "亿链网络科技",
        linkMen: '王蛋蛋',
        phone: '15736748889',
        adress: "浙江省杭州市哈哈哈哈哈哈哈哈哈哈哈哈",
      }],
      postData: {}, //上传图片时携带的其他的数据
      //注册企业信息时候提交的信息
      merchantForm: {
        name: '', //名称
        adress: '', //地址
        businessLicense: '', //营业执照
        businessEntity: '', //企业法人
        businessLicense: '', //经营执照
        holdingApositive: '', //手持正面
        onTheBackOfHand: '', //手持背面
        linkMen: '', //联系人
        linkPhone: '', //联系电话
        accountNumber: '', //账号
        password: '', //密码
      },
      shopForm: {
        name: '', //名称
        adress: '', //地址
        theEarlyTime:'',//早班时间
        middleShiftTime:'',//中班时间
        nightTime:'',//晚班时间
        linkMen: '', //联系人
  	    linkPhone: '', //联系电话
        fixedLineTelephone:'',//固定电话
        description:'',//描述
        accountNumber: '', //账号
        password: '', //密码
      },
      
      //注册时候的验证规则
      merchantFormRules: {
        name: [{
          required: true,
          message: '请输入企业名称',
          trigger: 'blur'
        }],
        adress: [{
          required: true,
          message: '请输入经营地址',
          trigger: 'blur'
        }],
        businessLicense: [{
          required: true,
          message: '请上传营业执照',
          trigger: 'blur'
        }],
        businessEntity: [{
          required: true,
          message: '请输入企业法人名称',
          trigger: 'blur'
        }],
        holdingApositive: [{
          required: true,
          message: '请上传手持身份证正面照',
          trigger: 'blur'
        }],
        onTheBackOfHand: [{
          required: true,
          message: '请上传手持身份证背面照',
          trigger: 'blur'
        }],
        linkMen: [{
          required: true,
          message: '请输入联系人名称',
          trigger: 'blur'
        }],
        linkPhone: [{
          required: true,
          message: '请注入联系电话',
          trigger: 'blur'
        }],
        accountNumber: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }],
      },
    }
  },
  methods: {
    tableheaderClassName({
      row,
      rowIndex
    }) {
      return "table_head_th";
    },
    //获取七牛上传时候的token
    get_qiniu_token() {
      this.$post(this.$qiniu).then((res) => {
        let data = res;
        if (data.status_code == 0) {
          this.actionPath = data.data.QiNiuFileUrl + "erp-app"; //不知道什么用
          this.postData.token = data.data.token;
        } else {
          console.log("加载出错", res);
        }
      });
    },
    //上传图片之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.postData.key = file.name; //上传时控制文件名
    },
    //上传图片成功  身份证与人合照
    handleAvatarSuccess_1(res, file) {
      this.imageUrl_1.push(URL.createObjectURL(file.raw)) //暂时展示 的还是本地添加图片
      let arr = [];
      arr.push(res.key);
      this.good_info.goods_images = arr //本地地址上传展示
    },
    //打开新增企业model
    addMerchant() {
      console.log("点击")
      this.model = 2;
    },
    //上传企业信息
    submitMerchantForm(e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //重置表单 并关闭上传企业页面
    resetMerchantForm(e) {
      this.$refs[e].resetFields();
      this.model = 1;
    },
    // 新增店铺信息
    addShop(){

    },
  }
}

</script>
<style>
.table_head_th {
  height: 40px;
  color: #333;
  background-color: #f5f5f5 !important;
  font-size: 14px;
}

.el-button--warning {
  color: #fff;
  background-color: #f58c22;
  border-color: #f58c22;
}

.el-button--warning:hover {
  background-color: #EF9E6F;
  border-color: #EF9E6F;
}

.el-button--warning:active {
  background: #f58c22;
  border-color: #f58c22;
  color: #fff;
  outline: 0
}

.el-button--danger {
  color: #fff;
  background-color: #f04d4d;
  border-color: #f04d4d;
}

.el-button--danger:hover {
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-button--danger:active {
  background: #f04d4d;
  border-color: #f04d4d;
  color: #fff;
  outline: 0
}

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 25px 40px;

  .showList {
    .title {
      display: flex;
      align-items: center;

      .add {
        margin-right: 5px;
      }
    }

    .titleInput {
      width: 375px;
      margin-left: 40px;

      .appendButton {
        background-color: #e0e0e0;
        font-size: #666666;
        border-radius: 0px;
        width: 78px;
        padding: 0px;
        height: 36px;
      }
    }

    .tTable {
      margin-top: 20px;
    }
  }

  .addMerchant {
    .title {
      height: 15px;
      line-height: 15px;
      color: #333333;
      font-size: 15px;
      border-left: 2px solid #18ccba;
      padding-left: 15px;
      font-family: "微软雅黑";
      font-weight: 400;
      margin-bottom: 15px;
    }

    .avatar-uploader .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }

    .avatar {
      width: 178px;
      height: 178px;
      float: left;
      margin-right: 15px;
    }

    .upload_img {
      width: 225px;
      height: 300px;
      background-color: #e3e6e5;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .upload_img:hover {
      background-color: #d9d9d9;
    }

    .identityCard {
      width: 240px;
      height: 152px;
      background-color: #e3e6e5;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .identityCard:hover {
      background-color: #d9d9d9;
    }
  }
}

</style>
