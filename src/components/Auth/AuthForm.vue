<template>
  <div class="auth-form">
    <div class="logo-form">
      <img
        src="https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87f1_dark_logo_fullcolor_rgb.svg"
        loading="lazy"
        width="300"
        height="114"
        alt="digiM Logo Dark"
        class="logo-image"
      />
    </div>
    <div class="spacer"></div>
    <h2 class="form-title">{{ mode === "login" ? "Login" : "Sign Up" }}</h2>
    <div class="spacer"></div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label class="form-label" for="username">Username</label>
        <input
          class="form-input"
          id="username"
          v-model="username"
          type="text"
          required
        />
        <p v-if="errors.username" class="error-message">
          {{ errors.username }}
        </p>
      </div>
      <div v-if="mode === 'signup'">
        <label for="email">Email</label>
        <input
          class="form-input"
          id="email"
          v-model="email"
          type="email"
          required
        />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div>
        <label for="password">Password</label>
        <input
          class="form-input"
          id="password"
          v-model="password"
          type="password"
          required
        />
        <p v-if="errors.password" class="error-message">
          {{ errors.password }}
        </p>
      </div>
      <div v-if="mode === 'signup'">
        <label for="confirm_password">Confirm Password</label>
        <input
          class="form-input"
          id="confirm_password"
          v-model="confirm_password"
          type="password"
          required
        />
        <p v-if="passwordMismatch" class="error-message">
          Passwords do not match.
        </p>
        <p v-if="errors.confirm_password" class="error-message">
          {{ errors.confirm_password }}
        </p>
      </div>
      <button type="submit" :disabled="loading">
        <span v-if="loading">Loading...</span>
        <span v-else>{{ mode === "login" ? "Login" : "Sign Up" }}</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "AuthForm",
  props: {
    mode: {
      type: String,
      default: "login", // "login" or "signup"
    },
    loading: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Object,
      default: () => ({}), // Default to an empty object
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const confirm_password = ref("");

    // Computed property to check if passwords match
    const passwordMismatch = computed(() => {
      return (
        props.mode === "signup" && password.value !== confirm_password.value
      );
    });

    const handleSubmit = () => {
      if (passwordMismatch.value) {
        return;
      }

      const payload: {
        username: string;
        password: string;
        email?: string;
        confirm_password?: string;
      } = {
        username: username.value,
        password: password.value,
      };

      if (props.mode === "signup") {
        payload.email = email.value;
        payload.confirm_password = confirm_password.value;
      }

      emit("submit", payload);
    };

    return {
      username,
      password,
      email,
      confirm_password,
      handleSubmit,
      passwordMismatch,
    };
  },
});
</script>

<style scoped>
.auth-form {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 50px;
}

.logo-form {
  width: 10rem;
  max-width: 10rem;
  height: auto;
  display: flex;
}

.form-title {
  color: var(--text-color--primary-blue);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.3;
}

.auth-form form div {
  margin-bottom: 15px;
}

.auth-form form label {
  display: block;
  margin-bottom: 5px;
}

.auth-form form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

/* Error message styling */
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.auth-form button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
