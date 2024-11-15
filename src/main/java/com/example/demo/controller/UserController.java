package com.example.demo.controller;


import com.example.demo.repo.UserRepo;
import com.example.demo.userLogin.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepo Userrepo;


    @PostMapping("/register")
    public ResponseEntity<String> userRegistration(@RequestBody User user){
        if (Userrepo.findByEmail(user.getEmail()) !=null){
            return ResponseEntity.badRequest().body("Already Existed Email");
        }
        Userrepo.save(user);
        return ResponseEntity.ok("User Registered Successfully ");
    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody User user){

        User existingUser =Userrepo.findByEmail(user.getEmail());

        if (existingUser == null){
            return ResponseEntity.status(404).body("User Not Found");
        }
        if (!existingUser.getPassword().equals(user.getPassword())){
            return ResponseEntity.status(401).body("Invalid Credential ");
        }
        return ResponseEntity.ok("Login Successfull");
    }

}
