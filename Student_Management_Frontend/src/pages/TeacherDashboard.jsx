import React, { useEffect, useState } from 'react';
import { getAllStudents, addStudent, updateStudent, deleteStudent, logout } from '../api';
import StudentForm from '../components/StudentForm';
import "../styles.css";

export default function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const list = await getAllStudents();
      setStudents(list);
    } catch {
      // If session expired or not teacher
      window.location.href = '/';
    }
  };

  useEffect(() => { load(); }, []);

  const onAdd = async (student) => {
  try {
    const added = await addStudent(student); // call API
    setAlert('Student added successfully!');
    setShowForm(false);  // hide form
    await load();         // reload student list
    hideAlert();
  } catch (err) {
    console.error('Add student error:', err);
    setAlert('Failed to add student');
  }
};


  const onEditSave = async (s) => {
    await updateStudent(editing.id, s);
    setAlert('Student details updated successfully!');
    setEditing(null);
    await load();
    hideAlert();
  };

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    await deleteStudent(id);
    setAlert('Student deleted successfully!');
    await load();
    hideAlert();
  };

  const hideAlert = () => setTimeout(() => setAlert(''), 2000);

  const doLogout = async () => {
  await logout();
  localStorage.clear();
  window.location.href = '/';
};

  return (
  <div style={{ maxWidth: 900, margin: '24px auto' }}>
    <h2>Teacher Dashboard</h2>

    {/* Buttons */}
    <div style={{ display: 'flex', gap: 8 }}>
      <button id='addButton' onClick={() => { setShowForm(true); setEditing(null); }}>
        Add Student
      </button>
      <button onClick={doLogout}>Logout</button>
    </div>

    {/* <-- PLACE ALERT HERE --> */}
    {alert && (
      <div
        style={{
          background: '#d1fae5', 
          padding: 8, 
          marginTop: 12,
          borderRadius: 4,
          color: '#064e3b'
        }}
      >
        {alert}
      </div>
    )}

    {/* Form for adding/editing student */}
    {(showForm && !editing) && (
      <div style={{ marginTop: 12 }}>
        <StudentForm onSubmit={onAdd} onCancel={() => setShowForm(false)} />
      </div>
    )}

    {editing && (
      <div style={{ marginTop: 12 }}>
        <StudentForm initial={editing} onSubmit={onEditSave} onCancel={() => setEditing(null)} />
      </div>
    )}

    {/* Student table */}
    <table border="1" cellPadding="6" style={{ marginTop: 16, width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th><th>Name</th><th>Department</th><th>Gmail</th><th>Grade</th><th>Attendance</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(s => (
          <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.name}</td>
            <td>{s.department}</td>
            <td>{s.gmail}</td>
            <td>{s.grade}</td>
            <td>{s.attendance}</td>
            <td>
              <button onClick={() => setEditing(s)}>Edit</button>&nbsp;
              <button id='deleteButton' onClick={() => onDelete(s.id)}>Delete</button>
            </td>
          </tr>
        ))}
        {students.length === 0 && (
          <tr><td colSpan="7" style={{ textAlign: 'center' }}>No students</td></tr>
        )}
      </tbody>
    </table>
  </div>
);
}
