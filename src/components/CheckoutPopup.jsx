import React from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

// Styled components for better styling
const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled(Modal.Body)`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  return (
    <StyledModal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <div className="checkout-items" style={{ width: '100%', textAlign: 'center' }}>
          {cartItems.map((item) => (
            <CheckoutItem key={item.id}>
              <ItemImage src={item.imageUrl} alt={item.name} />
              <div>
                <b><p>{item.name}</p></b>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
              </div>
            </CheckoutItem>
          ))}
          <TotalPrice>Total: ${totalPrice}</TotalPrice>
        </div>
      </ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckout}>
          Confirm Purchase
        </Button>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CheckoutPopup;