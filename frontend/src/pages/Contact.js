import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-text">
          Love to hear from you! Reach out to us via the following:
        </p>

        <div className="contact-info">
          <div className="info-item">
            <h3><FaEnvelope className="info-icon" /> Email</h3>
            <p>vedavyasmatarguktn@gmail.com</p>
          </div>
          <div className="info-item">
            <h3><FaPhone className="info-icon" /> Phone</h3>
            <p>+91 6303207561</p>
          </div>
          <div className="info-item">
            <h3><FaMapMarkerAlt className="info-icon" /> Address</h3>
            <p>RGUKT Nuzvid, Eluru District, Andhra Pradesh, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
