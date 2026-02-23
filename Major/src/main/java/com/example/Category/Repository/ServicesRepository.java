package com.example.Category.Repository;

import com.example.Category.Entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.security.Provider;

@Repository
public interface ServicesRepository extends JpaRepository<Services,Long> {
}
