package com.example.demo.service;

import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import com.example.demo.model.Product;
import com.example.demo.repo.CustOrderRepo;
import com.example.demo.repo.OrderItemRepository;
import com.example.demo.repo.ProductRepository;
import com.example.demo.repo.UserRepo;
import com.example.demo.userLogin.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private CustOrderRepo customerOrderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepo userRepository;

    // Refactored method to accept CustomerOrder object
    public ResponseEntity<CustomerOrder> createOrder(CustomerOrder customerOrder) {
        // Validate the user
        Optional<User> userOptional = userRepository.findById(customerOrder.getUser().getId());
        if (userOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();
        customerOrder.setUser(user);  // Set the user to the order

        // Validate products and order items
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItem orderItem : customerOrder.getOrderItems()) {
            Optional<Product> productOptional = productRepository.findById(orderItem.getProduct().getId());
            if (productOptional.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            Product product = productOptional.get();
            orderItem.setProduct(product);  // Set the product from DB to the order item
            orderItem.setPriceAtTimeOfOrder(product.getPrice());  // Set price at the time of order

            // Calculate total price for this item
            orderItem.setTotalPrice(orderItem.getTotalPrice());

            // Add to order items and update total amount
            orderItems.add(orderItem);
            totalAmount = totalAmount.add(orderItem.getTotalPrice());
        }

        // Set the total amount for the order
        customerOrder.setTotalAmount(totalAmount);
        customerOrder.setOrderDate(new Date());

        // Save the customer order to the database
        customerOrder = customerOrderRepository.save(customerOrder);

        // Save each order item and associate it with the customer order
        for (OrderItem orderItem : orderItems) {
            orderItem.setCustomerOrder(customerOrder);
            orderItemRepository.save(orderItem);
        }

        return new ResponseEntity<>(customerOrder, HttpStatus.CREATED);
    }
}
