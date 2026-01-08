package com.example.sms.controller;

import com.example.sms.entity.Student;
import com.example.sms.entity.Teacher;
import com.example.sms.repository.StudentRepository;
import com.example.sms.repository.TeacherRepository;
import com.example.sms.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seed")
public class SeedController {
    private final TeacherRepository teacherRepo;
    private final StudentRepository studentRepo;
    private final UserService userService;

    public SeedController(TeacherRepository t, StudentRepository s, UserService u) {
        this.teacherRepo = t; this.studentRepo = s; this.userService = u;
    }

    @PostMapping
    public String seed() {
        if (teacherRepo.findByGmail("teacher1@gmail.com").isEmpty()) {
            Teacher t = new Teacher();
            t.setName("Teacher One");
            t.setGmail("teacher1@gmail.com");
            teacherRepo.save(t);
            userService.createTeacher("teacher1@gmail.com", "pass123");
        }
        if (studentRepo.findByGmail("student1@gmail.com").isEmpty()) {
            Student s = new Student();
            s.setName("Student One");
            s.setDepartment("CSE");
            s.setGmail("student1@gmail.com");
            s.setGrade("A");
            s.setAttendance(95);
            studentRepo.save(s);
            userService.createStudentAccount("student1@gmail.com");
        }
        return "Seeded";
    }
}
