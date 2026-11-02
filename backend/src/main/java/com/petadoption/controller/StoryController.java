package com.petadoption.controller;

import com.petadoption.dto.StoryRequest;
import com.petadoption.model.SuccessStory;
import com.petadoption.repository.StoryRepository;
import com.petadoption.security.AuthenticatedUser;
import com.petadoption.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private StoryService storyService;

    @GetMapping
    public List<SuccessStory> getApprovedStories() {
        return storyRepository.findByIsApproved(true);
    }

    @GetMapping("/all")
    public List<SuccessStory> getAllStories() {
        return storyRepository.findAll();
    }

    @PostMapping
    public SuccessStory addStory(
            @RequestBody StoryRequest request,
            @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return storyService.submitStory(request, currentUser.id());
    }

    @PutMapping("/{id}/approve")
    public SuccessStory approveStory(@PathVariable Integer id) {
        return storyService.approveStory(id);
    }
}
