// store/products.js
import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    isLoading: false,
    isLoaded: false, // 데이터가 로드되었는지 여부 확인
  }),
  actions: {
    async fetchProducts() {
      if (this.isLoaded) return; // 이미 로드된 데이터가 있으면 다시 요청하지 않음
      this.isLoading = true;
      try {
        const response = await fetch('/products.json');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        this.products = data;
        this.isLoaded = true; // 데이터가 로드됨
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
