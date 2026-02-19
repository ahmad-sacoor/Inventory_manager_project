package com.example.inventorybackend.service;

import com.example.inventorybackend.exception.ProductNotFoundException;
import com.example.inventorybackend.model.Product;
import com.example.inventorybackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        if (product.getName() == null || product.getName().isBlank()) {
            throw new IllegalArgumentException("Product name cannot be empty");
        }
        if (product.getPrice() < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        if (product.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product updateQuantity(String id, int newQuantity) {
        if (newQuantity < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }

        // findById returns an Optional — it might have a value or it might be empty
        Optional<Product> optional = productRepository.findById(id);
        if (!optional.isPresent()) {
            throw new ProductNotFoundException(id);
        }

        Product product = optional.get();
        product.setQuantity(newQuantity);
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    public Map<String, Object> getStats() {
        List<Product> allProducts = productRepository.findAll();

        List<Product> lowStockProducts = new ArrayList<>();
        for (Product product : allProducts) {
            if (product.getQuantity() < 10) {
                lowStockProducts.add(product);
            }
        }

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", allProducts.size());
        stats.put("lowStockProducts", lowStockProducts);

        return stats;
    }
}