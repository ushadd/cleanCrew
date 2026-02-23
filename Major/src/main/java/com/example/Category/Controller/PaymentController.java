package com.example.Category.Controller;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Payment;
import com.example.Category.Service.BookingService;
import com.example.Category.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    // Below code For Fetch The Details Of Payment Table using names.
    @GetMapping("/fetch")

    public List<Payment> getpaymentdetails() {
        return paymentService.getpaymentdetaisl();
    }

    // Below Code For Fetch The Details Of Payment Table Using Id.
    @GetMapping("/{id}")
    public Payment getpaymentdeatilsbyid(@PathVariable Long id) {
        return paymentService.getpaymentdeatilsbyid(id);
    }

    // Below Code for Insert The Data - For frontend form submission
    @PostMapping
    public Payment createPayment(@RequestBody Map<String, Object> paymentData) {
        return paymentService.createPaymentFromFrontend(paymentData);
    }

    // Below Code for Insert The Data.
    @PostMapping("/insert")
    public List<Payment> insertpayment(@RequestBody List<Payment> payments) {
        return paymentService.insertpayemet(payments);
    }

    // This Below Code For Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Payment updatepayment(@PathVariable Long id, @RequestBody List<Payment> payments) {
        return paymentService.updatepayment(id, payments);
    }

    // This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyId(@PathVariable Long id) {
        return paymentService.deletebyId(id);
    }
}
