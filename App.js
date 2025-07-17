import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import QRScanner from './QRScanner';
import EmployeeList from './EmployeeList';
import Reports from './Reports';
import EmployeeLogs from './EmployeeLogs';

function App() {
  return (
    <>
      <header>
        <div className="logo">
          <img src="/vts.png" alt="VTS Logo" />
        </div>
        <nav className="container">
          <Link to="/">Register</Link>
          <Link to="/scan">Scan</Link>
          <Link to="/employees">Employees</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/employees/:id/logs" element={<EmployeeLogs />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
