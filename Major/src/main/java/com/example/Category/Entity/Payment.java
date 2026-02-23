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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Booking booking;

    @ManyToOne
    private User customer;
    private Float amount;
    private String Payment_method;
    private String payment_status;
    private LocalDateTime payment_date_time;

    /*
    private enum payment_method{
        Cash,
        UPI
    }

    private enum payment_status{
        Success,
        Failed,
        Pending
    }

     */
}
