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
    padding: 60px 20px 0 270px;
    min-height: 100vh;
    background-color: #f0f2fa;
  }
</style>
