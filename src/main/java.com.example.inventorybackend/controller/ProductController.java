package com.example.inventorybackend.controller;

import com.example.inventorybackend.model.Product;
import com.example.inventorybackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product created = productService.createProduct(product);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // The "category" query param is optional. If it's not in the URL, Spring passes null here.
    @GetMapping
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category) {

        List<Product> products;

        if (category != null && !category.isBlank()) {
            products = productService.getProductsByCategory(category);
        } else {
            products = productService.getAllProducts();
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = productService.getStats();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<Product> updateQuantity(
            @PathVariable String id,
            @RequestBody Map<String, Integer> body) {

        // We only accept a { "quantity": <number> } body for this endpoint
        if (!body.containsKey("quantity")) {
            throw new IllegalArgumentException("Request body must include a 'quantity' field");
        }

        int newQuantity = body.get("quantity");
        Product updated = productService.updateQuantity(id, newQuantity);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}