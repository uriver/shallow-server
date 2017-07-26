<template>
	<div>
		<el-button type="primary" @click="cateVisible = true" >增加分类<i class="el-icon-document el-icon--right"></i></el-button>
		
		<el-dialog title="创建分类" :visible.sync="cateVisible">
		  <el-input v-model="cateName" auto-complete="off"></el-input>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cateVisible = false">取 消</el-button>
		    <el-button type="primary" @click="createCate">确 定</el-button>
		  </div>
		</el-dialog>

		<div class="ctae-line"></div>
		<el-table
	      :data="cateData"
	      style="width: 100%">
	      <el-table-column
	        prop="cateName"
	        label="分类名"
	        min-width="240">
	      </el-table-column>
	      <el-table-column
	        prop="articleNum"
	        label="文章数量"
	        min-width="240"
	        sortable
	        >
	      </el-table-column>
	      <el-table-column
	        prop="time"
	        label="创建时间"
	        min-width="240">
	      </el-table-column>
	      <el-table-column
	        prop="options"
	        label="操作"
	        min-width="240"
	        >
	        <template scope="scope">
		        <el-button
		          size="small"
		          type="nomal"
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
				cateVisible:false,
				cateName:"",
				cateData:[],
			}
		},
		mounted(){
			this.getCateMes();
		},
		methods:{
			createCate:function(){
				let that = this;
				this.axios({
					url: 'http://127.0.0.1:3000/users/add-category',
	                method: 'post',
	                data: {"cateName":this.cateName},
				}).then((res)=>{
					that.cateVisible = false;
					that.$message('创建分类成功');
					this.getCateMes();
				})
			},
			getCateMes:function(){
				let that = this;
				this.axios({
					url: 'http://127.0.0.1:3000/users/get-categoryMes',
	                method: 'get',
				}).then((res)=>{
					that.cateData = res.data;
				})
			},
			handleEdit:function(index){

			},
			handleDelete:function(index){
				let cateID = this.cateData[index].cateID;
				let that = this;
				this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	that.axios({
						url: 'http://127.0.0.1:3000/users/delete-cate',
		                method: 'post',
		                data: {"cateID":cateID},
					}).then((res)=>{
						that.getCateMes();
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
	.ctae-line{
		height: 8px;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 10px;
	}

</style>