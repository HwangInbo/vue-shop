// stores/cart.js
import { defineStore } from 'pinia';
import { CART_ITEM } from '../constants/category';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: {} // 카트 아이템 초기화
  }),
  persist: true, // Pinia 플러그인 또는 별도로 설정한 persist 기능을 사용하여 로컬스토리지에 상태 저장
  actions: {
    /**
     * 카트에 아이템을 추가하는 함수
     * @param {Object} item 아이템 객체
     */
    addToCart(item) {
      const currentItems = this.items || {};

      // 이미 존재하는 아이템인지 확인
      const existingItem = currentItems[item.id];

      const updatedItems = {
        ...currentItems,
        [item.id]: {
          id: item.id, // 상품 ID
          count: (existingItem?.count || 0) + item.count, // 기존 수량 + 추가된 수량
        },
      };

      this.items = updatedItems; // 업데이트된 아이템 반영
    },

    /**
     * 카트에서 아이템을 제거하는 함수
     * @param {number} id 아이템 ID
     */
    removeFromCart(id) {
      const updatedItems = { ...this.items };
      const itemToRemove = updatedItems[id];

      if (itemToRemove) {
        if (itemToRemove.count === 1) {
          delete updatedItems[id]; // 수량이 1이면 아이템 제거
        } else {
          updatedItems[id] = {
            ...itemToRemove,
            count: itemToRemove.count - 1, // 수량 감소
          };
        }
      }

      this.items = updatedItems; // 업데이트된 카트 상태 리턴
    }
  },
  getters: {
    // 카트에 들어 있는 모든 아이템을 반환
    getCartItems: (state) => state.items
  }
});
