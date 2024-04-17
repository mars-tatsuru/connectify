<script setup lang="ts">
  const supabase = useSupabaseClient();
  import { getUserInfoOfGoogle } from "@/utils/operationUserInfo";
  const store = useMainStore();
  const router = useRouter();
  const route = useRoute();

  type BreadcrumbItem = { icon?: string; label?: string; route?: string };

  const home = ref<BreadcrumbItem>({
    icon: "pi pi-home",
    route: "/",
  });
  const breadcrumbItem = ref<BreadcrumbItem[]>([]);

  watch(
    () => store.currentPathName,
    (newVal) => {
      breadcrumbItem.value = [];
      if (!newVal) return;
      const paths = newVal.split("/");

      paths.forEach((path, index) => {
        if (path === "") return;
        breadcrumbItem.value?.push({
          label: path,
        });
      });
    }
  );

  const profileCardDisplayFlag = ref<boolean>(false);
  const clickProfileIcon = () => {
    profileCardDisplayFlag.value = !profileCardDisplayFlag.value;
  };
  const signOutWithGoogle = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  let userName = ref<string>("");
  let userEmail = ref<string>("");
  let userImage = ref<string>("");

  onMounted(() => {
    getUserInfoOfGoogle(supabase).then((res: any) => {
      userName.value = res.userName.value;
      userEmail.value = res.userEmail.value;
      userImage.value = res.userImage.value;
    });

    // for breadcrumb
    const paths = route.path.split("/").filter((path) => path !== "");
    console.log(paths);
    paths.forEach((path) => {
      breadcrumbItem.value?.push({
        label: path,
      });
    });
  });
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <Breadcrumb class="breadCrumb" :home="home" :model="breadcrumbItem">
        <template #item="{ item, props }">
          <NuxtLink
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a :href="href" v-bind="props.action" @click="navigate">
              <span :class="[item.icon, 'text-color']" class="home-icon" />
              <span class="text-primary font-semibold">{{ item.label }}</span>
            </a>
          </NuxtLink>
          <a
            v-else
            :href="item.url"
            :target="item.target"
            v-bind="props.action"
          >
            <span class="text-color-primary">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
      <div class="user-icon" @click="clickProfileIcon">
        <img :src="userImage" alt="user" />
      </div>
      <Transition name="slide-down-up">
        <div v-if="profileCardDisplayFlag" class="card">
          <div class="card-inner">
            <div class="card-inner__top">
              <div class="card-inner__top-left">
                <div class="picture">
                  <NuxtImg :src="userImage" alt="user" />
                </div>
              </div>
              <div class="card-inner__top-right">
                <div class="name">
                  <p>{{ userName }}</p>
                </div>
                <div class="email">
                  <p>{{ userEmail }}</p>
                </div>
              </div>
            </div>
            <span class="separate-line"></span>
            <div class="card-inner__bottom">
              <button class="button" type="button" @click="signOutWithGoogle">
                setting
              </button>
              <button
                class="button logout"
                type="button"
                @click="signOutWithGoogle"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style lang="scss">
  .header {
    width: calc(100% - 250px);
    position: fixed;
    top: 0;
    right: 0;
    border: 1px solid $borderColor;
    border-left: none;
    background-color: #fff;

    &-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 20px;

      .breadCrumb {
        height: 100%;
        padding: 0;

        .home-icon {
          color: $iconColor;
        }
      }

      .user-icon {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid $borderColor;
        border-radius: 50%;
        width: 35px;
        height: 35px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .card {
        position: absolute;
        z-index: 100;
        top: 50px;
        right: 30px;
        border-radius: 5px;
        border: 1px solid $borderColor;
        background-color: #fff;
        width: 300px;

        &-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px;

          .card-inner__top {
            display: flex;
            align-items: center;
            width: 100%;

            .card-inner__top-left {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 10px;

              .picture {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 1px solid $borderColor;

                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }
            }

            .card-inner__top-right {
              display: flex;
              flex-direction: column;
              justify-content: center;

              .name {
                p {
                  font-size: 14px;
                  font-weight: 600;
                  margin: 0;
                }
              }

              .email {
                p {
                  font-size: 12px;
                  margin: 0;
                }
              }
            }
          }

          .separate-line {
            width: 100%;
            height: 1px;
            background-color: $borderColor;
            margin: 10px 0;
          }

          .card-inner__bottom {
            display: flex;
            gap: 10px;

            .button {
              width: 100px;
              padding: 5px 0;
              border: none;
              border-radius: 5px;
              background-color: $primary;
              color: #fff;
              cursor: pointer;
              font-size: 12px;

              &.logout {
                border: 1px solid $dangerColor;
                background-color: transparent;
                color: $dangerColor;
              }
            }
          }
        }
      }
    }

    .text-color-primary {
      color: $primary;
    }
  }
</style>
