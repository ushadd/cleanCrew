package com.example.Category.Service;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.User;
import com.example.Category.Entity.Services;
import com.example.Category.Repository.BookingRepository;
import com.example.Category.Repository.UserRepository;
import com.example.Category.Repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingsRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServicesRepository servicesRepository;

    // Below Code For Fetch The Details()
    public List<Booking> getbookingdetails() {
        return bookingsRepo.findAll();
    }

    // This Below Code For Fetch The Data By Id.
    public Booking getbookingdetailsbyid(Integer id) {
        return bookingsRepo.findById(id).orElse(null);
    }

    // This method handles frontend booking form submission
    public Booking createBookingFromFrontend(Map<String, Object> bookingData) {
        Booking booking = new Booking();

        // Set booking date/time from frontend date field
        if (bookingData.containsKey("date") && bookingData.get("date") != null) {
            String dateStr = (String) bookingData.get("date");
            try {
                LocalDateTime dateTime = LocalDateTime.parse(dateStr + "T10:00:00");
                booking.setBooking_date_time(dateTime);
            } catch (Exception e) {
                booking.setBooking_date_time(LocalDateTime.now());
            }
        } else {
            booking.setBooking_date_time(LocalDateTime.now());
        }

        booking.setStatus("Pending");

        // Set property type or default to Home
        if (bookingData.containsKey("property_type")) {
            booking.setProperty_type((String) bookingData.get("property_type"));
        } else {
            booking.setProperty_type("Home");
        }

        // Get the logged-in user by userId sent from frontend
        if (bookingData.containsKey("userId") && bookingData.get("userId") != null) {
            Object userIdObj = bookingData.get("userId");
            Long userId = null;
            if (userIdObj instanceof Integer) {
                userId = ((Integer) userIdObj).longValue();
            } else if (userIdObj instanceof Long) {
                userId = (Long) userIdObj;
            }
            if (userId != null) {
                User customer = userRepository.findById(userId).orElse(null);
                booking.setCustomer(customer);
            }
        }

        // Set service if provided
        if (bookingData.containsKey("service")) {
            // Use first available service for now
            Services service = servicesRepository.findAll().stream().findFirst().orElse(null);
            booking.setServices(service);
        }

        // Set staff from frontend staffId
        if (bookingData.containsKey("staffId") && bookingData.get("staffId") != null) {
            Object staffIdObj = bookingData.get("staffId");
            Long staffId = null;
            if (staffIdObj instanceof Integer) {
                staffId = ((Integer) staffIdObj).longValue();
            } else if (staffIdObj instanceof Long) {
                staffId = (Long) staffIdObj;
            }
            if (staffId != null) {
                User staff = userRepository.findById(staffId).orElse(null);
                booking.setStaff(staff);
            }
        } else {
            booking.setStaff(null);
        }

        return bookingsRepo.save(booking);
    }

    // Get bookings for a specific staff member (staff's booking history)
    public List<Booking> getBookingsByStaff(Long staffId) {
        User staff = userRepository.findById(staffId).orElse(null);
        if (staff == null) {
            return List.of();
        }
        return bookingsRepo.findByStaff(staff);
    }

    // Get bookings for a specific customer
    public List<Booking> getBookingsByCustomer(Long customerId) {
        User customer = userRepository.findById(customerId).orElse(null);
        if (customer == null) {
            return List.of();
        }
        return bookingsRepo.findByCustomer(customer);
    }

    // Update booking status - used to mark service as completed
    public Booking updateBookingStatus(Integer bookingId, String newStatus) {
        Booking booking = bookingsRepo.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStatus(newStatus);
            return bookingsRepo.save(booking);
        }
        return null;
    }

    // Update booking confirmation - customer confirms service completion
    public Booking confirmBooking(Integer bookingId, Boolean confirmed) {
        Booking booking = bookingsRepo.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setCustomerConfirmation(confirmed);
            return bookingsRepo.save(booking);
        }
        return null;
    }

    // Staff confirms the booking - staff accepts the service request
    public Booking staffConfirmBooking(Integer bookingId, Boolean confirmed) {
        Booking booking = bookingsRepo.findById(bookingId).orElse(null);
        if (booking != null) {
            booking.setStaffConfirmation(confirmed);
            // If staff confirms, automatically update status to Accepted
            if (confirmed) {
                booking.setStatus("Accepted");
            }
            return bookingsRepo.save(booking);
        }
        return null;
    }

    // This Below Code For insert The Data.
    public List<Booking> insertbookings(List<Booking> bookings) {
        return bookingsRepo.saveAll(bookings);
    }

    // The Below Code For Update The Details Using By Id.
    public Booking updatebooking(Integer id, List<Booking> bookings) {
        Booking bookings1 = bookingsRepo.findById(id).orElse(null);
        bookings1.setCustomer(bookings.getFirst().getCustomer());
        bookings1.setStaff(bookings.getFirst().getStaff());
        bookings1.setServices(bookings.getFirst().getServices());
        bookings1.setBooking_date_time(bookings.getFirst().getBooking_date_time());
        bookings1.setStatus(bookings.getFirst().getStatus());
        bookings1.setProperty_type(bookings.getFirst().getProperty_type());
        return bookingsRepo.save(bookings1);
    }

    // This Below Code For Delete The Data.
    public String deletebyId(Integer id) {
        bookingsRepo.deleteById(id);
        return "Delete Successfully";
    }
}
