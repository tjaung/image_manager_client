<template>
  <div>
    <!-- Show "Add Image" button when no file is selected, "Upload" when one is ready -->
    <button
      v-if="!selectedFile"
      @click="triggerFileInput"
      :disabled="!currentPath"
    >
      Add Image
    </button>
    <button v-else @click="performUpload">Upload</button>

    <!-- Hidden file input for handling file uploads -->
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileSelected"
    />
  </div>
</template>

<script lang="ts">
import { ref, Ref, getCurrentInstance, SetupContext } from "vue";
import { uploadFile } from "@/api/fileServices"; // Import file upload service

interface Props {
  apiBaseUrl: string;
  userId: string;
  currentPath: string;
}

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  setup(props: Props, { emit }: SetupContext) {
    const fileInput: Ref<HTMLInputElement | null> = ref(null);
    const selectedFile: Ref<File | null> = ref(null);
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

    // Trigger the file input dialog
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    // Handle file selection
    const handleFileSelected = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        selectedFile.value = target.files[0];
        showToast("success", "Success", "Image added successfully!");
        console.log("File ready to upload:", selectedFile.value.name);
      }
    };

    // Perform the file upload using fileService.uploadFile
    const performUpload = async () => {
      if (!selectedFile.value) {
        alert("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        // Use the uploadFile service: it constructs the endpoint using the userId and folderPath.
        await uploadFile(props.userId, formData, props.currentPath);
        showToast("success", "Success", "Image uploaded successfully!");
        emit("update"); // Notify parent to refresh data
        selectedFile.value = null; // Clear the file selection
      } catch (error) {
        console.error("Error uploading image:", error);
        showToast("error", "Error", "Failed to upload image.");
      }
    };

    return {
      fileInput,
      selectedFile,
      triggerFileInput,
      handleFileSelected,
      performUpload,
    };
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  background: #f5f5f5;
  border: 1px solid #ccc;
}
</style>
