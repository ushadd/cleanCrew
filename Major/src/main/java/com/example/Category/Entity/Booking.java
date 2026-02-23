package com.example.Category.Entity;

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
    private User customer;

    @ManyToOne
    private User staff;

    @ManyToOne
    private Services services;

    private LocalDateTime booking_date_time;
    private String status;
    private String property_type;

    /*
     * public enum booking_status{
     * Pending,
     * Accepted,
     * Completed,
     * Cancelled
     * 
     * }
     * public enum property_type{
     * School,
     * College,
     * Office,
     * Home,
     * Apartment
     * }
     * 
     */

}
