package com.example.Category.Service;

import com.example.Category.Entity.Staff_Details;
import com.example.Category.Entity.User;
import com.example.Category.Repository.Staff_detailsRepository;
import com.example.Category.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Staff_detailsService {
    @Autowired
    private Staff_detailsRepository staffDetailsRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Staff_Details> getstaffdetails() {
        return staffDetailsRepository.findAll();
    }

    public Staff_Details getstaffdetailsbyid(Long id) {
        return staffDetailsRepository.findById(id).orElse(null);
    }

    // Get staff details by user ID
    public Staff_Details getStaffDetailsByUserId(Long userId) {
        return staffDetailsRepository.findByStaffId(userId).orElse(null);
    }

    // Get all verified/accepted staff for customer selection
    public List<Staff_Details> getAcceptedStaff() {
        return staffDetailsRepository.findByVerified(Staff_Details.VerificationStatus.Accepted);
    }

    // Get all pending staff for admin verification
    public List<Staff_Details> getPendingStaff() {
        return staffDetailsRepository.findByVerified(Staff_Details.VerificationStatus.Pending);
    }

    public Staff_Details insertstaff(Staff_Details staffDetails) {
        return staffDetailsRepository.save(staffDetails);
    }

    // Register a new staff with their details
    public Staff_Details registerStaff(Long userId, Staff_Details staffDetails) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            staffDetails.setStaff(user);
            staffDetails.setVerified(Staff_Details.VerificationStatus.Pending);
            return staffDetailsRepository.save(staffDetails);
        }
        return null;
    }

    // Create staff details from frontend data
    public Staff_Details createStaffDetails(Long userId, java.util.Map<String, Object> staffData) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            Staff_Details details = new Staff_Details();
            details.setStaff(user);

            if (staffData.containsKey("experience")) {
                details.setExperience((String) staffData.get("experience"));
            }
            if (staffData.containsKey("availability")) {
                details.setAvailability((String) staffData.get("availability"));
            }
            if (staffData.containsKey("id_proof")) {
                details.setId_proof((String) staffData.get("id_proof"));
            }
            if (staffData.containsKey("phoneNumber")) {
                details.setPhoneNumber((String) staffData.get("phoneNumber"));
            }
            if (staffData.containsKey("address")) {
                details.setAddress((String) staffData.get("address"));
            }
            if (staffData.containsKey("serviceType")) {
                details.setServiceType((String) staffData.get("serviceType"));
            }

            details.setVerified(Staff_Details.VerificationStatus.Pending);
            return staffDetailsRepository.save(details);
        }
        return null;
    }

    public Staff_Details updatestaff(Long id, Staff_Details staffDetails) {
        Staff_Details staff_details = staffDetailsRepository.findById(id).orElse(null);
        if (staff_details != null) {
            staff_details.setExperience(staffDetails.getExperience());
            staff_details.setAvailability(staffDetails.getAvailability());
            staff_details.setId_proof(staffDetails.getId_proof());
            staff_details.setVerified(staffDetails.getVerified());
            staff_details.setPhoneNumber(staffDetails.getPhoneNumber());
            staff_details.setAddress(staffDetails.getAddress());
            staff_details.setServiceType(staffDetails.getServiceType());
            return staffDetailsRepository.save(staff_details);
        }
        return null;
    }

    // Update staff verification status (for admin)
    public Staff_Details updateVerificationStatus(Long id, Staff_Details.VerificationStatus status) {
        Staff_Details staff_details = staffDetailsRepository.findById(id).orElse(null);
        if (staff_details != null) {
            staff_details.setVerified(status);
            return staffDetailsRepository.save(staff_details);
        }
        return null;
    }

    public String deletebyid(Long id) {
        staffDetailsRepository.deleteById(id);
        return "Delete Successfully";
    }

    // Seed 10 staff members for testing
    public List<Staff_Details> seedStaffData() {
        // Create 10 staff users with their details
        List<Staff_Details> staffList = new java.util.ArrayList<>();

        String[][] staffData = {
                { "John Smith", "john.smith@email.com", "5 years", "Mon-Sat", "Aadhaar Card", "9876543210",
                        "123 Main St, City", "Home Cleaning" },
                { "Sarah Johnson", "sarah.j@email.com", "3 years", "Mon-Fri", "Passport", "9876543211",
                        "456 Oak Ave, City", "Office Cleaning" },
                { "Mike Davis", "mike.d@email.com", "7 years", "Tue-Sun", "Driving License", "9876543212",
                        "789 Pine Rd, City", "Deep Cleaning" },
                { "Emily White", "emily.w@email.com", "4 years", "Daily", "Aadhaar Card", "9876543213",
                        "321 Elm St, City", "Window Cleaning" },
                { "Robert Brown", "robert.b@email.com", "6 years", "Weekends", "Voter ID", "9876543214",
                        "654 Maple Dr, City", "Carpet Cleaning" },
                { "Lisa Wilson", "lisa.wilson@email.com", "2 years", "Mon-Wed", "Aadhaar Card", "9876543215",
                        "987 Cedar Ln, City", "Kitchen Cleaning" },
                { "David Miller", "david.m@email.com", "8 years", "Full-time", "Passport", "9876543216",
                        "147 Birch Ct, City", "Sanitization" },
                { "Anna Garcia", "anna.g@email.com", "5 years", "Evenings", "Driving License", "9876543217",
                        "258 Walnut Way, City", "Bathroom Cleaning" },
                { "Kevin Lee", "kevin.lee@email.com", "3 years", "Thu-Sat", "Aadhaar Card", "9876543218",
                        "369 Spruce Ave, City", "Move-in/out Cleaning" },
                { "Jessica Taylor", "jessica.t@email.com", "4 years", "Mon-Thu", "Voter ID", "9876543219",
                        "741 Ash Rd, City", "Laundry Services" }
        };

        for (String[] data : staffData) {
            // Check if user already exists
            User existingUser = userRepository.findByUserMail(data[1]).orElse(null);
            User user;
            if (existingUser != null) {
                user = existingUser;
            } else {
                // Create new user
                user = new User();
                user.setUser_name(data[0]);
                user.setUser_mail(data[1]);
                user.setUser_password("password123");
                user.setUser_role(User.UserRole.Staff);
                user = userRepository.save(user);
            }

            // Check if staff details already exist
            Staff_Details existingStaff = staffDetailsRepository.findByStaff(user).orElse(null);
            if (existingStaff != null) {
                staffList.add(existingStaff);
                continue;
            }

            // Create staff details
            Staff_Details staff = new Staff_Details();
            staff.setStaff(user);
            staff.setExperience(data[2]);
            staff.setAvailability(data[3]);
            staff.setId_proof(data[4]);
            staff.setPhoneNumber(data[5]);
            staff.setAddress(data[6]);
            staff.setServiceType(data[7]);
            staff.setVerified(Staff_Details.VerificationStatus.Accepted);

            staffList.add(staffDetailsRepository.save(staff));
        }

        return staffList;
    }
}
