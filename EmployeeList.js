import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [list, setList] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      setList(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const remove = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    // Remove from local state
    setList((prev) => prev.filter((emp) => emp.id !== id));
  } catch (err) {
    console.error('Delete failed:', err);
  }
};
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="card">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>QR</th>
            <th>Logs</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
  {list.map((emp) => (
    <tr key={emp.id}>
      <td>{emp.id}</td>
      <td>{emp.empid}</td>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.department}</td>
      <td>
        {emp.qr_code && <img src={emp.qr_code} alt="QR" width="60" />}
      </td>
      <td>
        <Link to={`/employees/${emp.id}/logs`}>View Logs</Link>
      </td>
      <td>
        <button onClick={() => remove(emp.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default EmployeeList;
