# 🔐 Login System – Frontend (React + Vite)

## 📌 Project Description

This project is the **frontend** of a Full Stack Login System built using **React and Vite**. It provides a user interface for authentication, password reset, and profile management.

The frontend communicates with the **Spring Boot backend API**.

---

## 🚀 Features

* ✅ User Registration
* ✅ User Login
* ✅ Forgot Password (Email Reset Link)
* ✅ Reset Password using Token
* ✅ Update Profile
* ✅ Upload Profile Image
* ✅ Responsive UI
* ✅ Modern Design

---

## 🛠 Tech Stack

* React JS
* Vite
* Axios
* React Router DOM
* CSS

---

## 📁 Folder Structure

src/
│
├── assets/ # Images and static files
│
├── components/ # Reusable components
│
├── pages/
│ └── auth/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Forgotpwd.jsx
│ ├── ResetPasswordPage.jsx
│
├── App.jsx
├── main.jsx

yaml
Copy code

---

## ⚙️ Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/projectname.git
Step 2: Navigate to frontend folder
bash
Copy code
cd frontend
Step 3: Install dependencies
bash
Copy code
npm install
Step 4: Run the project
bash
Copy code
npm run dev
App runs on:

arduino
Copy code
http://localhost:5173
🔗 Backend Connection
Make sure backend is running on:

arduino
Copy code
http://localhost:8080
API endpoints used:

POST /api/user/register

POST /api/user/login

POST /api/user/send-forgot-password-email

POST /api/user/reset-password

PUT /api/user/update

🌐 Environment Variables (Recommended)
Create .env file in frontend root:

env
Copy code
VITE_API_URL=http://localhost:8080
Use in axios:

javascript
Copy code
axios.post(`${import.meta.env.VITE_API_URL}/api/user/login`)
🖼 Screenshots
Add screenshots here

Example:

Login Page

Forgot Password Page

Profile Page

🌍 Deployment
Frontend deployed link:

arduino
Copy code
https://yourfrontendlink.com
Example:

Netlify

Vercel

GitHub Pages

⚠ Important Notes
Backend must be running before using frontend

Email reset link works only if backend mail configured

Node version recommended:

Copy code
Node 18+
📦 Build for Production
bash
Copy code
npm run build
👨‍💻 Author
Karthikeyan B

📧 Email: yourmail@gmail.com

GitHub: https://github.com/yourusername

📄 License
This project is for educational purposes.
```
