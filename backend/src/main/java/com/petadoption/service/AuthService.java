package com.petadoption.service;

import com.petadoption.dto.AuthResponse;
import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.RegisterRequest;
import com.petadoption.model.User;
import com.petadoption.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        User user = userService.authenticate(request);
        return AuthResponse.from(user, jwtService.generateToken(user));
    }

    public AuthResponse register(RegisterRequest request) {
        User user = userService.registerUser(request);
        return AuthResponse.from(user, jwtService.generateToken(user));
    }
}
