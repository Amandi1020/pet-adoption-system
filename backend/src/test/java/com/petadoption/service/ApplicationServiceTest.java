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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyCollection;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private PetRepository petRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ApplicationService applicationService;

    @Test
    void submitForcesPendingAndClearsReviewFields() {
        Pet pet = pet(10, Pet.Status.AVAILABLE);
        User adopter = user(20);
        AdoptionApplication request = new AdoptionApplication();
        request.setId(99);
        request.setPet(pet);
        request.setAdopter(adopter);
        request.setStatus(AdoptionApplication.Status.APPROVED);
        request.setNotes("old notes");
        request.setReviewedAt(LocalDateTime.now().minusDays(1));

        when(petRepository.findById(10)).thenReturn(Optional.of(pet));
        when(userRepository.findById(20)).thenReturn(Optional.of(adopter));
        when(applicationRepository.existsByPetIdAndAdopterIdAndStatusIn(
                anyInt(), anyInt(), anyCollection()
        )).thenReturn(false);
        when(applicationRepository.save(request)).thenReturn(request);

        AdoptionApplication saved = applicationService.submitApplication(request);

        assertEquals(AdoptionApplication.Status.PENDING, saved.getStatus());
        assertNull(saved.getId());
        assertNull(saved.getNotes());
        assertNull(saved.getReviewedAt());
        assertNotNull(saved.getCreatedAt());
    }

    @Test
    void submitRejectsUnavailablePet() {
        Pet pet = pet(10, Pet.Status.ADOPTED);
        AdoptionApplication request = application(pet, user(20));

        when(petRepository.findById(10)).thenReturn(Optional.of(pet));
        when(userRepository.findById(20)).thenReturn(Optional.of(user(20)));

        assertThrows(ConflictException.class,
                () -> applicationService.submitApplication(request));
        verifyNoInteractions(applicationRepository);
    }

    @Test
    void submitRejectsDuplicateActiveApplication() {
        Pet pet = pet(10, Pet.Status.AVAILABLE);
        AdoptionApplication request = application(pet, user(20));

        when(petRepository.findById(10)).thenReturn(Optional.of(pet));
        when(userRepository.findById(20)).thenReturn(Optional.of(user(20)));
        when(applicationRepository.existsByPetIdAndAdopterIdAndStatusIn(
                anyInt(), anyInt(), anyCollection()
        )).thenReturn(true);

        assertThrows(ConflictException.class,
                () -> applicationService.submitApplication(request));
        verify(applicationRepository, never()).save(any());
    }

    @Test
    void submitRejectsMissingPet() {
        AdoptionApplication request = application(pet(10, Pet.Status.AVAILABLE), user(20));

        when(petRepository.findById(10)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> applicationService.submitApplication(request));
        verifyNoInteractions(applicationRepository);
    }

    @Test
    void updateRejectsInvalidTransition() {
        AdoptionApplication app = application(pet(10, Pet.Status.AVAILABLE), user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.PENDING);
        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));

        assertThrows(BadRequestException.class, () -> applicationService.updateStatus(
                1,
                AdoptionApplication.Status.PENDING,
                null
        ));
        verify(applicationRepository, never()).save(any());
    }

    @Test
    void updateRejectsFinalizedApplication() {
        AdoptionApplication app = application(pet(10, Pet.Status.ADOPTED), user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.APPROVED);
        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));

        assertThrows(ConflictException.class, () -> applicationService.updateStatus(
                1,
                AdoptionApplication.Status.REJECTED,
                null
        ));
    }

    @Test
    void approveAdoptsPetAndRejectsOtherOpenApplications() {
        Pet pet = pet(10, Pet.Status.AVAILABLE);
        AdoptionApplication app = application(pet, user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.REVIEWING);

        AdoptionApplication other = application(pet, user(21));
        other.setId(2);
        other.setStatus(AdoptionApplication.Status.PENDING);

        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));
        when(applicationRepository.existsByPetIdAndStatusAndIdNot(
                10,
                AdoptionApplication.Status.APPROVED,
                1
        )).thenReturn(false);
        when(applicationRepository.findByPetIdAndStatusIn(
                anyInt(), anyCollection()
        )).thenReturn(List.of(app, other));

        AdoptionApplication result = applicationService.updateStatus(
                1,
                AdoptionApplication.Status.APPROVED,
                "approved"
        );

        assertEquals(AdoptionApplication.Status.APPROVED, result.getStatus());
        assertEquals(Pet.Status.ADOPTED, pet.getStatus());
        assertEquals(AdoptionApplication.Status.APPROVED, app.getStatus());
        assertEquals(AdoptionApplication.Status.REJECTED, other.getStatus());
        assertNotNull(other.getReviewedAt());
        verify(petRepository).save(pet);
        verify(applicationRepository).save(app);
        verify(applicationRepository).saveAll(List.of(app, other));
    }

    @Test
    void approveRejectsWhenAnotherApplicationIsApproved() {
        Pet pet = pet(10, Pet.Status.AVAILABLE);
        AdoptionApplication app = application(pet, user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.PENDING);

        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));
        when(applicationRepository.existsByPetIdAndStatusAndIdNot(
                10,
                AdoptionApplication.Status.APPROVED,
                1
        )).thenReturn(true);

        assertThrows(ConflictException.class, () -> applicationService.updateStatus(
                1,
                AdoptionApplication.Status.APPROVED,
                null
        ));
        verify(petRepository, never()).save(any());
        verify(applicationRepository, never()).save(any());
    }

    @Test
    void rejectReleasesPetWhenNoApprovalExists() {
        Pet pet = pet(10, Pet.Status.ADOPTED);
        AdoptionApplication app = application(pet, user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.PENDING);

        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));
        when(applicationRepository.existsByPetIdAndStatus(
                10,
                AdoptionApplication.Status.APPROVED
        )).thenReturn(false);

        applicationService.updateStatus(
                1,
                AdoptionApplication.Status.REJECTED,
                null
        );

        assertEquals(Pet.Status.AVAILABLE, pet.getStatus());
        verify(petRepository).save(pet);
    }

    @Test
    void rejectKeepsAdoptedPetWhenAnotherApprovalExists() {
        Pet pet = pet(10, Pet.Status.ADOPTED);
        AdoptionApplication app = application(pet, user(20));
        app.setId(1);
        app.setStatus(AdoptionApplication.Status.PENDING);

        when(applicationRepository.findById(1)).thenReturn(Optional.of(app));
        when(applicationRepository.existsByPetIdAndStatus(
                10,
                AdoptionApplication.Status.APPROVED
        )).thenReturn(true);

        applicationService.updateStatus(
                1,
                AdoptionApplication.Status.REJECTED,
                null
        );

        assertEquals(Pet.Status.ADOPTED, pet.getStatus());
        verify(petRepository, never()).save(any());
    }

    @Test
    void updateRejectsMissingApplication() {
        when(applicationRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> applicationService.updateStatus(
                1,
                AdoptionApplication.Status.APPROVED,
                null
        ));
    }

    private Pet pet(Integer id, Pet.Status status) {
        Pet pet = new Pet();
        pet.setId(id);
        pet.setStatus(status);
        return pet;
    }

    private User user(Integer id) {
        User user = new User();
        user.setId(id);
        return user;
    }

    private AdoptionApplication application(Pet pet, User adopter) {
        AdoptionApplication application = new AdoptionApplication();
        application.setPet(pet);
        application.setAdopter(adopter);
        return application;
    }
}
