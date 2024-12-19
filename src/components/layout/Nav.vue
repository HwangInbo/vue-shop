<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useCartStore } from "../../store/cart";
import { useProductsStore } from "../../store/products";
import { useTheme } from "../../store/theme";
import CONSTANTS from "../../constants/constansts";
import { useRouter } from "vue-router";
// 라우터 사용 선언 @@@
const router = useRouter();
const { ARROW_DOWN, ARROW_UP, ENTER } = CONSTANTS.KEY;
// 상태 관리
const themeStore = useTheme();
const isChecked = ref(themeStore.theme === "dark");
const productsStore = useProductsStore();
const allItems = computed(() => cartStore.getItemsWithIdAndCount);

const cartStore = useCartStore()
// 모든 아이템의 id와 count만 가져오기
const searchQuery = ref("");
const isInputVisible = ref(false);

// @@ 추가된 상태
const selectedIndex = ref(-1); // 선택된 인덱스를 저장 @@

// totalCount를 computed로 계산
const totalCount = computed(() => {
  return allItems.value.reduce((acc, item) => acc + item.count, 0);
});

// 테마 변경 함수
const handleChange = () => {
  isChecked.value = !isChecked.value
  const newTheme = isChecked.value ? "dark" : "light";
  
  themeStore.changeTheme(newTheme); // Pinia store 업데이트
};
watch(
  () => themeStore.theme,
  (newTheme) => {
    const html = document.documentElement;
    html.setAttribute("data-theme", newTheme);
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  },
  { immediate: true } // 초기화 시 즉시 실행
);
// 필터링된 제품 데이터 계산
onMounted(() => {
  if (!productsStore.products.length) {
    productsStore.fetchProducts(); // 상태가 비어있을 때만 호출
  }
});

const filteredDocs = computed(() => {
  // 검색어가 비어 있으면 전체 제품 반환
  if (!searchQuery.value.trim()) {
    return [];
  }
  // 검색어와 제품 제목을 비교 (대소문자 구분 없음)
  return productsStore.products.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const toggleInputVisibility = () => {
  isInputVisible.value = !isInputVisible.value
}
const searchClear = () => {
  searchQuery.value = "";
  isInputVisible.value = !isInputVisible.value
  selectedIndex.value = -1; // 선택 초기화 @@
}

function handleKey(event) {
  // @@ 기존의 this 참조 제거 및 상태 업데이트 방식 변경
  switch (event.key) {
    case ARROW_DOWN:
      if (selectedIndex.value < filteredDocs.value.length - 1) {
        selectedIndex.value++; // 인덱스 증가 @@
      } else {
        selectedIndex.value = 0; // 순환 @@
      }
      break;

    case ARROW_UP:
      if (selectedIndex.value > 0) {
        selectedIndex.value--; // 인덱스 감소 @@
      } else {
        selectedIndex.value = filteredDocs.value.length - 1; // 순환 @@
      }
      break;

    case ENTER:
      if (selectedIndex.value !== -1) {
        const selectedDoc = filteredDocs.value[selectedIndex.value]; // 선택된 요소 @@
        router.push(`/product/${selectedDoc.id}`);
        searchClear();
      }
      break;

    default:
      break;
  }
}
</script>

<template>
  <div class="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
    <div class="flex w-full xl:container xl:m-auto">
      <!-- 사이드 메뉴 버튼 -->
      <label for="side-menu" class="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <!-- 로고 -->
      <h1 class="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
        <router-link to="/" class="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap">
          Vue Shop
        </router-link>
      </h1>
      <!-- 네비게이션 -->
      <div class="flex-none hidden md:flex md:flex-1 ml-2">
        <router-link to="/fashion" class="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
          패션
        </router-link>
        <router-link to="/accessory" class="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
          액세서리
        </router-link>
        <router-link to="/digital" class="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white">
          디지털
        </router-link>
      </div>
      <!-- 테마 토글 및 검색 -->
      <div class="flex items-center px-2">
        <label class="swap swap-rotate mr-2 sm:mr-4">
          <input type="checkbox" :checked="isChecked" @change="handleChange" />
          <svg
            class="swap-on fill-white w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            ></path>
          </svg>
          <svg
            class="swap-off fill-black w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            ></path>
          </svg>
        </label>
        <div class="dropdown">
          <button
            type="button"
            class="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
            @click="toggleInputVisibility"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 stroke-gray-700 dark:stroke-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            placeholder="검색"
            class="fixed left-0 top-4 -z-10 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput"
            :class="{ 'translate-y-full !opacity-100': isInputVisible, '-z-10': !isInputVisible }"
            v-model="searchQuery"
            @keyup="handleKey"
          />
          <ul
            v-if="filteredDocs.length > 0"
            class="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-600"
          >
            <li 
              v-for="(doc, index) in filteredDocs" 
              :key="doc.id" 
              class="cursor-pointer"
            >
              <!-- @@ selectedIndex 를 비교하여 class 추가 -->
              <router-link 
                :to="`/product/${doc.id}`"
                :class="{ 'arrow': index === selectedIndex }" 
                @click="searchClear"
              >
                <span class="text-gray-600 dark:text-white line-clamp-2">{{ doc.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/cart" class="btn btn-ghost w-10 sm:w-12 ml-1">
          <span class="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 stroke-gray-700 dark:stroke-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
            <span
              class="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2"
            >
              {{ totalCount }}
            </span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.arrow {
  background-color: var(--fallback-bc, oklch(var(--bc) / 0.1));
}
</style>