<script setup>
import "./assets/css/tailwind.css";
// import Nav from './components/layout/Nav.vue';
// import Router from './router/router';
// import Footer from './components/layout/Footer.vue';
// import Drawer from './components/common/Drawer.vue';
</script>

<template>
  <BrowserRouter>
    <input type="checkbox" id="side-menu" class="drawer-toggle" />
    <section class="drawer-content">
      <!-- Nav를 렌더링 -->
      <Nav />
      <section class="main pt-16">
        <!-- Router를 렌더링 -->
        <Router />
      </section>
      <!-- Footer를 렌더링 -->
      <Footer />
    </section>
    <!-- Drawer를 렌더링 -->
    <Drawer />
  </BrowserRouter>
</template>

