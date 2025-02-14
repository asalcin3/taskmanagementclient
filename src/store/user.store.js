import { ref } from "vue";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
    const usersList = ref([]);
    const fillUsersData = (data) => {
        usersList.value = data;
    }
    return {
        usersList,
        fillUsersData
    }
});