package com.example.Category.Controller;

import com.example.Category.Entity.Staff_Details;
import com.example.Category.Entity.User;
import com.example.Category.Service.Staff_detailsService;
import com.example.Category.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class Staff_detailsController {
    @Autowired
    private Staff_detailsService staffDetailsService;

    @Autowired
    private UserService userService;

    // This Below Code For Fetch the Staff Details.
    @GetMapping("/fetch")
    public List<Staff_Details> getstaffdetails() {
        return staffDetailsService.getstaffdetails();
    }

    // Get accepted staff for customer selection
    @GetMapping("/available")
    public List<Staff_Details> getAvailableStaff() {
        return staffDetailsService.getAcceptedStaff();
    }

    // Get pending staff for admin verification
    @GetMapping("/pending")
    public List<Staff_Details> getPendingStaff() {
        return staffDetailsService.getPendingStaff();
    }

    // This Below Code For fetch The Data By id.
    @GetMapping("/{id}")
    public Staff_Details getstaffdetailsbyid(@PathVariable Long id) {
        return staffDetailsService.getstaffdetailsbyid(id);
    }

    // Get staff details by user ID
    @GetMapping("/user/{userId}")
    public Staff_Details getStaffDetailsByUserId(@PathVariable Long userId) {
        return staffDetailsService.getStaffDetailsByUserId(userId);
    }

    // Below Code for Insert The Data.
    @PostMapping("/insert")
    public Staff_Details insertstaff(@RequestBody Staff_Details staffDetails) {
        return staffDetailsService.insertstaff(staffDetails);
    }

    // Register as staff - creates user and staff details together
    @PostMapping("/register")
    public ResponseEntity<?> registerAsStaff(@RequestBody Map<String, Object> registrationData) {
        try {
            // Check if email already exists
            User existingUser = userService.findByEmail((String) registrationData.get("user_mail"));
            if (existingUser != null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email already registered");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            // First create the user
            User user = new User();
            user.setUser_name((String) registrationData.get("user_name"));
            user.setUser_mail((String) registrationData.get("user_mail"));
            user.setUser_password((String) registrationData.get("user_password"));
            user.setUser_role(User.UserRole.Staff);

            User savedUser = userService.insertuserdetails(List.of(user)).getFirst();

            // Then create staff details
            Staff_Details staffDetails = new Staff_Details();
            staffDetails.setStaff(savedUser);
            staffDetails.setExperience((String) registrationData.get("experience"));
            staffDetails.setAvailability((String) registrationData.get("availability"));
            staffDetails.setId_proof((String) registrationData.get("id_proof"));
            staffDetails.setPhoneNumber((String) registrationData.get("phoneNumber"));
            staffDetails.setAddress((String) registrationData.get("address"));
            staffDetails.setServiceType((String) registrationData.get("serviceType"));
            staffDetails.setVerified(Staff_Details.VerificationStatus.Pending);

            Staff_Details savedStaff = staffDetailsService.insertstaff(staffDetails);

            Map<String, Object> response = new HashMap<>();
            response.put("user", savedUser);
            response.put("staffDetails", savedStaff);
            response.put("message", "Staff registration successful! Your account is pending verification.");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Add staff details for existing user
    @PostMapping("/add-details/{userId}")
    public ResponseEntity<?> addStaffDetails(@PathVariable Long userId, @RequestBody Map<String, Object> staffData) {
        try {
            Staff_Details staffDetails = staffDetailsService.createStaffDetails(userId, staffData);
            if (staffDetails != null) {
                return ResponseEntity.ok(staffDetails);
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to add staff details: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }

    // Below Code for Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Staff_Details updatestaff(@PathVariable Long id, @RequestBody Staff_Details staffDetails) {
        return staffDetailsService.updatestaff(id, staffDetails);
    }

    // Update staff verification status (for admin)
    @PutMapping("/verify/{id}")
    public Staff_Details updateVerification(@PathVariable Long id, @RequestBody Map<String, String> statusData) {
        String status = statusData.get("status");
        Staff_Details.VerificationStatus verificationStatus = Staff_Details.VerificationStatus.valueOf(status);
        return staffDetailsService.updateVerificationStatus(id, verificationStatus);
    }

    // This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyid(@PathVariable Long id) {
        return staffDetailsService.deletebyid(id);
    }

    // Seed 10 staff members into the database
    @PostMapping("/seed")
    public ResponseEntity<?> seedStaffData() {
        try {
            List<Staff_Details> staffList = staffDetailsService.seedStaffData();
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Successfully seeded " + staffList.size() + " staff members");
            response.put("staff", staffList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to seed staff data: " + e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}
