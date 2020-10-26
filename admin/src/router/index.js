import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '../utils/token'

Vue.use(VueRouter)

const Login = () => import(/* webpackChunkName:"login" */'../views/login.vue')
const Dashboard = () => import(/* webpackChunkName:"dashboard" */'../views/dashboard.vue')
const Welcome = () => import(/* webpackChunkName:"dashboard_welcome" */'../components/welcome.vue')
const Post = () => import(/* webpackChunkName:"dashboard_post" */'../components/post.vue')
const AddPost = () => import(/* webpackChunkName:"dashboard_add_post" */'../components/addPost.vue')
const Category = () => import(/* webpackChunkName:"dashboard_category" */'../components/category.vue')
const Tag = () => import(/* webpackChunkName:"dashboard_tag" */'../components/tag.vue')
const UserOption = () => import(/* webpackChunkName:"dashboard_user_option" */'../components/userOption.vue')
const BaseOption = () => import(/* webpackChunkName:"dashboard_base_opiton" */'../components/baseOption.vue')
const Comment = () => import(/* webpackChunkName:"dashboard_comment" */'../components/comment.vue')

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    {
      path: '/dashboard',
      name: 'Dashboard',
      redirect: '/dashboard/welcome',
      component: Dashboard,
      children: [
        { path: '/dashboard/welcome', component: Welcome },
        { path: '/dashboard/post', component: Post },
        { path: '/dashboard/post/add', component: AddPost },
        { path: '/dashboard/category', component: Category },
        { path: '/dashboard/tag', component: Tag },
        { path: '/dashboard/option/user', component: UserOption },
        { path: '/dashboard/option/base', component: BaseOption },
        { path: '/dashboard/comment', component: Comment }
      ]
    }
  ]
})
// 拦截器
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = getToken()
  if (!token) return next('/login')
  next()
})

export default router
