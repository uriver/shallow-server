<template>
	<div id="main">
	    <mavon-editor class="set" v-model="value"/>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				value:'#hello'
			}
		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style scoped>
	.set{
		height: 800px;
	}
</style>