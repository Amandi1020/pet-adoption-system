package com.petadoption.dto;

import com.petadoption.model.User;

public record AuthResponse(String token, Integer id, String name, String role) {

    public static AuthResponse from(User user, String token) {
        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getRole().name()
        );
    }
}
