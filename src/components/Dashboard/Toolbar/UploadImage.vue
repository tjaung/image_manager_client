<template>
  <div>
    <!-- Conditionally show buttons based on whether a file has been selected -->
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
import { ref, getCurrentInstance } from "vue";
import axios from "axios";

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  setup(props, { emit }) {
    const fileInput = ref(null);
    const selectedFile = ref(null);
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
      console.log("current path: ", props.currentPath);
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    // Handle file selection
    const handleFileSelected = (event) => {
      selectedFile.value = event.target.files[0];
      if (selectedFile.value) {
        showToast("success", "Success", "Image added successful!");
        console.log("File ready to upload:", selectedFile.value.name);
      }
    };

    // Perform the file upload
    const performUpload = async () => {
      console.log("current path: ", props.currentPath);
      if (!selectedFile.value) {
        alert("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);
      const constructed_url =
        `${props.userId}/folders/${props.currentPath}/upload/`.replace(
          /\/\//g,
          "/"
        );
      const url = `${props.apiBaseUrl}${constructed_url}`;
      console.log(url);
      try {
        await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        showToast("success", "Success", "Image uploaded successful!");
        emit("update");
        selectedFile.value = null; // Clear the selected file after uploading
      } catch (error) {
        console.error("Error uploading image:", error);
        showToast("error", "Error", "Failed to upload image");
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
}
</style>
