<template>
  <nav class="breadcrumb">
    <!-- Always allow going back to the root -->
    <span class="breadcrumb-item">
      <a href="#" @click="navigateTo('')"> ~ </a>
    </span>
    <!-- Iterate over path segments -->
    <span
      v-for="(segment, index) in segments"
      :key="index"
      class="breadcrumb-item"
    >
      <span> / </span>
      <!-- Make only non-last segments clickable -->
      <a
        href="#"
        v-if="index < segments.length - 1"
        @click="navigateToSegment(index)"
      >
        {{ segment }}
      </a>
      <!-- The last segment is not clickable -->
      <span v-else>{{ segment }}</span>
    </span>
  </nav>
</template>

<script>
export default {
  props: {
    path: Array,
  },
  computed: {
    segments() {
      // Create an array of path segments from the full path
      const path = this.path.join("/");
      return path.split("/").filter(Boolean); // Filter out any empty strings from path
    },
  },
  methods: {
    navigateToSegment(index) {
      // Navigate to the selected path segment
      const pathUpToIndex = this.segments.slice(0, index + 1).join("/");
      console.log(pathUpToIndex);
      this.$emit("navigate", pathUpToIndex);
    },
    navigateTo(path) {
      // Navigate to root or any specified path
      this.$emit("navigate", path);
    },
  },
};
</script>

<style>
.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.breadcrumb-item {
  margin-right: 5px;
  cursor: pointer;
}

.breadcrumb-item a {
  text-decoration: none;
  color: #000;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.breadcrumb-item span {
  color: #666; /* Gray out non-clickable last segment */
}
</style>
