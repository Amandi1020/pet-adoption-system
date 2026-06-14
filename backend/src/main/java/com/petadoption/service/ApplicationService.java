package com.petadoption.service;

import com.petadoption.model.AdoptionApplication;
import com.petadoption.model.Pet;
import com.petadoption.repository.ApplicationRepository;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private PetRepository petRepository;

    public AdoptionApplication submitApplication(AdoptionApplication application) {
        return applicationRepository.save(application);
    }

    public List<AdoptionApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<AdoptionApplication> getApplicationsByAdopter(Integer adopterId) {
        return applicationRepository.findByAdopterId(adopterId);
    }

    public AdoptionApplication updateStatus(
            Integer id,
            AdoptionApplication.Status status,
            String notes) {

        AdoptionApplication app = applicationRepository.findById(id).orElse(null);
        if (app == null) return null;

        app.setStatus(status);
        app.setNotes(notes);
        app.setReviewedAt(LocalDateTime.now());
        applicationRepository.save(app);

        // Auto update pet status when APPROVED
        if (status == AdoptionApplication.Status.APPROVED) {
            Pet pet = app.getPet();
            if (pet != null) {
                pet.setStatus(Pet.Status.ADOPTED);
                petRepository.save(pet);
            }
        }

        // Auto set pet back to AVAILABLE when REJECTED
        if (status == AdoptionApplication.Status.REJECTED) {
            Pet pet = app.getPet();
            if (pet != null) {
                pet.setStatus(Pet.Status.AVAILABLE);
                petRepository.save(pet);
            }
        }

        return app;
    }
}