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
      apiClient.defaults.headers.common["Authorization"] = `Token ${newToken}`;
    },
    logout() {
      this.token = null;
      this.user = null;

      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
