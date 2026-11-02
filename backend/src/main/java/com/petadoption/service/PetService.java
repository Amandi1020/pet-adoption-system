package com.petadoption.service;

import com.petadoption.exception.ConflictException;
import com.petadoption.exception.NotFoundException;
import com.petadoption.model.Pet;
import com.petadoption.repository.ApplicationRepository;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getAvailablePets() {
        return petRepository.findByStatus(Pet.Status.AVAILABLE);
    }

    public Pet getPetById(Integer id) {
        return petRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Pet not found"));
    }

    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet updatePet(Integer id, Pet updatedPet) {
        Pet existing = getPetById(id);

        if (updatedPet.getName() != null) existing.setName(updatedPet.getName());
        if (updatedPet.getSpecies() != null) existing.setSpecies(updatedPet.getSpecies());
        if (updatedPet.getBreed() != null) existing.setBreed(updatedPet.getBreed());
        if (updatedPet.getAge() != null) existing.setAge(updatedPet.getAge());
        if (updatedPet.getGender() != null) existing.setGender(updatedPet.getGender());
        if (updatedPet.getSize() != null) existing.setSize(updatedPet.getSize());
        if (updatedPet.getStatus() != null) existing.setStatus(updatedPet.getStatus());
        if (updatedPet.getDescription() != null) {
            existing.setDescription(updatedPet.getDescription());
        }

        return petRepository.save(existing);
    }

    public void deletePet(Integer id) {
        if (!petRepository.existsById(id)) {
            throw new NotFoundException("Pet not found");
        }
        if (applicationRepository.existsByPetId(id)) {
            throw new ConflictException(
                    "This pet cannot be deleted because it has adoption applications"
            );
        }
        petRepository.deleteById(id);
    }
}