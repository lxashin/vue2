import Vue from 'vue'
import App from './App.vue'
import axios from './http'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import * as echarts from 'echarts'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// 配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/user.png'),
  loading: require('./assets/images/user.png'),
  attempt: 1
})

Vue.use(VideoPlayer)
axios.defaults.baseURL='http://192.168.1.103:8000'
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoder;charset=UTF-8'


import store from './store'
import router from './router'
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
