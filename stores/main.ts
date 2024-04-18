export const useMainStore = defineStore("mainStore", () => {
  const currentPathName = ref<string>();
  const userName = ref<string>();
  const userEmail = ref<string>();
  const userImage = ref<string>();

  return {
    currentPathName,
    userName,
    userEmail,
    userImage,
  };
});
