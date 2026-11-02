package com.petadoption.security;

import com.petadoption.model.User;

public record AuthenticatedUser(Integer id, String email, User.Role role) {
}
