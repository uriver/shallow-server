<template>
	<div>
		<h1>文章管理</h1>
		<div class="line"></div>

		<el-table
	      :data="articleData"
	      style="width: 100%">
	      <el-table-column
	        prop="title"
	        label="文章名称"
	        min-width="300">
	      </el-table-column>
	      <el-table-column
	        prop="time"
	        label="创建日期"
	        min-width="240">
	      </el-table-column>
	      <el-table-column
	        prop="cateName"
	        label="文章分类"
	        min-width="220">
	      </el-table-column>
		  <el-table-column 
		  	label="操作"
		  	min-width="300">
	        <template scope="scope">
	          <el-button
	            size="small"
	            type="info"
	            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	          <el-button
	            size="small"
	            type="danger"
	            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	        </template>
	      </el-table-column>
	    </el-table>

	</div>
</template>
	
<script>
	export default{
		data(){
			return{
				articles:[],
				articleData:[],
				cateData:[],
			}
		},
		mounted(){
			this.getArticle();
		},
		methods:{
			getArticle:function(){
				let that = this;
				this.axios({
					url:'http://127.0.0.1:3000/users/get-article',
					dataType:'json',
					method: 'get',
				}).then((res)=> {
					that.articles = res.data;
					that.getCateMes()
				})
			},
			getCateMes:function(){
				let that = this;
				this.axios({
					url: 'http://127.0.0.1:3000/users/get-categoryMes',
	                method: 'get',
				}).then((res)=>{
					that.cateData = res.data;
					this.cateChange();
				})
			},
			cateChange:function(){
				for(let i in this.articles){
					for (let j in this.cateData){
						if(this.articles[i].cateID == this.cateData[j].cateID){
							this.articles[i].cateName = this.cateData[j].cateName;
						}
					}
				}
				this.articleData = this.articles;
			},
			handleDelete:function(index){
				let inquire = this.articleData[index].inquire;
				let cateID = this.articleData[index].cateID;
				this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	this.axios({
						url: 'http://127.0.0.1:3000/article/delete-article',
		                method: 'post',
		                data: {"inquire":inquire,"cateID":cateID},
					}).then((res)=>{
						this.getArticle();
						this.$message({
				            type: 'success',
				            message: '删除成功!'
				          });
					})
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
		}
	}
</script>

<style scoped>
	h1 {
		font-size: 20px;
		margin: 0;
		padding: 0;
	}
	.line{
		height: 8px;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 10px;
	}
</style>