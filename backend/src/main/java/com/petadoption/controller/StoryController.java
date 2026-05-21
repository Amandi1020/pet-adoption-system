package com.petadoption.controller;

import com.petadoption.model.SuccessStory;
import com.petadoption.repository.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin(origins = "http://localhost:5173")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @GetMapping
    public List<SuccessStory> getAllStories() {
        return storyRepository.findAll();
    }

    @PostMapping
    public SuccessStory addStory(@RequestBody SuccessStory story) {
        return storyRepository.save(story);
    }

    @PutMapping("/{id}/approve")
    public SuccessStory approveStory(@PathVariable Integer id) {
        SuccessStory story = storyRepository.findById(id).orElse(null);
        if (story != null) {
            story.setIsApproved(true);
            return storyRepository.save(story);
        }
        return null;
    }
}