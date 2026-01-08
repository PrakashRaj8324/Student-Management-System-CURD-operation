package com.example.sms.service;

import com.example.sms.entity.UserAccount;
import com.example.sms.repository.UserAccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserAccountRepository repo;

    public UserService(UserAccountRepository repo) {
        this.repo = repo;
    }

    public Optional<UserAccount> findByGmail(String gmail) {
        return repo.findByGmail(gmail);
    }

    public UserAccount createTeacher(String gmail, String rawPassword) {
        UserAccount ua = new UserAccount();
        ua.setGmail(gmail);
        ua.setPasswordHash(rawPassword); // for demo; use BCrypt in real apps
        ua.setRole("TEACHER");
        return repo.save(ua);
    }

    public UserAccount createStudentAccount(String gmail) {
        UserAccount ua = new UserAccount();
        ua.setGmail(gmail);
        ua.setPasswordHash("student"); // not used to login; placeholder
        ua.setRole("STUDENT");
        return repo.save(ua);
    }

    public boolean verifyTeacherPassword(UserAccount ua, String rawPassword) {
        return ua.getPasswordHash().equals(rawPassword);
    }
}
