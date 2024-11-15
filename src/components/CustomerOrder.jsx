import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const   
 CustomerOrderForm = ({ userId, cartItems, totalAmount, onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   


    // Check if there are cart items before proceeding
    if (!cartItems || cartItems.length === 0) {
      
      alert('Your cart is empty. Please add items to the cart before placing the order.');
      return;
    }

    const orderData = {
      user: { id: userId },
      totalAmount,
      orderDate: new Date(),
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      orderItems: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price * item.quantity,
      })),
    };

    try {
      const response = await axios.post('http://localhost:8061/api/orders/placeOrder', orderData);

      if (response.status === 200) {
        setMessage('Your order has been placed successfully!');
        // Optionally, clear the cart after successful order placement
        onOrderSuccess();
      } else {
        setMessage('There was an issue with placing your order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage('Failed to place order. Please try again.');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Row className="w-100">
        <Col sm={12} md={8} lg={6} className="mx-auto" style={{ flex: 1 }}>
          <div
            style={{
              backgroundColor: "#212121",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              color: "#f8f9fa",
              minHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h3
              style={{
                fontFamily: "'Arial', sans-serif",
                color: "#f8f9fa",
                fontSize: "1.75rem",
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              Shipping Address
            </h3>
            <Form onSubmit={handleSubmit}>
              {/* Address Form Fields */}
              <Form.Group controlId="street">
                <Form.Label style={{ fontFamily: "'Arial', sans-serif", color: "#f8f9fa" }}>
                  Street
                </Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "1rem",
                    backgroundColor: "#333333",
                    color: "#f8f9fa",
                    border: "1px solid #444444",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label style={{ fontFamily: "'Arial', sans-serif", color: "#f8f9fa" }}>
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "1rem",
                    backgroundColor: "#333333",
                    color: "#f8f9fa",
                    border: "1px solid #444444",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label style={{ fontFamily: "'Arial', sans-serif", color: "#f8f9fa" }}>
                  State
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "1rem",
                    backgroundColor: "#333333",
                    color: "#f8f9fa",
                    border: "1px solid #444444",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="zipCode">
                <Form.Label style={{ fontFamily: "'Arial', sans-serif", color: "#f8f9fa" }}>
                  Zip Code
                </Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "1rem",
                    backgroundColor: "#333333",
                    color: "#f8f9fa",
                    border: "1px solid #444444",
                  }}
                />
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label style={{ fontFamily: "'Arial', sans-serif", color: "#f8f9fa" }}>
                  Country
                </Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "4px",
                    padding: "10px",
                    marginBottom: "1rem",
                    backgroundColor: "#333333",
                    color: "#f8f9fa",
                    border: "1px solid #444444",
                  }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  fontSize: "16px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Place Order
              </Button>
            </Form>
            {/* Display success or error message */}
            {message && (
              <div
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  color: message.includes("successfully") ? "green" : "red",
                }}
              >
                {message}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerOrderForm;
