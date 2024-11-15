package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private CustomerOrder customerOrder;

    private int quantity;
    private BigDecimal priceAtTimeOfOrder;

    @Transient
    private BigDecimal totalPrice;

    public BigDecimal getTotalPrice() {
        if (priceAtTimeOfOrder == null) {
            throw new IllegalStateException("Price at the time of order cannot be null");
        }
        return priceAtTimeOfOrder.multiply(BigDecimal.valueOf(quantity));
    }

    // Add a method to set the price at the time of order if it's not already set
    public void setPriceAtTimeOfOrder(BigDecimal priceAtTimeOfOrder) {
        if (this.priceAtTimeOfOrder == null) {
            this.priceAtTimeOfOrder = priceAtTimeOfOrder;
        }
    }
}
