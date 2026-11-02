package com.petadoption.controller;

import com.petadoption.dto.RegisterRequest;
import com.petadoption.dto.UserResponse;
import com.petadoption.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return UserResponse.from(userService.registerUser(request));
    }

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable Integer id) {
        return UserResponse.from(userService.getUserById(id));
    }
}
