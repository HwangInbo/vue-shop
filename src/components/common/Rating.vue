<template>
    <div class="flex items-center mt-3">
      <div class="rating rating-half">
        <!-- 별점 렌더링 -->
        <input
          v-for="index in 10"
          :key="'rating' + index"
          type="radio"
          name="rating-10"
          class="bg-yellow-400 cursor-default mask mask-star-2"
          :class="index % 2 === 0 ? 'mask-half-2' : 'mask-half-1'"
          disabled
          :checked="index <= rate * 2"
        />
      </div>
      <div class="ml-2">
        {{ rate }} / {{ count }} 참여
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Rating',
    props: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  };
  </script>
  
  <style scoped>
  /* 여기에 컴포넌트 스타일 추가 */
  </style>
  