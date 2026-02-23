package com.example.Category.Controller;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Reviews;
import com.example.Category.Service.ReviewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000/")
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    // This Below Code for fetch The Data (all reviews)
    @GetMapping("/fetch")
    public List<Reviews> getdetails() {
        return reviewsService.getdetails();
    }

    // This Below Code for fetch recent reviews (sorted by date)
    @GetMapping("/recent")
    public List<Reviews> getRecentReviews() {
        return reviewsService.getRecentReviews();
    }

    // Below Code For Fetch The Details Of Reviews Table Using Id.
    @GetMapping("/{id}")
    public Reviews getreviewsdeatilsbyid(@PathVariable Long id) {
        return reviewsService.getreviewsdetailsbyid(id);
    }

    // Check if a booking is completed (used to validate review submission)
    @GetMapping("/booking-status/{bookingId}")
    public Map<String, Object> checkBookingStatus(@PathVariable Integer bookingId) {
        boolean isCompleted = reviewsService.isBookingCompleted(bookingId);
        Booking booking = reviewsService.getBookingById(bookingId);
        return Map.of(
                "isCompleted", isCompleted,
                "bookingId", bookingId,
                "currentStatus", booking != null ? booking.getStatus() : "Not Found");
    }

    // This Below Code for insert The Data
    @PostMapping("/insert")
    public Reviews addReviews(@RequestBody Reviews reviews) {
        return reviewsService.addReviews(reviews);
    }

    // This Below Code for Update The Data
    @PutMapping("/update/{id}")
    public Reviews updatereviews(@PathVariable Long id, @RequestBody List<Reviews> reviews) {
        return reviewsService.updatereviews(id, reviews);
    }

    // This Below Code for delete The Data
    @DeleteMapping("/delete/{id}")
    public String deleteReviews(@PathVariable Long id) {
        return reviewsService.deleteReviews(id);

    }

}
