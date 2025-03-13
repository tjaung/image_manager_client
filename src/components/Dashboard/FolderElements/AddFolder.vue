<template>
  <button @click="addFolder">Add Folder</button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, SetupContext } from "vue";
import { createFolder } from "@/api/folderServices";

interface Props {
  apiBaseUrl: string;
  userId: string;
  currentPath: string;
}

export default defineComponent({
  name: "AddFolderButton",
  props: {
    apiBaseUrl: { type: String, required: true },
    userId: { type: String, required: true },
    currentPath: { type: String, required: true },
  },
  emits: ["update"],
  setup(props: Props, { emit }: SetupContext) {
    // Get appContext to access the global toast
    const { appContext } = getCurrentInstance()!;

    // Utility function to show toast notifications
    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    return {
      showToast,
    };
  },
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
        this.showToast("success", "Success", "Folder created successfully!");
        // Emit an update event to notify the parent component to refresh data.
        this.$emit("update");
      } catch (error) {
        this.showToast("error", "Error", "Folder could not be created");
        alert("Failed to create folder.");
      }
    },
  },
});
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px 16px;
  width: 120px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
}
</style>
