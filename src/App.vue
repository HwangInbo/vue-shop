<script setup>
import Nav from "./components/layout/Nav.vue";
import Footer from "./components/layout/Footer.vue";
import Drawer from "./components/common/Drawer.vue";
</script>

<template>
  <input type="checkbox" id="side-menu" class="drawer-toggle" />
  <section class="drawer-content">
    <Nav />
    <section class="main pt-16">
      <router-view :key="$route.fullPath"/>
    </section>
    <Footer />
  </section>
  <Drawer />
</template>
