package com.petadoption.controller;

import com.petadoption.model.User;
import com.petadoption.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        return userService.findByEmail(loginRequest.getEmail())
                .filter(user -> user.getPassword().equals(loginRequest.getPassword()))
                .orElse(null);
    }
}