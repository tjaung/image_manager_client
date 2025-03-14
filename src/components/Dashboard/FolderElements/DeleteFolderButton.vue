<template>
  <!-- <ConfirmDialog /> -->
  <button class="delete-button" @click.stop="confirmDeletion">Delete</button>
</template>

<script lang="ts">
import { deleteFolder } from "@/api/folderServices";
import { useAuthStore } from "@/store/auth";
import { getCurrentInstance, SetupContext } from "vue";
import { useConfirm } from "primevue/useconfirm";

interface Folder {
  id: string;
  name?: string;
  // any other fields you need
}

interface Props {
  folder: Folder;
}

export default {
  name: "DeleteFolderButton",
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  emits: ["folder-deleted"],
  setup(props: Props, { emit }: SetupContext) {
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
      if (!user) {
        showToast("error", "Error", "User is not authenticated");
        return;
      }

      confirm.require({
        message: `Are you sure you want to delete "${props.folder.name}"?
        \nThis will delete all contents inside of the folder.`,
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          // If user accepts, do the delete call
          try {
            await deleteFolder(user.id, props.folder.id);
            showToast(
              "success",
              "Success",
              `Folder "${props.folder.name}" deleted successfully`
            );
            emit("folder-deleted", props.folder);
          } catch (error) {
            showToast("error", "Error", "Failed to delete folder.");
          }
        },
        reject: () => {
          showToast("info", "Cancelled", "Folder not deleted.");
        },
      });
    }

    return {
      // onDeleteClick,
      confirmDeletion,
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
