<script setup lang="ts">
  const mainMenu = ref([
    {
      separator: true,
    },
    {
      // label: "Menu",
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
          shortcut: "⌘+S",
          route: "/",
        },
        // {
        //   label: "Video Trimming",
        //   icon: "pi pi-info-circle",
        //   shortcut: "⌘+S",
        //   route: "/edit",
        // },
        // {
        //   label: "Summary History",
        //   icon: "pi pi-server",
        //   shortcut: "⌘+S",
        //   route: "/history",
        // },
        {
          label: "Chat",
          icon: "pi pi-comments",
          shortcut: "⌘+S",
          route: "/chat",
        },
        {
          label: "Interview",
          icon: "pi pi-whatsapp",
          shortcut: "⌘+S",
          route: "/interview",
        },
        {
          label: "Documents",
          icon: "pi pi-file",
          shortcut: "⌘+S",
          route: "/documents",
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
    // {
    //   label: "Logout",
    //   icon: "pi pi-sign-out",
    //   route: "/logout",
    // },
  ]);

  const store = useMainStore();

  const route = useRoute();
  const router = useRouter();
  const currentPath = ref<string>(route.path);

  // ボタンを押したあと、遷移したページのpathを取得
  router.afterEach((to, from) => {
    currentPath.value = to.path;
    store.currentPathName = to.path;
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
    border: 1px solid $borderColor;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;

    &-top {
      width: 100%;
      border: 0;

      .logo {
        display: flex;
        align-items: center;
        width: 100%;
        color: $iconColor;
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
          color: $primary;
        }
      }

      &__item {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        color: $iconColor;
        text-decoration: none;

        i {
          margin-right: 5px;
        }

        &.active {
          background-color: $bgColor;
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
