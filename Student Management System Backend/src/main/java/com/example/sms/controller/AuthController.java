package com.example.sms.controller;

import com.example.sms.entity.UserAccount;
import com.example.sms.repository.StudentRepository;
import com.example.sms.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserService userService;
    private final StudentRepository studentRepo;

    public AuthController(UserService userService, StudentRepository studentRepo) {
        this.userService = userService;
        this.studentRepo = studentRepo;
    }

    // Teacher login: gmail + password
    @PostMapping("/login/teacher")
    public ResponseEntity<?> teacherLogin(@RequestBody LoginTeacherRequest req, HttpSession session) {
        UserAccount ua = userService.findByGmail(req.getGmail())
                .filter(u -> "TEACHER".equals(u.getRole()))
                .orElse(null);
        if (ua == null || !userService.verifyTeacherPassword(ua, req.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
        session.setAttribute("gmail", ua.getGmail());
        session.setAttribute("role", ua.getRole());
        return ResponseEntity.ok(Map.of("role", ua.getRole(), "gmail", ua.getGmail()));
    }

    // Student login: gmail only
    @PostMapping("/login/student")
    public ResponseEntity<?> studentLogin(@RequestBody LoginStudentRequest req, HttpSession session) {
        var studentOpt = studentRepo.findByGmail(req.getGmail());
        var accountOpt = userService.findByGmail(req.getGmail());

        if (studentOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("message", "Student not found"));
        }
        UserAccount ua = accountOpt.filter(u -> "STUDENT".equals(u.getRole()))
                .orElseGet(() -> userService.createStudentAccount(req.getGmail()));

        session.setAttribute("gmail", ua.getGmail());
        session.setAttribute("role", ua.getRole());
        return ResponseEntity.ok(Map.of("role", ua.getRole(), "gmail", ua.getGmail()));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    public static class LoginTeacherRequest {
        @NotBlank private String gmail;
        @NotBlank private String password;
        public String getGmail() { return gmail; }
        public String getPassword() { return password; }
    }

    public static class LoginStudentRequest {
        @NotBlank private String gmail;
        public String getGmail() { return gmail; }
    }
}
