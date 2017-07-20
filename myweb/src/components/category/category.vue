<template>
	<div class="markdown-body" v-html="content"></div>
</template>

<script>
	export default{
		data(){
			return{
				content:''
			}
		},
		mounted(){
			this.getData();
		},
		methods:{
			getData:function(){
				let that = this;
				this.axios({
					url:'http://127.0.0.1:3000/users/get-article',
					dataType:'json',
					method: 'get',
				}).then((res)=> {
					that.content = res.data[5].content;
				})
			}
		}
	}
</script>

<style scoped src="../../../static/css/markd.css">
/*	@import './static/css/markd.css'*/

</style>