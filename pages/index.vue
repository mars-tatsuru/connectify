<script setup lang="ts">
  import MainTitle from "@/components/shared/MainTitle.vue";

  type News = {
    title?: string;
    content?: string;
  };

  const news = ref<any>(null);

  const fetchData = async () => {
    const { data } = await useMicroCMSGetList<News>({
      endpoint: "news",
      queries: { limit: 10 },
    });

    news.value = data;
  };

  const { data } = await useMicroCMSGetList<News>({
    endpoint: "news",
    queries: { limit: 10 },
  });

  onMounted(async () => {
    fetchData();
    console.log(news);
  });

  // import type { MicroCMSImage } from "microcms-js-sdk";
  // type Blog = {
  //   title: string;
  //   eyecatch: MicroCMSImage;
  // };
  // const queries = reactive({
  //   q: "",
  //   fields: ["id", "title", "eyecatch"],
  // });
  // const { data: blogs, refresh } = await useMicroCMSGetList<Blog>({
  //   endpoint: "news",
  //   queries,
  // });
  // watch(queries, () => {
  //   refresh();
  // });
</script>

<template>
  <div class="main">
    <div class="news">
      <MainTitle title="News" />
      <ul>
        <li v-for="item in news?.contents" :key="item.id">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss"></style>

<!-- <template>
  <input type="text" v-model="queries.q" />
</template>
<script setup lang="ts">
  import type { MicroCMSImage } from "microcms-js-sdk";
  type Blog = {
    title: string;
    eyecatch: MicroCMSImage;
  };
  const queries = reactive({
    q: "",
    fields: ["id", "title", "eyecatch"],
  });
  const { data: blogs, refresh } = await useMicroCMSGetList<Blog>({
    endpoint: "news",
    queries,
  });
  watch(queries, () => {
    refresh();
  });
</script> -->
