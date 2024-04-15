<script setup lang="ts">
  import MainTitle from "@/components/shared/MainTitle.vue";

  type News = {
    title: string;
    content: string;
  };

  const newsData = ref();

  onMounted(async () => {
    const { data } = await useMicroCMSGetList<News>({
      endpoint: "news",
    });

    newsData.value = data;
  });
</script>

<template>
  <div class="main">
    <div class="news">
      <MainTitle title="News" />
      <!-- <ul>
        <li v-for="item in newsData.contents" :key="item.id">
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<style lang="scss"></style>
