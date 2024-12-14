import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/index.vue';  // 중복 import 제거하고 이름 변경 (대소문자 구분)
import Accessory from '../views/Accessory.vue';
import Digital from '../views/Digital.vue';
import Error from '../views/Error.vue';
import Fashion from '../views/Fashion.vue';
import Products from '../views/Products.vue';

const routes = [
  { path: "/", component: Index },  // index -> Index로 수정
  { path: "/accessory", component: Accessory },
  { path: "/digital", component: Digital },
  { path: "/error", component: Error },
  { path: "/fashion", component: Fashion },
  { path: "/product/:id", component: Products },
  {
    path: "/:catchAll(.*)", // 404 페이지 처리
    component: Error, // 또는 Error 페이지로 리디렉션
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
