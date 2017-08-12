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
				      v-for="item in cateData"
				      :key="item.cateName"
				      :label="item.cateName"
				      :value="item.cateID">
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
				cateData: [],
				inquire:'',
				inquire:'',
			}
		},
		computed: {

		},
		mounted(){
			this.getUrl();
			this.getCateMes();
		},
		methods: {
			getUrl:function(){
				let aUrl = document.URL;
				let str = ["0"];
				if(aUrl.indexOf("inquire=")!=-1){
					str = aUrl.split("inquire=");
				}
				this.inquire = str[1];
				console.log(this.inquire);
				this.getData();
			},
			getData:function(){
				let that = this;
				this.axios({
					url:'http://127.0.0.1:3000/users/get-content',
					method:'get',
					params:{"inquire":that.inquire},
				}).then(res=>{
					that.value = res.data[0].content;
					that.title = res.data[0].title;
					that.cate = res.data[0].cateID;
					that.description = res.data[0].description;
				})
			},
			getHTML:function(value,render){
				this.content = render;
			},
		    send:function(){
		    	var that =this;
		    	var myform=document.getElementById('myform');  
			    var myData=new FormData(myform);  
		    	this.axios({
	                url: 'http://127.0.0.1:3000/users/img',
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
	                url: 'http://127.0.0.1:3000/users/sub-edit',
	                method: 'post',
	                data: {"title":this.title,"cateID":this.cate,"description":this.description,"content":this.content,"inquire":this.inquire},
	            }).then((res) => {
	                console.log(res.data.status);
	            })
	    		this.dialogFormVisible = false;
	    		this.$message('文章编辑成功');
	    		this.$router.push({path:'article'});
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