<script setup>
import Breadcrumb from '../components/common/Breadcrumb.vue'; // Breadcrumb 컴포넌트 가져오기
import ItemList from '../components/products/ItemList.vue'; // ItemList 컴포넌트 가져오기
import { MENUS } from '../constants/category'; // MENUS 가져오기 (카테고리 목록에 사용)
</script>

<template>
  <section class="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
    <!-- Breadcrumb 컴포넌트 사용, category와 crumb 전달 -->
    <Breadcrumb :category="MENUS.HOME" :crumb="MENUS.ACCESSORY" />
    
    <article class="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
      <!-- ItemList 컴포넌트 사용 -->
      <ItemList :category="MENUS.ACCESSORY" />
    </article>
  </section>
</template>
