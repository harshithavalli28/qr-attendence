import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports').then((res) => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Attendance Reports</h2>
      <table>
        <thead>
          <tr><th>Name</th><th>Check-In</th><th>Check-Out</th></tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.check_in}</td>
              <td>{r.check_out || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
