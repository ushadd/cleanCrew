package com.example.Category.Controller;

import com.example.Category.Entity.Booking;
import com.example.Category.Entity.Category;
import com.example.Category.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "http://localhost:3000/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //Below code For Fetch The Details Of Category Table using names.
    @GetMapping("/fetch")

    public List<Category> getcategorydetails()
    {
        return categoryService.getcategorydetails();
    }

    //Below Code For Fetch The Details Of Booking Table Using Id.
    @GetMapping("/{id}")
    public Category getcategorydeatilsbyid(@PathVariable Long id)
    {
        return categoryService.getcategorydetailsbyid(id);
    }

    //Below Code for Insert The Data.
    @PostMapping("/insert")
    public List<Category> insertcategory(@RequestBody List<Category> categories)
    {
        return categoryService.insertcategory(categories);
    }

    //This Below Code For Update The Data Using By Id.
    @PutMapping("/update/{id}")
    public Category updatecategory(@PathVariable Long id,@RequestBody List<Category> categories)
    {
        return categoryService.updatecategory(id,categories);
    }

    //This Below Code For Deleting The Data Using By Id.
    @DeleteMapping("/delete/{id}")
    public String deletebyId(@PathVariable Long id)
    {
        return categoryService.deletebyId(id);
    }
}
