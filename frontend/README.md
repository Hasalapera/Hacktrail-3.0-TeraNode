# 🚀 UniTasker (Hacktrail API)

> **Team Mapogo Fam** | One-Day Hackathon Project
> Addressing financial hardships and creating economic opportunities for university undergraduates through a localized micro-freelancing ecosystem.

---

## 🤖 AI Developer Context (For AI Agents & Copilots)
*Hello AI Assistant! If you are reading this to help develop the project, please adhere to the following context:*
- **Stack:** PERN (PostgreSQL, Express, React, Node.js)
- **Architecture:** Monolithic REST API with CommonJS (`require`).
- **ORM:** Sequelize (with Sequelize CLI for migrations).
- **Database:** Supabase PostgreSQL (SSL enabled).
- **Primary Goal:** Rapid MVP development emphasizing clean database relations and functional REST endpoints. Ignore complex microservices or websockets for now.

---

## 📌 Project Overview
**Problem:** University students face financial hardships but lack the time for full-time employment. Concurrently, the surrounding rural and local communities need affordable, accessible technical and micro-services (e.g., PC repair, graphic design, tutoring, data entry).
**Solution:** A closed-network gig platform where verified students can offer their skills to local businesses and individuals. Students earn a flexible income, and the community gets affordable services.

## ⚙️ Technology Stack
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL (Hosted on Supabase)
*   **ORM / Migrations:** Sequelize & Sequelize CLI
*   **Frontend:** React.js (Planned)

## 🗄️ Database Schema & Models

### 1. User Model (`Users` table)
Handles both Students and Employers.
*   `id`: UUID (Primary Key)
*   `name`: String
*   `email`: String (Unique)
*   `password`: String (Hashed)
*   `role`: ENUM ('STUDENT', 'EMPLOYER')
*   `isOpenToWork`: Boolean (Default: false) - *Student only*
*   `skills`: Array of Strings - *Student only*

### 2. Job Model (`Jobs` table)
Tasks or gigs posted by Employers.
*   `id`: UUID (Primary Key)
*   `title`: String
*   `description`: Text
*   `category`: String
*   `paymentType`: ENUM ('TASK_BASED', 'DAILY_WAGE')
*   `amount`: Decimal
*   `status`: ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED')
*   `employerId`: UUID (Foreign Key -> Users)
*   `studentId`: UUID (Foreign Key -> Users, Nullable)

### 3. Message Model (`Messages` table)
Internal communication between Employer and Student.
*   `id`: UUID (Primary Key)
*   `content`: Text
*   `senderId`: UUID (Foreign Key -> Users)
*   `receiverId`: UUID (Foreign Key -> Users)

## 🚀 Setup & Installation

### 1. Clone & Install
```bash
git clone <repository-url>
cd unitasker
npm install
```

### 2. Environment Variables (.env)
Create a `.env` file in the root directory:
```env
PORT=5000
DB_URL=postgresql://postgres.[project-ref]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### 3. Database Setup (Sequelize CLI)
Ensure you have the `.sequelizerc` file configured, then run:
```bash
# Run migrations to create tables in Supabase
npx sequelize-cli db:migrate
```

### 4. Start the Server
```bash
npm start
# OR for development
npm run dev
```

## 📈 API Endpoints (To Be Implemented)
*   `POST /api/auth/register` - Register a user (Student/Employer)
*   `POST /api/auth/login` - Authenticate and return token
*   `GET /api/jobs` - List all open jobs
*   `POST /api/jobs` - Post a new job (Employer only)
*   `PUT /api/jobs/:id/assign` - Assign a job to a student
*   `GET /api/messages/:jobId` - Get messages for a specific job negotiation