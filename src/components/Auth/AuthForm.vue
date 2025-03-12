<template>
  <div class="auth-form">
    <h2>{{ mode === "login" ? "Login" : "Sign Up" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div v-if="mode === 'signup'">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="loading">
        <!-- Show loader text when loading -->
        <span v-if="loading">Loading...</span>
        <span v-else>{{ mode === "login" ? "Login" : "Sign Up" }}</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AuthForm",
  props: {
    mode: {
      type: String,
      default: "login", // or 'signup'
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const username = ref("");
    const password = ref("");
    const email = ref("");

    const handleSubmit = () => {
      const payload: { username: string; password: string; email?: string } = {
        username: username.value,
        password: password.value,
      };
      if (props.mode === "signup") {
        payload.email = email.value;
      }
      emit("submit", payload);
    };

    return {
      username,
      password,
      email,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.auth-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.auth-form button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
