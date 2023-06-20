<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view />
</template>

<style scoped>
/* 字体抗锯齿, 让字体看起来更清晰 */
#app {
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  color: #2c3e50;
  font-size: 14px;
}
</style>
