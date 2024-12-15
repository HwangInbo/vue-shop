<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../store/cart';
import { computed, onMounted } from 'vue';
import { useProductsStore } from '../../store/products';
const cartStore = useCartStore();
const productsStore = useProductsStore();

onMounted(async () => {
  await productsStore.fetchProducts(); // 데이터 불러오기
});
// cartStore와 productsStore 상태 가져오기
const allItems = computed(() => cartStore.getItemsWithIdAndCount);
const filteredDocs = computed(() => productsStore.products);

const matchingItems = computed(() => {
  return filteredDocs.value.map((product) => {
    const matchingItem = allItems.value.find((item) => item.id === product.id);
    return matchingItem
      ? { ...product, count: matchingItem.count } // count 값 추가
      : product;
  }).filter((item) => item.count); // count가 있는 경우만 남김
});

const addItemToCart = (id: number) => {
  const product = filteredDocs.value.find(p => p.id === id);
  if (product) {
    cartStore.addToCart(product);  // product 객체를 추가
  }
};

// 카트에서 아이템 제거
const removeItemFromCart = (id) => {
  cartStore.removeFromCart(id);
};
console.log(matchingItems.value); // 겹치는 product 객체만 출력

</script>

<template>
    <div class="lg:flex lg:items-center mt-4 px-2 lg:px-0"
        v-for="doc in matchingItems" 
        :key="doc.id" >
        <RouterLink :to="`/product/${doc.id}`" >
            <figure class="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
              <img
                :src="doc.image"
                :alt="doc.title"
                class="object-contain w-full h-48"
              />
            </figure>
        </RouterLink>
        <div class="card-body px-1 lg:px-12">
            <h2 class="card-title">
                <RouterLink :to="`/product/${doc.id}`" class="link link-hover">{{doc.title}}</RouterLink>
            </h2>
            <p class="mt-2 mb-4 text-3xl">
              ${{(doc.price * doc.count).toFixed(0)}} 
            </p>
            <div class="card-actions">
              <div class="btn-group">
                <button class="btn btn-primary" @click="removeItemFromCart(doc.id)">-</button>
                <button class="btn btn-ghost no-animation">{{doc.count }}</button>
                <button class="btn btn-primary" @click="addItemToCart(doc.id)">+</button>
              </div>
            </div>
        </div>
    </div>
</template>