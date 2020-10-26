import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/views/Home'
import Archive from '@/views/Archive'
import Post from '@/views/Post'
import Tag from '@/views/Tag'
import About from '@/views/About'
import Category from '@/views/Category'

const routes = [
  { path: '/', name: 'init', redirect: { name: 'home' }, },
  { path: '/home', name: 'home', component: Home },
  { path: '/home/:query', name: 'search', component: Home },
  { path: '/archive', name: 'archive', component: Archive },
  { path: '/category', name: 'category', component: Category },
  { path: '/category/:categoryName', name: 'categorySearch', component: Home },
  { path: '/post/:pathName', name: 'post', component: Post },
  { path: '/tag', name: 'tag', component: Tag },
  { path: '/tag/:tagName', name: 'tagSearch', component: Home },
  { path: '/about', name: 'about', component: About }
]

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}
