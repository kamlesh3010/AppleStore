package com.example.demo.service;

import com.example.demo.repo.UserRepo;
import com.example.demo.userLogin.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public ResponseEntity<String> registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Already Existed Email");
        }
        userRepo.save(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    public ResponseEntity<String> loginUser(User user) {
        User existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.status(404).body("User Not Found");
        }
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid Credentials");
        }
        return ResponseEntity.ok("Login Successfully");
    }
}
