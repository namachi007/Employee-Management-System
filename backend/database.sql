-- Schema 

CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    position VARCHAR(255),
    department VARCHAR(255),
    imageUrl TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ALTER TABLE employees
ADD COLUMN IF NOT EXISTS imageUrl TEXT NULL;

-- Sample data ->
INSERT INTO employees (name, email, position, department, imageUrl) VALUES
('Raj', 'raj@gmail.com', 'Software Engineer', 'Engineering', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'),
('Sighn', 'sighn@gmail.com', 'Product Manager', 'Product', 'https://images.unsplash.com/photo-1494790108755-2616b612b1ab?w=150&h=150&fit=crop&crop=face'),
('Dhoni', 'Dhoni@gmail.com', 'UX Designer', 'Design', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'),
('Sachin', 'sachin@gmail.com', 'HR Manager', 'Human Resources', NULL),
('David', 'david@gmail.com', 'Marketing Specialist', 'Marketing', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face')
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    position = VALUES(position),
    department = VALUES(department),
    imageUrl = VALUES(imageUrl);