<template>
  <div class="finder-item" @click="onClick">
    <span class="icon" aria-hidden="true">📄</span>
    <span class="item-name">Name: {{ filename }}</span>
    <!-- Use rawFile here -->
  </div>
</template>

<script>
import { computed, ref } from "vue";
import axios from "axios";
import { toRaw } from "vue";

export default {
  name: "FileItem",
  props: {
    file: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    folderPath: {
      type: String,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      required: true,
      default: "http://localhost:8080/",
    },
  },
  emits: ["file-clicked"],
  setup(props, { emit }) {
    const rawFile = computed(() => toRaw(props.file)).value;
    const paths = rawFile.file.split("/");
    console.log(paths);
    const filename = ref(paths[paths.length - 1]);
    console.log(filename.value);
    // Update filename whenever rawFile changes
    computed(() => {
      const paths = rawFile.value.file.split("/");
      filename.value = paths[paths.length - 1];
    });

    async function onClick() {
      console.log(rawFile.value);
      const url = `${props.apiBaseUrl}${props.userId}/folders/${props.folderPath}/${filename.value}/`;
      console.log("Constructed URL:", url);

      try {
        const response = await axios.get(url, { withCredentials: true });
        emit("file-clicked", response.data);
      } catch (error) {
        console.error("Failed to fetch file details:", error);
        alert("Failed to load file details.");
      }
    }

    return {
      rawFile,
      onClick,
    };
  },
};
</script>

<style scoped>
.finder-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  font-family: system-ui, sans-serif;
}
.finder-item:hover {
  background-color: #f5f5f5;
}
.icon {
  margin-right: 8px;
}
.item-name {
  flex: 1;
  font-weight: 500;
}
</style>
