package com.example.sms.controller;

import com.example.sms.entity.Student;
import com.example.sms.service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) { this.service = service; }

    private boolean isTeacher(HttpSession session) {
        Object role = session.getAttribute("role");
        return role != null && "TEACHER".equals(role.toString());
    }

    private boolean isStudent(HttpSession session) {
        Object role = session.getAttribute("role");
        return role != null && "STUDENT".equals(role.toString());
    }

    private String sessionGmail(HttpSession session) {
        Object gmail = session.getAttribute("gmail");
        return gmail == null ? null : gmail.toString();
    }

    // Student sees their own details
    @GetMapping("/me")
    public ResponseEntity<?> getMyDetails(HttpSession session) {
        if (!isStudent(session)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        String gmail = sessionGmail(session);
        return ResponseEntity.ok(service.findByGmail(gmail));
    }

    // Teacher: list all students
    @GetMapping
    public ResponseEntity<?> getAll(HttpSession session) {
        if (!isTeacher(session)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        return ResponseEntity.ok(service.findAll());
    }

    // Teacher: add student
    @PostMapping
    public ResponseEntity<?> add(@RequestBody Student s, HttpSession session) {
        if (!isTeacher(session)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        return ResponseEntity.ok(service.save(s));
    }

    // Teacher: edit student
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Student s, HttpSession session) {
        if (!isTeacher(session)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        return ResponseEntity.ok(service.update(id, s));
    }

    // Teacher: delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpSession session) {
        if (!isTeacher(session)) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }
        service.delete(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
