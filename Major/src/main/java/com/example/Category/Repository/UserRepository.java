package com.example.Category.Repository;

import com.example.Category.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email - using custom query for snake_case column
    @Query("SELECT u FROM User u WHERE u.user_mail = :userMail")
    Optional<User> findByUserMail(@Param("userMail") String userMail);

    // Find users by role - using custom query for snake_case column
    @Query("SELECT u FROM User u WHERE u.user_role = :role")
    java.util.List<User> findByUserRole(@Param("role") User.UserRole role);
}
