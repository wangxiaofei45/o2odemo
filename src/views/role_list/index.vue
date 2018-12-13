<template>
	<el-table :data="data" stripe style="width: 100%">
		<el-table-column prop="id" label="用户id" width="80">
		</el-table-column>
		<el-table-column prop="role_name" label="角色名称" width="150">
		</el-table-column>
		<el-table-column prop="remark" label="角色描述">
		</el-table-column>
		<el-table-column label="操作">
			<template slot-scope="scope">
				<el-button type="info" @click="checkDetail(scope.row.id)">查看详情</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				data: [],//表格数据
			}
		},
		//页面加载之前
		created() {
			this.ajaxjson(); //请求顾客数据
		},
		//计算属性
		computed: {},
		//方法
		methods: {
			ajaxjson() {
				let postData = {
					page: 1,
					role_id:1
				};
				//调用post请求方法
				this.$post("/role/list", postData).then((res) => {
					let data = res;
					if(data.status_code == 0) {
						this.data = data.data;
					} else {}
				});
			},
			//测试使用的
			checkDetail() {

			}
		}
	}
</script>