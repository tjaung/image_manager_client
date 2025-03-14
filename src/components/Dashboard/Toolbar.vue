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
import "./css/toolbar.css";

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
button {
  padding: 8px 16px;
  font-size: 16px;
  width: 120px;
  height: 40px;
  cursor: pointer;
  background: var(--color-brand--light-purple-20);
  color: var(--text-color--primary-blue);
  border: 1px solid #ccc;
  border-radius: 100vw;
  transition: 0.3s;
}
button:hover {
  background-color: rgba(127, 0, 245, 0.75);
  color: #fff;
}
</style>
