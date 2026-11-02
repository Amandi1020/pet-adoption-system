package com.petadoption.dto;

public record ApplicationRequest(
        Integer petId,
        String homeType,
        Boolean hasChildren,
        String experience,
        String reason) {
}
