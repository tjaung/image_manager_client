<template>
  <div class="finder-item" @click="onRowClick">
    <span class="icon" aria-hidden="true">📁</span>
    <div class="item-details-container">
      <span class="item-name">{{ folder.name }}</span>
      <span class="item-info" v-if="folder.created_at">
        Created at: {{ new Date(folder.created_at).toLocaleDateString() }}
      </span>
    </div>
    <!-- Use the separate delete folder button component -->
    <DeleteFolderButton :folder="folder" @folder-deleted="onFolderDeleted" />
  </div>
</template>

<script lang="ts">
import { useAuthStore } from "@/store/auth";
import DeleteFolderButton from "./DeleteFolderButton.vue";
import { SetupContext } from "vue";

interface Props {
  folder: Folder;
}
interface Folder {
  name: string;
  created_at: string;
  id: string;
}

export default {
  name: "FolderItem",
  props: {
    folder: {
      type: Object,
      required: true,
    },
  },
  components: {
    DeleteFolderButton,
  },
  emits: ["folder-click", "folder-deleted"],
  setup(props: Props, { emit }: SetupContext) {
    function onRowClick() {
      emit("folder-click", props.folder.name);
      console.log("Folder clicked:", props.folder.name);
    }

    function onFolderDeleted() {
      // Bubble up the folder-deleted event to parent components.
      console.log("FOLDER DELETED SIGNAL IN FOLDER ITEM");
      emit("folder-deleted");
    }

    return {
      onRowClick,
      onFolderDeleted,
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
  font-family: system-ui, sans-serif;
  cursor: pointer;
  justify-content: space-between;
}

.finder-item:hover {
  background-color: #f5f5f5;
}

.icon {
  margin-right: 8px;
}

.item-details-container {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
}

.item-name {
  font-weight: 500;
}

.item-info {
  margin-left: 20px;
  color: #666;
  font-size: 0.9em;
}
</style>
