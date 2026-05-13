package com.petadoption.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
public class AdoptionApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "adopter_id")
    private User adopter;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(name = "home_type")
    private String homeType;

    @Column(name = "has_children")
    private Boolean hasChildren;

    private String experience;
    private String reason;
    private String notes;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status { PENDING, REVIEWING, APPROVED, REJECTED }
}