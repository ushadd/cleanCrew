package com.example.Category.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Integer bookingId;

    @ManyToOne
    @JsonIgnoreProperties({ "bookings", "staffDetails", "reviews" })
    private User customer;

    @ManyToOne
    @JsonIgnoreProperties({ "bookings", "staffDetails", "reviews" })
    private User staff;

    @ManyToOne
    @JsonIgnoreProperties({ "bookings" })
    private Services services;

    private LocalDateTime booking_date_time;
    private String status;
    private String property_type;
    private Boolean customerConfirmation = false;
    private Boolean staffConfirmation = false;

}
