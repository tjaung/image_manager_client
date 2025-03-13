<template>
  <div class="dashboard">
    <div class="top-bar">
      <Breadcrumb :path="currentPath" @navigate="handleBreadcrumbNavigate" />
      <Toolbar
        v-if="user"
        :apiBaseUrl="apiBaseUrl"
        :userId="user.id"
        :currentPath="currentPath.join('/')"
        @refreshData="handleUpdate"
      />
    </div>
    <FinderList
      :folders="folders"
      :files="files"
      :userId="user.id"
      :currentFolderPath="currentPath.join('/')"
      @navigate="navigateToFolder"
      @refresh="handleUpdate"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Dashboard/Breadcrumb.vue";
import FinderList from "@/components/Dashboard/FinderList.vue";
import Toolbar from "@/components/Dashboard/Toolbar.vue";
import { listFolders } from "@/api/folderServices";
import { useAuthStore } from "@/store/auth";

export default {
  components: {
    Breadcrumb,
    FinderList,
    Toolbar,
  },
  props: {
    apiBaseUrl: String,
    userId: String,
    currentPath: String,
  },
  data() {
    return {
      folders: [],
      files: [],
      // currentPath as an array (even if passed as a string, we'll convert it)
      currentPath: [],
      user: null,
      isLoading: false,
    };
  },
  methods: {
    // Fetch folder contents based on the provided folder path (as a string).
    async fetchData(folderPath = "") {
      if (!this.user) return;
      try {
        const response = await listFolders(this.user.id, folderPath);
        console.log("Fetched data:", response.data);
        this.folders = response.data.folders;
        this.files = response.data.files;
        // Update the internal currentPath array based on the folderPath string.
        this.currentPath = folderPath.split("/").filter(Boolean);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Optionally clear state on error.
        this.folders = [];
        this.files = [];
        this.currentPath = folderPath.split("/").filter(Boolean);
      }
    },
    // Called when Toolbar emits "update"
    async handleUpdate() {
      console.log("Dashboard handleUpdate called");
      // Reconstruct the folderPath string from the currentPath array.
      const folderPath = this.currentPath.join("/");
      await this.fetchData(folderPath);
      // Optionally, bubble up the event:
      // this.$emit("refreshData", { folders: this.folders, files: this.files });
    },
    // Handle breadcrumb navigation by updating currentPath and refreshing data.
    handleBreadcrumbNavigate(path) {
      if (path === "") {
        this.currentPath = [];
      } else {
        const pathIndex = this.currentPath.indexOf(path);
        this.currentPath = this.currentPath.slice(0, pathIndex + 1);
      }
      this.handleUpdate();
    },
    // When a folder is clicked in FinderList, update currentPath and refresh data.
    navigateToFolder(folder) {
      this.currentPath.push(folder);
      this.handleUpdate();
    },
  },
  created() {
    const authStore = useAuthStore();
    this.user = authStore.user;
    if (this.user) {
      // Initialize with root (empty folderPath).
      this.fetchData("");
    } else {
      // If user is not logged in, push them to '/login'
      this.$router.push("/login");
    }
  },
};
</script>

<style>
.dashboard {
  padding-top: 90px;
}
.top-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
