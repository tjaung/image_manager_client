<template>
  <div class="auth-container">
    <AuthForm :loading="loading" mode="signup" @submit="handleSignup" />
    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import AuthForm from "@/components/Auth/AuthForm.vue";
import axios from "axios";

const api_base = process.env.VUE_APP_API_BASE_URL;
const api_signup_url = api_base + "auth/signup";

export default defineComponent({
  name: "Signup",
  components: { AuthForm },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const { appContext } = getCurrentInstance()!;

    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    const handleSignup = async (data: {
      username: string;
      password: string;
      email: string;
    }) => {
      loading.value = true;
      try {
        const response = await axios.post(api_signup_url, data);
        console.log("Signup successful:", response.data);
        showToast("success", "Success", "Signup successful!");
        // Optionally, redirect to login or dashboard after a successful signup
        router.push("/login");
      } catch (error: any) {
        console.error("Signup error:", error);
        let errMsg = "Signup failed. Please try again.";
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

    return { handleSignup, loading };
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
  padding-top: 60px; /* Adjust if you have a navbar */
}
</style>
