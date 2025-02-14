import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);

const setToken = (val) => {
    token.value = val;
}
  const resetToken = () => {
    token.value = null;
    localStorage.removeItem("token");
  };
  const getToken = () => {
    // see if set in this store
    if (token?.value != null) {
       localStorage.setItem("token", token.value);
      return token.value;
    }
    // if not in store, check localStorage
    var l = localStorage.getItem("token");
    if (l != null) {
      token.value = l;
      return l;
    }
    // nothing found, let axios interceptor handle 401 and 403
    return null;
  };



  return {
    setToken,
    getToken,
    resetToken,
  };
});
