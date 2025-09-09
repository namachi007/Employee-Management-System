-- Schema 

CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(255),
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Sample data ->
INSERT INTO employees (name, email, position, department) VALUES
('Raj', 'raj@gmail.com', 'Software Engineer', 'Engineering'),
('Sighn', 'sighn@gmail.com', 'Product Manager', 'Product'),
('Dhoni', 'Dhoni@gmail.com', 'UX Designer', 'Design'),
('Sachin', 'sachin@gmail.com', 'HR Manager', 'Human Resources'),
('David', 'david@gmail.com', 'Marketing Specialist', 'Marketing');