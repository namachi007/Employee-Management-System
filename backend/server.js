require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const db = mysql.createPool({
   host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.getConnection()
  .then(connection => {
    console.log('Connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });




app.get('/api/employees', async (req, res) => {
  try {
    const query = 'SELECT * FROM employees ORDER BY created_at DESC';
    const [results] = await db.query(query); // Correctly using await
    res.json(results);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});


app.get('/api/employees/:id', async (req, res) => {
  try {
        const { id } = req.params;
        const query = 'SELECT * FROM employees WHERE id = ?';
        const [results] = await db.query(query, [id]);

        if (results.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
});


app.post('/api/employees', async (req, res) => {
  try {
        const { name, email, position, department, imageUrl } = req.body;
        console.log('POST /api/employees - Request body:', { name, email, position, department, imageUrl });
        
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        
        const cleanPosition = position && position.trim() !== '' ? position : null;
        const cleanDepartment = department && department.trim() !== '' ? department : null;
        const cleanImageUrl = imageUrl && imageUrl.trim() !== '' ? imageUrl : null;
        
        console.log('Cleaned data:', { cleanPosition, cleanDepartment, cleanImageUrl });

        const query = 'INSERT INTO employees (name, email, position, department, imageUrl) VALUES (?, ?, ?, ?, ?)';
        const [results] = await db.query(query, [name, email, cleanPosition, cleanDepartment, cleanImageUrl]);

        res.status(201).json({
            id: results.insertId,
            name,
            email,
            position: cleanPosition,
            department: cleanDepartment,
            imageUrl: cleanImageUrl,
            message: 'Employee created successfully'
        });
    } catch (err) {
        console.error('Error creating employee:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to create employee' });
    }
});


app.put('/api/employees/:id', async (req, res) => {
  try {
        const { id } = req.params;
        const { name, email, position, department, imageUrl } = req.body;
        console.log(`PUT /api/employees/${id} - Request body:`, { name, email, position, department, imageUrl });
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        
        const cleanPosition = position && position.trim() !== '' ? position : null;
        const cleanDepartment = department && department.trim() !== '' ? department : null;
        const cleanImageUrl = imageUrl && imageUrl.trim() !== '' ? imageUrl : null;

        const query = 'UPDATE employees SET name = ?, email = ?, position = ?, department = ?, imageUrl = ? WHERE id = ?';
        const [results] = await db.query(query, [name, email, cleanPosition, cleanDepartment, cleanImageUrl, id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ 
            id, 
            name, 
            email, 
            position: cleanPosition, 
            department: cleanDepartment, 
            imageUrl: cleanImageUrl, 
            message: 'Employee updated successfully' 
        });
    } catch (err) {
        console.error('Error updating employee:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Failed to update employee' });
    }
});


app.delete('/api/employees/:id', async (req, res) => {
 try {
        const { id } = req.params;
        const query = 'DELETE FROM employees WHERE id = ?';
        const [results] = await db.query(query, [id]);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});


app.get('/api/employees/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const query = `
      SELECT * FROM employees 
      WHERE name LIKE ? OR email LIKE ? OR position LIKE ? OR department LIKE ?
      ORDER BY created_at DESC
    `;
    
    const searchTerm = `%${q}%`;
    
    const [results] = await db.query(query, [searchTerm, searchTerm, searchTerm, searchTerm]);
    res.json(results);
  } catch (err) {
    console.error('Error searching employees:', err);
    res.status(500).json({ error: 'Failed to search employees' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});