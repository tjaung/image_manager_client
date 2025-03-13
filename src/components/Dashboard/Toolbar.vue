<template>
  <div class="toolbar">
    <add-folder-button
      :api-base-url="apiBaseUrl"
      :user-id="userId"
      :current-path="currentPath"
      @update="handleUpdate"
    />
    <upload-image-button
      :api-base-url="apiBaseUrl"
      :user-id="userId"
      :current-path="currentPath"
      @update="handleUpdate"
    />
  </div>
</template>

<script>
import AddFolderButton from "./FolderElements/AddFolder.vue";
import UploadImageButton from "./FileElements/UploadImage.vue";
import { listFolders } from "@/api/folderServices";

export default {
  components: {
    AddFolderButton,
    UploadImageButton,
  },
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  methods: {
    async handleUpdate() {
      try {
        // Use the folder service to get the folder data.
        const response = await listFolders(this.userId, this.currentPath);
        // Emit an event with the refreshed data.
        this.$emit("refreshData", response.data);
      } catch (error) {
        console.error("Failed to refresh data:", error);
      }
    },
  },
};
</script>

<style>
.toolbar {
  display: flex;
  flex-direction: row;
}
</style>
