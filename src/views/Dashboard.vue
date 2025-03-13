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
      :files="files"
      :userId="user.id"
      :currentFolderPath="currentPath.join('/')"
      @navigate="navigateToFolder"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Dashboard/Breadcrumb.vue";
import FinderList from "@/components/Dashboard/FinderList.vue";
import Toolbar from "@/components/Dashboard/Toolbar.vue";
import { useAuthStore } from "@/store/auth";
import { listFolders } from "@/api/folderServices";

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
      currentPath: [], // Array of path segments
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
      user: null,
      isLoading: false,
    };
  },
  methods: {
    async refreshData() {
      this.isLoading = true;
      await this.fetchData(this.currentPath.join("/"));
      this.isLoading = false;
    },
    async fetchData(folderPath = "") {
      if (!this.user) return;
      try {
        // call api GET
        const response = await listFolders(this.user.id, folderPath);
        // get the folders and files from response
        this.folders = response.data.folders;
        this.files = response.data.files;
        console.log(response.data);
        // update current path for breadcrumb ui updates
        this.currentPath = folderPath.split("/").filter(Boolean);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.folders = [];
          this.files = [];
          this.currentPath = folderPath.split("/").filter(Boolean);
        } else {
          console.error("Failed to fetch data:", error);
        }
      }
    },
    handleBreadcrumbNavigate(path) {
      // Adjust the currentPath based on navigation
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
    const authStore = useAuthStore();
    this.user = authStore.user;
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
