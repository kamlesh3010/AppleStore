import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => localStorage.getItem("theme") || "light-theme";
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchCartItems();
    document.body.className = theme;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [theme]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8061/api/product");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCartItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    setCartItems(storedCartItems ? parseInt(storedCartItems, 10) : 0);
  };

  const handleChange = async (value) => {
    setInput(value);
    setShowSearchResults(value.length >= 1);
    if (value.length >= 1) {
      try {
        const response = await axios.get(`http://localhost:8061/api/product/search?keyword=${value}`);
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const categories = ["Laptop", "Headphone", "Mobile", "Electronics", "IPad", "Charger"];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleAddToCart = () => {
    const newCartCount = cartItems + 1;
    setCartItems(newCartCount);
    localStorage.setItem("cartItems", newCartCount);  // Persist cart count
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: theme === "dark-theme" ? "#212529" : "#f8f9fa", padding: "1rem" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ color: theme === "dark-theme" ? "#fff" : "#000", fontWeight: "bold" }}>
            Apple
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/" style={{ color: theme === "dark-theme" ? "#fff" : "#000" }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add_product" style={{ color: theme === "dark-theme" ? "#fff" : "#000" }}>
                  Add Product
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: theme === "dark-theme" ? "#fff" : "#000" }}
                >
                  Categories
                </a>
                <ul className="dropdown-menu" style={{ minWidth: "150px" }}>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(category)}
                        style={{ cursor: "pointer" }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <button className="btn btn-outline-light me-2" onClick={toggleTheme}>
              {theme === "dark-theme" ? (
                <i className="bi bi-moon-fill"></i>
              ) : (
                <i className="bi bi-sun-fill"></i>
              )}
            </button>
            <div className="d-flex align-items-center cart position-relative">
              <a href="/cart" className="nav-link" style={{ color: theme === "dark-theme" ? "#fff" : "#000" }}>
                <i className="bi bi-cart me-2">
                  Cart ({cartItems})
                </i>
              </a>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                style={{ maxWidth: "200px" }}
              />
              {showSearchResults && (
                <ul className="list-group position-absolute" style={{ top: "100%", left: "0", zIndex: 1000, width: "100%", maxHeight: "200px", overflowY: "auto" }}>
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <li key={result.id} className="list-group-item">
                        <a href={`/product/${result.id}`} className="search-result-link" style={{ color: "#000", textDecoration: "none" }}>
                          <span>{result.name}</span>
                        </a>
                      </li>
                    ))
                  ) : (
                    noResults && <li className="list-group-item text-danger">No Product with such Name</li>
                  )}
                </ul>
              )}
            </div>
            {user ? (
              <div className="d-flex align-items-center">
                <span className="text-white me-2">Hello, {user.name}</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <a href="/login" className="btn btn-primary ms-3">
                Login/SignUp
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
