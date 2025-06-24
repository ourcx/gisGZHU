// router/index.js
import { path } from 'd3'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../page/main.vue'), // 主布局组件
    name: 'Home',
    children: [
      {
        path: '', // 默认子路由
        component: () => import('../components/master/list.vue')
      }
      // 可以继续添加其他子路由
    ],
    meta: {
      reload: true, // 标记该路由需要重新加载
      reloadKey: Date.now() // 每次访问生成新key
    }
  },
  {
    path: '/cat',
    component: () => import('../page/cat.vue'),
    name: 'Cat',
    children: [
      {
        path: '',
        component: () => import('../components/cat/Intersection.vue'),
        meta: {
          reload: true, // 标记该路由需要重新加载
          reloadKey: Date.now() // 每次访问生成新key
        }
      }
    ],
    meta: {
      reload: true, // 标记该路由需要重新加载
      reloadKey: Date.now() // 每次访问生成新key
    }
  },
  {
    path: '/about',
    component: () => import('../page/404.vue'),
    meta: {
      reload: true, // 标记该路由需要重新加载
      reloadKey: Date.now() // 每次访问生成新key
    }
  },
  {
    path:'/picture',
    component: () => import('../page/img.vue'),
    meta: {
      reload: true, // 标记该路由需要重新加载
      reloadKey: Date.now()
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
