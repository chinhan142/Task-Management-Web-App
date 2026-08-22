# Task Management Web App API

A robust RESTful API backend for a Task Management Web Application built with Node.js, Express.js, Prisma ORM, and MySQL/MariaDB. This application provides secure user authentication, project creation, role-based member management, task assignment, search and pagination, and project analytics.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Server](#running-the-server)
- [API Reference](#api-reference)
  - [Authentication Routes](#authentication-routes)
  - [Project Routes](#project-routes)
  - [Member Routes](#member-routes)
  - [Task Routes](#task-routes)
  - [Analytics & Personal Routes](#analytics--personal-routes)
- [Error Handling](#error-handling)

---

## Overview

The Task Management Web App API serves as the backend service designed to manage projects, assign tasks to members, track project progress, and calculate workload statistics. It implements JWT-based authentication, custom Express middleware for authorization, and relational database management via Prisma ORM.

---

## Key Features

- **User Authentication**: Secure registration and login using bcrypt password hashing and JSON Web Tokens (JWT).
- **Project Management**: Create, view, update, and delete projects. Project creators automatically receive the OWNER role.
- **Member Management**: Add existing users to projects with specific roles (OWNER, MEMBER) and enforce access permissions.
- **Task Operations**: Full CRUD lifecycle for tasks including priority levels (LOW, MEDIUM, HIGH), status tracking (TODO, DOING, DONE), due dates, and assignee designation.
- **Filtering & Pagination**: Query tasks with pagination support (`page`, `limit`), status filtering, priority filtering, assignee filtering, and title keyword search.
- **Role-Based Authorization**: Middleware-level verification enforcing project ownership and membership permissions across endpoints.
- **Statistics & Analytics**: Endpoint metrics for project task distributions and personal user task summaries.

---

## Tech Stack

- **Runtime Environment**: Node.js (ES Modules)
- **Web Framework**: Express.js (v5)
- **Database & ORM**: MySQL / MariaDB, Prisma ORM (v7)
- **Authentication**: JSON Web Token (`jsonwebtoken`), `bcryptjs`
- **Security & Utilities**: `cors`, `dotenv`
- **Development Tooling**: `nodemon`

---

## Project Architecture

The project follows a clean layered MVC/Service architecture:

```text
Module04-Capstone-TaskManagement/
├── prisma/
│   ├── schema.prisma          # Database schema definitions and relationships
│   └── seed.js                # Initial database seed script
├── src/
│   ├── config/
│   │   └── prisma.config.js   # Prisma client instantiation
│   ├── controllers/           # HTTP request/response handlers
│   │   ├── auth.controller.js
│   │   ├── member.controller.js
│   │   ├── personal.controller.js
│   │   ├── project.controller.js
│   │   ├── stat.controller.js
│   │   └── task.controller.js
│   ├── middlewares/           # Custom validation & authorization middlewares
│   │   ├── auth.middleware.js
│   │   ├── project.middleware.js
│   │   ├── task.middleware.js
│   │   └── validate.middleware.js
│   ├── routes/                # Express router definitions
│   │   ├── auth.routes.js
│   │   ├── member.routes.js
│   │   ├── personal.routes.js
│   │   ├── project.routes.js
│   │   ├── stat.routes.js
│   │   └── task.routes.js
│   ├── services/              # Core business logic and database queries
│   │   ├── auth.service.js
│   │   ├── member.service.js
│   │   ├── project.service.js
│   │   ├── stat.service.js
│   │   └── task.service.js
│   └── utils/
│       └── response.util.js   # Standardized API response formatters
├── .env.example               # Environment variables template
├── package.json
└── server.js                  # Application entry point
```

---

## Database Schema

The database consists of four primary models:

1. **User**: Stores account credentials (`name`, `email`, `password`, `phone`).
2. **Project**: Stores project metadata (`name`, `description`, `startDate`, `endDate`, `ownerId`).
3. **ProjectMember**: Junction model linking users and projects with role metadata (`role`: OWNER/MEMBER, `joinedAt`).
4. **Task**: Represents individual task items (`title`, `description`, `status`, `priority`, `dueDate`, `projectId`, `assigneeId`, `createdById`).

---

## Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- MySQL / MariaDB Server running locally or remotely
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Module04-Capstone-TaskManagement
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory based on `.env.example` and configure your environment variables:

```bash
cp .env.example .env
```

The required configuration categories include:

- **Server Configuration**: Application port setting (`PORT`).
- **Database Connection**: Database URL (`DATABASE_URL`) and driver adapter parameters (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- **JWT Configuration**: Secret key for token signing (`JWT_SECRET`) and expiration duration (`EXPIRES_IN`).


### Database Setup

1. Push schema changes to your database:
   ```bash
   npx prisma db push
   ```

2. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

3. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```

### Running the Server

- Development mode (with hot reloading via `nodemon`):
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  node server.js
  ```

The server will start at `http://localhost:5000` (or your configured `PORT`).

---

## API Reference

Base API Endpoint Path: `/api/v1`

### Authentication Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register a new user account |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user and return JWT token |
| `GET` | `/api/v1/auth/profile` | Bearer Token | Retrieve authenticated user profile |

### Project Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/projects` | Bearer Token | Get all projects joined by current user |
| `GET` | `/api/v1/projects/:id` | Bearer Token (Member/Owner) | Get detailed project info with member list |
| `POST` | `/api/v1/projects` | Bearer Token | Create a new project |
| `PUT` | `/api/v1/projects/:id` | Bearer Token (Owner) | Update existing project details |
| `DELETE` | `/api/v1/projects/:id` | Bearer Token (Owner) | Delete a project and associated resources |

### Member Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/projects/:id/members` | Bearer Token (Owner) | Add a user to a project as a member |

### Task Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/projects/:id/tasks` | Bearer Token (Member/Owner) | Fetch tasks with search, filters & pagination |
| `POST` | `/api/v1/projects/:id/tasks` | Bearer Token (Member/Owner) | Create a new task in a project |
| `PUT` | `/api/v1/projects/:id/tasks/:taskId` | Bearer Token (Assignee/Owner) | Update full task details |
| `PATCH` | `/api/v1/projects/:id/tasks/:taskId/status` | Bearer Token (Assignee/Owner) | Update task status (TODO, DOING, DONE) |
| `DELETE` | `/api/v1/projects/:id/tasks/:taskId` | Bearer Token (Owner) | Delete a task |

### Analytics & Personal Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/projects/:id/stats` | Bearer Token (Member/Owner) | Get project task completion statistics |
| `GET` | `/api/v1/users/me/stats` | Bearer Token | Get task assignment statistics for current user |

---

## Error Handling

The application uses a centralized error-handling middleware. Errors return a consistent JSON payload:

```json
{
  "success": false,
  "message": "Error description message",
  "data": null
}
```

Standard HTTP status codes used:
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure or bad input data.
- `401 Unauthorized`: Missing or invalid JWT authentication token.
- `403 Forbidden`: Insufficient permissions for requested resource.
- `404 Not Found`: Requested resource or route does not exist.
- `409 Conflict`: Resource duplication (e.g. registered email conflict).
- `500 Internal Server Error`: Server errors.
