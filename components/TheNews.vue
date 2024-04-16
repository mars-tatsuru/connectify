<script setup lang="ts">
  import type { News } from "@/types/microcms";
  import MainTitle from "@/components/shared/MainTitle.vue";

  type NewsData = {
    data: News;
  };

  // fetch news data
  const newsData = ref<NewsData | null>(null);
  const offset = ref(0);

  // pagination logic
  const emit = defineEmits(["pageClick"]);
  const onPageChange = (index: number) => {
    offset.value = (index - 1) * 5;
  };

  // api fetch
  const fetchNews = async () => {
    const { data } = await useFetch("/api/microcms", {
      params: {
        endpoint: "news",
        limit: 5,
        offset: offset.value,
      },
    });
    newsData.value = data.value as NewsData;
  };

  // watch offset
  watch(offset, async () => {
    await fetchNews();
  });

  // Initial fetch
  await fetchNews();
</script>

<template>
  <div class="news">
    <MainTitle title="News" />
    <ul class="news-list">
      <li v-for="item in newsData?.data.contents" class="news-list__item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </li>
    </ul>
    <Pagination
      :total-count="newsData?.data.totalCount"
      @page-click="onPageChange"
    />
  </div>
</template>

<style scoped lang="scss">
  .news {
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;

    .news-list {
      list-style: none;
      margin: 0;
      padding: 0;

      &__item {
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;

        h2 {
          margin: 0;
          font-size: 18px;
          margin-bottom: 5px;
        }

        p {
          margin: 0;
          font-size: 15px;
        }
      }
    }
  }
</style>
