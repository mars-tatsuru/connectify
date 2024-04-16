<script setup lang="ts">
  import type { TheNews } from "#build/components";
  import MainTitle from "@/components/shared/MainTitle.vue";
  import type { News } from "@/types/microcms";

  type NewsData = {
    data: News[];
  };

  const newsData = ref<NewsData | null>(null);
  const { data } = await useFetch("/api/microcms");
  newsData.value = data.value as NewsData;
</script>

<template>
  <div class="main">
    <div class="news">
      <MainTitle title="News" />
      <TheNews :news="newsData" />
    </div>
  </div>
</template>

<style lang="scss"></style>
