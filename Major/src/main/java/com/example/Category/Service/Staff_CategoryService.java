package com.example.Category.Service;

import com.example.Category.Entity.Staff_Category;
import com.example.Category.Repository.Staff_CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Staff_CategoryService {
    @Autowired
    private Staff_CategoryRepository staffCategoryRepository;

    public List<Staff_Category> getstaffcategorydetails()
    {
        return staffCategoryRepository.findAll();
    }

    public Staff_Category getstaffcategorydetailsbyid(Long id)
    {
        return staffCategoryRepository.findById(id).orElse(null);
    }

    public List<Staff_Category> insertstaffcategory(List<Staff_Category> staffCategories)
    {
        return staffCategoryRepository.saveAll(staffCategories);
    }

    public Staff_Category updatestaff(Long id, List<Staff_Category> staffCategories)
    {
        Staff_Category staffCategory=staffCategoryRepository.findById(id).orElse(null);
        staffCategory.setCategory(staffCategories.getFirst().getCategory());
        return staffCategoryRepository.save(staffCategory);
    }

    public String deletebyid(Long id) {
        staffCategoryRepository.deleteById(id);
        return "Delete Successfully";
    }
}
