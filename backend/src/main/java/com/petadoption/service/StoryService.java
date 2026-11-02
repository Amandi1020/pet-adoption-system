package com.petadoption.service;

import com.petadoption.dto.StoryRequest;
import com.petadoption.exception.BadRequestException;
import com.petadoption.exception.NotFoundException;
import com.petadoption.model.Pet;
import com.petadoption.model.SuccessStory;
import com.petadoption.model.User;
import com.petadoption.repository.PetRepository;
import com.petadoption.repository.StoryRepository;
import com.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    public SuccessStory submitStory(StoryRequest request, Integer adopterId) {
        if (request == null) {
            throw new BadRequestException("Story details are required");
        }
        if (request.petId() == null) {
            throw new BadRequestException("A pet must be selected");
        }
        if (request.storyText() == null || request.storyText().isBlank()) {
            throw new BadRequestException("Story text is required");
        }
        if (adopterId == null) {
            throw new BadRequestException("An adopter must be selected");
        }

        Pet pet = petRepository.findById(request.petId())
                .orElseThrow(() -> new NotFoundException("Pet not found"));
        User adopter = userRepository.findById(adopterId)
                .orElseThrow(() -> new NotFoundException("Adopter not found"));

        SuccessStory story = new SuccessStory();
        story.setPet(pet);
        story.setAdopter(adopter);
        story.setStoryText(request.storyText().trim());
        story.setPhotoUrl(request.photoUrl());
        story.setIsApproved(false);
        story.setCreatedAt(LocalDateTime.now());
        return storyRepository.save(story);
    }

    public SuccessStory approveStory(Integer id) {
        SuccessStory story = storyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Story not found"));

        story.setIsApproved(true);
        return storyRepository.save(story);
    }
}
