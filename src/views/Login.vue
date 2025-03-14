<template>
  <div class="auth-container">
    <AuthForm :loading="loading" mode="login" @submit="handleLogin" />
    <p>
      Don't have an account?
      <router-link to="/signup" class="link"><u>Sign Up</u></router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth"; // Import the auth store
import AuthForm from "@/components/Auth/AuthForm.vue";
import { login } from "@/api/authServices";

const api_base = process.env.VUE_APP_API_BASE_URL;
const api_login_url = api_base + "auth/login";

export default defineComponent({
  name: "Login",
  components: { AuthForm },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const authStore = useAuthStore(); // Call the store inside setup
    const { appContext } = getCurrentInstance()!;

    // Utility function to show toast notifications
    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    const handleLogin = async (data: {
      username: string;
      password: string;
    }) => {
      loading.value = true;
      try {
        const response = await login(api_login_url, data);
        console.log("Login successful:", response.data);
        // Update auth store – adjust based on your API response structure
        // For example, if your response is { user: { id, username } }
        authStore.login(response.data.token, response.data.user);
        showToast("success", "Success", "Login successful!");
        router.push("/dashboard");
      } catch (error: any) {
        console.error("Login error:", error);
        let errMsg = "Login failed. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errMsg = error.response.data.error;
        }
        showToast("error", "Error", errMsg);
      } finally {
        loading.value = false;
      }
    };

    return { handleLogin, loading };
  },
});
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-top: 60px; /* Adjust to account for your navbar height */
}

p {
  color: #000000;
}
.link {
  color: var(--color-brand--dark-purple);
  transition: 0.3s;
}
.link:hover {
  color: var(--color-brand--light-purple);
}
</style>
