import axios from 'axios';

const api = axios.create({ baseURL: '' });

// Important: send cookies for session
api.defaults.withCredentials = true;

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

export const addStudent = (student) =>
  api.post('/students', student).then(res => res.data);

export const updateStudent = (id, student) =>
  api.put(`/students/${id}`, student).then(res => res.data);

export const deleteStudent = (id) =>
  api.delete(`/students/${id}`).then(res => res.data);

export default api;
