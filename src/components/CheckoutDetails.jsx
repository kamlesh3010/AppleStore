import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutDetails = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here (e.g., save to database, show confirmation)
    alert('Checkout details submitted!');
    navigate('/'); // Navigate to the home page or wherever you want after submission
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Enter Your Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Mode:</label>
          <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} style={styles.select}>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
    fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#666',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.2s',
    '&:focus': {
      borderColor: '#0071e3',
    },
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#0071e3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#005bb5',
    },
  },
};

export default CheckoutDetails;
