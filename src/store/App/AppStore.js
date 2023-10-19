import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAppStore = defineStore("AppStore", () => {
  const loadingStatus = ref(false);

  const getLoadingStatus = computed(() => loadingStatus.value);

  function setLoadingStatus(value) {
    loadingStatus.value = value;
  }

  return { loadingStatus, getLoadingStatus, setLoadingStatus };
});
