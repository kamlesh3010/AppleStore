import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Register the user
            const response = await axios.post('http://localhost:8061/api/user/register', formData);
            alert(response.data); // Show success message from backend
            
            // Attempt login after successful registration
            const loginResponse = await axios.post('http://localhost:8061/api/user/login', {
                email: formData.email,
                password: formData.password,
            });
            
            setUserName(loginResponse.data.userName);
            setIsLoggedIn(true);
            navigate('/'); // Redirect to Home page after successful login
        } catch (error) {
            alert(error.response?.data || 'Registration failed');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        navigate('/'); // Redirect to the home page or login page
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#212529' }}>
            <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px', backgroundColor: '#343a40', color: '#fff' }}>
                <h2 className="text-center mb-4" style={{ color: '#f8f9fa' }}>Register</h2>
                {isLoggedIn ? (
                    <div className="text-center">
                        <p>Welcome, {userName}</p>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="firstName" style={{ color: '#f8f9fa' }}>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control"
                                style={{ backgroundColor: '#495057', color: '#fff', borderColor: '#6c757d' }}
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="lastName" style={{ color: '#f8f9fa' }}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="form-control"
                                style={{ backgroundColor: '#495057', color: '#fff', borderColor: '#6c757d' }}
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" style={{ color: '#f8f9fa' }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                style={{ backgroundColor: '#495057', color: '#fff', borderColor: '#6c757d' }}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="phone" style={{ color: '#f8f9fa' }}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="form-control"
                                style={{ backgroundColor: '#495057', color: '#fff', borderColor: '#6c757d' }}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="password" style={{ color: '#f8f9fa' }}>Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                style={{ backgroundColor: '#495057', color: '#fff', borderColor: '#6c757d' }}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#007bff' }}>
                            Register
                        </button>
                    </form>
                )}
                <div className="mt-3 text-center">
                    <p style={{ color: '#f8f9fa' }}>Already have an account? <a href="/login" className="text-primary">Login here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Register;
