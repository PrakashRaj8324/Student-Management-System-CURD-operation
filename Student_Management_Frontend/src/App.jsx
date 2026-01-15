import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import './styles.css';

// Client-side guard (for UX only). Backend enforces session/role.
const RequireRole = ({ children, role }) => {
  const currentRole = localStorage.getItem('role');
  if (!currentRole) return <Navigate to="/" replace />;
  if (role && currentRole !== role) return <Navigate to="/" replace />;
  return children;
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={
          <RequireRole role="TEACHER">
            <TeacherDashboard />
          </RequireRole>
        } />
        <Route path="/student" element={
          <RequireRole role="STUDENT">
            <StudentDashboard />
          </RequireRole>
        } />
      </Routes>
    </BrowserRouter>
  );
}
