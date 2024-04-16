<script setup lang="ts">
  const props = defineProps<{
    sender?: boolean;
  }>();
</script>

<template>
  <div class="chat-card" :class="{ 'position-left': !props.sender }"></div>
</template>

<style scoped lang="scss">
  .chat-card {
    width: 45%;
    min-width: 400px;

    &.position-left {
      margin: 0 0 0 auto;
    }

    .chat-card__header {
      display: flex;
      align-items: center;
      gap: 1rem;

      .name {
        font-weight: 500;
      }
    }

    .text {
      margin: 0;
    }
  }
</style>
