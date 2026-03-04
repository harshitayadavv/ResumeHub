# ResumeHub - AI Resume Assistant 🚀

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

**Elevate your resume to the next level with AI-powered intelligence. Get instant, context-aware analysis, actionable feedback, and tailor your resume to any job description in seconds.**

![ResumeHub Demo](https://your-link-to-image-or-gif.com/demo.gif)

---

### 🌐 Live Demo

**[ResumeHub](https://resumehub-app.netlify.app/)**

---

### 📋 Table of Contents

1.  [About The Project](#-about-the-project)
2.  [Key Features](#-key-features)
3.  [Tech Stack](#️-tech-stack)
4.  [Getting Started](#-getting-started)
5.  [Environment Variables](#-environment-variables)
6.  [API Endpoints](#-api-endpoints)
7.  [License](#-license)
8.  [Contact](#-contact)

---

### 📖 About The Project

ResumeHub is a full-stack MERN application designed to help job seekers gain a competitive edge. Traditional resume writing is often a guessing game. This tool removes the guesswork by leveraging AI to provide objective, actionable feedback and helps users perfectly align their resume with the specific requirements of a job posting.

---

### ✨ Key Features

* **🔐 Secure User Authentication:** JWT-based login and registration system with bcryptjs password hashing.
* **📊 Intelligent Resume Analysis:** Upload a PDF resume to receive AI-powered scoring with detailed breakdown across multiple dimensions, actionable insights, and specific areas for improvement.
* **✨ AI-Powered Resume Customization:** Paste any job description to have the AI analyze requirements and tailor your resume, highlighting relevant keywords, skills, and experience to maximize ATS compatibility.
* **📈 Content-Based Scoring:** Dynamic, context-aware scoring that analyzes actual resume content (skills, metrics, action verbs, experience) rather than generic templates.
* **👤 Personal Profile & History:** User dashboard to track all past resume analyses and customizations with detailed history.
* **🎨 Modern & Responsive UI:** Beautiful, animations-rich interface built with Tailwind CSS featuring gradients, smooth transitions, and professional design that works flawlessly on all devices.
* **⚡ PDF Handling:** Seamless PDF upload, parsing, and text extraction for accurate resume analysis.

---

### 🛠️ Tech Stack

This project is built with a modern MERN stack and cutting-edge AI technology.

| Frontend | Backend | Database | AI & Auth | File Handling |
| :--- | :--- | :--- | :--- | :--- |
| **React 18** (Vite) | **Node.js** | **MongoDB** | **Google Gemini 2.0 Flash** | **pdfjs-dist** |
| **Tailwind CSS** | **Express.js** | **Mongoose ODM** | **JWT & bcryptjs** | **Multer** |
| **React Router v6** | **Axios** | **MongoDB Atlas** | **OpenRouter API** (Fallback) | **PDF Parsing** |
| **Modern Animations** | **CORS** | | | |

---

### 🚀 Getting Started

This guide will walk you through setting up a local development environment.

#### Prerequisites

* **Git**: To clone the repository. [**Download Git here**](https://git-scm.com/downloads).
* **Node.js**: `v18.x` or later is recommended. [**Download Node.js here**](https://nodejs.org/en/download).

#### Installation & Setup

1.  **📂 Clone the Repository**
    ```sh
    git clone [https://github.com/harshitayadavv/resumehub.git](https://github.com/harshitayadavv/resumehub.git)
    cd resumehub
    ```

2.  **⚙️ Set Up the Backend Server**
    ```sh
    # Navigate to the backend folder
    cd backend
    # Install all required packages
    npm install
    # Create a .env file and add your secret variables
    touch .env
    ```

3.  **🖥️ Set Up the Frontend Client**
    ```sh
    # Open a new terminal and navigate to the frontend folder
    cd ../frontend
    # Install all required packages
    npm install
    # Create a .env file and add your API URL
    touch .env
    ```

4.  **▶️ Run the Application**
    * In the **backend** (`/backend`) terminal: `npm start`
    * In the **frontend** (`/frontend`) terminal: `npm run dev`

---

### 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` files.

#### `backend/.env`
```env
# The port for the Express server
PORT=8080

# Your MongoDB connection string (MongoDB Atlas recommended)
MONGO_URI=your_mongodb_connection_string

# A secret key for signing JSON Web Tokens
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini API key for AI analysis and customization
GEMINI_API_KEY=your_google_gemini_api_key

# Optional: OpenRouter API key as fallback
OPENROUTER_API_KEY=your_openrouter_api_key
```

#### `frontend/.env.local`
```env
# Your backend API URL
VITE_API_URL=http://localhost:8080
```

### ⚙️ API Key Setup

1. **Google Gemini API**: Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **OpenRouter** (Optional): Get an API key from [OpenRouter.ai](https://openrouter.ai/) for fallback support

---

### 📡 API Endpoints

#### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user account |
| `POST` | `/login` | Login and receive JWT token |

#### Resume Routes (`/api/resume`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/upload` | Upload and analyze a resume |
| `GET` | `/history` | Get user's resume analysis history |
| `DELETE` | `/:id` | Delete a specific resume analysis |

#### Customization Routes (`/api/customize-resume`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Customize resume based on job description |
| `GET` | `/history` | Get customization history |

#### User Routes (`/api/user`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/profile` | Get user profile information |
| `PUT` | `/profile` | Update user profile |
| `DELETE` | `/account` | Delete user account |

---

### 📊 Key Scoring Metrics

ResumeHub analyzes resumes across multiple dimensions:

- **📝 Content Quality** - Grammar, structure, and professionalism
- **🎯 Skill Alignment** - Match with job requirements
- **📈 Metrics & Achievements** - Quantifiable accomplishments
- **✍️ Action Verbs** - Strong, impactful language usage
- **🔑 Keyword Optimization** - ATS compatibility
- **💼 Experience Relevance** - Job-specific experience highlights

---

### 🏗️ Project Structure

```
ResumeHub/
├── frontend/                        # React Frontend (Vite)
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SmartAnalyzeForm.jsx
│   │   │   └── SmartCustomizeForm.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AnalyzePage.jsx
│   │   │   ├── CustomizePage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── utils/                   # Helper functions
│   │   │   └── renderResume.jsx
│   │   ├── App.jsx
│   │   ├── App.css                  # Global styles & animations
│   │   ├── index.css                # Tailwind & custom animations
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── backend/                         # Node.js Express Backend
│   ├── controllers/                 # Route handlers
│   │   ├── authController.js
│   │   ├── resumeController.js
│   │   ├── customizeResumeController.js
│   │   └── userController.js
│   ├── models/                      # Mongoose schemas
│   │   ├── userModel.js
│   │   └── resumeModel.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── resumeRoutes.js
│   │   ├── customizeRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/                  # Authentication middleware
│   │   └── authMiddleware.js
│   ├── utils/                       # Utility functions
│   │   ├── openai.js                # Google Gemini & AI logic
│   │   ├── pdfGenerator.js
│   │   ├── pdfUtils.js
│   │   └── generateToken.js
│   ├── config/                      # Configuration
│   │   └── db.js
│   ├── uploads/                     # Temporary file storage
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── README.md
└── package.json
```

---

### 🎨 UI/UX Highlights

- **🌈 Modern Gradient Design** - Beautiful color schemes throughout
- **⚡ Smooth Animations** - Slide-in, fade, and pulse effects
- **📱 Fully Responsive** - Mobile-first design approach
- **♿ Accessible** - WCAG compliant components
- **🎯 Intuitive Navigation** - Clear user flow
- **✨ Loading States** - Professional skeleton loaders and spinners

---

### 🔒 Security Features

- **🔐 JWT Authentication** - Secure token-based authentication
- **🛡️ bcryptjs** - Industry-standard password hashing
- **🚫 CORS Protection** - Cross-origin request validation
- **🔑 Protected Routes** - User data isolation
- **📋 Input Validation** - Server-side validation on all endpoints

---

### 🚀 Deployment

The application can be deployed to:
- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, Railway, Render
- **Database**: MongoDB Atlas (Cloud)

### 📝 Usage Guide

1. **Sign Up/Login** - Create an account or login with existing credentials
2. **Upload Resume** - Upload your PDF resume to the analyze section
3. **Get Feedback** - Receive AI-powered analysis with scores and suggestions
4. **Customize** - Paste a job description to tailor your resume
5. **Download** - Download your optimized resume as PDF
6. **Track History** - View all your analyses and customizations in your profile

---

### 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

### 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

### 📧 Contact

For questions, feedback, or support:

- **Email**: support@resumehub.app
- **GitHub**: [ResumeHub Repository](https://github.com/harshitayadavv/resumehub)
- **Report Issues**: [GitHub Issues](https://github.com/harshitayadavv/resumehub/issues)

---

<div align="center">

**Made with ❤️ for job seekers everywhere**

If you found ResumeHub helpful, please give it a ⭐ on GitHub!

</div>