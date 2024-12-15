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
          <span class="text-xl md:text-2xl">총 : $0</span>
          <label for="confirm-modal" class="modal-button btn btn-primary ml-5">
            구매하기
          </label>
        </div>
      </div>
      
    </div>

  </section>
</template>

<script setup>
import { useProductsStore } from '../../store/products';
import Breadcrumb from '../common/Breadcrumb.vue';
import { useCartStore } from "../../store/cart";
import ProductsLoad from '../products/ProductsLoad.vue';
import { computed } from 'vue';
import CartList from './CartList.vue';
const cartStore = useCartStore();

// 모든 아이템의 id와 count만 가져오기
const allItems = computed(() => cartStore.getItemsWithIdAndCount);
const productsStore = useProductsStore();
const itemLength = allItems.value.length

</script>
