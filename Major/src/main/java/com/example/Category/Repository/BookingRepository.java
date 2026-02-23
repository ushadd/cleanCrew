package com.example.Category.Repository;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Find bookings assigned to a specific staff member
    List<Booking> findByStaff(User staff);

    // Find bookings by customer
    List<Booking> findByCustomer(User customer);

    // Find bookings by staff and status
    List<Booking> findByStaffAndStatus(User staff, String status);
}
