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
        @file-click="handleFileClick"
      />
    </div>
  </div>
</template>

<script>
import FolderItem from "@/components/Dashboard/FileElements/FolderItem.vue";
import FileItem from "@/components/Dashboard/FileElements/FileItem.vue";

export default {
  components: {
    FolderItem,
    FileItem,
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
  },
  emits: ["navigate", "refresh"],
  methods: {
    navigateFolder(folder) {
      this.$emit("navigate", folder);
    },
    handleFileClick(file) {
      // Handle file click event, potentially for previewing or downloading
      console.log("File clicked:", file);
    },
    refreshList() {
      // Emit an event to refresh the list after a folder is deleted
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.finder-list-item {
  margin-bottom: 10px;
}
</style>
