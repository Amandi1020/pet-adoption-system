package com.petadoption.controller;

import com.petadoption.dto.ApplicationRequest;
import com.petadoption.exception.BadRequestException;
import com.petadoption.exception.ForbiddenException;
import com.petadoption.model.AdoptionApplication;
import com.petadoption.model.User;
import com.petadoption.security.AuthenticatedUser;
import com.petadoption.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public AdoptionApplication submitApplication(
            @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return applicationService.submitApplication(request, currentUser.id());
    }

    @GetMapping
    public List<AdoptionApplication> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/adopter/{adopterId}")
    public List<AdoptionApplication> getByAdopter(
            @PathVariable Integer adopterId,
            @AuthenticationPrincipal AuthenticatedUser currentUser) {

        if (currentUser.role() == User.Role.ADOPTER
                && !currentUser.id().equals(adopterId)) {
            throw new ForbiddenException("You can only view your own applications");
        }

        return applicationService.getApplicationsByAdopter(adopterId);
    }

    @PutMapping("/{id}/status")
    public AdoptionApplication updateStatus(
            @PathVariable Integer id,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {

        AdoptionApplication.Status parsedStatus;
        try {
            parsedStatus = AdoptionApplication.Status.valueOf(status);
        } catch (IllegalArgumentException ex) {
            throw new BadRequestException("Invalid application status: " + status);
        }

        return applicationService.updateStatus(id, parsedStatus, notes);
    }
}
