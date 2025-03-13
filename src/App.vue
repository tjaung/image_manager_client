<template>
  <div id="app">
    <Toast />
    <ConfirmDialog />
    <Navbar />
    <!-- The router-view renders the component for the current route -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar.vue";
import { Toast } from "primevue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,
    Toast,
  },
});
</script>

<style>
/* Global styles */
body,
html,
#app {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
</style>
