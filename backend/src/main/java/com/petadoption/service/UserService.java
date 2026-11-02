package com.petadoption.service;

import com.petadoption.dto.LoginRequest;
import com.petadoption.dto.RegisterRequest;
import com.petadoption.exception.BadRequestException;
import com.petadoption.exception.ConflictException;
import com.petadoption.exception.NotFoundException;
import com.petadoption.exception.UnauthorizedException;
import com.petadoption.model.User;
import com.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        if (request == null) {
            throw new BadRequestException("Registration details are required");
        }
        if (request.name() == null || request.name().isBlank()) {
            throw new BadRequestException("Name is required");
        }
        if (request.email() == null || request.email().isBlank()) {
            throw new BadRequestException("Email is required");
        }
        if (request.password() == null || request.password().length() < 6) {
            throw new BadRequestException("Password must be at least 6 characters");
        }

        String email = request.email().trim().toLowerCase(Locale.ROOT);
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("Email is already registered");
        }

        User user = new User();
        user.setName(request.name().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(User.Role.ADOPTER);
        return userRepository.save(user);
    }

    public User authenticate(LoginRequest request) {
        if (request == null || request.email() == null || request.password() == null) {
            throw new UnauthorizedException("Invalid email or password");
        }

        User user = userRepository.findByEmail(request.email().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!passwordMatches(request.password(), user)) {
            throw new UnauthorizedException("Invalid email or password");
        }

        return user;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    private boolean passwordMatches(String rawPassword, User user) {
        String storedPassword = user.getPassword();
        if (storedPassword == null) {
            return false;
        }

        if (storedPassword.matches("^\\$2[aby]\\$.*")) {
            return passwordEncoder.matches(rawPassword, storedPassword);
        }

        if (storedPassword.equals(rawPassword)) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
            return true;
        }

        return false;
    }
}
