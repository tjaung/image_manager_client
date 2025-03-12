<template>
  <nav class="navbar">
    <div class="logo" @click="goHome">
      <!-- Replace with your actual logo path -->
      <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
    </div>
    <div class="nav-links">
      <button class="login-button" @click="handleAuth">
        {{ isLoggedIn ? "Logout" : "Login" }}
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // Computed property to determine if user is logged in
    const isLoggedIn = computed(() => !!authStore.token);
    console.log(isLoggedIn.value);
    // Toggle between logout and login action
    const handleAuth = () => {
      if (isLoggedIn.value) {
        authStore.logout();
        router.push("/"); // redirect to homepage after logout
      } else {
        router.push("/login");
      }
    };

    const goHome = () => router.push("/");

    return { goHome, handleAuth, isLoggedIn };
  },
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logo {
  cursor: pointer;
}

.logo-image {
  height: 40px;
}

.login-button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
