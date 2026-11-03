package com.petadoption.dto;

public record ApplicationRequest(
        Integer petId,
        String phone,
        String address,
        String homeType,
        Boolean hasChildren,
        String experience,
        String reason) {
}
