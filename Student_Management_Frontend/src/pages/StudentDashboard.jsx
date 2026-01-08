import React, { useEffect, useState } from 'react';
import { getMyDetails, logout } from '../api';
import "../styles.css";

export default function StudentDashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    getMyDetails()
      .then(setMe)
      .catch(() => { window.location.href = '/'; });
  }, []);

  const doLogout = async () => {
    await logout();
    localStorage.clear();
    window.location.href = '/';
  };
  

  return (
    <div style={{ maxWidth: 600, margin: '24px auto' }}>
      <h2>Student Dashboard</h2>
      <button onClick={doLogout}>Logout</button>
      {!me ? (
        <div style={{ marginTop: 12 }}>Loading...</div>
      ) : (
        <div style={{ border: '1px solid #ddd', padding: 16, marginTop: 12 }}>
          <p><strong>ID:</strong> {me.id}</p>
          <p><strong>Name:</strong> {me.name}</p>
          <p><strong>Department:</strong> {me.department}</p>
          <p><strong>Gmail:</strong> {me.gmail}</p>
          <p><strong>Grade:</strong> {me.grade}</p>
          <p><strong>Attendance:</strong> {me.attendance}</p>
        </div>
      )}
    </div>
  );
}
