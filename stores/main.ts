export const useMainStore = defineStore("mainStore", () => {
  const currentPathName = ref<string>();

  // login user info
  const userName = ref<string>();
  const userEmail = ref<string>();
  const userImage = ref<string>();

  // auth user info
  const authUserInfo = ref<[]>([]);

  return {
    currentPathName,
    userName,
    userEmail,
    userImage,
    authUserInfo,
  };
});
