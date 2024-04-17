<script setup lang="ts">
  import type { News } from "@/types/microcms";
  import MainTitle from "@/components/shared/MainTitle.vue";
  import { createClient } from "microcms-js-sdk";

  /******************************************
   * use for fetch data in backend
   *****************************************/
  // type NewsData = {
  //   data: News;
  // };

  /******************************************
   * use for fetch data in frontend
   *****************************************/
  type NewsData = {
    contents: [
      {
        id: string;
        title: string;
        content: string;
        createdAt: string;
        publishedAt: string;
        revisedAt: string;
        updatedAt: string;
      }
    ];
    totalCount: number;
    offset: number;
    limit: number;
  };

  /******************************************
   * variables
   *****************************************/
  // fetch news data
  const newsData = ref<NewsData | null>(null);
  const offset = ref(0);

  // pagination logic
  const emit = defineEmits(["pageClick"]);
  const onPageChange = (index: number) => {
    offset.value = (index - 1) * 5;
  };

  /******************************************
   * Fetch news data from microCMS in backend
   *****************************************/
  // const fetchNews = async () => {
  //   const { data } = await useFetch("/api/microcms", {
  //     params: {
  //       endpoint: "news",
  //       limit: 5,
  //       offset: offset.value,
  //     },
  //   });
  //   newsData.value = data.value as NewsData;
  // };

  // // watch offset
  // watch(offset, async () => {
  //   await fetchNews();
  // });

  // // Initial fetch
  // await fetchNews();

  /******************************************
   * Fetch news data from microCMS in frontend
   *****************************************/
  const runtimeConfig = useRuntimeConfig();
  const client = createClient({
    serviceDomain: runtimeConfig.public.microcms.domain,
    apiKey: runtimeConfig.public.microcms.api.key,
  });

  // fetch data function
  const fetchData = async () => {
    try {
      const res = await client.get({
        endpoint: "news",
        queries: {
          limit: 5,
          offset: offset.value,
        },
      });

      newsData.value = res as NewsData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // initial fetch
  await fetchData();

  watch(offset, async () => {
    await fetchData();
  });
</script>

<template>
  <div class="news">
    <MainTitle class="title" title="News" />
    <ul class="news-list">
      <li v-for="item in newsData?.contents" class="news-list__item">
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
      </li>
    </ul>
    <Pagination
      :total-count="newsData?.totalCount!"
      :offset="offset"
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

    .title {
      margin-bottom: 20px;
    }

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
