<template>
  <div class="auth-container">
    <AuthForm
      :loading="loading"
      mode="signup"
      :errors="formErrors"
      @submit="handleSignup"
    />
    <p>
      Already have an account?
      <router-link to="/login" class="link"><u>Login</u></router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import AuthForm from "@/components/Auth/AuthForm.vue";
import { signup } from "@/api/authServices";

const api_base = process.env.VUE_APP_API_BASE_URL;
const api_signup_url = api_base + "auth/signup";

export default defineComponent({
  name: "Signup",
  components: { AuthForm },
  setup() {
    const loading = ref(false);
    const formErrors = ref<{ [key: string]: string }>({}); // Store validation errors
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
      confirm_password: string;
      email: string;
    }) => {
      loading.value = true;
      formErrors.value = {}; // Reset previous errors

      try {
        const response = await signup(api_signup_url, data);
        console.log("Signup successful:", response.data);
        showToast("success", "Success", "Signup successful!");
        router.push("/login");
      } catch (error: any) {
        console.error("Signup error:", error);
        let errMsg = "Signup failed. Please try again.";

        if (error.response && error.response.data) {
          // Check if the error contains field-specific validation messages
          formErrors.value = error.response.data;

          // If there's a generic error message, display it in toast
          if (error.response.data.non_field_errors) {
            errMsg = error.response.data.non_field_errors[0];
          }
        }

        showToast("error", "Error", errMsg);
      } finally {
        loading.value = false;
      }
    };

    return { handleSignup, loading, formErrors };
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
