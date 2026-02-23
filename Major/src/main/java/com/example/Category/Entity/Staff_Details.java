package com.example.Category.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Staff_Details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User staff;

    private String experience;
    private String availability;
    private String id_proof;
    private String phoneNumber;
    private String address;
    private String serviceType;

    @Enumerated(EnumType.STRING)
    private VerificationStatus verified = VerificationStatus.Pending;

    public enum VerificationStatus {
        Pending,
        Accepted,
        Rejected
    }
}
