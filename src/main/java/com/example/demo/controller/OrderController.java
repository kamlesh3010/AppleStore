package com.example.demo.controller;

import com.example.demo.model.CustomerOrder;
import com.example.demo.model.OrderItem;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/orders")
@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Refactored to use @RequestBody for better data handling
    @PostMapping("/placeorder")
    public ResponseEntity<CustomerOrder> placeOrder(@RequestBody CustomerOrder customerOrder) {
        return orderService.createOrder(customerOrder);
    }
}
