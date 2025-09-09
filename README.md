# Professional Employee Management System

A modern, full-stack CRUD application for managing employees with a clean and professional user interface.

## Features

- ✨ Modern, responsive design with Tailwind CSS
- 🔍 Real-time search functionality  
- ➕ Create, edit, and delete employees
- 📱 Mobile-friendly interface
- 🎯 Professional card-based layout
- 🔔 Toast notifications for user feedback

## Tech Stack

**Backend:** Node.js, Express.js, MySQL, CORS
**Frontend:** React 19, Tailwind CSS, React Icons, Axios

## Quick Setup

### Database Setup
1. Create MySQL database: `CREATE DATABASE employee_management;`
2. Run schema: `mysql -u root -p employee_management < backend/database.sql`
3. Update `backend/.env` with your MySQL credentials

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup  
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee  
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?q=<query>` - Search employees

## Usage

1. Start backend server on port 5000
2. Start frontend on port 3000
3. Access application at http://localhost:3000

The application features a professional interface with employee cards, search functionality, and modal forms for creating/editing employees.# Employee-Management-System
