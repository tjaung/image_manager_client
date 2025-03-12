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
      />
    </div>
    <ImageOverlay ref="imageOverlay" :imageSrc="selectedImageUrl" />
  </div>
</template>

<script>
import FolderItem from "@/components/Dashboard/FileElements/FolderItem.vue";
import FileItem from "@/components/Dashboard/FileElements/FileItem.vue";
import ImageOverlay from "../ImageOverlay.vue";
import Toolbar from "../Toolbar/Toolbar.vue";

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
      console.log("File clicked received:", file);
      console.log("Opening image:", file.file);
      console.log("ImageOverlay ref:", this.$refs.imageOverlay);
      if (!this.$refs.imageOverlay) {
        console.error("ImageOverlay component ref is not available");
        return;
      }
      console.log(this.apiBaseUrl);
      this.selectedImageUrl = `${process.env.VUE_APP_API_BASE_URL}${file.file}`; // Assuming MEDIA_URL is part of the file.file path
      console.log("Selected Image URL:", this.selectedImageUrl);
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
