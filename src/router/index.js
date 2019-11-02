import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },

    {
      name: 'home',
      path: '/home',
      component: Home
    }

  ]
})
// 注册路由守卫
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  // 去登陆或者有token就继续
  if (to.path === '/login' || token) {
    next()
  } else {
    // 否则就去登陆
    next('/login')
  }
})

export default router
