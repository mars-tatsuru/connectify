export const useMainStore = defineStore("mainStore", () => {
  const currentPathName = ref<string>();
  const userName = ref<string>();

  return {
    userName,
    currentPathName,
  };
});
