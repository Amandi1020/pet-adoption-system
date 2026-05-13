package com.petadoption.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "care_records")
@Data
public class CareRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String description;

    @ManyToOne
    @JoinColumn(name = "recorded_by")
    private User recordedBy;

    @Column(name = "recorded_at")
    private LocalDateTime recordedAt = LocalDateTime.now();

    public enum Type { VET, FEEDING, GROOMING }
}