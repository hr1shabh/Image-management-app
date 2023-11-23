FastAPI React Authentication Project
Overview
This project comprises a straightforward authentication system incorporating FastAPI for the backend and React for the frontend. It includes features such as user registration, login, token-based authentication, and role-based authorization.

Features
User Registration: Allow users to register with a unique username, password, and role (normal user or administrator).

User Login: Authenticate users with their credentials and issue JSON Web Tokens (JWT) for subsequent requests.

Token-based Authentication: Use JWT to secure API endpoints and validate user identity.

Role-based Authorization: Distinguish between normal users and administrators with role information stored in JWT.

Dashboard Pages: Implement separate dashboard pages for normal users and administrators.

Image and Label Management: Allow administrators to manage images and labels through the admin dashboard.

Tech Stack
Backend
FastAPI: A modern, fast, web framework for building APIs with Python 3.7+.

JWT: JSON Web Tokens for token-based authentication.

Frontend
React: A JavaScript library for building user interfaces.

React Router: A declarative routing library for React.

Tailwind CSS: A utility-first CSS framework for styling.

Project Structure
backend: Contains the FastAPI backend code, including API routes, authentication, and storage.

frontend: Holds the React frontend code, with components, pages, and styles.

Setup
Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies for the backend and frontend:

bash
Copy code
# Navigate to the backend folder
cd backend
pip install fastapi uvicorn python-jose pydantic

# Navigate to the frontend folder
cd frontend
cd image-management-app
npm install
Run the backend and frontend separately:

Backend:

bash
Copy code
# Inside the backend folder
uvicorn main:app --reload
Frontend:

bash
Copy code
# Inside the frontend folder
npm start
Access the application in your web browser:

Backend: http://localhost:8000
Frontend: http://localhost:3000
        - /login
        - /register
        - /admin-dashboard
        - /dashboard
After login/register:
    if user is admin : he/she can got to both dashboards
    else he can only go to dashboard (if he try to go to admin-dashboard, he will be redirected to dashboard)