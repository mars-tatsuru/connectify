<script setup lang="ts">
  import type { News } from "@/types/microcms";

  const props = defineProps<{
    news: { data: News[] };
  }>();
</script>

<template>
  <ul class="news-list">
    <li v-for="item in props.news.data">
      <h2>{{ item.title }}</h2>
      <p>{{ item.content }}</p>
    </li>
  </ul>
</template>
