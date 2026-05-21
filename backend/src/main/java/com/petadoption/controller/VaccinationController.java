package com.petadoption.controller;

import com.petadoption.model.Vaccination;
import com.petadoption.repository.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/vaccinations")
@CrossOrigin(origins = "http://localhost:5173")
public class VaccinationController {

    @Autowired
    private VaccinationRepository vaccinationRepository;

    @GetMapping("/pet/{petId}")
    public List<Vaccination> getByPetId(@PathVariable Integer petId) {
        return vaccinationRepository.findByPetId(petId);
    }

    @PostMapping
    public Vaccination addVaccination(@RequestBody Vaccination vaccination) {
        return vaccinationRepository.save(vaccination);
    }

    @DeleteMapping("/{id}")
    public void deleteVaccination(@PathVariable Integer id) {
        vaccinationRepository.deleteById(id);
    }
}