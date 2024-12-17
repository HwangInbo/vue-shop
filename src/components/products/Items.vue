<script setup>
import { useRoute } from 'vue-router';
import { useProductsStore } from '../../store/products';
import { computed, onMounted } from 'vue';
import Breadcrumb from '../common/Breadcrumb.vue';
import { MENUS } from '../../constants/category';
import ProductsLoad from './ProductsLoad.vue';
import Rating from '../common/Rating.vue';
import { useCartStore } from '../../store/cart'; // Pinia store import

const cartStore = useCartStore(); // store 인스턴스 사용
console.log(cartStore.value);

// 카트에서 아이템 추가
const addItemToCart = (item) => {
  cartStore.addToCart(item);
};

// 카트에서 아이템 제거
const removeItemFromCart = (id) => {
  cartStore.removeFromCart(id);
};

// 카트 상태 로드
// cartStore.loadCartFromLocalStorage();
const route = useRoute();
const productsStore = useProductsStore();
const id = Number(route.params.id); // 문자열을 숫자로 변환



const filteredDocs = computed(() => {
  return productsStore.products.find((doc) => doc.id === id) || {};
});
onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>

<template>
  <div v-if="productsStore.isLoading">
    <ProductsLoad :limit="1" variant="items" />
  </div>
  <div v-else>
    <div class="text-sm breadcrumbs">
      <Breadcrumb :category="filteredDocs.category" :crumb="filteredDocs.title" />
    </div>
    <div v-if="filteredDocs.image" class="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
      <figure class="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
        <img class="object-contain w-full h-72" :src="filteredDocs.image" />
      </figure>
      <div class="card-body px-1 lg:px-12">
        <h2 class="card-title">
          {{ filteredDocs.title }}
          <span class="badge badge-accent ml-2">NEW</span>
        </h2>
        <p>{{ filteredDocs.description }}</p>
        <Rating :rate="filteredDocs.rating.rate" :count="filteredDocs.rating.count" />
        <p class="mt-2 mb-4 text-3xl">${{ filteredDocs.price?.toFixed(0) }}</p>
        <div class="card-actions">
          <button class="btn btn-primary" @click="addItemToCart(filteredDocs)">장바구니에 담기</button>
          <router-link :to="`/cart`" class="btn btn-outline ml-1">
            장바구니로 이동
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>해당 상품이 존재하지 않습니다.</p>
    </div>
  </div>
</template>
