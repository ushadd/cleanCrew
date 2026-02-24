package com.example.Category.Controller;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.User;
import com.example.Category.Entity.Services;
import com.example.Category.Service.BookingService;
import com.example.Category.Service.UserService;
import com.example.Category.Service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    private BookingService bookingsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ServicesService servicesService;

    // Below code For Fetch The Details Of Booking Table using names.
    @GetMapping("/fetch")

    public List<Booking> getbookingdetails() {
        return bookingsService.getbookingdetails();
    }

    // Below Code For Fetch The Details Of Booking Table Using Id.
    @GetMapping("/{id}")
    public Booking getbookingdeatilsbyid(@PathVariable Integer id) {
        return bookingsService.getbookingdetailsbyid(id);
    }

    // Below Code for Insert The Data - For frontend form submission
    @PostMapping
    public Booking createBooking(@RequestBody Map<String, Object> bookingData) {
        return bookingsService.createBookingFromFrontend(bookingData);
    }

    // Below Code for Insert The Data.
    @PostMapping("/insert")
    public List<Booking> insertbookings(@RequestBody List<Booking> bookings) {
        return bookingsService.insertbookings(bookings);
    }

    // This Below Code For Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Booking updatebooking(@PathVariable Integer id, @RequestBody List<Booking> bookings) {
        return bookingsService.updatebooking(id, bookings);
    }

    // Update booking status - mark as completed
    @PutMapping("/status/{id}")
    public Booking updateBookingStatus(@PathVariable Integer id, @RequestBody Map<String, String> statusData) {
        String newStatus = statusData.get("status");
        return bookingsService.updateBookingStatus(id, newStatus);
    }

    // Update booking confirmation - customer confirms service completion
    @PutMapping("/confirm/{id}")
    public Booking confirmBooking(@PathVariable Integer id, @RequestBody Map<String, Boolean> confirmationData) {
        Boolean confirmed = confirmationData.get("confirmed");
        return bookingsService.confirmBooking(id, confirmed);
    }

    // Staff confirms the booking - staff accepts the service request
    @PutMapping("/staff-confirm/{id}")
    public Booking staffConfirmBooking(@PathVariable Integer id, @RequestBody Map<String, Boolean> confirmationData) {
        Boolean confirmed = confirmationData.get("confirmed");
        return bookingsService.staffConfirmBooking(id, confirmed);
    }

    // Get bookings for staff - staff can see their assigned bookings
    @GetMapping("/staff/{staffId}")
    public List<Booking> getStaffBookings(@PathVariable Long staffId) {
        return bookingsService.getBookingsByStaff(staffId);
    }

    // Get bookings for customer - customer can see their bookings
    @GetMapping("/customer/{customerId}")
    public List<Booking> getCustomerBookings(@PathVariable Long customerId) {
        return bookingsService.getBookingsByCustomer(customerId);
    }

    // This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyId(@PathVariable Integer id) {
        return bookingsService.deletebyId(id);
    }
}