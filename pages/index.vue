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
    <Button label="Check" icon="pi pi-check" />
    <AppAlert> This is an auto-imported component </AppAlert>
    <!-- <button @click="enableCustomLayout">Update layout</button> -->
    <p>{{ data?.hello }}</p>
    <NuxtLink to="/about">About page</NuxtLink>
  </div>
</template>

<style lang="scss">
  @use "~/assets/scss/main.scss";
  h1 {
    color: $primary;
  }
</style>
