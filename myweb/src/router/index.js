import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Article from '@/components/article/article'
import Category from '@/components/category/category'
import Write from '@/components/write/write'
import Edit from '@/components/article/edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
            { path: '/article', component: Article, name: '文章管理'},
            { path: '/category', component: Category, name: '类别管理' },
            { path: '/write', component: Write, name: '新建文章' },
            { path: '/edit', component: Edit, name: '编辑文章' },
        ]
    }
  ]
})
