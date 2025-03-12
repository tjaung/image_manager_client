<template>
  <div class="dashboard">
    <div class="top-bar">
      <Breadcrumb :path="currentPath" @navigate="handleBreadcrumbNavigate" />
      <Toolbar
        v-if="user"
        :apiBaseUrl="apiBaseUrl"
        :userId="user.id"
        :currentPath="currentPath.join('/')"
        @update="refreshData"
      />
    </div>
    <FinderList
      :folders="folders"
      :files="this.files"
      :userId="user.id"
      :currentFolderPath="currentPath.join('/')"
      @navigate="navigateToFolder"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Dashboard/Breadcrumb.vue";
import FinderList from "@/components/Dashboard/FileElements/FinderList.vue";
import Toolbar from "@/components/Dashboard/Toolbar/Toolbar.vue";
import axios from "axios";
import { useAuthStore } from "../store/auth";

export default {
  components: {
    Breadcrumb,
    FinderList,
    Toolbar,
  },
  data() {
    return {
      folders: [],
      files: [],
      currentPath: [], // This will store the full path as an array of segments
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
      user: null,
    };
  },
  methods: {
    async refreshData() {
      this.isLoading = true; // Set loading state
      this.fetchData(this.currentPath.join("/")).finally(() => {
        this.isLoading = false; // Reset loading state
      });
    },
    async fetchData(folderPath = "") {
      if (!this.user) return; // Ensure user is defined
      const url = `${this.apiBaseUrl}${this.user.id}/folders/${
        folderPath ? folderPath + "/" : ""
      }`;
      try {
        const response = await axios.get(url, { withCredentials: true });
        this.folders = response.data.folders;
        this.files = response.data.files;
        console.log(response.data);
        this.currentPath = folderPath.split("/").filter(Boolean); // Update the path for the breadcrumb
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.folders = [];
          this.files = [];
          this.currentPath = folderPath.split("/").filter(Boolean); // Update path even if empty
        } else {
          console.error("Failed to fetch data:", error);
        }
      }
    },
    handleBreadcrumbNavigate(path) {
      // Clear path on navigation to root or reconstruct it based on click
      if (path === "") {
        this.currentPath = [];
      } else {
        const pathIndex = this.currentPath.indexOf(path);
        this.currentPath = this.currentPath.slice(0, pathIndex + 1);
      }
      this.refreshData();
    },
    navigateToFolder(folder) {
      this.currentPath.push(folder);
      this.refreshData();
    },
  },
  created() {
    const authStore = useAuthStore(); // Use auth store
    this.user = authStore.user; // Set user from auth store
    if (this.user) {
      this.fetchData();
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
