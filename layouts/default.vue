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
    padding: 65px 20px 0 270px;
    min-height: 100vh;
    background-color: $bgColor;
  }
</style>
