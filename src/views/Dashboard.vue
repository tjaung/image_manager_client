<template>
  <div class="header">
    <h3>Welcome {{ user.username }}!</h3>
    <div class="bg-container">
      <img
        src="https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87d6_Stats.webp"
        loading="lazy"
        sizes="100vw"
        srcset="
          https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87d6_Stats-p-500.webp   500w,
          https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87d6_Stats-p-800.webp   800w,
          https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87d6_Stats-p-1080.webp 1080w,
          https://cdn.prod.website-files.com/65fb498612c9078be4da8758/65fb498612c9078be4da87d6_Stats.webp        1440w
        "
        alt="stats background"
        class="stats8_background-image"
      />
    </div>
  </div>
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
    <div class="file-container">
      <FinderList
        v-if="user"
        :folders="folders"
        :files="files"
        :userId="user.id"
        :currentFolderPath="currentPath.join('/')"
        @navigate="navigateToFolder"
        @refresh="handleUpdate"
      />
    </div>
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
        console.log("GET ", folderPath);
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
    console.log("user: ", this.user);
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
.header {
  padding: 100px;
}
.bg-container {
  z-index: -1;
  position: absolute;
  inset: 0%;
}
.dashboard {
  height: 100vh;
  background: var(--background-color--background-primary);
}
.top-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
}

.file-container {
  padding: 20px;
}
</style>
