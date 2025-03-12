<template>
  <div class="toolbar">
    <button @click="addFolder">Add Folder</button>
    <!-- Trigger file input on button click -->
    <button @click="triggerFileInput">Upload Image</button>
    <!-- Hidden file input for handling file uploads -->
    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="uploadImage"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String, // The current path in the folder structure
  },
  emits: ["update"],
  methods: {
    addFolder() {
      const folderName = prompt("Enter the name of the new folder:");
      if (!folderName) return;

      let url;
      if (this.currentPath === "") {
        url = `${this.apiBaseUrl}${this.userId}/folders/create/`;
      } else {
        url = `${this.apiBaseUrl}${this.userId}/folders/${this.currentPath}/create/`;
      }

      axios
        .post(url, { name: folderName }, { withCredentials: true })
        .then((response) => {
          alert(
            `Folder "${response.data.name}" created successfully at "${response.data.path}"`
          );
          this.$emit("update"); // Notify parent to refresh data
        })
        .catch((error) => {
          console.error("Error creating folder:", error);
          alert("Failed to create folder.");
        });
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    uploadImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const url = `${this.apiBaseUrl}${this.userId}/folders/${this.currentPath}/upload/`;

      axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          alert("Image uploaded successfully!");
          this.$emit("update"); // Maybe refresh the listing or clear the input
          this.$refs.fileInput.value = ""; // Clear the file input
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          alert("Failed to upload image.");
        });
    },
  },
};
</script>
