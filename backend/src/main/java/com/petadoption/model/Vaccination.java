package com.petadoption.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "vaccinations")
@Data
public class Vaccination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @Column(name = "vaccine_name")
    private String vaccineName;

    @Column(name = "date_given")
    private LocalDate dateGiven;

    @Column(name = "next_due_date")
    private LocalDate nextDueDate;

    @Column(name = "given_by")
    private String givenBy;
}