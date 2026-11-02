package com.petadoption.repository;

import com.petadoption.model.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Collection;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<AdoptionApplication, Integer> {
    List<AdoptionApplication> findByAdopterId(Integer adopterId);
    List<AdoptionApplication> findByPetId(Integer petId);
    List<AdoptionApplication> findByStatus(AdoptionApplication.Status status);

    boolean existsByPetIdAndAdopterIdAndStatusIn(
            Integer petId,
            Integer adopterId,
            Collection<AdoptionApplication.Status> statuses
    );

    boolean existsByPetIdAndStatusAndIdNot(
            Integer petId,
            AdoptionApplication.Status status,
            Integer id
    );

    List<AdoptionApplication> findByPetIdAndStatusIn(
            Integer petId,
            Collection<AdoptionApplication.Status> statuses
    );

    boolean existsByPetIdAndStatus(
            Integer petId,
            AdoptionApplication.Status status
    );

    boolean existsByPetId(Integer petId);
}