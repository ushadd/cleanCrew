package com.example.Category.Controller;

import com.example.Category.Entity.Staff_Category;
import com.example.Category.Service.Staff_CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff_category")
@CrossOrigin(origins = "http://localhost:3000/")
public class Staff_CategoryController {

    @Autowired
    private Staff_CategoryService staffCategoriesService;

    //This Below Code For Fetch the Staff Details.
    @GetMapping("/fetch")
    public List<Staff_Category> getstaffcategorydetails()
    {
        return staffCategoriesService.getstaffcategorydetails();
    }

    //This Below Code For fetch The Data By id.
    @GetMapping("/{id}")
    public Staff_Category getstaffcategorydetailsbyid(@PathVariable Long id)
    {
        return staffCategoriesService.getstaffcategorydetailsbyid(id);
    }

    //Below Code for Insert The Data.
    @PostMapping("/insert")
    public List<Staff_Category> insertstaffcategory(@RequestBody List<Staff_Category> staffCategories)
    {
        return staffCategoriesService.insertstaffcategory(staffCategories);
    }

    //Below Code for Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Staff_Category updatestaff(@PathVariable Long id,@RequestBody List<Staff_Category> staffCategories)
    {
        return staffCategoriesService.updatestaff(id,staffCategories);
    }

    //This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyid(@PathVariable Long id)
    {
        return staffCategoriesService.deletebyid(id);
    }


}
