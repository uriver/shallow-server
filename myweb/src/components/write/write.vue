<template>
	<div id="main">
    	<mavon-editor class="set" v-model="value" @change="getHTML"></mavon-editor>
    	<div class="img-upload">
		    <form id='myform'>
		    	<input class="input-img" type='file' name='myImg' id='myImg'/>
		    	<el-button class="button-img" type="primary" icon="search">搜索图片</el-button>   
			    <el-button type="primary" @click="send">上传<i class="el-icon-upload el-icon--right"></i></el-button>
			</form>  
			<el-button class="sub-article" type="primary" @click="dialogFormVisible = true">发表<i class="el-icon-upload2 el-icon--right"></i></el-button>

			<el-dialog title="文章信息" :visible.sync="dialogFormVisible">
			    标题：
			    <el-input v-model="title" placeholder="请输入标题"></el-input>
			    <div style="height:30px;"></div>
				分类：
				<br />
			    <el-select v-model="cate" placeholder="请选择">
				    <el-option
				      v-for="item in category"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
			    </el-select>
			    <div style="height:30px;"></div>
			    文章概述：
			    <el-input
				    type="textarea"
				    :autosize="{ minRows: 2, maxRows: 4}"
				    placeholder="请输入内容"
				    v-model="description">
				</el-input>

			    <div slot="footer" class="dialog-footer">
			        <el-button @click="dialogFormVisible = false">取 消</el-button>
			        <el-button type="primary" @click="subArticle">确 定</el-button>
			    </div>
			</el-dialog>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				value:'# hello',
				content:'',
				dialogFormVisible: false,
				title:'',
				cate:'',
				description:'',
				category: [{
		          value: '1',
		          label: 'JavaScript'
		        }, {
		          value: '2',
		          label: 'Node.js'
		        }],
			}
		},
		computed: {

		},
		methods: {
			getHTML:function(value,render){
				this.content = render;
			},
		    send:function(){
		    	var that =this;
		    	var myform=document.getElementById('myform');  
			    var myData=new FormData(myform);  
		    	this.axios({
	                url: '/users/img',
	                method: 'post',
	                data: myData,
	                headers: { 'Content-Type': 'multipart/form-data' },
	            }).then((res) => {
	                console.log(res.data.newPath);
	                that.value += '![img]('+res.data.newPath+')';
	                that.$message('上传图片成功');
	            })
		    },
		    subArticle:function(){
		    	if(this.title == ''){
		    		this.$message.error('未填写标题');
		    		return;
		    	}
		    	if(this.cate == ''){
		    		this.$message.error('未选择分类');
		    		return;
		    	}
		    	this.axios({
	                url: '/users/sub-article',
	                method: 'post',
	                data: {"title":this.title,"cateID":this.cate,"description":this.description,"content":this.content},
	            }).then((res) => {
	                console.log(res.data.status);
	            })
	    		this.dialogFormVisible = false;
	    		this.$message('文章发表成功');
		    }
		}
	}
</script>

<style scoped>
	.set{
		height: 800px;
	}
	.img-upload{
		margin-top: 10px;
		box-sizing: border-box;
		width: 100%;
		height: 50px;
		background-color: #EEF1F6;
		border-radius: 6px;
		padding-top: 10px;
		padding-left: 10px;
	}
	#myform{
		display: inline-block;
	}
	.button-img{
		
	}
	.input-img{
		opacity: 0;
		width: 105px;
		position: absolute;
		height: 50px;
		cursor: pointer;
	}
	.sub-article{
		float: right;
		margin-right: 20px;
	}
</style>