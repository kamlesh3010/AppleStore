import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logout from './logout';
import { useAuth } from '../context/AuthProvider';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [authUser, setAuthUser] = useAuth(); // Using auth state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8061/api/user/login', formData);
            setAuthUser(response.data); // Update authUser with logged-in user info
            localStorage.setItem('Users', JSON.stringify(response.data)); // Storing user info in localStorage
            toast.success('Login Successful');
            setTimeout(() => navigate('/'), 1500); // Redirect to Home page after 1.5 seconds
        } catch (error) {
            toast.error(error.response?.data || 'Login failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#212529' }}>
            <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px', backgroundColor: '#343a40', color: '#fff' }}>
                <h2 className="text-center mb-4" style={{ color: '#f8f9fa' }}>Login</h2>
                {authUser?.user ? (
                    <div className="text-center">
                        <p>Welcome back, {authUser.userName}</p>
                        <Logout /> {/* Render Logout component */}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
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
                            Login
                        </button>
                    </form>
                )}
                <div className="mt-3 text-center">
                    <p style={{ color: '#f8f9fa' }}>Don't have an account? <a href="/register" className="text-primary">Register here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
