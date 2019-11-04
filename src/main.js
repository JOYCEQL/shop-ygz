import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Elementui from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http = axios
// 全局配置基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 统一设置请求头---axios拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么----设置请求头
  const AUTH_TOKEN = localStorage.getItem('token')

  // 不是登录页则设置token---实际多余
  if (config.url !== 'login') {
    config.headers.common['Authorization'] = AUTH_TOKEN
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
Vue.use(Elementui)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
