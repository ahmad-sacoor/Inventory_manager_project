package com.example.inventorybackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "products")
public class Product {

    // MongoDB generates this automatically as an ObjectId when a document is saved
    @Id
    private String id;

    private String name;
    private String category;
    private int quantity;
    private double price;
}