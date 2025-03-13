// src/api/fileService.ts
import apiClient from "./apiClient";

/**
 * List files for a user.
 * Optionally, pass a folderPath as a query parameter.
 */
export const listFiles = (userId: string, folderPath: string = "") => {
  let endpoint = `${userId}/files/`; // e.g. "user-id/files/"
  if (folderPath) {
    endpoint += `?folder_path=${encodeURIComponent(folderPath)}`;
  }
  return apiClient.get(endpoint);
};

/**
 * Upload a file to a specified folder.
 * Optionally, pass a folderPath as a query parameter.
 */
export const uploadFile = (
  userId: string,
  formData: FormData,
  folderPath: string = ""
) => {
  let endpoint = `${userId}/files/`;
  if (folderPath) {
    endpoint += `?folder_path=${encodeURIComponent(folderPath)}`;
  }
  return apiClient.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Update (move or rename) a file.
 * Uses the file's primary key (filePk) in the URL.
 */
export const updateFile = (userId: string, filePk: string, updateData: any) => {
  return apiClient.patch(`${userId}/files/${filePk}/`, updateData);
};

/**
 * Delete a file by its primary key.
 */
export const deleteFile = (userId: string, filePk: string) => {
  return apiClient.delete(`${userId}/files/${filePk}/`);
};

/**
 * Retrieve a file's details.
 * Your FileViewSet's retrieve method requires both folder_path and file_name.
 *
 * @param userId - The ID of the user.
 * @param folderPath - The folder path (without leading slash, e.g. "docs/images")
 * @param fileName - The name of the file.
 */
export const getFile = (
  userId: string,
  folderPath: string,
  file_id: string
) => {
  //127.0.0.1:8000/api/93f1f27a-a81b-4a50-864c-66a95bec92cf/files/?folder_path=new_folder&file_name=dj.png
  http: return apiClient.get(`${userId}/files/`, {
    params: {
      user_id: userId,
      folder_path: folderPath,
      file_id: file_id,
    },
  });
};
