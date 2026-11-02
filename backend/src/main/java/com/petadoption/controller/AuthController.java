package com.petadoption.controller;

import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.UserResponse;
import com.petadoption.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest loginRequest) {
        return UserResponse.from(userService.authenticate(loginRequest));
    }
}
