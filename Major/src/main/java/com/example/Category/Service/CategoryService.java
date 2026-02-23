package com.example.Category.Service;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Category;
import com.example.Category.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getcategorydetails()
    {
        return categoryRepository.findAll();
    }

    public Category getcategorydetailsbyid(Long id)
    {
        return categoryRepository.findById(id).orElse(null);
    }

    public List<Category> insertcategory(List<Category> categories)
    {
        return categoryRepository.saveAll(categories);
    }

    public Category updatecategory(Long id, List<Category> categories)
    {
        Category category=categoryRepository.findById(id).orElse(null);
        category.setCategory_name(categories.getFirst().getCategory_name());
        category.setServices(categories.getFirst().getServices());
        return categoryRepository.save(category);
    }

    public String deletebyId(Long id)
    {
        categoryRepository.deleteById(id);
        return "Delete Successfully";
    }
}
