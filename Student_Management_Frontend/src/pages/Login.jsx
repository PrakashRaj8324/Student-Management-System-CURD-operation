import React, { useState } from 'react';
import { loginTeacher, loginStudent } from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles.css";

export default function Login() {
  const [role, setRole] = useState('TEACHER');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      if (role === 'TEACHER') {
        const data = await loginTeacher(gmail, password);
        localStorage.setItem('role', data.role);
        localStorage.setItem('gmail', data.gmail);
        navigate('/teacher');
      } else {
        const data = await loginStudent(gmail);
        localStorage.setItem('role', data.role);
        localStorage.setItem('gmail', data.gmail);
        navigate('/student');
      }
    } catch {
      setMsg('Login failed. Check credentials.');
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: '40px auto' }}>
      <h2>Student Management System</h2>
      {msg && <div style={{ color: 'red', marginBottom: 8 }}>{msg}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Role:&nbsp;
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
          </label>
        </div>
        <div style={{ marginTop: 8 }}>
          <label>
            Gmail:&nbsp;
            <input type="email" value={gmail} onChange={e => setGmail(e.target.value)} required />
          </label>
        </div>
        {role === 'TEACHER' && (
          <div style={{ marginTop: 8 }}>
            <label>
              Password:&nbsp;
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
          </div>
        )}
        <button type="submit" style={{ marginTop: 12 }}>Login</button>
      </form>
      <hr style={{ margin: '16px 0' }} />
    </div>
  );
}
