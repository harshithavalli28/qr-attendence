import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EmployeeLogs() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}/logs`).then((res) => setLogs(res.data));
  }, [id]);

  return (
    <div className="card">
      <h2>Logs for Employee #{id}</h2>
      <table>
        <thead><tr><th>Check-In</th><th>Check-Out</th></tr></thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.check_in}</td>
              <td>{log.check_out || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeLogs;
