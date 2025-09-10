import React from "react";
import AddProduct from "./AddProduct";
import "./AddProductForm.css";

const AddProductForm = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  // pass onClose down so AddProduct can close the modal after adding
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <AddProduct onAdd={onAdd} onClose={onClose} />
      </div>
    </div>
  );
};

export default AddProductForm;