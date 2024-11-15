package com.example.demo.repo;

import com.example.demo.userLogin.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo  extends JpaRepository<User,Long> {
    User findByEmail(String email);

}
