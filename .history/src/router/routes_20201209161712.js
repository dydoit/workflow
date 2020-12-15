import Home from "@/views/Home"
const vueRoutes = [
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
        path: '/workCenter',
        component: Home,
        redirect: '/workCenter/list',
        meta: {title: '工作中心', haveChild: true, icon: 'el-icon-tickets'},
        children: [
          {
            path: 'todo',
            name: 'todo',
            component:() => import('@/views/work-center/toDo.vue'),
            meta: {title: '待办任务'}
          },
          {
            path: 'list',
            name: 'workList',
            meta: {title: '我的业务'},
            component:()=>import('@/views/work-center/list.vue')
          },
          {
            path: 'finished',
            name: 'finished',
            component: ()=>import('@/views/work-center/finished.vue'),
            meta: {title: '已办任务'}
          },
          {
            path: 'delegate',
            name: 'delegate',
            component: ()=>import('@/views/work-center/delegate.vue'),
            meta: {title: '设置委托'}
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
      // {
      //   path: '/user',
      //   component: Home,
      //   children: [
      //     {
      //       path: '',
      //       name: 'user',
      //       component: () => import('@/views/user/pp.vue'),
      //       meta: { title: '用户管理', haveChild: false, icon: 'el-icon-tickets' }
      //     }
      //   ]
      // }
]
export default vueRoutes