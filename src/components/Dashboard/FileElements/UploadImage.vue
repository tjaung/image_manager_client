<template>
  <div class="upload-wrapper">
    <!-- If there's no file, show Add Image; otherwise show Upload -->
    <button
      v-if="!selectedFile"
      @click="triggerFileInput"
      :disabled="!currentPath"
    >
      Add Image
    </button>
    <button v-else @click="performUpload">Upload</button>

    <!-- The X button is ALWAYS in the layout, but hidden when no file is selected -->
    <button
      class="clear-button"
      :class="{ hidden: !selectedFile }"
      @click="clearSelectedFile"
    >
      X
    </button>

    <!-- Hidden file input for images only -->
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      accept="image/*"
      @change="handleFileSelected"
    />
  </div>
</template>

<script lang="ts">
import { ref, Ref, getCurrentInstance, SetupContext } from "vue";
import { uploadFile } from "@/api/fileServices";

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

    const showToast = (severity: string, summary: string, detail: string) => {
      appContext.config.globalProperties.$toast.add({
        severity,
        summary,
        detail,
        life: 3000,
      });
    };

    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const handleFileSelected = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.files || !target.files[0]) return;

      const file = target.files[0];
      // Ensure it's an image
      if (!file.type.startsWith("image/")) {
        showToast("error", "Invalid file", "Please select an image file.");
        target.value = "";
        return;
      }

      selectedFile.value = file;
      showToast("success", "Success", "Image added successfully!");
      console.log("File ready to upload:", selectedFile.value.name);
    };

    const clearSelectedFile = () => {
      selectedFile.value = null;
      if (fileInput.value) {
        fileInput.value.value = ""; // Clear input
      }
    };

    const performUpload = async () => {
      if (!selectedFile.value) {
        alert("No file selected.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile.value);

      try {
        await uploadFile(props.userId, formData, props.currentPath);
        showToast("success", "Success", "Image uploaded successfully!");
        emit("update"); // Notify parent to refresh data
        clearSelectedFile();
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
      clearSelectedFile,
      performUpload,
    };
  },
};
</script>

<style scoped>
.upload-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  /* or you can use margin on buttons, up to you */
}

button {
  padding: 8px 16px;
  font-size: 16px;
  width: 120px;
  height: 40px;
  cursor: pointer;
  background: var(--color-brand--light-purple-20);
  color: var(--text-color--primary-blue);
  border: 1px solid #ccc;
  transition: 0.3s;
}
button:hover {
  background-color: rgba(127, 0, 245, 0.75);
  color: #fff;
}

.clear-button {
  color: #c00;
  background: none;
  border: none;
  font-weight: bold;
  font-size: 18px;
  /* same size as other buttons, or adjust as needed */
  width: 40px;
  height: 40px;
  cursor: pointer;
  align-self: center;
}

/* Hide the X button visually but keep its space in the layout */
.hidden {
  visibility: hidden;
}
</style>
