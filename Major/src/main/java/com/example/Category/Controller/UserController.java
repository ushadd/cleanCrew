package com.example.Category.Controller;

import com.example.Category.Entity.User;
import com.example.Category.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Fetch all users
    @GetMapping("/fetch")
    public List<User> getuserdetails() {
        return userService.getuserdetails();
    }

    // Fetch user by ID
    @GetMapping("/{id}")
    public User getuserdetailsbyid(@PathVariable Long id) {
        return userService.getuserdetailsbyid(id);
    }

    // Fetch user by email
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    // Register User - accepts frontend mapped fields
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userData) {
        try {
            // Check if email already exists
            User existingUser = userService.findByEmail(userData.get("user_mail"));
            if (existingUser != null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Email already registered");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
            }

            User user = new User();
            user.setUser_name(userData.get("user_name"));
            user.setUser_mail(userData.get("user_mail"));
            user.setUser_password(userData.get("user_password"));

            // Parse role - handle both string and enum format
            String roleStr = userData.getOrDefault("user_role", "Customer");
            try {
                user.setUser_role(User.UserRole.valueOf(roleStr));
            } catch (IllegalArgumentException e) {
                user.setUser_role(User.UserRole.Customer);
            }

            User saved = userService.insertuserdetails(List.of(user)).getFirst();
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // Login User - returns user object with id for frontend to store
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("user_mail");
        String password = loginData.get("user_password");

        User found = userService.findFirstByEmail(email);

        if (found != null && found.getUser_password().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", found.getId());
            response.put("user_name", found.getUser_name());
            response.put("user_mail", found.getUser_mail());
            response.put("user_role", found.getUser_role());
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }

    // Switch user role (for admin to change user roles)
    @PutMapping("/switch-role/{id}")
    public ResponseEntity<?> switchUserRole(@PathVariable Long id, @RequestBody Map<String, String> roleData) {
        try {
            String roleStr = roleData.get("user_role");
            User.UserRole role = User.UserRole.valueOf(roleStr);
            User updated = userService.updateUserRole(id, role);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update role: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }

    // Get all staff
    @GetMapping("/staff")
    public List<User> getAllStaff() {
        return userService.getAllStaff();
    }

    // Get all customers
    @GetMapping("/customers")
    public List<User> getAllCustomers() {
        return userService.getAllCustomers();
    }

    // Insert users (bulk)
    @PostMapping("/insert")
    public List<User> insertuserdetails(@RequestBody List<User> users) {
        return userService.insertuserdetails(users);
    }

    // Update user by ID
    @PutMapping("/update/{id}")
    public User updateuser(@PathVariable Long id, @RequestBody List<User> users) {
        return userService.updateuser(id, users);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public String deletebyId(@PathVariable Long id) {
        return userService.deletebyId(id);
    }
}
