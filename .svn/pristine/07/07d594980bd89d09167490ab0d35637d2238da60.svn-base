import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  // if(localStorage.getItem('token')) {
   //     next()
  // } else {
//    跳回登录页面
  // }
  next()
}) 
export default router