<script setup lang="ts">
  // import "primevue/resources/themes/aura-light-green/theme.css";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
  // .page-enter-active,
  // .page-leave-active {
  //   transition: all 0.4s;
  // }
  // .page-enter-from,
  // .page-leave-to {
  //   opacity: 0;
  //   filter: blur(1rem);
  // }

  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.4s;
  }
  .layout-enter-from,
  .layout-leave-to {
    filter: grayscale(1);
  }
</style>
