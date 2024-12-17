<template>
  <section class="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
    <Breadcrumb :category="'홈'" :crumb="'장바구니'" />
    <div v-if="productsStore.isLoading">
      <ProductsLoad :limit="1" variant="items" />
    </div>
    <div v-else class="mt-6 md:mt-14 px-2 lg:px-0">
      <div v-if="itemLength === 0">
        <div>
          <h1 class="text-2xl">장바구니에 물품이 없습니다.</h1>
          <RouterLink to="/" class="btn btn-primary mt-10">
            담으러 가기
          </RouterLink>
        </div>
      </div>
      <div v-else class="lg:flex justify-between mb-20">
        <div>
          <CartList />
        </div>
        <div class="self-start shrink-0 flex items-center mt-10 mb-20">
          <span class="text-xl md:text-2xl">총 : ${{ totalCount.toFixed(0) }}</span>
          <label for="confirm-modal" class="modal-button btn btn-primary ml-5">
            구매하기
          </label>
        </div>
      </div>
    </div>
    <Confirm />
  </section>
</template>

<script setup>
import { useProductsStore } from '../../store/products';
import Breadcrumb from '../common/Breadcrumb.vue';
import { useCartStore } from "../../store/cart";
import ProductsLoad from '../products/ProductsLoad.vue';
import { computed } from 'vue';
import CartList from './CartList.vue';
import Confirm from '../common/Confirm.vue';
const cartStore = useCartStore();

// 모든 아이템의 id와 count만 가져오기
const allItems = computed(() => cartStore.getItemsWithIdAndCount);
const productsStore = useProductsStore();
const itemLength = computed(() => allItems.value.length ) 
const filteredDocs = computed(() => productsStore.products);

const matchingItems = computed(() => {
  return filteredDocs.value.map((product) => {
    const matchingItem = allItems.value.find((item) => item.id === product.id);
    return matchingItem
      ? { ...product, count: matchingItem.count } // count 값 추가
      : product;
  }).filter((item) => item.count); // count가 있는 경우만 남김
});

const totalCount = computed(() => matchingItems.value.map((item) => item.price * item.count).reduce((acc, cur) => acc + cur , 0))

</script>
