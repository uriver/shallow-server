<template>
	<el-row class="home-container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':logo}}
			</el-col>
			<el-col :span="14">
				<div class="tools" @click="collapse">
					<i class="menu-icon el-icon-menu "></i>
				</div>
			</el-col>
		</el-col>

		<el-col :span="24" class="main">
		<div style="height:500px;"></div>
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!-- 导航菜单——折叠前 -->
				<el-menu :default-active="$router.path" class="el-menu" v-show="!collapsed" router>
					<el-menu-item index='/article'><i class="el-icon-document"></i>文章管理</el-menu-item>
					<el-menu-item index='/category'><i class="el-icon-share"></i>分类管理</el-menu-item>
					<el-menu-item index='/write'><i class="el-icon-edit"></i>新建文章</el-menu-item>
				</el-menu>
				<!-- 导航菜单——折叠后 -->
				<ul class="el-menu collapsed" v-show="collapsed">
					<li class="el-submenu__title" @click="$router.push('/article')"><i class="el-icon-document"></i></li>
					<li class="el-submenu__title" @click="$router.push('/category')"><i class="el-icon-share"></i></li>
					<li class="el-submenu__title" @click="$router.push('/write')"><i class="el-icon-edit"></i></li>
				</ul>
			</aside>
			<section class="content-container">
				<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</section>
		</el-col>
	</el-row>
</template>

<script>
	export default{
		data(){
			return{
				logo:'SHALLOWNIGHT',
				collapsed:false
			}
		},
		methods:{
			collapse:function(){
				this.collapsed = !this.collapsed;
			}
		}
	}
</script>

<style scoped>
	.home-container{
		width: 100%;
		position: absolute;
		top: 0px;
		bottom: 0px;
	}
	.header{
		height: 60px;
		background-color: #20A0FF;
	}
	.logo{
		height:60px;
		line-height: 60px;
		font-size: 22px;
		color:white;
		padding-left:20px;
		padding-right:20px;
		border-color: rgba(238,241,146,0.3);
		border-right-width: 1px;
		border-right-style: solid;
	}
	.logo-width{
		width: 230px;
	}
	.logo-collapse-width{
		width: 60px;
	}
	.menu-icon{
		margin-left: 20px;
		margin-top: 20px;
		cursor: pointer;
	}
	.main{
		display: flex;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
	}
/*	.main aside{
		flex:0 0 230px;
		width: 230px;
	}*/
	.el-menu{
		height: 100%;
	}
	.menu-collapsed{
		flex:0 0 60px;
		width: 60px;
	}
	.menu-expanded{
		flex:0 0 230px;
		width: 230px;
	}
	.collapsed{
		width: 60px;
	}
	.content-container{
		flex:1;
		overflow-y: scroll;
		padding: 20px;
	}
	.content-wrapper {
		box-sizing: border-box;
	}
</style>