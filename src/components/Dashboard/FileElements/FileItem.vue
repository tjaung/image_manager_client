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

    <!-- Use the new DeleteFileButton component -->
    <DeleteFileButton
      :file="file"
      :userId="userId"
      @file-deleted="onFileDeleted"
    />
  </div>
</template>

<script lang="ts">
import { computed, SetupContext } from "vue";
import { getFile } from "@/api/fileServices";
import DeleteFileButton from "./DeleteFileButton.vue";

interface FileData {
  id: string;
  filename: string;
  filesize: number;
  width: number;
  height: number;
  is_grayscale: boolean;
  uploaded_at: string; // or Date, if you store actual Date objects
}

interface Props {
  file: FileData;
  userId: string;
  folderPath: string;
  apiBaseUrl: string;
}
export default {
  name: "FileItem",
  components: {
    DeleteFileButton,
  },
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
  setup(props: Props, { emit }: SetupContext) {
    // Convert bytes to KB
    const fileSizeInKB = computed(() =>
      (props.file.filesize / 1024).toFixed(2)
    );
    // Format date
    const formattedDate = computed(() =>
      new Date(props.file.uploaded_at).toLocaleDateString()
    );

    // Called when user clicks anywhere on the row (except the delete button)
    async function onClick() {
      // Remove leading slash from folderPath if any
      const cleanedFolderPath = props.folderPath.replace(/^\//, "");
      try {
        const response = await getFile(
          props.userId,
          cleanedFolderPath,
          props.file.id
        );
        emit("file-clicked", response.data);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
        alert("Failed to load file details.");
      }
    }

    // Called when DeleteFileButton emits "file-deleted"
    function onFileDeleted(file: any) {
      console.log("FILE DELETE UI UPDATE");
      // Re-emit so the parent (FinderList, or wherever you use <FileItem>) knows
      emit("file-deleted", file);
    }

    return {
      onClick,
      onFileDeleted,
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
</style>
