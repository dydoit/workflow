import Home from "@/views/Home"
const vueRoutes = [
      {
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true
      },
      {
        path: '/',
        component: Home,
        redirect: '/index',
        children: [
          {
            path: 'index',
            name: "Index",
            component: () => import('@/views/index/index.vue'),
            meta: { title: '首页', haveChild: false, icon: 'el-icon-shopping-cart-full' }
          }
        ]
      },
      {
        path: '/Order',
        component: Home,
        redirect: '/Order/order-list',
        meta: { title: '订单管理', haveChild: true, icon: 'el-icon-tickets' },
        children: [
          {
            path: 'order-list',
            name: 'orderList',
            component: () => import('@/views/order/list.vue'),
            meta: { title: '订单列表' }
          },
          {
            path: 'gl',
            name: 'gl',
            component: () => import('@/views/order/add.vue'),
            meta: { title: '新增订单' }
          }
        ]
      },
      {
        path: '/user',
        component: Home,
        children: [
          {
            path: '',
            name: 'user',
            component: () => import('@/views/user/pp.vue'),
            meta: { title: '用户管理', haveChild: false, icon: 'el-icon-tickets' }
          }
        ]
      }
]
export default vueRoutes