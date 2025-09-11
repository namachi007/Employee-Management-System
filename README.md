# Employee Management System

A modern, full-stack CRUD application for managing employees, built with a React/Redux frontend and a Node.js/Express/MySQL backend. This project features a professional dashboard UI and demonstrates best practices in state management and API design.


## Features

-   **Full CRUD Functionality**: Create, read, update, and delete employee records.
-   **Modern Dashboard UI**: A professional, responsive layout with a sidebar and top navigation bar.
-   **Centralized State Management**: Uses Redux Toolkit for predictable and scalable state management.
-   **Profile Pictures**: Ability to add and display employee profile pictures via URL.
-   **Real-time Search**: Instantly filter the employee list by name, email, position, or department.
-   **Notifications**: Provides user feedback for actions like creating, updating, or deleting employees.
-   **Confirmation Modals**: Ensures safe deletion of records.

## Tech Stack

-   **Frontend**: React, Redux Toolkit, Tailwind CSS, Axios, React Icons
-   **Backend**: Node.js, Express.js, MySQL2, CORS, Dotenv
-   **Database**: MySQL

## Getting Started

To run this project locally, follow these steps:

### 1. Setup the Database

-   Make sure you have a MySQL server running.
-   Run the entire script from `backend/database.sql` in a tool like MySQL Workbench. This will create the database, the table, and insert sample data(if needed).

### 2. Configure the Backend

-   Navigate to the `backend` directory.
-   Create a `.env` file and add your database credentials. It should look like this:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=employee_management
    ```

### 3. Run the Application

You will need two terminals open.

-   **In your first terminal**, start the backend server:
    ```bash
    cd backend
    npm install
    npm run dev
    ```

-   **In your second terminal**, start the frontend server:
    ```bash
    cd frontend
    npm install
    npm start
    ```

The application will now be running at `http://localhost:3000`.

