<template>
  <div class="fileTransfer">
    <el-row class="title">
      <el-col :class="showType == 1?active:''" :span="12" @click.native="selectShowType(1)">档案转移</el-col>
      <el-col :class="showType == 2?active:''" :span="12" @click.native="selectShowType(2)">档案盒转移</el-col>
    </el-row>
    <div v-show="showType == 1" class="fileTransfer">
      <el-row>
        <el-row>
          <el-col :span="12">
            <el-select v-model="fileTransfer" placeholder="请选择档案室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-select v-model="fileTransfer" placeholder="请选择档案柜">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-tree ref="tree" :data="data" :props="defaultProps" style="margin-left: 20px;margin-top: 20px;" show-checkbox node-key="id"/>
          </el-col>
          <el-col :span="12">
            <el-select v-model="fileTransfer" placeholder="请选择档案室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-select v-model="fileTransfer" placeholder="请选择档案柜">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-select v-model="fileTransfer" placeholder="请选择档案盒">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <el-button type="primary" @click="getCheckedKeys">转移</el-button>
        </el-row>
      </el-row>
    </div>
    <div v-show="showType == 2" class="fileTransfer">
      <el-row>
        <el-row>
          <el-col :span="12">
            <el-select v-model="fileTransfer" placeholder="请选择档案室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-tree ref="tree" :data="data" :props="defaultProps" style="margin-left: 20px;margin-top: 20px;" show-checkbox node-key="id"/>
          </el-col>
          <el-col :span="12">
            <el-select v-model="fileTransfer" placeholder="请选择档案室">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
            <el-select v-model="fileTransfer" placeholder="请选择档案柜">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-col>
        </el-row>
        <el-row style="text-align: center">
          <el-button type="primary" @click="getCheckedKeys">转移</el-button>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileTransfer: '',
      showType: 1,
      active: 'active',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1'
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    selectShowType(e) {
      this.showType = e
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	.fileTransfer {
		padding: 25px;
		.title {
			text-align: center;
			height: 50px;
			line-height: 50px;
			border: 1px solid #e6e6e6;
			cursor: pointer;

			.active {
				background-color: #18CCBA;
				color: #ffffff;
			}
		}
	}
</style>
