# Task Management Application

A full-stack task management application where users can register, log in, and manage their own tasks securely.

Built using **React + Vite + Tailwind CSS** on the frontend and **Node.js + Express + TypeScript + Prisma + MySQL** on the backend with **JWT-based authentication**.

---

## Features

### Authentication
- User registration (username & password)
- Login with JWT authentication
- Logout
- Protected routes (frontend & backend)

### Task Management
- Create tasks
- View tasks (only for logged-in user)
- Update task status (Pending / Completed)
- Delete tasks
- Secure ownership enforcement (users can access only their tasks)

---

## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Axios
- React Hook Form + Zod
- React Router

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- bcrypt (password hashing)

---

## Prerequisites

Make sure you have installed:
- Node.js (>= 18)
- npm
- MySQL
- Git

---

##  Backend Setup

### 1️. Navigate to backend
cd backend

### 2. Install dependencies
npm install

### 3. Environment variables
Create a .env file in backend/:

Inside .env file:

DATABASE_URL="mysql://username:password@localhost:port/database_name"
DATABASE_USER="root"
DATABASE_PASSWORD="vipul"
DATABASE_NAME="mydb"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
JWT_SECRET="dkgut8t6545dygvcesqygughh"
FRONTEND_URL="http://localhost:5173"
PORT=5000

### 4. Prisma setup
npx prisma migrate dev --name init
npx prisma generate

refer to this [Prisma installation docs](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/mysql) for more information.

### 5. Start backend server
npm run dev

Backend runs on (by default):
http://localhost:5000

## Frontend Setup

### 1. Navigate to frontend
cd frontend

### 2. Install dependencies
npm install

### 3. Start Frontend
npm run dev

Frontend runs on (by default):
http://localhost:5173

