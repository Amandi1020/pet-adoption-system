package com.petadoption.controller;

import com.petadoption.model.AdoptionApplication;
import com.petadoption.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public AdoptionApplication submitApplication(@RequestBody AdoptionApplication application) {
        return applicationService.submitApplication(application);
    }

    @GetMapping
    public List<AdoptionApplication> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/adopter/{adopterId}")
    public List<AdoptionApplication> getByAdopter(@PathVariable Integer adopterId) {
        return applicationService.getApplicationsByAdopter(adopterId);
    }

    @PutMapping("/{id}/status")
    public AdoptionApplication updateStatus(
            @PathVariable Integer id,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {
        return applicationService.updateStatus(id,
                AdoptionApplication.Status.valueOf(status), notes);
    }
}