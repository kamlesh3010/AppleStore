package com.example.demo.controller;

import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import com.example.demo.repo.CustOrderRepo;
import com.example.demo.repo.ProductRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.userLogin.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;

@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {

    @Autowired
    private CustOrderRepo customerOrderRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ProductRepo productRepository;  // Injecting Product repository

    @PostMapping("/placeOrder")
    public ResponseEntity<?> createOrder(@RequestBody CustomerOrder orderData) {
        try {
            // Find user by ID, throw exception if not found
            User user = userRepository.findById(orderData.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Set user and order date
            orderData.setUser(user);
            orderData.setOrderDate(new Date());

            BigDecimal totalAmount = BigDecimal.ZERO;

            // Check if the order has items
            if (orderData.getOrderItems() != null && !orderData.getOrderItems().isEmpty()) {
                for (OrderItem item : orderData.getOrderItems()) {
                    // Ensure price is not null
                    if (item.getPriceAtTimeOfOrder() == null) {
                        return ResponseEntity.badRequest().body("Price at the time of order cannot be null");
                    }

                    // Ensure product exists in the database
                    if (productRepository.findById(item.getProduct().getId()).isEmpty()) {
                        return ResponseEntity.badRequest().body("Product not found with ID: " + item.getProduct().getId());
                    }

                    // Link order item to the customer order
                    item.setCustomerOrder(orderData);

                    // Add item total price to the overall total amount
                    totalAmount = totalAmount.add(item.getTotalPrice());
                }
            } else {
                return ResponseEntity.badRequest().body("Order must contain at least one item");
            }

            // Set the total amount for the order
            orderData.setTotalAmount(totalAmount);

            // Save the order to the database
            CustomerOrder savedOrder = customerOrderRepository.save(orderData);

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);

        } catch (Exception e) {
            // Catch any other exceptions and return a generic error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing the order: " + e.getMessage());
        }
    }
}
