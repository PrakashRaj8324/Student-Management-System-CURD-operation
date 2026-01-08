const BASE_URL = "http://localhost:8080/api";

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getStudents = async (role) => {
  const url =
    role === "TEACHER"
      ? `${BASE_URL}/teacher/students`
      : `${BASE_URL}/student/students`;

  const res = await fetch(url);
  return res.json();
};

export const updateAttendance = async (id, attendance) => {
  const res = await fetch(
    `${BASE_URL}/teacher/attendance/${id}?attendance=${attendance}`,
    { method: "PUT" }
  );
  return res.json();
};

export const updateMarks = async (id, marks) => {
  const res = await fetch(
    `${BASE_URL}/teacher/marks/${id}?marks=${marks}`,
    { method: "PUT" }
  );
  return res.json();
};
