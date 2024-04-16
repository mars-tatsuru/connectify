<script setup lang="ts">
  const store = useMainStore();

  type BreadcrumbItem = { icon?: string; label?: string; route?: string };

  const home = ref<BreadcrumbItem>({
    icon: "pi pi-home",
    route: "/",
  });

  const items = ref<BreadcrumbItem[]>([]);

  watch(
    () => store.currentPathName,
    (newVal) => {
      items.value = [];
      if (!newVal) return;
      const paths = newVal.split("/");

      paths.forEach((path, index) => {
        if (path === "") return;
        items.value?.push({
          label: path,
        });
      });
    }
  );
</script>

<template>
  <header>
    <Breadcrumb class="breadCrumb" :home="home" :model="items">
      <template #item="{ item, props }">
        <NuxtLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="[item.icon, 'text-color']" />
            <span class="text-primary font-semibold">{{ item.label }}</span>
          </a>
        </NuxtLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span class="text-color-primary">{{ item.label }}</span>
        </a>
      </template>
    </Breadcrumb>
  </header>
</template>

<style scoped lang="scss">
  header {
    width: calc(100% - 250px);
    height: 50px;
    position: fixed;
    top: 0;
    right: 0;
    border: 1px solid #e0e0e0;
    border-left: none;
    background-color: #fff;

    .breadCrumb {
      height: 100%;
    }

    .text-color-primary {
      color: $primary;
    }
  }
</style>
