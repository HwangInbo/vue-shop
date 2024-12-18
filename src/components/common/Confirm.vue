<script setup>
import { computed } from 'vue';
import { useCartStore } from '../../store/cart';

const cartStore = useCartStore();

const clearCart = computed(()=> {
  cartStore.resetCart();
}) 

</script>
<template>
    <input type="checkbox" id="confirm-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">정말로 구매하시겠습니까?</h3>
          <p class="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
          <div class="modal-action">
            <label for="confirm-modal" @click="clearCart" class="btn btn-primary">
              네
            </label>
            <label for="confirm-modal" class="btn btn-outline">
              아니오
            </label>
          </div>
        </div>
      </div>
</template>

<style scoped>

@media (max-width: 550px) {
  .modal {
    align-items: end;
  }
  .modal-box {
    width: 100%;
    max-width: 100%;
  }
}

</style>