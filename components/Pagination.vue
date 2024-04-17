<script setup lang="ts">
  const props = defineProps<{
    totalCount: number;
    offset: number;
  }>();

  const PER_PAGE = 5;
  const pageCount = Math.ceil(props.totalCount / PER_PAGE);

  const emit = defineEmits(["pageClick"]);

  const handleClick = (index: number) => {
    emit("pageClick", index);
  };
</script>

<template>
  <div class="pagination">
    <button
      class="pagination-item prev"
      :class="{ disabled: offset === 0 }"
      @click="handleClick(1)"
    >
      <Icon name="ep:arrow-left" color="black" />
    </button>
    <button
      v-for="index in pageCount"
      @click="handleClick(index)"
      :key="index"
      class="pagination-item"
    >
      {{ index }}
    </button>
    <button
      class="pagination-item next"
      :class="{ disabled: offset >= totalCount - PER_PAGE }"
      @click="handleClick(pageCount)"
    >
      <Icon name="ep:arrow-right" color="black" />
    </button>
  </div>
</template>

<style scoped lang="scss">
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    &-item {
      width: 30px;
      height: 30px;
      margin: 0 5px;
      border: 1px solid $borderColor;
      border-radius: 5px;
      background-color: #fff;
      cursor: pointer;

      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }
</style>
