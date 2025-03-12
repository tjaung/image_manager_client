<template>
  <div class="finder-item" @click="onRowClick">
    <span class="icon" aria-hidden="true">📁</span>
    <div class="item-details-container">
      <span class="item-name">{{ folder.name }}</span>
      <span class="item-info" v-if="folder.created_at">
        Created at: {{ new Date(folder.created_at).toLocaleDateString() }}
      </span>
    </div>
    <button class="delete-button" @click.stop="onDeleteClick">Delete</button>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/auth";

export default {
  name: "FolderItem",
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  emits: ["folder-click", "folder-deleted"],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    const user = authStore.user;
    const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

    /**
     * Called when user clicks anywhere on the row, except the delete button.
     * We'll emit 'folder-click' so the parent can navigate to that folder.
     */
    function onRowClick() {
      emit("folder-click", props.folder.name);
      console.log(props.folder.name);
    }

    /**
     * Called when the user presses "Delete"
     */
    async function onDeleteClick() {
      const ok = confirm(
        `Are you sure you want to delete "${props.folder.name}"?`
      );
      if (!ok) return;

      try {
        const folderPath = (props.folder.path || "").replace(/^\//, "");
        const url = `${apiBaseUrl}${user.id}/folders/${folderPath}/delete/`;
        await axios.delete(url, { withCredentials: true });
        alert(`Folder "${props.folder.name}" deleted successfully`);

        // Let the parent know the folder was deleted, so it can update UI
        emit("folder-deleted", props.folder);
      } catch (err) {
        console.error("Error deleting folder:", err);
        alert("Failed to delete folder.");
      }
    }

    return {
      onRowClick,
      onDeleteClick,
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
  font-family: system-ui, sans-serif;
  cursor: pointer;
  justify-content: space-between; /* Ensures spacing between name/details and delete button */
}

.finder-item:hover {
  background-color: #f5f5f5;
}

.icon {
  margin-right: 8px;
}

.item-details-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}

.item-name {
  font-weight: 500;
}

.item-info {
  margin-left: 20px; /* Space between name and info */
  color: #666;
  font-size: 0.9em;
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
