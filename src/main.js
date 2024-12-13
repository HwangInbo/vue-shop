import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Vue Router 가져오기

const app = createApp(App);

app.use(router); // Router 등록
app.mount('#app');
