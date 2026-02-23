package com.example.Category.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @ManyToOne
    private Booking booking;

    @ManyToOne
    private User customer;

    @ManyToOne
    private User staff;

    private Integer rating;
    private String comment;
    private String reviewDate;

}
