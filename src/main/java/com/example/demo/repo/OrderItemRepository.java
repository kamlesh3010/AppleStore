package com.example.demo.repo;

import com.example.demo.model.OrderItem;
import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
