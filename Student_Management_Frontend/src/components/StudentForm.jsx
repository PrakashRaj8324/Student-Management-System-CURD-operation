import React, { useState } from 'react';

export default function StudentForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    department: initial?.department || '',
    gmail: initial?.gmail || '',
    grade: initial?.grade || '',
    attendance: initial?.attendance ?? 0
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, attendance: Number(form.attendance) });
  };

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 12 }}>
      <div>
        <label>Name:&nbsp;
          <input name="name" value={form.name} onChange={change} required />
        </label>
      </div>
      <div>
        <label>Department:&nbsp;
          <input name="department" value={form.department} onChange={change} required />
        </label>
      </div>
      <div>
        <label>Gmail:&nbsp;
          <input type="email" name="gmail" value={form.gmail} onChange={change} required />
        </label>
      </div>
      <div>
        <label>Grade:&nbsp;
          <input name="grade" value={form.grade} onChange={change} required />
        </label>
      </div>
      <div>
        <label>Attendance:&nbsp;
          <input type="number" name="attendance" value={form.attendance} onChange={change} min="0" max="100" />
        </label>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">{initial ? 'Save Changes' : 'Add Student'}</button>&nbsp;
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
