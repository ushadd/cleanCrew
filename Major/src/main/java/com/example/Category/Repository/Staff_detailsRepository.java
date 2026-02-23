package com.example.Category.Repository;

import com.example.Category.Entity.Staff_Details;
import com.example.Category.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Staff_detailsRepository extends JpaRepository<Staff_Details, Long> {

    // Find staff details by user
    Optional<Staff_Details> findByStaff(User staff);

    // Find staff details by user ID - using custom query
    @Query("SELECT s FROM Staff_Details s WHERE s.staff.id = :userId")
    Optional<Staff_Details> findByStaffId(@Param("userId") Long userId);

    // Find all verified staff
    List<Staff_Details> findByVerified(Staff_Details.VerificationStatus verified);

    // Find all accepted staff (for customer selection)
    List<Staff_Details> findByVerifiedIn(List<Staff_Details.VerificationStatus> statuses);
}
