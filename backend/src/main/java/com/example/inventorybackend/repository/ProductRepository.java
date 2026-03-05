package com.example.inventorybackend.repository;

import com.example.inventorybackend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    // Spring Data reads the method name and figures out the query on its own.
    // "findBy" + "Category" means: WHERE category = ?
    List<Product> findByCategory(String category);
}