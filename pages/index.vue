<script setup lang="ts">
  // function enableCustomLayout() {
  //   setPageLayout("custom");
  // }
  // definePageMeta({
  //   layout: false,
  // });

  const { data } = await useFetch("/api/test");
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>

<style lang="scss">
  @use "~/assets/scss/main.scss";
  h1 {
    color: $primary;
  }
</style>
