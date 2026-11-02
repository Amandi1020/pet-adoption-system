package com.petadoption.exception;

public record ApiError(int status, String message) {
}
