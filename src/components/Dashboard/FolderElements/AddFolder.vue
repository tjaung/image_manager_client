<template>
  <button @click="addFolder">Add Folder</button>
</template>

<script>
import { createFolder } from "@/api/folderServices";

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  emits: ["update"],
  methods: {
    async addFolder() {
      const folderName = prompt("Enter the name of the new folder:");
      if (!folderName) return;

      try {
        // Call the createFolder service.
        const response = await createFolder(
          this.userId,
          { name: folderName },
          this.currentPath
        );
        alert(
          `Folder "${response.data.name}" created successfully at "${response.data.path}"`
        );
        // Emit an update event to notify the parent component to refresh data.
        this.$emit("update");
      } catch (error) {
        console.error("Error creating folder:", error);
        alert("Failed to create folder.");
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
