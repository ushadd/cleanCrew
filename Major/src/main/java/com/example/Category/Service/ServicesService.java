package com.example.Category.Service;

import com.example.Category.Entity.Services;
import com.example.Category.Repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicesService {
    @Autowired
    private ServicesRepository servicesRepository;

    //Below Code For Fetch The Data.
    public List<Services> getservicedetails()
    {
        return servicesRepository.findAll();
    }

    //Below Code For Fetch The Data by id.
    public Services getservisedeatilsbyid(Long id)
    {
        return servicesRepository.findById(id).orElse(null);
    }

    //Below Code For insert The Data.
    public List<Services> insertservice(List<Services> services)
    {
        return servicesRepository.saveAll(services);
    }

    //Below Code For Update The Data.
    public Services updateservice(Long id, List<Services> services)
    {
        Services services1=servicesRepository.findById(id).orElse(null);
        services1.setService_name(services.getFirst().getService_name());
        services1.setDescription(services.getFirst().getDescription());
        services1.setPrice(services.getFirst().getPrice());
        services1.setDuration_time(services.getFirst().getDuration_time());
        return servicesRepository.save(services1);
    }

    public String deletebyId(Long id)
    {
        servicesRepository.deleteById(id);
        return "Delete Successfully";
    }
}
