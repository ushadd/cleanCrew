package com.example.Category.Repository;

import com.example.Category.Entity.Staff_Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Staff_CategoryRepository extends JpaRepository<Staff_Category,Long> {
}
