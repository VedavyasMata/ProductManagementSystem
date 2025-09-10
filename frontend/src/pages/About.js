import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
          Welcome to our <span>Product Management System</span>! 
          This platform helps you <strong>add, manage, and delete products efficiently</strong> 
          with a modern and responsive interface.
        </p>
        <p className="about-text">
          Built using <span>React, Node.js, Express, and MongoDB</span>, it is designed to be user-friendly, fast, and reliable.
        </p>
        <div className="about-features">
          <div className="feature">
            <h3>🛒 Product Management</h3>
            <p>Add, edit, and delete products easily.</p>
          </div>
          <div className="feature">
            <h3>⚡ Fast & Responsive</h3>
            <p>Works smoothly on all devices and screen sizes.</p>
          </div>
          <div className="feature">
            <h3>🔒 Secure</h3>
            <p>Safe data storage using modern backend technologies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
