<script setup>
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <section class="drawer-content">
    <Nav />
    <section class="main pt-16">
      <router-view />
    </section>
    <Footer />
  </section>
</template>
