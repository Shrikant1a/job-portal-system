# HireNova - Premium Job Matching Platform ✨

![CI/CD Pipeline](https://github.com/Shrikant1a/job-portal-system/actions/workflows/ci-cd.yml/badge.svg)

HireNova is a modern, high-fidelity job portal designed to connect talented professionals with world-class opportunities. Featuring a sleek dark-themed interface with glassmorphism aesthetics, it provides a seamless experience for both job seekers and employers.

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](screenshot/homepage.png)

### 🔑 Login Page
![Login Page](screenshot/login.png)

### 💼 Find Jobs
![Jobs Page](screenshot/jobs.png)

### 🏢 Companies
![Companies Page](screenshot/companies.png)

### 🌍 Live Global Jobs
![Live Jobs](screenshot/live_jobs.png)

### 👤 User Profile
![Profile Page](screenshot/profile.png)

---

## 🚀 Getting Started

Follow these steps to set up and run HireNova on your local machine.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
*   **Java JDK 17 or higher** (Check with `java -version`)
*   **Node.js v18 or higher** (Check with `node -v`)
*   **MySQL Server** (If you plan to run the database locally)
*   **Git** (To clone the repository)

---

### 1️⃣ Database Setup 🗄️

You can either use the pre-configured cloud database or set up a local MySQL instance.

#### Option A: Local MySQL (Recommended for development)
1.  Open your MySQL terminal or a tool like MySQL Workbench.
2.  Create a new database:
    ```sql
    CREATE DATABASE hirenova;
    ```
3.  Import the schema and sample data:
    ```bash
    mysql -u your_username -p hirenova < db/db.sql
    ```
4.  Configure the environment variables (see below).

#### Option B: Cloud Database
The project is pre-configured to connect to a hosted MySQL instance. No setup is required for the database if you use the default credentials in `src/com/jobportal/application/models/DB_VARIABLES.java`.

---

### 2️⃣ Backend Setup (Java API) ⚙️

The backend is a custom Java HTTP server.

1.  **Configure Environment Variables**:
    Create a `.env` file in the root directory (based on `.env.example`) or set the following environment variables in your terminal:
    ```bash
    DB_HOST=localhost
    DB_PORT=3306
    DB_NAME=hirenova
    DB_USER=your_username
    DB_PASSWORD=your_password
    ```

2.  **Compile the Backend**:
    From the project root, run:
    ```powershell
    # Create bin directory if it doesn't exist
    mkdir bin
    
    # Compile all java files
    javac -cp "lib/*" -d bin src/com/jobportal/application/*.java src/com/jobportal/application/models/*.java
    ```

3.  **Run the API Server**:
    ```powershell
    java -cp "bin;lib/*" com.jobportal.application.ApiServer
    ```
    *The server will start at `http://localhost:8080`.*

---

### 3️⃣ Frontend Setup (React + Vite) 💻

1.  **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
    *The frontend will be available at `http://localhost:5173`.*

---

## 🛠️ Tech Stack

*   **Frontend**: React 19, Vite, Lucide React, Axios
*   **Backend**: Pure Java (Custom HTTP Server), GSON for JSON
*   **Database**: MySQL
*   **Aesthetics**: Glassmorphism, Dark Mode, Custom Vanilla CSS

---

## 🏗️ Architecture & Design

### 📊 Activity Flow Diagram
![Activity Flow](activity_flow_diagram.jpg)

### 📐 Class Diagram
![Class Diagram](class_diagram.jpg)

### 🗄️ Database Schema
![Database Schema](db.png)

---

## 🚀 CI/CD Pipeline

The project uses GitHub Actions for automated builds:
- **Frontend**: Built and validated on every push.
- **Backend**: Compiled and packaged into artifacts.
- **Deployment**: Configured for Railway (Backend) and Netlify (Frontend).

---

## 🤝 Support & Contact

If you encounter any issues during setup, please reach out:
📧 **Email**: support@hirenova.com
🌐 **Website**: [hirenova.com](https://hirenova.com)

© 2026 HireNova. Designed with precision and built for performance.

