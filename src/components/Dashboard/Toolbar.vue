<template>
  <div class="toolbar">
    <button @click="addFolder">Add Folder</button>
    <button @click="uploadImage">Upload Image</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String, // Expecting a string path from the parent component
  },
  emits: ["update"],
  methods: {
    addFolder() {
      const folderName = prompt("Enter the name of the new folder:");
      if (!folderName) return; // User cancelled the prompt

      let url;
      if (this.currentPath === "") {
        // We are at the root
        url = `${this.apiBaseUrl}${this.userId}/folders/create/`;
      } else {
        // We are in a subfolder
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

    uploadImage() {
      // Upload image functionality can be implemented here
      console.log("Upload image clicked");
    },
  },
};
</script>
