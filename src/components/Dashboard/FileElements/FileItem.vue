<template>
  <div class="finder-item" @click="onClick">
    <span class="icon" aria-hidden="true">📄</span>
    <div class="file-details">
      <div class="item-name">
        {{ file.file.replace("/media/uploads/", "") }}
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

<script>
import { computed } from "vue";
import axios from "axios";

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
  setup(props, { emit }) {
    const fileSizeInKB = computed(() =>
      (props.file.filesize / 1024).toFixed(2)
    );
    const formattedDate = computed(() =>
      new Date(props.file.uploaded_at).toLocaleDateString()
    );

    async function onClick() {
      // Ensure no leading slashes to prevent double slashes in URL
      const file = props.file.filename.replace(/^\//, ""); // Remove any leading slash from filename
      const folderPath = props.folderPath.replace(/^\//, ""); // Remove any leading slash from folder path

      // Ensure no trailing slash on folderPath to prevent double slashes before filename
      const cleanedFolderPath = folderPath ? `${folderPath}/` : ""; // Append a slash only if folderPath is not empty
      console.log(cleanedFolderPath);
      // Construct the URL
      const url = `${props.apiBaseUrl}${props.userId}/folders/${cleanedFolderPath}${file}/`;
      console.log("Constructed URL:", url);

      try {
        const response = await axios.get(url, { withCredentials: true });
        console.log("Emitting file-clicked with data", response.data);
        emit("file-clicked", response.data);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
        alert("Failed to load file details.");
      }
    }

    async function onDeleteClick() {
      if (confirm(`Are you sure you want to delete "${props.file.file}"?`)) {
        try {
          const file = props.file.filename.replace(/^\//, ""); // Remove any leading slash from filename
          const folderPath = props.folderPath.replace(/^\//, ""); // Remove any leading slash from folder path

          // Ensure no trailing slash on folderPath to prevent double slashes before filename
          const cleanedFolderPath = folderPath ? `${folderPath}/` : ""; // Append a slash only if folderPath is not empty
          console.log(cleanedFolderPath);
          const deleteUrl = `${props.apiBaseUrl}${props.userId}/${props.file.id}/delete/`;
          //   const deleteUrl = `${props.apiBaseUrl}${props.userId}/folders/${cleanedFolderPath}${props.file.id}/delete/`;
          console.log("delete url: ", deleteUrl);
          //   <uuid:user_id>/folders/<path:folder_path>/<uuid:file_id>/delete/
          //   http://127.0.0.1:8000/93f1f27a-a81b-4a50-864c-66a95bec92cf/folders/docs/f7d92f20-d7bd-41dc-91ac-4be4f9ef34ee/delete/
          await axios.delete(deleteUrl, { withCredentials: true });
          http: alert("File deleted successfully");
          emit("file-deleted", props.file);
        } catch (error) {
          console.error("Error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    }

    return { onClick, onDeleteClick, fileSizeInKB, formattedDate };
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
  flex-shrink: 0; /* Ensures the name doesn't shrink */
}
.detail-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1; /* Allows this container to take up remaining space */
}
.item-detail {
  margin-left: 20px; /* Spacing between details */
  white-space: nowrap; /* Keeps the text from wrapping */
  color: rgb(89, 89, 89);
  font-size: 0.9rem;
}

.delete-button {
  margin-left: 20px; /* Ensures some space from the details */
  cursor: pointer;
  background: none;
  border: none;
  color: #c00;
  font-weight: bold;
}
</style>
