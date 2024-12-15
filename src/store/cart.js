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
    // 로컬스토리지에서 카트 상태 불러오기
    loadCartFromLocalStorage() {
      const storedCart = localStorage.getItem(CART_ITEM);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        // id와 count만 로드하도록 설정
        this.items = Object.fromEntries(
          Object.entries(parsedCart).map(([id, item]) => [
            id,
            { id: Number(id), count: item.count },
          ])
        );
      }
    },
    // 카트 아이템 추가
    addToCart(item) {
      const existingItem = this.items[item.id];

      if (existingItem) {
        // 이미 아이템이 있다면 count 증가
        existingItem.count = (existingItem.count || 0) + (item.count || 1);
      } else {
        // 새 아이템 추가 (count 초기화)
        this.items[item.id] = { id: item.id, count: item.count || 1 };
      }

      // 로컬스토리지에 id와 count만 저장
      this.saveCartToLocalStorage();
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

      // 로컬스토리지에 id와 count만 저장
      this.saveCartToLocalStorage();
    },
    // 로컬스토리지에 카트 상태 저장 (id와 count만 저장)
    saveCartToLocalStorage() {
      const simplifiedCart = Object.fromEntries(
        Object.entries(this.items).map(([id, item]) => [
          id,
          { id: Number(id), count: item.count },
        ])
      );
      localStorage.setItem(CART_ITEM, JSON.stringify(simplifiedCart));
    },
  },
  // 초기화 시 카트 상태 불러오기
  persist: true,
});
