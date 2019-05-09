export function deletes(url,postData) {
	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		this.$post(url, postData).then((res) => {
			let data = res;
			console.log(data);
			if(data.status_code == 0) {
				this.$message({
					type: 'success',
					message: data.message,
				});
				this.ajaxjson();
			} else {
				this.$message({
					type: 'error',
					message: data.message,
				});
			}
		});
	}).catch(() => {
		this.$message({
			type: 'info',
			message: '已取消删除'
		});
	});
	
}