import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // This token is used only as a flag for the UI; your real token is kept in the HTTP‑only cookie.
    token: null as string | null,
    user: null as { id: string; username: string } | null,
  }),
  actions: {
    login(newToken: string, newUser: { id: string; username: string }) {
      this.token = newToken;
      this.user = newUser;
      console.log(this.token);
      axios.defaults.headers.common["Authorization"] = `Token ${newToken}`;
      console.log(axios.defaults.headers.common["Authorization"]);
    },
    logout() {
      this.token = null;
      this.user = null;

      delete axios.defaults.headers.common["Authorization"];
    },
    async rehydrateSession() {
      try {
        // First, call the refresh endpoint to get a new access token.
        const refreshResponse = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}auth/refresh_token/`,
          {},
          { withCredentials: true }
        );
        console.log("Refresh token response:", refreshResponse.data);
        // Then, call the test endpoint to retrieve the user details.
        const testResponse = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}auth/test_token/`,
          { withCredentials: true }
        );
        console.log("Test token response:", testResponse.data);
        const { user } = testResponse.data;
        // Use a dummy token as a flag; the real token is managed via HTTP‑only cookies.
        this.login("dummy_token", user);
      } catch (error) {
        console.error("Session rehydration failed:", error);
        this.logout();
      }
    },
  },
});
