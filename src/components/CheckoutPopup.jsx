import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

// Styled components for better styling
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
`;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1e1e1e; /* Dark background */
  color: white; /* Light text color for contrast */
`;

const CheckoutItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%; /* Full width */
  justify-content: space-between; /* Space between image and details */
  align-items: center; /* Center items vertically */
`;

const ItemImage = styled.img`
  width: 100px; /* Fixed width for images */
  margin-right: 10px;
`;

const TotalPrice = styled.h5`
  margin-top: 20px; /* Spacing above total */
  color: #f0ad4e; /* Highlight total price with a different color */
`;

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout, userId }) => {
  const navigate = useNavigate(); // Initialize the navigate function from react-router-dom

  // Handle the checkout and navigate to the CustomerOrder page
  const handleConfirmPurchase = () => {
    navigate("/customerOrder", { 
      state: { userId, cartItems, totalAmount: totalPrice } 
    });
    handleCheckout(); // Execute additional checkout logic, if any
  };

  return (
    <StyledModal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div className="checkout-items" style={{ width: '100%', textAlign: 'center' }}>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CheckoutItem key={item.id}>
                <ItemImage src={item.imageUrl} alt={item.name} />
                <div>
                  <b><p>{item.name}</p></b>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price * item.quantity}</p>
                </div>
              </CheckoutItem>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <TotalPrice>Total: ${totalPrice}</TotalPrice>
        </div>
      </ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirmPurchase}>
          Confirm Purchase
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CheckoutPopup;
