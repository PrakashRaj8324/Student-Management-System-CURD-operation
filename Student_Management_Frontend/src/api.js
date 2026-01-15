import axios from 'axios';

// Set backend base URL
const api = axios.create({ 
  baseURL: 'http://localhost:8080', 
  withCredentials: true   // this allows session cookies
});

// API functions
export const loginTeacher = (gmail, password) =>
  api.post('/auth/login/teacher', { gmail, password }).then(res => res.data);

export const loginStudent = (gmail) =>
  api.post('/auth/login/student', { gmail }).then(res => res.data);

export const logout = () =>
  api.post('/auth/logout').then(res => res.data);

export const getMyDetails = () =>
  api.get('/students/me').then(res => res.data);

export const getAllStudents = () =>
  api.get('/students').then(res => res.data);

// Add student (only teacher)
export const addStudent = (student) =>
  api.post('/students', student).then(res => res.data);

// Update student
export const updateStudent = (id, student) =>
  api.put(`/students/${id}`, student).then(res => res.data);

// Delete student
export const deleteStudent = (id) =>
  api.delete(`/students/${id}`).then(res => res.data);

export default api;
