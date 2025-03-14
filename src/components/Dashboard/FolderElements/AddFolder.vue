<template>
  <button @click="visible = true">Add Folder</button>

  <!-- PrimeVue Dialog -->
  <Dialog
    v-model:visible="visible"
    modal
    header="Create Folder"
    :style="{ width: '30rem' }"
  >
    <div class="dialog-input">
      <label for="folder-name" class="font-semibold w-24">Folder Name</label>
      <InputText
        id="folder-name"
        v-model="folderName"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="dialog-btn-container">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        class="submit-btn"
        type="button"
        label="Create"
        @click="handleCreateFolder"
      ></Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import { createFolder } from "@/api/folderServices";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default defineComponent({
  name: "AddFolderButton",
  components: { Dialog, Button, InputText },
  props: {
    apiBaseUrl: { type: String, required: true },
    userId: { type: String, required: true },
    currentPath: { type: String, required: true },
  },
  emits: ["update"],
  setup(props, { emit }) {
    // Dialog visibility state
    const visible = ref(false);
    const folderName = ref("");

    // Access the global toast
    const { appContext } = getCurrentInstance()!;
    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    async function handleCreateFolder() {
      if (!folderName.value.trim()) {
        showToast("warn", "Warning", "Folder name cannot be empty.");
        return;
      }

      try {
        // Call the API to create a folder
        await createFolder(
          props.userId,
          { name: folderName.value },
          props.currentPath
        );
        showToast("success", "Success", "Folder created successfully!");
        emit("update"); // Notify parent to refresh data
        visible.value = false; // Close the dialog
        folderName.value = ""; // Reset input field
      } catch (error) {
        showToast("error", "Error", "Failed to create folder.");
      }
    }

    return {
      visible,
      folderName,
      handleCreateFolder,
    };
  },
});
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px 16px;
  width: 120px;
  height: 40px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #ccc;
}
.dialog-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
}
.dialog-btn-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: end;
  align-items: center;
  padding-top: 12px;
}
.submit-btn {
  background-color: var(--color-brand--light-purple-20);
  color: var(--text-color--primary-blue);
}
.submit-btn:hover {
  background-color: rgba(127, 0, 245, 0.75);
  color: #fff;
}
</style>
