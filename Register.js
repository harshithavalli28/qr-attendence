import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    empid: '',
    department: ''
  });
  const [qr, setQr] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/employees', form);
      setQr(res.data.qr);
    } catch (err) {
      console.error('Error registering:', err);
    }
  };

  return (
    <div className="card">
      <h2>Register Employee</h2>
      <input name="empid" placeholder="Employee ID" value={form.empid} onChange={handleChange} /><br />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
      <input name="department" placeholder="Department" value={form.department} onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Register</button>

      {qr && (
        <div style={{ marginTop: '20px' }}>
          <h4>QR Code:</h4>
          <img src={qr} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default Register;
