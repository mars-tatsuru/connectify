<script setup lang="ts">
  // function enableCustomLayout() {
  //   setPageLayout("custom");
  // }
  // definePageMeta({
  //   layout: false,
  // });
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert> This is an auto-imported component </AppAlert>
    <!-- <button @click="enableCustomLayout">Update layout</button> -->
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>

<style lang="scss">
  @use "~/assets/scss/main.scss";
  h1 {
    color: $primary;
  }
</style>
