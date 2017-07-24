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
					url:'/users/get-article',
					dataType:'json',
					method: 'get',
				}).then((res)=> {
					that.content = res.data[5].content;
				})
			}
		}
	}
</script>

<style scoped>
/*	@import './static/css/markd.css'*/

</style>