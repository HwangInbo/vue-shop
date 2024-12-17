import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light', // 초기화 시 localStorage 값 사용
  }),
  actions: {
    changeTheme(newTheme) {
      this.theme = newTheme; // 상태 업데이트
      localStorage.setItem('theme', newTheme); // localStorage에 저장
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'theme', // 로컬스토리지에 저장될 key 이름
        storage: localStorage,
        // theme만 로컬스토리지에 저장
        paths: ['theme'], // persist에서 state의 'theme' 속성만 저장
      },
    ],
  },
});
