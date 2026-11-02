package com.petadoption.controller;

import com.petadoption.exception.NotFoundException;
import com.petadoption.model.SuccessStory;
import com.petadoption.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @GetMapping
    public List<SuccessStory> getApprovedStories() {
        return storyRepository.findByIsApproved(true);
    }

    @GetMapping("/all")
    public List<SuccessStory> getAllStories() {
        return storyRepository.findAll();
    }

    @PostMapping
    public SuccessStory addStory(@RequestBody SuccessStory story) {
        return storyRepository.save(story);
    }

    @PutMapping("/{id}/approve")
    public SuccessStory approveStory(@PathVariable Integer id) {
        SuccessStory story = storyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Story not found"));

        story.setIsApproved(true);
        return storyRepository.save(story);
    }
}