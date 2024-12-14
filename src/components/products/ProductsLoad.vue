<template>
  <!-- limit이 0보다 클 때만 v-for 반복문이 실행되도록 설정 -->
  <div v-for="(elm, index) in limit > 0 ? Array(limit) : []" :key="index" 
       :class="['card bordered animate-pulse', variant === 'items' ? 'mt-3' : '']">
    <div :class="['rounded bg-gray-100', variant === 'items' ? 'h-96' : 'h-80']">
      <!-- 여기에 추가적인 스타일이나 내용이 들어갈 수 있습니다 -->
    </div>

    <!-- variant가 "items"일 때는 상세 로딩 UI 출력 -->
    <div v-if="variant === 'default'" class="card-body">
      <div class="space-y-4">
        <div class="h-6 bg-gray-100 rounded"></div>
        <div class="h-6 bg-gray-100 rounded w-5/6"></div>
        <div class="h-6 bg-gray-100 rounded w-1/4"></div>
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    name: 'ProductsLoad',
    props: {
      limit: {
        type: Number,
        required: true,
      },
      variant: {
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'items'].includes(value);
        },
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* 로딩 스타일에 대한 커스터마이징이 가능하다면 여기에서 추가 */
  </style>
  