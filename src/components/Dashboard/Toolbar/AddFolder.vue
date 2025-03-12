<template>
  <button @click="addFolder">Add Folder</button>
</template>

<script>
import axios from "axios";

export default {
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  emits: ["update"],
  methods: {
    addFolder() {
      const folderName = prompt("Enter the name of the new folder:");
      if (!folderName) return;

      let url = `${this.apiBaseUrl}${this.userId}/folders/${
        this.currentPath ? this.currentPath + "/create" : "create/"
      }`;

      axios
        .post(url, { name: folderName }, { withCredentials: true })
        .then((response) => {
          alert(
            `Folder "${response.data.name}" created successfully at "${response.data.path}"`
          );
          this.$emit("update");
        })
        .catch((error) => {
          console.error("Error creating folder:", error);
          alert("Failed to create folder.");
        });
    },
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
