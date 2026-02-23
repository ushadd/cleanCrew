package com.example.Category;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.User;
import com.example.Category.Repository.UserRepository;
import com.example.Category.Service.BookingService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CategoryApplication {

    public static void main(String[] args) {
        SpringApplication.run(CategoryApplication.class, args);
    }

    @Bean

    public CommandLineRunner user(UserRepository userRepository) {
        return args -> {
            // Create admin user if not exists - check by role
            boolean adminExists = userRepository.findAll().stream()
                    .anyMatch(u -> u.getUser_role() == User.UserRole.Admin);

            if (!adminExists) {
                User admin = new User();
                admin.setUser_name("Admin");
                admin.setUser_mail("admin@clewcrew.com");
                admin.setUser_password("admin123");
                admin.setUser_role(User.UserRole.Admin);
                userRepository.save(admin);
                System.out.println("Admin user created successfully!");
            } else {
                System.out.println("Admin user already exists.");
            }

        };
    }cmd

}
