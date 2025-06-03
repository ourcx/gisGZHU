import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
    const location = ref(true)
    return { location}
})