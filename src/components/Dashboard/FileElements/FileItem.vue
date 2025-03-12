<template>
  <div class="finder-item" @click="onClick">
    <span class="icon" aria-hidden="true">📄</span>
    <span class="item-name">{{ file.name }}</span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    folderPath: {
      type: String,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      required: true,
    },
  },
  emits: ["file-clicked"],
  methods: {
    async onClick() {
      const url = `${this.apiBaseUrl}${this.userId}/folders/${this.folderPath}/${this.file.name}/`;
      try {
        const response = await axios.get(url, { withCredentials: true });
        this.$emit("file-clicked", response.data);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
        alert("Failed to load file details.");
      }
    },
  },
};
</script>

<style scoped>
.finder-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  font-family: system-ui, sans-serif;
}
.finder-item:hover {
  background-color: #f5f5f5;
}
.icon {
  margin-right: 8px;
}
.item-name {
  flex: 1;
  font-weight: 500;
}
</style>
