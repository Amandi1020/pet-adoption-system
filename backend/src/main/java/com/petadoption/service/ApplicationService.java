package com.petadoption.service;

import com.petadoption.model.AdoptionApplication;
import com.petadoption.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public AdoptionApplication submitApplication(AdoptionApplication application) {
        return applicationRepository.save(application);
    }

    public List<AdoptionApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<AdoptionApplication> getApplicationsByAdopter(Integer adopterId) {
        return applicationRepository.findByAdopterId(adopterId);
    }

    public AdoptionApplication updateStatus(Integer id, AdoptionApplication.Status status, String notes) {
        AdoptionApplication app = applicationRepository.findById(id).orElse(null);
        if (app != null) {
            app.setStatus(status);
            app.setNotes(notes);
            app.setReviewedAt(LocalDateTime.now());
            return applicationRepository.save(app);
        }
        return null;
    }
}