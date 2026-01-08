CREATE DATABASE student_db;
USE student_db;

-- User accounts for login
CREATE TABLE user_account (
  id BIGINT PRIMARY KEY AUTO_INCREMENT, 
  gmail VARCHAR(100) UNIQUE NOT NULL, 
  password_hash VARCHAR(255) NOT NULL, 
  role VARCHAR(20) NOT NULL
);

-- Teacher profile
CREATE TABLE teacher ( 
  id BIGINT PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(100), 
  gmail VARCHAR(100) UNIQUE NOT NULL
);

-- Student profile
CREATE TABLE student ( 
  id BIGINT PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(100), 
  department VARCHAR(100), 
  gmail VARCHAR(100) UNIQUE NOT NULL, 
  grade VARCHAR(10), 
  attendance INT
);

-- Insert teacher login + profile
INSERT INTO user_account (gmail, password_hash, role)
VALUES ('teacher1@gmail.com', 'pass123', 'TEACHER');

INSERT INTO teacher (name, gmail)
VALUES ('Mr. Sharma', 'teacher1@gmail.com');

-- Insert student login + profiles
INSERT INTO user_account (gmail, password_hash, role)
VALUES 
('student1@gmail.com', 'nopass', 'STUDENT'),
('student2@gmail.com', 'nopass', 'STUDENT'),
('student3@gmail.com', 'nopass', 'STUDENT');

INSERT INTO student (name, department, gmail, grade, attendance)
VALUES 
('Alice Kumar', 'CSE', 'student1@gmail.com', 'A', 95),
('Ravi Singh', 'ECE', 'student2@gmail.com', 'B', 88),
('Priya Das', 'IT', 'student3@gmail.com', 'A', 92);
