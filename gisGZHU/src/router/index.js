// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/main.vue'), // 主布局组件
    name: 'Home',
    children: [
      {
        path: '', // 默认子路由
        component: () => import('../components/master/list.vue'),
      },
      // 可以继续添加其他子路由
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router