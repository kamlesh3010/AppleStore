import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8061/api/user/login', formData);
            setUserName(response.data.userName); // Assuming response contains userName
            setIsLoggedIn(true);
            setMessage('Register Successful');
            setTimeout(() => navigate('/'), 1500); // Redirect to Home page after 1.5 seconds
        } catch (error) {
            alert(error.response?.data || 'Login failed');
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
                <h2 className="text-center mb-4" style={{ color: '#f8f9fa' }}>Login</h2>
                {isLoggedIn ? (
                    <div className="text-center">
                        <p>Welcome back, {userName}</p>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
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
                {message && <p className="text-success text-center mt-3">{message}</p>}
                <div className="mt-3 text-center">
                    <p style={{ color: '#f8f9fa' }}>Don't have an account? <a href="/register" className="text-primary">Register here</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
