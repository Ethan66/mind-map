import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/index',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        name: 'index',
        meta: { title: '首页', noCache: true, icon: '', isHidden: true }
      },
      {
        path: 'error-manage',
        redirect: '/error-manage/list',
        name: 'error',
        meta: { title: '错误管理', noCache: false, icon: 'system', isHidden: false },
        children: [
          {
            path: 'list',
            component: () => import('@/views/error-manage/list.vue'),
            name: 'error-list',
            meta: { title: '错误列表', noCache: false, icon: 'table', isHidden: false }
          }
        ]
      },
      {
        path: 'api-manage',
        redirect: '/api-manage/list',
        name: 'api-manage',
        meta: { title: '接口管理', noCache: false, icon: 'system', isHidden: false },
        children: [
          {
            path: 'list',
            component: () => import('@/views/api-manage/list.vue'),
            name: 'api-list',
            meta: { title: '接口列表', noCache: false, icon: 'table', isHidden: false }
          }
        ]
      }
    ],
    meta: { isHidden: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { isHidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { isHidden: true }
  }
]

export const RzRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})
