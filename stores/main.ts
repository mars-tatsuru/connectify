export const useMainStore = defineStore("mainStore", () => {
  const currentPathName = ref<string>();

  return {
    currentPathName,
  };
});
