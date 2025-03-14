<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar_logo" @click="goHome">
        <img
          src="https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87f1_dark_logo_fullcolor_rgb.svg"
          loading="lazy"
          alt="digiM Logo Dark"
          class="logo-image"
        />
      </div>

      <!-- Navigation Links (Desktop & Mobile) -->
      <div class="nav-pages" :class="{ 'nav-open': menuOpen }">
        <div class="nav-links w-nav-menu">
          <a href="/about">About</a>
          <a href="/documentation">Documentation</a>
        </div>

        <!-- Move login button inside hamburger menu on mobile -->
        <div class="mobile-login" v-if="isMobile">
          <button class="login-button" @click="handleAuth">
            {{ isLoggedIn ? "Logout" : "Login" }}
          </button>
        </div>
      </div>

      <!-- Right-Side (Login Button - Only for Desktop) -->
      <div class="right-side" v-if="!isMobile">
        <button class="login-button" @click="handleAuth">
          {{ isLoggedIn ? "Logout" : "Login" }}
        </button>
      </div>

      <!-- Hamburger Menu Button (Mobile) -->
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Background Blur when Scrolled -->
    <div class="nav-bg-blur" :class="{ scrolled: scrolled }"></div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    // Check if user is logged in
    const isLoggedIn = computed(() => !!authStore.token);

    const handleAuth = () => {
      if (isLoggedIn.value) {
        authStore.logout();
        router.push("/"); // Redirect to homepage after logout
      } else {
        router.push("/login");
      }
    };

    const goHome = () => router.push("/");

    // Track Scroll Position for Navbar Blur Effect
    const scrolled = ref(false);
    const onScroll = () => {
      scrolled.value = window.scrollY > 50;
    };

    // Track Mobile Menu State
    const menuOpen = ref(false);
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    // Close Menu on Route Change
    const closeMenu = () => {
      menuOpen.value = false;
    };

    // Detect Mobile Screen Size
    const isMobile = ref(window.innerWidth <= 768);
    const updateScreenSize = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", updateScreenSize);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScreenSize);
    });

    return {
      isLoggedIn,
      handleAuth,
      goHome,
      scrolled,
      menuOpen,
      toggleMenu,
      closeMenu,
      isMobile,
    };
  },
});
</script>

<style scoped>
/* General Navbar Styles */
.navbar {
  color: var(--text-color--primary-blue);
  background-color: transparent;
  align-items: center;
  width: 100%;
  padding: 0.75rem 2.5rem;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease-in-out;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
}

.navbar_logo {
  height: 3.5rem;
}
.logo-image {
  width: 100%;
  height: 100%;
}

.nav-pages {
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-hover-color);
}

/* Scroll Effect */
.nav-bg-blur {
  position: absolute;
  z-index: -1;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}

.nav-bg-blur.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Right Side (Login Button - Desktop) */
.right-side {
  display: flex;
  align-items: center;
}

.login-button {
  background-image: linear-gradient(
    77deg,
    var(--color-brand--dark-purple-30),
    var(--color-brand--dark-blue-30)
  );
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 4px;
  border: none;
  color: #fff;
}

.login-button:hover {
  background-color: rgba(127, 0, 245, 0.75);
}

/* Mobile Login Button */
.mobile-login {
  display: none;
  margin-top: 1rem;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .mobile-login {
    display: block;
  }
}

/* ---------- Mobile Navigation (Hamburger Menu) ---------- */
.hamburger {
  display: none; /* Default: Hidden on Desktop */
  flex-direction: column;
  gap: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--color-brand--dark-blue);
  transition: all 0.3s ease-in-out;
}

/* Transform to 'X' when active */
.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Styles */
@media screen and (max-width: 768px) {
  .navbar_logo {
    height: 3.5rem;
  }
  .logo-image {
    width: 100%;
    height: 100%;
  }
  .nav-pages {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 20px;
    display: none;
  }

  /* Show menu when toggled */
  .nav-pages.nav-open {
    display: flex;
    transform: translateY(0);
  }

  .nav-links {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 15px;
  }

  .hamburger {
    display: flex; /* Show hamburger menu button */
  }
}
</style>
