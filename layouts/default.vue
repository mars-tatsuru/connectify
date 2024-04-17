<script setup lang="ts"></script>

<template>
  <AppHeader />
  <div class="container">
    <slot />
  </div>
  <AppSidebar />
</template>

<style scoped lang="scss">
  .container {
    padding: 65px 10px 0 260px;
    min-height: 100vh;
    background-color: $bgColor;
  }
</style>
