<script setup>
import { computed, defineProps } from 'vue';
import { Category } from '../../constants/category';

const props = defineProps({
  category: String,
  crumb: String,
});

// Category를 해결하여 표시할 텍스트 계산
const resolveCategory = computed(() => {
  return Category[props.category] || props.category;
});
</script>

<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li>{{ resolveCategory }}</li>
      <li>{{ crumb }}</li>
    </ul>
  </div>
</template>
