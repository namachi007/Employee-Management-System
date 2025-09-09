const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Namachi@123',
  database: process.env.DB_NAME || 'employee_management'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});




app.get('/api/employees', async (req, res) => {
  const query = 'SELECT * FROM employees ORDER BY created_at DESC';
  
   await db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Failed to fetch employees' });
    }
    res.json(results);
  });
});


app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM employees WHERE id = ?';
  
  await db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).json({ error: 'Failed to fetch employee' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(results[0]);
  });
});


app.post('/api/employees', async (req, res) => {
  const { name, email, position, department } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const query = 'INSERT INTO employees (name, email, position, department) VALUES (?, ?, ?, ?)';
  
  await db.query(query, [name, email, position, department], (err, results) => {
    if (err) {
      console.error('Error creating employee:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Failed to create employee' });
    }
    
    res.status(201).json({
      id: results.insertId,
      name,
      email,
      position,
      department,
      message: 'Employee created successfully'
    });
  });
});


app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, position, department } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const query = 'UPDATE employees SET name = ?, email = ?, position = ?, department = ? WHERE id = ?';
  
  await db.query(query, [name, email, position, department, id], (err, results) => {
    if (err) {
      console.error('Error updating employee:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Failed to update employee' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({
      id,
      name,
      email,
      position,
      department,
      message: 'Employee updated successfully'
    });
  });
});


app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';
  
  await db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Failed to delete employee' });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  });
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});