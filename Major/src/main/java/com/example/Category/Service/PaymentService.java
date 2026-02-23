package com.example.Category.Service;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Payment;
import com.example.Category.Entity.User;
import com.example.Category.Repository.PaymentRepository;
import com.example.Category.Repository.BookingRepository;
import com.example.Category.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Payment> getpaymentdetaisl() {
        return paymentRepository.findAll();
    }

    public Payment getpaymentdeatilsbyid(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // Method to create payment from frontend
    public Payment createPaymentFromFrontend(Map<String, Object> paymentData) {
        Payment payment = new Payment();

        // Set booking from the ID provided
        if (paymentData.containsKey("booking") && paymentData.get("booking") != null) {
            Object bookingObj = paymentData.get("booking");
            if (bookingObj instanceof Map) {
                Map<?, ?> bookingMap = (Map<?, ?>) bookingObj;
                if (bookingMap.containsKey("id")) {
                    Object idObj = bookingMap.get("id");
                    Integer bookingId = null;
                    if (idObj instanceof Integer) {
                        bookingId = (Integer) idObj;
                    } else if (idObj instanceof Long) {
                        bookingId = ((Long) idObj).intValue();
                    } else if (idObj instanceof String) {
                        bookingId = Integer.parseInt((String) idObj);
                    }
                    if (bookingId != null) {
                        Booking booking = bookingRepository.findById(bookingId).orElse(null);
                        payment.setBooking(booking);
                    }
                }
            }
        }

        // Set amount
        if (paymentData.containsKey("amount")) {
            Object amountObj = paymentData.get("amount");
            if (amountObj instanceof Number) {
                payment.setAmount(((Number) amountObj).floatValue());
            }
        }

        // Set payment method
        if (paymentData.containsKey("payment_method")) {
            payment.setPayment_method((String) paymentData.get("payment_method"));
        }

        // Set payment status
        if (paymentData.containsKey("payment_status")) {
            payment.setPayment_status((String) paymentData.get("payment_status"));
        } else {
            payment.setPayment_status("Success");
        }

        // Set payment date/time
        if (paymentData.containsKey("payment_date_time")) {
            String dateTimeStr = (String) paymentData.get("payment_date_time");
            try {
                payment.setPayment_date_time(LocalDateTime.parse(dateTimeStr));
            } catch (Exception e) {
                payment.setPayment_date_time(LocalDateTime.now());
            }
        } else {
            payment.setPayment_date_time(LocalDateTime.now());
        }

        // Set customer from userId sent by frontend
        if (paymentData.containsKey("userId") && paymentData.get("userId") != null) {
            Object userIdObj = paymentData.get("userId");
            Long userId = null;
            if (userIdObj instanceof Integer) {
                userId = ((Integer) userIdObj).longValue();
            } else if (userIdObj instanceof Long) {
                userId = (Long) userIdObj;
            }
            if (userId != null) {
                User customer = userRepository.findById(userId).orElse(null);
                payment.setCustomer(customer);
            }
        }

        return paymentRepository.save(payment);
    }

    public List<Payment> insertpayemet(List<Payment> payments) {
        return paymentRepository.saveAll(payments);
    }

    public Payment updatepayment(Long id, List<Payment> payments) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        payment.setAmount(payments.getFirst().getAmount());
        payment.setPayment_method(payments.getFirst().getPayment_method());
        payment.setPayment_status(payments.getFirst().getPayment_status());
        payment.setPayment_date_time(payments.getFirst().getPayment_date_time());
        return paymentRepository.save(payment);
    }

    public String deletebyId(Long id) {
        paymentRepository.deleteById(id);
        return "Delete Successfully";
    }
}
