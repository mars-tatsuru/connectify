<script setup lang="ts">
  const props = defineProps<{
    title: string;
  }>();
</script>

<template>
  <h1>{{ props.title }}</h1>
</template>

<style scoped lang="scss">
  h1 {
    font-size: 30px;
    color: $primary;
  }
</style>
