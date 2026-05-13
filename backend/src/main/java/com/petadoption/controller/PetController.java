package com.petadoption.controller;

import com.petadoption.model.Pet;
import com.petadoption.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/available")
    public List<Pet> getAvailablePets() {
        return petService.getAvailablePets();
    }

    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Integer id) {
        return petService.getPetById(id);
    }

    @PostMapping
    public Pet addPet(@RequestBody Pet pet) {
        return petService.addPet(pet);
    }

    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Integer id, @RequestBody Pet pet) {
        return petService.updatePet(id, pet);
    }

    @DeleteMapping("/{id}")
    public void deletePet(@PathVariable Integer id) {
        petService.deletePet(id);
    }
}