package com.example.demo.repo;

import com.example.demo.model.CustomerOrder;
import com.example.demo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustOrderRepo extends JpaRepository<CustomerOrder,Long> {


}
