<template>
  <button class="delete-button" @click.stop="confirmDeletion">Delete</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deleteFile } from "@/api/fileServices";
import { useAuthStore } from "@/store/auth";
import { getCurrentInstance } from "vue";
import { useConfirm } from "primevue/useconfirm";

export default defineComponent({
  name: "DeleteFileButton",
  props: {
    // We'll need at least the file object and userId
    file: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  emits: ["file-deleted"],
  setup(props, { emit }) {
    // Get user state
    const authStore = useAuthStore();
    // Ensure the user is available from the auth store
    const user = authStore.user;
    // Get appContext to access the global toast
    const { appContext } = getCurrentInstance()!;

    // Utility function to show toast notifications
    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    const confirm = useConfirm();
    // The function that triggers the PrimeVue confirmation dialog
    async function confirmDeletion() {
      console.log("DELETE FILE");
      if (!user) {
        showToast("error", "Error", "User is not authenticated");
        return;
      }

      confirm.require({
        message: `Are you sure you want to delete "${props.file.file}"?`,
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          // If user accepts, do the delete call
          try {
            await deleteFile(props.userId, props.file.id);
            showToast(
              "success",
              "Success",
              `Folder "${props.file.file}" deleted successfully`
            );
            emit("file-deleted", props.file);
          } catch (error) {
            showToast("error", "Error", "Failed to delete folder.");
          }
        },
        reject: () => {
          showToast("info", "Cancelled", "Folder not deleted.");
        },
      });
    }

    async function onDeleteClick() {
      if (confirm(`Are you sure you want to delete "${props.file.file}"?`)) {
        try {
          await deleteFile(props.userId, props.file.id);
          alert("File deleted successfully.");
          // Emit event so the parent knows this file is deleted
          emit("file-deleted", props.file);
        } catch (error) {
          console.error("Error deleting file:", error);
          alert("Failed to delete file.");
        }
      }
    }

    return {
      confirmDeletion,
    };
  },
});
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
