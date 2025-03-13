<template>
  <button class="delete-button" @click.stop="onDeleteClick">Delete</button>
</template>

<script>
import { deleteFolder } from "@/api/folderServices";
import { useAuthStore } from "@/store/auth";

export default {
  name: "DeleteFolderButton",
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  emits: ["folder-deleted"],
  setup(props, { emit }) {
    const authStore = useAuthStore();
    // Ensure the user is available from the auth store
    const user = authStore.user;

    async function onDeleteClick() {
      if (!user) {
        alert("User not authenticated.");
        return;
      }

      const ok = confirm(
        `Are you sure you want to delete "${props.folder.name}"?`
      );
      if (!ok) return;

      try {
        // Call the deleteFolder service function using the user ID and folder's primary key.
        await deleteFolder(user.id, props.folder.id);

        alert(`Folder "${props.folder.name}" deleted successfully.`);
        emit("folder-deleted", props.folder);
      } catch (error) {
        console.error("Error deleting folder:", error);
        alert("Failed to delete folder.");
      }
    }

    return {
      onDeleteClick,
    };
  },
};
</script>

<style scoped>
.delete-button {
  margin-left: 20px;
  cursor: pointer;
  background: none;
  border: none;
  color: #c00;
  font-weight: bold;
}
</style>
