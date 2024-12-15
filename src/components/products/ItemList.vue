<script setup>
import { onMounted, computed } from 'vue';
import { useProductsStore } from '../../store/products';
import { Category } from '../../constants/category.js';
import ProductsLoad from './ProductsLoad.vue';

const props = defineProps({
  category: String,
  limit: Number,
});

const productsStore = useProductsStore();

// 필터링된 제품 데이터 계산
const filteredDocs = computed(() => {
  return productsStore.products.filter((doc) => Category[doc.category] === props.category);
});

// 컴포넌트가 마운트되었을 때 데이터 로드
onMounted(() => {
  productsStore.fetchProducts();
});

// limit이 있을 경우 그만큼 자른 데이터
const limitedDocs = computed(() => {
  return props.limit ? filteredDocs.value.slice(0, props.limit) : filteredDocs.value;
});

</script>


<template>
  <!-- 카테고리 제목 -->
  <h2 class="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
    {{ category }}
  </h2>

  <!-- 로딩 상태 확인 -->
  <div v-if="productsStore.isLoading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
    <ProductsLoad :limit="4"/> <!-- 로딩 상태에서 ProductsLoad 표시 -->
  </div>
  
  <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
    <!-- 로드된 제품 목록 표시 -->
    <router-link 
      :to="`/product/${doc.id}`" 
      v-for="doc in limitedDocs" 
      :key="doc.id" 
      class="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
    >
      <figure class="flex h-80 bg-white overflow-hidden">
        <img
          :src='doc.image'
          alt="상품 이미지"
          class="transition-transform duration-300"
        />
      </figure>
      <div class="card-body bg-gray-100 dark:bg-gray-700">
        <p class="card-title text-base">{{ doc.title }}</p>
        <p class="text-base">${{ doc.price.toFixed(0) }}</p>
      </div>
    </router-link>
  </div>
</template>


<style scoped>
@media (max-width: 767px) {
  .item_list {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(320px, 1fr);
      overflow-x: auto;
  }
}
</style>
