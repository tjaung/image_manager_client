import { defineStore } from "pinia";
import apiClient from "@/api/apiClient";
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
      apiClient.defaults.headers.common["Authorization"] = `Token ${newToken}`;
      console.log(
        "apiClient Authorization header:",
        apiClient.defaults.headers.common["Authorization"]
      );
    },
    logout() {
      this.token = null;
      this.user = null;

      delete axios.defaults.headers.common["Authorization"];
    },
    // async rehydrateSession() {
    //   try {
    //     // Call your refresh endpoint to ensure the refresh token cookie is valid and maybe rotate it.
    //     // (Your refresh endpoint should set a new cookie with proper expiration.)
    //     await axios.post(
    //       `${process.env.VUE_APP_API_BASE_URL}auth/refresh_token/`,
    //       {},
    //       { withCredentials: true }
    //     );
    //     console.log("Refresh token call successful.");

    //     // Now call the test endpoint to fetch user details.
    //     const testResponse = await axios.get(
    //       `${process.env.VUE_APP_API_BASE_URL}auth/test_token/`,
    //       { withCredentials: true }
    //     );
    //     console.log("Test token response:", testResponse.data);
    //     const { user } = testResponse.data;

    //     // Update the store's user property. No dummy token is needed.
    //     this.user = user;
    //     // Optionally, you can clear the token property or leave it null.
    //     this.token = null;
    //   } catch (error) {
    //     console.error("Session rehydration failed:", error);
    //     this.logout();
    //   }
    // },
  },
});
