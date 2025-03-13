<template>
  <div class="finder-item" @click="onClick">
    <span class="icon" aria-hidden="true">📄</span>
    <div class="file-details">
      <div class="item-name">
        {{ file.filename }}
      </div>
      <div class="detail-container">
        <div class="item-detail">{{ file.width }}x{{ file.height }}px</div>
        <div class="item-detail">{{ fileSizeInKB }} KB</div>
        <div class="item-detail">
          {{ file.is_grayscale ? "Grayscale" : "Color" }}
        </div>
        <div class="item-detail">Uploaded: {{ formattedDate }}</div>
      </div>
    </div>
    <button class="delete-button" @click.stop="onDeleteClick">Delete</button>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { getFile, deleteFile } from "@/api/fileServices"; // Make sure the filename matches

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
      default: process.env.VUE_APP_API_BASE_URL,
    },
  },
  emits: ["file-clicked", "file-deleted"],
  setup(
    props: any,
    {
      emit,
    }: { emit: (event: "file-clicked" | "file-deleted", payload?: any) => void }
  ) {
    // Compute file size in KB and format the upload date.
    const fileSizeInKB = computed(() =>
      (props.file.filesize / 1024).toFixed(2)
    );
    const formattedDate = computed(() =>
      new Date(props.file.uploaded_at).toLocaleDateString()
    );

    // Retrieve file details using the getFile service (which sends folder_path and file_name as query parameters)
    async function onClick() {
      // Remove any leading slashes from file name and folderPath
      console.log(props.file.filename);
      console.log(props.folderPath);
      const fileName = props.file.filename.replace(/^\//, "");
      const cleanedFolderPath = props.folderPath.replace(/^\//, "");
      try {
        const response = await getFile(
          props.userId,
          cleanedFolderPath,
          props.file.id
        );
        console.log("Emitting file-clicked with data:", response.data);
        emit("file-clicked", response.data);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
        alert("Failed to load file details.");
      }
    }

    // Delete the file using the deleteFile service
    async function onDeleteClick() {
      if (confirm(`Are you sure you want to delete "${props.file.file}"?`)) {
        try {
          await deleteFile(props.userId, props.file.id);
          alert("File deleted successfully.");
          emit("file-deleted", props.file);
        } catch (error) {
          console.error("Error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    }

    return {
      onClick,
      onDeleteClick,
      fileSizeInKB,
      formattedDate,
    };
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
  width: 100%;
}
.finder-item:hover {
  background-color: #f5f5f5;
}
.icon {
  margin-right: 8px;
}
.file-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  gap: 10px;
}
.item-name {
  font-weight: 500;
  flex-shrink: 0;
}
.detail-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
}
.item-detail {
  margin-left: 20px;
  white-space: nowrap;
  color: rgb(89, 89, 89);
  font-size: 0.9rem;
}
.delete-button {
  margin-left: 20px;
  cursor: pointer;
  background: none;
  border: none;
  color: #c00;
  font-weight: bold;
}
</style>
