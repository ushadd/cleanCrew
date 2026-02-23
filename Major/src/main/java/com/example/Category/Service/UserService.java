package com.example.Category.Service;

import com.example.Category.Entity.User;
import com.example.Category.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getuserdetails() {
        return userRepository.findAll();
    }

    public User getuserdetailsbyid(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Find user by email
    public User findByEmail(String email) {
        return userRepository.findByUserMail(email).orElse(null);
    }

    // Find user by email - returns first match (for handling duplicates)
    public User findFirstByEmail(String email) {
        List<User> users = userRepository.findAll().stream()
                .filter(u -> u.getUser_mail() != null && u.getUser_mail().equals(email))
                .toList();
        return users.isEmpty() ? null : users.getFirst();
    }

    // Find users by role
    public List<User> findByRole(User.UserRole role) {
        return userRepository.findByUserRole(role);
    }

    // Find all staff users
    public List<User> getAllStaff() {
        return userRepository.findByUserRole(User.UserRole.Staff);
    }

    // Find all customers
    public List<User> getAllCustomers() {
        return userRepository.findByUserRole(User.UserRole.Customer);
    }

    // Find all admins
    public List<User> getAllAdmins() {
        return userRepository.findByUserRole(User.UserRole.Admin);
    }

    public List<User> insertuserdetails(List<User> users) {
        return userRepository.saveAll(users);
    }

    public User updateuser(Long id, List<User> users) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUser_name(users.getFirst().getUser_name());
            user.setUser_mail(users.getFirst().getUser_mail());
            user.setUser_password(users.getFirst().getUser_password());
            user.setUser_role(users.getFirst().getUser_role());
            return userRepository.save(user);
        }
        return null;
    }

    // Update user role
    public User updateUserRole(Long id, User.UserRole role) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUser_role(role);
            return userRepository.save(user);
        }
        return null;
    }

    public String deletebyId(Long id) {
        userRepository.deleteById(id);
        return "Delete Successfully";
    }
}
