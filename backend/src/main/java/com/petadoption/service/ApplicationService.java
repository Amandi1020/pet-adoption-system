package com.petadoption.service;

import com.petadoption.exception.BadRequestException;
import com.petadoption.exception.ConflictException;
import com.petadoption.exception.NotFoundException;
import com.petadoption.model.AdoptionApplication;
import com.petadoption.model.Pet;
import com.petadoption.model.User;
import com.petadoption.repository.ApplicationRepository;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

    public AdoptionApplication submitApplication(AdoptionApplication application) {
        if (application == null) {
            throw new BadRequestException("Application details are required");
        }
        if (application.getPet() == null || application.getPet().getId() == null) {
            throw new BadRequestException("A pet must be selected");
        }
        if (application.getAdopter() == null || application.getAdopter().getId() == null) {
            throw new BadRequestException("An adopter must be selected");
        }

        Integer petId = application.getPet().getId();
        Integer adopterId = application.getAdopter().getId();

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new NotFoundException("Pet not found"));
        User adopter = userRepository.findById(adopterId)
                .orElseThrow(() -> new NotFoundException("Adopter not found"));

        if (pet.getStatus() != Pet.Status.AVAILABLE) {
            throw new ConflictException("This pet is not available for adoption");
        }

        boolean hasActiveApplication = applicationRepository
                .existsByPetIdAndAdopterIdAndStatusIn(
                        petId,
                        adopterId,
                        List.of(
                                AdoptionApplication.Status.PENDING,
                                AdoptionApplication.Status.REVIEWING,
                                AdoptionApplication.Status.APPROVED
                        )
                );
        if (hasActiveApplication) {
            throw new ConflictException("You already have an active application for this pet");
        }

        application.setId(null);
        application.setPet(pet);
        application.setAdopter(adopter);
        application.setStatus(AdoptionApplication.Status.PENDING);
        application.setNotes(null);
        application.setReviewedAt(null);
        application.setCreatedAt(LocalDateTime.now());

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

        if (status == null) {
            throw new BadRequestException("A status is required");
        }

        AdoptionApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Application not found"));

        validateTransition(app.getStatus(), status);

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

    private void validateTransition(
            AdoptionApplication.Status current,
            AdoptionApplication.Status next) {

        if (current == AdoptionApplication.Status.APPROVED
                || current == AdoptionApplication.Status.REJECTED) {
            throw new ConflictException("This application has already been finalized");
        }

        boolean allowed = switch (current) {
            case PENDING -> next == AdoptionApplication.Status.REVIEWING
                    || next == AdoptionApplication.Status.APPROVED
                    || next == AdoptionApplication.Status.REJECTED;
            case REVIEWING -> next == AdoptionApplication.Status.APPROVED
                    || next == AdoptionApplication.Status.REJECTED;
            default -> false;
        };

        if (!allowed) {
            throw new BadRequestException(
                    "Invalid status transition from " + current + " to " + next
            );
        }
    }
}
