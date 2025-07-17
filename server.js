const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Harshitha@28', // update as per your MySQL
  database: 'attendance_db'
});

// ✅ Create Employee + QR Code
app.post('/api/employees', (req, res) => {
  const { name, email, empid, department } = req.body;

  const insertQuery = 'INSERT INTO employees (name, email, empid, department) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [name, email, empid, department], (err, result) => {
    if (err) return res.status(500).send(err);

    const id = result.insertId;
    const qrData = `EMPLOYEE_${empid || id}`;

    QRCode.toDataURL(qrData, (err, qrUrl) => {
      if (err) return res.status(500).send(err);

      const updateQuery = 'UPDATE employees SET qr_code = ? WHERE id = ?';
      db.query(updateQuery, [qrUrl, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ id, qr: qrUrl });
      });
    });
  });
});

// ✅ Attendance Log
app.post('/api/employees', (req, res) => {
  const { name, email, empid, department } = req.body;
  const sql = 'INSERT INTO employees (name, email, empid, department) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, empid, department], (err, result) => {
    if (err) return res.status(500).send(err);

    const id = result.insertId;
    const qrData = `EMPLOYEE_${empid || id}`;
    QRCode.toDataURL(qrData, (err, qrUrl) => {
      if (err) return res.status(500).send(err);

      db.query('UPDATE employees SET qr_code = ? WHERE id = ?', [qrUrl, id], (err2) => {
        if (err2) return res.status(500).send(err2);
        res.send({ id, qr: qrUrl });
      });
    });
  });
});

// ✅ Attendance Reports
app.get('/api/reports', (req, res) => {
  db.query(
    'SELECT e.name, a.check_in, a.check_out FROM attendance_logs a JOIN employees e ON a.employee_id = e.id ORDER BY a.check_in DESC',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    }
  );
});

app.listen(5000, () => console.log('✅ Backend running on port 5000'));
// Get all employees
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Get single employee
app.get('/api/employees/:id', (req, res) => {
  db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results[0]);
  });
});

// Get logs for employee
app.get('/api/employees/:id/logs', (req, res) => {
  db.query(
    'SELECT check_in, check_out FROM attendance_logs WHERE employee_id = ? ORDER BY check_in DESC',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    }
  );
});

// Delete employee
// DELETE employee by ID
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM employees WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Employee deleted', id });
  });
});

