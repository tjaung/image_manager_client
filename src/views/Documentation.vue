<template>
  <div class="spacer"></div>
  <div class="documentation">
    <!-- Sidebar Navigation -->
    <aside class="sidebar">
      <h2>API Docs</h2>
      <nav>
        <ul>
          <li><strong>Authentication</strong></li>
          <li v-for="auth in endpointInfo.authentication" :key="auth.id">
            <a :href="'#' + auth.id">{{ auth.title }}</a>
          </li>

          <li><strong>Folders</strong></li>
          <li v-for="folder in endpointInfo.folders" :key="folder.id">
            <a :href="'#' + folder.id">{{ folder.title }}</a>
          </li>

          <li><strong>Files</strong></li>
          <li v-for="file in endpointInfo.files" :key="file.id">
            <a :href="'#' + file.id">{{ file.title }}</a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="doc-content">
      <h1>REST API Documentation</h1>

      <!-- Render Authentication Endpoints -->
      <section
        v-for="auth in endpointInfo.authentication"
        :id="auth.id"
        :key="auth.id"
      >
        <ApiEndpointInfo
          :title="auth.title"
          :description="auth.description"
          :method="auth.method"
          :endpoint="auth.endpoint"
          :params="auth.params"
          :exampleRequest="auth.exampleRequest"
          :exampleResponse="auth.exampleResponse"
        />
      </section>

      <!-- Render Folder Endpoints -->
      <section
        v-for="folder in endpointInfo.folders"
        :id="folder.id"
        :key="folder.id"
      >
        <ApiEndpointInfo
          :title="folder.title"
          :description="folder.description"
          :method="folder.method"
          :endpoint="folder.endpoint"
          :params="folder.params"
          :exampleRequest="folder.exampleRequest"
          :exampleResponse="folder.exampleResponse"
        />
      </section>

      <!-- Render File Endpoints -->
      <section v-for="file in endpointInfo.files" :id="file.id" :key="file.id">
        <ApiEndpointInfo
          :title="file.title"
          :description="file.description"
          :method="file.method"
          :endpoint="file.endpoint"
          :params="file.params"
          :exampleRequest="file.exampleRequest"
          :exampleResponse="file.exampleResponse"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiEndpointInfo from "@/components/Documentation/ApiEndpointInfo.vue"; // Import the component
import { endpointInfo } from "./documentationEndpoints";
export default defineComponent({
  name: "DocumentationPage",
  components: { ApiEndpointInfo },
  setup() {
    // Define API endpoints as structured data

    return { endpointInfo };
  },
});
</script>

<style scoped>
/* Layout Styles */
.documentation {
  display: flex;
  gap: 2rem;
  padding: 20px;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  position: sticky;
  top: 90px;
  height: fit-content;
}

.sidebar h2 {
  margin-bottom: 15px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
}

.sidebar a:hover {
  text-decoration: underline;
}

/* Main Content */
.doc-content {
  flex: 1;
}

/* Scroll Behavior */
section {
  margin-bottom: 40px;
  padding-top: 80px; /* Offset for sticky nav */
}
.spacer {
  padding: 45px;
}

@media only screen and (max-width: 600px) {
  .sidebar {
    display: none;
  }
}
</style>
