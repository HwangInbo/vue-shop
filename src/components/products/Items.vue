<script setup>
import { useRoute } from 'vue-router';
import { useProductsStore } from '../../store/products';
import { computed, onMounted } from 'vue';
import Breadcrumb from '../common/Breadcrumb.vue';
import { MENUS } from '../../constants/category';

const route = useRoute(); // 현재 라우터 상태를 가져옵니다.

const productsStore = useProductsStore();

const filteredDocs = computed(() => {
  return productsStore.products.filter((doc) => Category[doc.id] === id );
});

console.log(filteredDocs);

// 필터링된 제품 데이터 계산

// 컴포넌트가 마운트되었을 때 데이터 로드
onMounted(() => {
  productsStore.fetchProducts();
});


const id = route.params.id; // URL 파라미터에서 'id' 값을 가져옵니다.
</script>

<template>
  <!-- 로딩 상태 확인 -->
  <div v-if="productsStore.isLoading" class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
    <ProductsLoad :limit="1" :variant="items"/> <!-- 로딩 상태에서 ProductsLoad 표시 -->
  </div>
  <div v-else>
    <div className="text-sm breadcrumbs">
        <Breadcrumb :category="MENUS.HOME" :crumb="MENUS.ACCESSORY" />
    </div>
  </div>
  <div>
    <h1>상품 ID: {{ id }}</h1> <!-- 라우터 파라미터 출력 -->
  </div>
  
</template>
