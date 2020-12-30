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
        redirect: '/workCenter/todo',
        meta: {title: '工作中心', haveChild: true, icon: 'el-icon-tickets'},
        children: [
          {
            path: 'add-work',
            name: 'addWork',
            component: () => import('@/views/work-center/add.vue'),
            meta: {title: '新增'}
          },
          {
            path: 'list',
            name: 'workList',
            meta: {title: '我发起'},
            component:()=>import('@/views/work-center/list.vue')
          },
          {
            path: 'todo',
            name: 'todo',
            component:() => import('@/views/work-center/toDo.vue'),
            meta: {title: '我的待办'}
          },
          {
            path: 'finished',
            name: 'finished',
            component: ()=>import('@/views/work-center/finished.vue'),
            meta: {title: '我的已办'}
          },
          {
            path: 'delegate',
            name: 'delegate',
            component: ()=>import('@/views/work-center/delegate.vue'),
            meta: {title: '设置委托'}
          },
         
          {
            path: 'apply',
            name: 'apply',
            component: () => import('@/views/work-center/apply.vue'),
            meta: {title: '办理工单'},
            hidden: true
          },
          {
            path: 'detail',
            name: 'apply',
            component: () => import('@/views/work-center/detail.vue'),
            meta: {title: '工单详情'},
            hidden: true
          },
        ]
      }
]
export default vueRoutes