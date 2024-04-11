<script setup lang="ts">
  import { routerKey } from "vue-router";

  const mainMenu = ref([
    {
      separator: true,
    },
    {
      label: "Menu",
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          shortcut: "⌘+N",
          route: "/",
        },
        {
          label: "About",
          icon: "pi pi-info-circle",
          shortcut: "⌘+S",
          route: "/about",
        },
      ],
    },
  ]);

  const bottomMenu = ref([
    {
      label: "Settings",
      icon: "pi pi-cog",
      route: "/settings",
    },
  ]);

  const route = useRoute();
  const router = useRouter();

  const currentPath = ref<string>(route.path);

  // ボタンを押したあと、遷移したページのpathを取得
  router.afterEach((to, from) => {
    currentPath.value = to.path;
  });
</script>

<template>
  <div class="sidebar">
    <Menu :model="mainMenu" class="sidebar-top">
      <template #start>
        <div class="logo">
          <i class="pi pi-fw pi-sitemap logo-img" />
          <span>Connectify</span>
        </div>
      </template>
      <template #item="{ item, props }">
        <NuxtLink
          v-if="item.route"
          class="sidebar-top__item"
          :to="item.route"
          :class="{ active: currentPath === item.route }"
        >
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </template>
    </Menu>
    <div class="sidebar-bottom">
      <Menu :model="bottomMenu" class="p-menu-end">
        <template #item="{ item, props }">
          <NuxtLink
            v-if="item.route"
            class="sidebar-top__item"
            :to="item.route"
            :class="{ active: currentPath === item.route }"
          >
            <i :class="item.icon" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </template>
      </Menu>
    </div>
  </div>
</template>

<style lang="scss">
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    padding: 1rem 0.5rem;
    border: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-top {
      width: 100%;
      border: 0;

      .logo {
        display: flex;
        align-items: center;
        width: 100%;
        color: #334155;
        text-decoration: none;
        margin-bottom: 20px;
        padding: 0.2rem 1rem;

        &-img {
          font-size: 30px;
          margin-right: 5px;
        }

        span {
          font-size: 20px;
          font-weight: 600;
        }
      }

      &__item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        color: #334155;
        text-decoration: none;

        i {
          margin-right: 5px;
        }

        &.active {
          background-color: #f0f0f0;
          border-radius: 2px;
        }
      }
    }

    &-bottom {
      width: 100%;

      .p-menu {
        border: 0;
      }
    }
  }
</style>
