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
    padding: 60px 0 0 270px;
  }
</style>
