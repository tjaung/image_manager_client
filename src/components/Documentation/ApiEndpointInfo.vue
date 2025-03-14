<template>
  <div class="api-endpoint">
    <!-- API Description Column -->
    <div class="api-description">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <div class="method">
        <span :class="methodClass">{{ method }}</span>
        <code>{{ endpoint }}</code>
      </div>
      <ul v-if="params.length">
        <li v-for="param in params" :key="param.name">
          <strong>{{ param.name }}:</strong> {{ param.description }}
        </li>
      </ul>
    </div>

    <!-- Example Usage Column -->
    <div class="api-example">
      <h4>Example Request</h4>
      <pre><code>{{ exampleRequest }}</code></pre>

      <h4>Example Response</h4>
      <pre class="response"><code>{{ exampleResponse }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "ApiEndpointInfo",
  props: {
    title: String, // Name of the endpoint
    description: String, // Brief description of what it does
    method: String, // HTTP Method (GET, POST, etc.)
    endpoint: String, // API URL path
    params: {
      type: Array,
      default: () => [],
    },
    exampleRequest: String, // Example API call
    exampleResponse: String, // Example API response
  },
  setup(props) {
    // Compute method-based styling
    const methodClass = computed(() => {
      switch (props.method) {
        case "GET":
          return "get-method";
        case "POST":
          return "post-method";
        case "PUT":
          return "put-method";
        case "DELETE":
          return "delete-method";
        default:
          return "";
      }
    });

    return { methodClass };
  },
});
</script>

<style scoped>
.api-endpoint {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.api-description {
  flex: 1;
}

.api-example {
  flex: 1;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.method {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.method span {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
}

.get-method {
  background-color: #28a745;
}
.post-method {
  background-color: #007bff;
}
.put-method {
  background-color: #ffc107;
}
.delete-method {
  background-color: #dc3545;
}

pre {
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.response {
  background: #e9ecef;
}
</style>
