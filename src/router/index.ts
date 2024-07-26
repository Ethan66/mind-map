import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import pageRoutes from './pageRoutes'

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
      ...pageRoutes
    ],
    meta: { isHidden: false }
  },
  {
    path: '/edit',
    component: () => import('@/views/edit/index.vue'),
    name: 'edit',
    meta: { title: '编辑', noCache: true, icon: '', isHidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { isHidden: true }
  }
]

export const RzRouter = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})
