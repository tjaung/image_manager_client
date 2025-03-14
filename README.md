# Vue.js Image Management App

This is a **Vue.js** application that provides an intuitive interface for managing image files and folders. Users can upload images, create folders, and view metadata such as file size, dimensions, and color mode.

## Features

- **User Authentication**: Login, signup, logout, and token-based authentication.

- **Folder Management**: Create, rename, move, and delete folders.

- **File Management**: Upload images, move files, rename files, and delete files.

- **Metadata Display**: View image properties such as dimensions, file size, and color mode.

- **Responsive UI**: Optimized for both desktop and mobile devices.

- **PrimeVue Components**: Uses **PrimeVue** for UI elements like dialogs, buttons, and forms.

- **API Integration**: Connects to a Django backend via REST API.

---

## **Installation & Setup**

### **1\. Clone the Repository**

```
git clone https://github.com/yourusername/your-vue-project.git
cd your-vue-project
```

### **2\. Install Dependencies**

```
npm install
```

### **3\. Run the Development Server**

```
npm run serve
```

By default, the app runs on `**http://localhost:8080/**`

### **4\. Environment Variables**

To configure the API connection, create a `.env` file in the root directory:

```
VUE_APP_API_BASE_URL=http://127.0.0.1:8000/api/
```

---

## **Project Structure**

```
📦 your-vue-project
├── 📁 src
│   ├── 📁 components   # Reusable UI components
│   ├── 📁 views        # Pages (Dashboard, Auth, etc.)
│   ├── 📁 store        # Vuex store for state management
│   ├── 📁 api          # API service calls
│   ├── 📁 assets       # Static assets (images, icons, etc.)
│   ├── 📁 router       # Vue Router configuration
│   ├── 📄 main.ts      # App entry point
│   ├── 📄 App.vue      # Root component
├── 📄 .env             # Environment variables
├── 📄 package.json     # Dependencies & scripts
├── 📄 README.md        # Project documentation
```

---

## **Usage Guide**

### **Authentication**

- Users can **sign up, log in, and log out**.

- JWT authentication is used to protect routes.

### **Folder Management**

- Click "Add Folder" to create a new folder.

- Delete a folder with the Delete button.

- Make sub folders for a true os file management experience.

### **File Management**

- Click "Upload Image" to add an image file.

- File details, including **size, dimensions, and color mode**, are displayed.

- Files can be viewed and deleted.

### **Navigation**

- The **Path** above the file explorer allows quick access to folders, and files.

---

## **API Endpoints**

This app interacts with a **Django backend** via REST API.

[Link to the Django REST API](https://github.com/tjaung/image_manager_django/tree/main)

### **Authentication Endpoints**

| Method | Endpoint | Description |
| POST | `/auth/signup/` | Register a new user |
| POST | `/auth/login/` | Login and receive token |
| POST | `/auth/logout/` | Logout user |
| GET | `/auth/test_token/` | Validate auth token |

### **Folder Endpoints**

| Method | Endpoint | Description |
| GET | `/{user_id}/folders/` | List user folders |
| POST | `/{user_id}/folders/` | Create a folder |
| PUT | `/{user_id}/folders/{id}/` | Rename/move folder |
| DELETE | `/{user_id}/folders/{id}/` | Delete folder |

### **File Endpoints**

| Method | Endpoint | Description |
| GET | `/{user_id}/files/{id}/` | Get file details |
| POST | `/{user_id}/files/` | Upload file |
| PUT | `/{user_id}/files/{id}/` | Move/rename file |
| DELETE | `/{user_id}/files/{id}/` | Delete file |

---

## **Troubleshooting**

### **Common Issues**

| Issue | Solution |
| API requests failing? | Check `VUE_APP_API_BASE_URL` in `.env` and make sure you are running the server. |
| "Module not found" error? | Run `npm install` to reinstall dependencies |

---

## **Contributing**

Pull requests are welcome! If you find a bug or have a feature request, feel free to open an issue.

---

## **License**

This project is licensed under the **MIT License**.

---

## **Contact**

For any inquiries, contact: **jaungt@gmail.com**
