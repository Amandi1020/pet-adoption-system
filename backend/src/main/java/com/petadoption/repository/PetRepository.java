package com.petadoption.repository;

import com.petadoption.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByStatus(Pet.Status status);
    List<Pet> findBySpecies(String species);
}