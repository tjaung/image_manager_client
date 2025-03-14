export const endpointInfo = {
  authentication: [
    {
      id: "login",
      title: "Login",
      description: "Logs in a user and returns a JWT token.",
      method: "POST",
      endpoint: "/auth/login/",
      params: [
        { name: "username", description: "User’s login name." },
        { name: "password", description: "User’s password." },
      ],
      exampleRequest: `{
  "username": "user123",
  "password": "password123"
}`,
      exampleResponse: `{
  "token": "abc123xyz",
  "user": { "id": 1, "username": "user123" }
}`,
    },
    {
      id: "signup",
      title: "Signup",
      description: "Registers a new user and returns an authentication token.",
      method: "POST",
      endpoint: "/auth/signup/",
      params: [
        { name: "username", description: "New user’s login name." },
        { name: "password", description: "New user’s password." },
        { name: "email", description: "User email (optional)." },
      ],
      exampleRequest: `{
  "username": "newuser",
  "password": "SecurePass123!",
  "email": "user@example.com"
}`,
      exampleResponse: `{
  "token": "newuser_token_123",
  "user": { "id": 2, "username": "newuser" }
}`,
    },
    {
      id: "logout",
      title: "Logout",
      description: "Logs out the user by invalidating the token.",
      method: "POST",
      endpoint: "/auth/logout/",
      params: [],
      exampleRequest: `{}`,
      exampleResponse: `{
  "message": "Logged out successfully."
}`,
    },
    {
      id: "test_token",
      title: "Test Token",
      description: "Verifies a user's JWT Token.",
      method: "GET",
      endpoint: "/auth/test_token/",
      params: [],
      exampleRequest: `Header {
  Authorization: Token xxxxxxxxxxxxxxxxxx
}`,
      exampleResponse: `{
  "message": "Token is valid.",
  "user": {
    "id": "uuid",
    "username": "Username"
  }
}`,
    },
    {
      id: "refresh_token",
      title: "Refresh Token",
      description: "Refreshes a user's JWT Token.",
      method: "GET",
      endpoint: "/auth/refresh_token/",
      params: [],
      exampleRequest: `Header {
  Authorization: Token xxxxxxxxxxxxxxxxxx
}`,
      exampleResponse: `{
  refresh_token: xxxxxxxxxxxxxxxxxx,
}`,
    },
  ],
  folders: [
    {
      id: "folder-list",
      title: "List Folders",
      description: "Retrieves a list of folders and images in that folder.",
      method: "GET",
      endpoint: "/<user_id>/folders/?folder_path=",
      params: [
        {
          name: "folder_path",
          description: "Optional folder path to list contents of.",
        },
      ],
      exampleRequest: `{
  "folder_path": "documents"
}`,
      exampleResponse: `{
  "folders": [
    { 
      created_at: ISO 8601 DateTime
      id: "uuid"
      name: "folderName"
      owner_id: "uuid"
      parent_folder: null || parentFolderName
      path: "/folderName" 
      }
    ],
  "files": [
    {
      file: "/media/uploads/filename.png"
      filename: "filename.png"
      filesize: int
      folder: "uuid"
      height: int
      id: "uuid"
      is_grayscale: boolean
      owner_id: "uuid"
      path: "/docs/new/uploads/filename.png"
      uploaded_at: ISO 8601 DateTime
      width: int
    }
  ]
}`,
    },
    {
      id: "folder-create",
      title: "Create Folder",
      description:
        "Creates a new folder. Can create a folder at the root level or within another folder. Specifying folder_path in the query params will place the folder in that specified path.",
      method: "POST",
      endpoint: "/<user_id>/folders/?folder_path=",
      params: [{ name: "name", description: "Folder name to create." }],
      exampleRequest: `{
  "name": "New Folder Name"
}`,
      exampleResponse: `{
    created_at: ISO 8601 DateTime
    id: "uuid"
    name: "new folder name"
    owner_id: "uuid"
    parent_folder: "uuid"
    path: "/docs/new folder name"
}`,
    },
    {
      id: "folder-delete",
      title: "Delete Folder",
      description:
        "Deletes an existing folder. Deleting a folder will delete all of it's contents as well.",
      method: "DELETE",
      endpoint: "/<user_id>/folders/<folder_id>",
      params: [],
      exampleRequest: `{}`,
      exampleResponse: `{"folders":[],"files":[]}`,
    },
  ],
  files: [
    {
      id: "file-get",
      title: "Get File Details",
      description: "Retrieves information about a specific file.",
      method: "GET",
      endpoint:
        "/<user_id>/files/?=<user_id>/&folder_path=<folder_path>&file_id=<file_id>",
      params: [],
      exampleRequest: `{}`,
      exampleResponse: `{
      file: "/media/uploads/filename.png"
      filename: "filename.png"
      filesize: int
      folder: "uuid"
      height: int
      id: "uuid"
      is_grayscale: boolean
      owner_id: "uuid"
      path: "/docs/new/uploads/filename.png"
      uploaded_at: ISO 8601 DateTime
      width: int
    }`,
    },
    {
      id: "file-create",
      title: "Upload File",
      description: "Uploads a file to the specified folder.",
      method: "POST",
      endpoint: "/<user_id>/files/?folder_path=",
      params: [{ name: "file", description: "The file to upload." }],
      exampleRequest: `{
  "file": "image.png"
}`,
      exampleResponse: `{
  message: File uploaded successfully",
  data: {
      file: "/media/uploads/filename.png"
      filename: "filename.png"
      filesize: int
      folder: "uuid"
      height: int
      id: "uuid"
      is_grayscale: boolean
      owner_id: "uuid"
      path: "/docs/new/uploads/filename.png"
      uploaded_at: ISO 8601 DateTime
      width: int
    }
}`,
    },
    {
      id: "file-delete",
      title: "Delete File",
      description: "Deletes a file from the specified folder.",
      method: "DELETE",
      endpoint: "/<user_id>/files/<file_id>",
      params: [],
      exampleRequest: `{}`,
      exampleResponse: `{}`,
    },
  ],
};
