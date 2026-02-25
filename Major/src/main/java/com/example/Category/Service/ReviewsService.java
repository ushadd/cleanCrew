package com.example.Category.Service;

import com.example.Category.Entity.Reviews;
import com.example.Category.Entity.Booking;
import com.example.Category.Repository.ReviewsRepository;
import com.example.Category.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Collections;
import java.util.Comparator;

@Service
public class ReviewsService {

    @Autowired
    private ReviewsRepository reviewsRepo;

    @Autowired
    private BookingRepository bookingRepository;

    // This Below Code for fetch The Data
    public List<Reviews> getdetails() {
        return reviewsRepo.findAll();
    }

    // This Below Code for fetch recent reviews sorted by date (newest first)
    public List<Reviews> getRecentReviews() {
        List<Reviews> reviews = reviewsRepo.findAll();
        // Sort by reviewDate descending (newest first)
        Collections.sort(reviews, (r1, r2) -> {
            if (r1.getReviewDate() == null && r2.getReviewDate() == null)
                return 0;
            if (r1.getReviewDate() == null)
                return 1;
            if (r2.getReviewDate() == null)
                return -1;
            return r2.getReviewDate().compareTo(r1.getReviewDate());
        });
        return reviews;
    }

    // This Below Code for fetch The Data By Id
    public Reviews getreviewsdetailsbyid(Long id) {
        return reviewsRepo.findById(id).orElse(null);
    }

    // Check if a booking is completed - used to validate if review can be submitted
    public boolean isBookingCompleted(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null) {
            return false;
        }
        return "Completed".equals(booking.getStatus());
    }

    // Get booking by ID
    public Booking getBookingById(Integer bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    // This Below Code for Insert The Data
    public Reviews addReviews(Reviews reviews) {
        // Save the review directly to database without requiring booking completion
        // This allows customers to submit reviews without needing a completed booking
        return reviewsRepo.save(reviews);
    }

    public Reviews updatereviews(Long id, List<Reviews> reviews) {
        Reviews reviews1 = reviewsRepo.findById(id).orElse(null);
        reviews1.setBooking(reviews.getFirst().getBooking());
        reviews1.setCustomer(reviews.getFirst().getCustomer());
        reviews1.setStaff(reviews.getFirst().getStaff());
        reviews1.setRating(reviews.getFirst().getRating());
        reviews1.setComment(reviews.getFirst().getComment());
        return reviewsRepo.save(reviews1);
    }

    public String deleteReviews(Long id) {
        reviewsRepo.deleteById(id);
        return "Deleted successfully";
    }

}
