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
import org.springframework.transaction.annotation.Transactional;
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

    @Transactional
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

    @Transactional
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

        Pet pet = app.getPet();
        if (status == AdoptionApplication.Status.APPROVED) {
            if (pet == null) {
                throw new BadRequestException("Application is not linked to a pet");
            }
            boolean anotherApproved = applicationRepository
                    .existsByPetIdAndStatusAndIdNot(
                            pet.getId(),
                            AdoptionApplication.Status.APPROVED,
                            app.getId()
                    );
            if (anotherApproved) {
                throw new ConflictException("This pet already has an approved application");
            }
        }

        app.setStatus(status);
        app.setNotes(notes);
        app.setReviewedAt(LocalDateTime.now());
        applicationRepository.save(app);

        // On approval, adopt the pet and reject every other open application.
        if (status == AdoptionApplication.Status.APPROVED) {
            pet.setStatus(Pet.Status.ADOPTED);
            petRepository.save(pet);

            List<AdoptionApplication> otherOpenApplications = applicationRepository
                    .findByPetIdAndStatusIn(
                            pet.getId(),
                            List.of(
                                    AdoptionApplication.Status.PENDING,
                                    AdoptionApplication.Status.REVIEWING
                            )
                    );

            LocalDateTime reviewedAt = LocalDateTime.now();
            for (AdoptionApplication other : otherOpenApplications) {
                if (other.getId() != null && !other.getId().equals(app.getId())) {
                    other.setStatus(AdoptionApplication.Status.REJECTED);
                    other.setReviewedAt(reviewedAt);
                }
            }
            applicationRepository.saveAll(otherOpenApplications);
        }

        // Only release the pet if no other approved application exists.
        if (status == AdoptionApplication.Status.REJECTED) {
            if (pet != null) {
                boolean hasApprovedApplication = applicationRepository
                        .existsByPetIdAndStatus(
                                pet.getId(),
                                AdoptionApplication.Status.APPROVED
                        );
                if (!hasApprovedApplication) {
                    pet.setStatus(Pet.Status.AVAILABLE);
                    petRepository.save(pet);
                }
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
