# LockBox 🔐📂

## An Improved Version of CipherFiles. ✨

**LockBox** is a secure file encryption and decryption platform using AES-256-CTR method, that allows users to upload, store, and share files securely. With unique secret keys generated for every file, users can ensure that their data is encrypted, accessible only to authorized individuals with the key. 

---

## Features ⚡

- **User Authentication**: Secure login and registration system.
- **File Encryption**: AES-256 encryption to secure uploaded files.
- **File Decryption**: Decrypt and download files using a secret key.
- **User-Specific Files**: Each user's files are privately managed.
- **Key-Based Access**: Access to files is granted only with the corresponding secret key.

---

## Snippets

![dashboard](https://github.com/user-attachments/assets/82032219-7f35-4fde-8c83-9592477a0a7f)

![myfiles](https://github.com/user-attachments/assets/591f91f0-2dd9-4a28-b95b-af7c1f43ec9c)

![upload](https://github.com/user-attachments/assets/d08c65a7-643b-416d-bd7f-a50dead13d45)

![copied](https://github.com/user-attachments/assets/fc357b70-7e22-4ba4-b1c8-8ec750a9765d)

![filedownloadunlocked](https://github.com/user-attachments/assets/c8d769cf-a66c-4798-8ce1-df5af9a52570)

## Work Flow

1. **Upload a File**: Log in, upload a file, and get a unique secret key for encryption.
2. **Download a File**: Use the secret key to decrypt and download a file.
3. **Manage Files**: View, download, and delete files from your personal dashboard.

---

## Tech Stack

### **Frontend**:
- React.js
- Material-UI
- Axios for HTTP requests
- React Router for navigation
- React Toastify for notifications

### **Backend**:
- Node.js with Express.js
- MongoDB for database management
- Multer for file uploads
- Crypto for encryption and decryption

---

## Setup and Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js and npm
- MongoDB installed and running locally or remotely
- Git

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/lockbox.git
   cd lockbox
   ```

2. **Install Dependencies**

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```

   - **Frontend**:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Set up MongoDB**

   Ensure MongoDB is running on your system. If using a remote MongoDB instance, update the connection string in the backend `server.js` file:
   ```javascript
   mongoose.connect('your_mongo_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });
   ```

4. **Run the Application**

   - Start the backend server:
     ```bash
     cd backend
     node server.js
     ```

   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the Application**

   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

### Backend
```
backend/
│
├── models/
│   ├── File.js          # File model
│   └── User.js          # User model
│
├── uploads/             # Encrypted file storage
├── server.js            # Main backend server
└── package.json         # Backend dependencies
```

### Frontend
```
frontend/
│
├── src/
│   ├── components/      # React components (Dashboard, Login, etc.)
│   ├── App.js           # Main app file
│   ├── index.js         # React entry point
│   └── package.json     # Frontend dependencies
```

---

## API Endpoints

### **User Authentication**
| Endpoint           | Method | Description             |
|--------------------|--------|-------------------------|
| `/register`        | POST   | Register a new user     |
| `/login`           | POST   | Log in an existing user |

### **File Operations**
| Endpoint           | Method | Description                     |
|--------------------|--------|---------------------------------|
| `/upload`          | POST   | Upload and encrypt a file       |
| `/download/:file`  | POST   | Decrypt and download a file     |
| `/verify-key`      | POST   | Verify the secret key for a file |
| `/files`           | GET    | Fetch all files for a user      |
| `/files/:id`       | DELETE | Delete a specific file          |

---

## Environment Variables

Create a `.env` file in the `backend` directory for environment-specific configurations:
```
MONGO_URI=your_mongo_connection_string
PORT=5000
```
---

## Contributing ❤️🙏

I love contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For inquiries or support, contact me at [sherlockx90@gmail.com](mailto:sherlockx90@gmail.com).

---

Enjoy using **LockBox🔐**!
