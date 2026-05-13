package com.petadoption.repository;

import com.petadoption.model.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VaccinationRepository extends JpaRepository<Vaccination, Integer> {
    List<Vaccination> findByPetId(Integer petId);
}