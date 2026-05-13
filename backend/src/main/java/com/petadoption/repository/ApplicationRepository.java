package com.petadoption.repository;

import com.petadoption.model.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<AdoptionApplication, Integer> {
    List<AdoptionApplication> findByAdopterId(Integer adopterId);
    List<AdoptionApplication> findByPetId(Integer petId);
    List<AdoptionApplication> findByStatus(AdoptionApplication.Status status);
}