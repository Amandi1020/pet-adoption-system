package com.petadoption.service;

import com.petadoption.model.Pet;
import com.petadoption.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getAvailablePets() {
        return petRepository.findByStatus(Pet.Status.AVAILABLE);
    }

    public Pet getPetById(Integer id) {
        return petRepository.findById(id).orElse(null);
    }

    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet updatePet(Integer id, Pet updatedPet) {
        updatedPet.setId(id);
        return petRepository.save(updatedPet);
    }

    public void deletePet(Integer id) {
        petRepository.deleteById(id);
    }
}