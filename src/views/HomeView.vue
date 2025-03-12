<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome to Our Site</h1>
      <p>This is a single-page landing site.</p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped>
.home {
  padding-top: 80px; /* Adjust to avoid overlap with the navbar */
}
.hero {
  text-align: center;
  margin: 40px 20px;
}
</style>
