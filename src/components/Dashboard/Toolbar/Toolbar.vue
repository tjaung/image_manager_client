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
import AddFolderButton from "./AddFolder.vue";
import UploadImageButton from "./UploadImage.vue";
import axios from "axios";

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
    handleUpdate() {
      axios
        .get(
          `${this.apiBaseUrl}${this.userId}/folders/${
            this.currentPath ? this.currentPath + "/" : ""
          }`
        )
        .then((response) => {
          // Assuming the response contains the folders and files in an expected format
          this.$emit("refreshData", response.data); // Emitting an event or directly setting data
        })
        .catch((error) => {
          console.error("Failed to refresh data:", error);
        });
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
