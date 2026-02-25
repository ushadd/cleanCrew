package com.example.Category.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String user_name;
    private String user_mail;
    private String user_password;

    @Enumerated(EnumType.STRING)
    private UserRole user_role = UserRole.Customer;

    @OneToOne(mappedBy = "staff", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("staff")
    private Staff_Details staffDetails;

    public enum UserRole {
        Customer,
        Staff,
        Admin
    }
}
