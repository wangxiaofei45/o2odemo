<template>
  <div class="CategoryForArchives">
    <div class="title">
      <el-row>
        <el-col :span="24">
          <el-input placeholder="搜索档案室" style="width:350px;margin-right: 20px;">
            <el-button slot="append" type="primary" style="background-color: #e0e0e0;border-radius: 0px;" @click="ajaxjson">
              <svg-icon style="margin-right: 5px;" icon-class="icon_search"/><span>搜索</span>
            </el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      default-expand-all/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
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
    // 搜索的时候显示搜索下面档案室
    ajaxjson() {
      console.log()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped="scoped">
	.CategoryForArchives{
		padding: 25px;
		.title {
			margin-bottom: 15px;
		}
	}
</style>
