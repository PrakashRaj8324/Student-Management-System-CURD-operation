package com.example.sms.service;

import com.example.sms.entity.Student;
import com.example.sms.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> findAll() { return repo.findAll(); }
    public Student findById(Long id) { return repo.findById(id).orElseThrow(); }
    public Student findByGmail(String gmail) { return repo.findByGmail(gmail).orElseThrow(); }
    public Student save(Student s) { return repo.save(s); }

    public Student update(Long id, Student s) {
        Student existing = findById(id);
        existing.setName(s.getName());
        existing.setDepartment(s.getDepartment());
        existing.setGmail(s.getGmail());
        existing.setGrade(s.getGrade());
        existing.setAttendance(s.getAttendance());
        return repo.save(existing);
    }

    public void delete(Long id) { repo.deleteById(id); }
}
