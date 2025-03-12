<template>
  <!-- Clicking anywhere on this div calls onRowClick (to navigate) -->
  <div class="finder-item" @click="onRowClick">
    <span class="icon" aria-hidden="true">📁</span>
    <span class="item-name">
      {{ folder.name }}
    </span>

    <span class="item-info" v-if="folder.created_at">
      Created at: {{ folder.created_at }}
    </span>

    <!-- Delete button on the right, stopping click propagation -->
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
  /* The entire row is clickable except for the Delete button */
  cursor: pointer;
}
.finder-item:hover {
  background-color: #f5f5f5;
}
.icon {
  margin-right: 8px;
}
.item-name {
  font-weight: 500;
  margin-right: 10px;
}
.item-info {
  margin: 0 10px;
  color: #666;
  font-size: 0.9em;
}
.delete-button {
  margin-left: auto;
  cursor: pointer;
}
</style>
