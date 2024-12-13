import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../App.vue'), // 홈 컴포넌트
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
