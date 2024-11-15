import "./App.css";
import React, { useState } from "react";
import Register from "./components/Registration.jsx"; // Corrected import statement

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import CheckoutDetails from "./components/CheckoutDetails"; // Import the CheckoutDetails component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./components/login.jsx"; // Corrected the import name
import CustomerOrder from "./components/CustomerOrder"; // Import the CustomerOrder component

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect} />
        <Routes>
          <Route
            path="/"
            element={
              <Home addToCart={addToCart} selectedCategory={selectedCategory} />
            }
          />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart cartItems={cart} />} /> {/* Pass cart to Cart component */}
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/customerOrder" element={<CustomerOrder />} /> {/* Ensure CustomerOrder route exists */}

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
