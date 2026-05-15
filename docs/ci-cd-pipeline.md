# HireNova CI/CD Pipeline Documentation

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment.

## 🏗️ Pipeline Architecture
The pipeline is defined in `.github/workflows/ci-cd.yml` and consists of two primary jobs:

### 1. Frontend Build
- **Environment**: Ubuntu Latest
- **Node.js**: v22.12.0 (LTS)
- **Steps**:
    - Checkout Code
    - Setup Node.js with strict versioning
    - Install dependencies in `/frontend`
    - Build production assets via `vite build`
    - Upload `dist/` as an artifact

### 2. Backend Build
- **Environment**: Ubuntu Latest
- **Java**: JDK 17 (Temurin)
- **Steps**:
    - Checkout Code
    - Setup JDK
    - Compile Java source files using libraries in `lib/`
    - Package compiled classes into `HireNova-Backend.jar`
    - Upload `.jar` as an artifact

## 🚀 How to use
- **Trigger**: Every push to `main` or `master`.
- **Status**: Check the badge on the `README.md` or the "Actions" tab on GitHub.
- **Artifacts**: Download the built frontend and backend from the "Summary" page of any successful run.

## 🛠️ Troubleshooting
If you encounter Node.js version errors:
- Ensure the runner is using `actions/setup-node@v4`.
- The current configuration forces **Node.js 22.12.0** to satisfy Vite requirements.
