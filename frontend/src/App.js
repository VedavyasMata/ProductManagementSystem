import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { FaBox, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  // ✅ Centralized state for products
  const [products, setProducts] = useState([]);

  // Add product instantly to state
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // Delete product instantly from state
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="app-wrapper">
      <Router>
        {/* Navbar */}
        <header className="navbar">
          <div className="logo">
            🛒 <span>Product Management System</span>
          </div>
          <nav>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaBox style={{ marginRight: "6px" }} /> Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaInfoCircle style={{ marginRight: "6px" }} /> About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaEnvelope style={{ marginRight: "6px" }} /> Contact
            </NavLink>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  onAddProduct={handleAddProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Product Management System | All rights reserved.
          </p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
