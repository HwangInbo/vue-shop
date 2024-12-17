import { defineStore } from 'pinia';
import { CART_ITEM } from '../constants/category';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: {}, // 카트 아이템 초기 상태
  }),
  getters: {
    // 모든 아이템의 id와 count만 추출
    getItemsWithIdAndCount: (state) => {
      return Object.values(state.items).map((item) => ({
        id: item.id,
        count: item.count,
        price: item.price
      }));
    },
  },
  actions: {
    // 카트 아이템 추가
    resetCart() {
      this.items = {}
    },
    addToCart(item) {
      const existingItem = this.items[item.id];

      if (existingItem) {
        // 이미 아이템이 있다면 count 증가
        existingItem.count = (existingItem.count || 0) + (item.count || 1);
      } else {
        // 새 아이템 추가 (count 초기화)
        this.items[item.id] = { id: item.id, count: item.count || 1 };
      }
    },
    // 카트 아이템 제거
    removeFromCart(id) {
      const itemToRemove = this.items[id];
      if (itemToRemove) {
        if (itemToRemove.count === 1) {
          delete this.items[id]; // 수량이 1이면 아이템 제거
        } else {
          this.items[id].count -= 1; // 수량 감소
        }
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: CART_ITEM, // key를 'CART_ITEM'으로 설정
        storage: localStorage,
        // items만 로컬스토리지에 저장하도록 beforeStore 사용
        beforeStore: (state) => {
          return state.items;  // state.items만 로컬스토리지에 저장
        },
      },
    ],
  },
});
