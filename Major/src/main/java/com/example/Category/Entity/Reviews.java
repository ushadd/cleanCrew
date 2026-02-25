package com.example.Category.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties("reviews")
    private Booking booking;

    @ManyToOne
    @JsonIgnoreProperties({ "reviews", "staffDetails", "bookings" })
    private User customer;

    @ManyToOne
    @JsonIgnoreProperties({ "reviews", "staffDetails", "bookings" })
    private User staff;

    private Integer rating;
    private String comment;
    private String reviewDate;

}
