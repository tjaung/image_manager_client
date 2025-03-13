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
        console.log("UPDATE UI");
        // const response = await listFolders(this.userId, this.currentPath);
        // console.log("new ui: ", response.data);
        // Emit an event with the refreshed data.
        this.$emit("refreshData", true);
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
  padding-left: 10px;
  padding-right: 10px;
}
</style>
