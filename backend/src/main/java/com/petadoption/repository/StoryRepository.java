package com.petadoption.repository;

import com.petadoption.model.SuccessStory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoryRepository extends JpaRepository<SuccessStory, Integer> {
    List<SuccessStory> findByIsApproved(Boolean isApproved);
}