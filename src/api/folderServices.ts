// src/api/folderService.ts
import apiClient from "./apiClient";

/**
 * GET folders from the API.
 *
 * @param userId - The ID of the user.
 * @param folderPath - Optional parent folder path.
 * @returns A promise with the API response.
 */
export const listFolders = (userId: string, folderPath: string = "") => {
  let endpoint = `${userId}/folders`; // e.g. "user-id/folders/"
  if (folderPath) {
    // Pass the folder path as a query parameter.
    endpoint += `/?folder_path=${encodeURIComponent(folderPath)}`;
  }
  return apiClient.get(endpoint);
};

/**
 * Create a new folder via the API.
 *
 * @param userId - The ID of the user.
 * @param folderData - Data for the new folder (e.g. { name: "NewFolder" }).
 * @param folderPath - Optional parent folder path.
 * @returns A promise with the API response.
 */
export const createFolder = (
  userId: string,
  folderData: any,
  folderPath: string = ""
) => {
  let endpoint = `${userId}/folders/`;
  if (folderPath) {
    endpoint += `?folder_path=${encodeURIComponent(folderPath)}`;
  }
  return apiClient.post(endpoint, folderData);
};

/**
 * Update (move/rename) a folder.
 *
 * @param userId - The ID of the user.
 * @param folderPk - The primary key of the folder.
 * @param updateData - Data to update (e.g. { old_path: "/old", new_path: "/new" }).
 * @returns A promise with the API response.
 */
export const updateFolder = (
  userId: string,
  folderPk: string,
  updateData: any
) => {
  return apiClient.patch(`${userId}/folders/${folderPk}/`, updateData);
};

/**
 * Delete a folder via the API.
 *
 * @param userId - The ID of the user.
 * @param folderPath - The folder's path (without a leading slash).
 * @returns A promise with the API response.
 */
export const deleteFolder = (userId: string, folderPk: string) => {
  return apiClient.delete(`${userId}/folders/${folderPk}/`);
};
