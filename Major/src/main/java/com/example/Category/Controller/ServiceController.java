package com.example.Category.Controller;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Services;
import com.example.Category.Repository.ServicesRepository;
import com.example.Category.Service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceController {
    @Autowired
    private ServicesService servicesService;

    // Below code For Fetch The Details Of Service Table using names.
    @GetMapping("/fetch")

    public List<Services> getservicedetails() {
        return servicesService.getservicedetails();
    }

    // Below Code For Fetch The Details Of service Table Using Id.
    @GetMapping("/{id}")
    public Services getservisedeatilsbyid(@PathVariable Long id) {
        return servicesService.getservisedeatilsbyid(id);
    }

    // Below Code for Insert The Data.
    @PostMapping("/insert")
    public List<Services> insertservice(@RequestBody List<Services> services) {
        return servicesService.insertservice(services);
    }

    // This Below Code For Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Services updateservice(@PathVariable Long id, @RequestBody List<Services> services) {
        return servicesService.updateservice(id, services);
    }

    // This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyId(@PathVariable Long id) {
        return servicesService.deletebyId(id);
    }
}
