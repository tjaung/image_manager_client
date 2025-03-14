// src/api/fileService.ts
import apiClient from "./apiClient";

/**
 * List files for a user.
 * Optionally, pass a folderPath as a query parameter.
 */
export const login = (api_login_url: string, data: object) => {
  return apiClient.post(api_login_url, data);
};

export const signup = (api_signup_url: string, data: object) => {
  return apiClient.post(api_signup_url, data);
};
