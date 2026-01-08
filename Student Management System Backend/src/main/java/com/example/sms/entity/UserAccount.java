package com.example.sms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_account")
public class UserAccount {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String gmail;

    @Column(nullable = false)
    private String passwordHash; // bcrypt or plain for demo (use bcrypt in real apps)

    @Column(nullable = false)
    private String role; // "TEACHER" or "STUDENT"

    public Long getId() { return id; }
    public String getGmail() { return gmail; }
    public void setGmail(String gmail) { this.gmail = gmail; }
    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
