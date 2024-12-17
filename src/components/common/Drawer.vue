<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { CATEGORY, MENUS } from '../../constants/category';

const router = useRouter();

const goToPage = (id) => {
  router.push(`/${id}`); // '/about' 페이지로 이동
};
</script>

<template>
    <div class="drawer-side z-10">
      <label for="side-menu" class="drawer-overlay"></label>
      <ul class="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white min-h-full dark:bg-base-100">
        <li>
          <label for="side-menu" @click="goToPage(CATEGORY.FASHION)" class="!text-gray-700 active:!text-white dark:!text-white">
            {{MENUS.FASHION}}
          </label>
        </li>
        <li>
          <label for="side-menu" @click="goToPage(CATEGORY.ACCESSORY)" class="!text-gray-700 active:!text-white dark:!text-white">
            {{MENUS.ACCESSORY}}
          </label>
        </li>
        <li>
          <label for="side-menu" @click="goToPage(CATEGORY.DIGITAL)" class="!text-gray-700 active:!text-white dark:!text-white">
            {{MENUS.DIGITAL}}
          </label>
        </li>
      </ul>
    </div>
</template>
