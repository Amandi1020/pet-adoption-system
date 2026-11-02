package com.petadoption.service;

import com.petadoption.exception.ConflictException;
import com.petadoption.exception.NotFoundException;
import com.petadoption.model.Pet;
import com.petadoption.repository.ApplicationRepository;
import com.petadoption.repository.PetRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private ApplicationRepository applicationRepository;

    @InjectMocks
    private PetService petService;

    @Test
    void deleteRejectsPetWithApplications() {
        when(petRepository.existsById(1)).thenReturn(true);
        when(applicationRepository.existsByPetId(1)).thenReturn(true);

        assertThrows(ConflictException.class, () -> petService.deletePet(1));
        verify(petRepository, never()).deleteById(1);
    }

    @Test
    void deleteRemovesPetWithoutApplications() {
        when(petRepository.existsById(1)).thenReturn(true);
        when(applicationRepository.existsByPetId(1)).thenReturn(false);

        petService.deletePet(1);

        verify(petRepository).deleteById(1);
    }

    @Test
    void deleteRejectsMissingPet() {
        when(petRepository.existsById(1)).thenReturn(false);

        assertThrows(NotFoundException.class, () -> petService.deletePet(1));
        verify(petRepository, never()).deleteById(1);
    }

    @Test
    void updateMergesOnlyProvidedFields() {
        Pet existing = pet();
        existing.setName("Old");
        existing.setSpecies("Dog");
        existing.setBreed("Beagle");
        existing.setAge(24);
        existing.setDescription("Old description");

        Pet update = new Pet();
        update.setName("New");
        update.setAge(36);

        when(petRepository.findById(1)).thenReturn(Optional.of(existing));
        when(petRepository.save(existing)).thenReturn(existing);

        Pet result = petService.updatePet(1, update);

        assertEquals("New", result.getName());
        assertEquals("Dog", result.getSpecies());
        assertEquals("Beagle", result.getBreed());
        assertEquals(36, result.getAge());
        assertEquals("Old description", result.getDescription());
    }

    @Test
    void updateRejectsMissingPet() {
        when(petRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> petService.updatePet(1, new Pet()));
        verify(petRepository, never()).save(any());
    }

    private Pet pet() {
        Pet pet = new Pet();
        pet.setId(1);
        return pet;
    }
}
