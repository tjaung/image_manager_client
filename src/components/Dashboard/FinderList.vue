<template>
  <div>
    <div v-for="folder in folders" :key="folder.id" class="finder-list-item">
      <FolderItem
        :folder="folder"
        @folder-click="navigateFolder"
        @folder-deleted="refreshList"
      />
    </div>
    <div v-for="file in files" :key="file.id" class="finder-list-item">
      <FileItem
        :file="file"
        :folderPath="currentFolderPath"
        :userId="userId"
        :apiBaseUrl="apiBaseUrl"
        @file-clicked="handleFileClick"
        @file-deleted="refreshList"
      />
    </div>
    <ImageOverlay ref="imageOverlay" :imageSrc="selectedImageUrl" />
  </div>
</template>

<script>
import FolderItem from "@/components/Dashboard/FolderElements/FolderItem.vue";
import FileItem from "@/components/Dashboard/FileElements/FileItem.vue";
import ImageOverlay from "./ImageOverlay.vue";

export default {
  components: {
    FolderItem,
    FileItem,
    ImageOverlay,
  },
  data() {
    return {
      files: [], // Your files array
      selectedImageUrl: "",
    };
  },
  props: {
    folders: {
      type: Array,
      default: () => [],
    },
    files: {
      type: Array,
      default: () => [],
    },
    currentFolderPath: {
      type: String,
      default: "",
    },
    userId: {
      // Added userId prop
      type: String,
      required: true,
    },
    apiBaseUrl: {
      // Added apiBaseUrl prop
      type: String,
      required: true,
    },
  },
  emits: ["navigate", "refresh"],
  methods: {
    navigateFolder(folder) {
      this.$emit("navigate", folder);
    },
    refreshList() {
      // Emit an event to refresh the list after a folder is deleted
      this.$emit("refresh");
    },
    handleFileClick(file) {
      if (!this.$refs.imageOverlay) {
        console.error("ImageOverlay component ref is not available");
        return;
      }
      const filePath = file.file.replace(/^\//, "");
      this.selectedImageUrl = `${process.env.VUE_APP_SERVER_URL}${filePath}`; // Assuming MEDIA_URL is part of the file.file path
      this.$refs.imageOverlay.show();
    },
  },
};
</script>

<style scoped>
.finder-list-item {
  margin-bottom: 10px;
}
</style>
