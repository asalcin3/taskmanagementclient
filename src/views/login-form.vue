<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <dx-form :form-data="formData" :disabled="loading">
      <dx-item
        data-field="username"
        editor-type="dxTextBox"
        :editor-options="{ stylingMode: 'filled', placeholder: 'Username', mode: 'username' }"
      >
        <dx-required-rule message="Username is required" />
        <dx-email-rule message="Username is invalid" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field='password'
        editor-type='dxTextBox'
        :editor-options="{ stylingMode: 'filled', placeholder: 'Password', mode: 'password' }"
      >
        <dx-required-rule message="Password is required" />
        <dx-label :visible="false" />
      </dx-item>
      <dx-item
        data-field="rememberMe"
        editor-type="dxCheckBox"
        :editor-options="{ text: 'Remember me', elementAttr: { class: 'form-text' } }"
      >
        <dx-label :visible="false" />
      </dx-item>
      <dx-button-item>
        <dx-button-options
          width="100%"
          type="default"
          template="signInTemplate"
          :use-submit-behavior="true"
        >
        </dx-button-options>
      </dx-button-item>
      <dx-item>
        <template #default>
          <div class="link">
            <router-link to="/reset-password">Forgot password?</router-link>
          </div>
        </template>
      </dx-item>
      <dx-button-item>
        <dx-button-options
          text="Create an account"
          width="100%"
          :on-click="onCreateAccountClick"
        />
      </dx-button-item>
      <template #signInTemplate>
        <div>
          <span class="dx-button-text">
            <dx-load-indicator v-if="loading" width="24px" height="24px" :visible="true" />
            <span v-if="!loading">Sign In</span>
          </span>
        </div>
      </template>
    </dx-form>
  </form>
</template>

<script>
import DxLoadIndicator from "devextreme-vue/load-indicator";
import DxForm, {
  DxItem,
  DxEmailRule,
  DxRequiredRule,
  DxLabel,
  DxButtonItem,
  DxButtonOptions
} from "devextreme-vue/form";
import notify from 'devextreme/ui/notify';

import { useAuthStore } from "@/store/auth.store";
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthenticateService from "@/services/authenticate.service";
export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const formData = reactive({
      username:"",
      password:""
    });
    const loading = ref(false);

    function onCreateAccountClick() {
      router.push("/create-account");
    }

    async function onSubmit() {
      const { username, password } = formData;
      loading.value = true;
      const result = await AuthenticateService.login(username, password);
      if (result.status === 200) {
        authStore.setToken(result.data.token);
        loading.value = false;
        router.push("/tasks");
      } else {
        notify(result.message, "error", 2000);
       
      }
    }

    return {
      formData,
      loading,
      onCreateAccountClick,
      onSubmit
    };
  },
  components: {
    DxLoadIndicator,
    DxForm,
    DxEmailRule,
    DxRequiredRule,
    DxItem,
    DxLabel,
    DxButtonItem,
    DxButtonOptions
  }
};
</script>

<style lang="scss">
.login-form {
  .link {
    text-align: center;
    font-size: 16px;
    font-style: normal;

    a {
      text-decoration: none;
    }
  }

  .form-text {
    margin: 10px 0;
    color: var(--base-text-color-alpha-7);
  }
}
</style>
