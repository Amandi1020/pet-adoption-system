package com.petadoption.controller;

import com.petadoption.exception.NotFoundException;
import com.petadoption.model.ContactMessage;
import com.petadoption.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping
    public ContactMessage submitMessage(@RequestBody ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAll();
    }

    @PutMapping("/{id}/read")
    public ContactMessage markAsRead(@PathVariable Integer id) {
        ContactMessage msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Message not found"));

        msg.setIsRead(true);
        return contactMessageRepository.save(msg);
    }
}