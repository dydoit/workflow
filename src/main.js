import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'
import ElementUI from 'element-ui';
import "core-js/stable";
import "regenerator-runtime/runtime";
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.styl'
import {permission} from '@/utils/directive'
Vue.directive('permission', permission)
Vue.config.productionTip = false
Vue.use(ElementUI);
import NProgress from 'nprogress' //页面加载进度条
import 'nprogress/nprogress.css'
import './icons'
// 总线
const bus = new Vue()
Vue.prototype.$bus = bus
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
