import { createRouter, createWebHashHistory } from 'vue-router';
import { asyncRoutes } from './asyncRoutes';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    meta: { title: '登录', isHiddenLayout: true },
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    name: '404',
    meta: { title: '404', isLayout: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 重置路由
export const resetRouter = () => {
  const asyncRoutesName = asyncRoutes.map((item) => item.name);
  asyncRoutesName.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name);
    }
  });
};
export default router;
