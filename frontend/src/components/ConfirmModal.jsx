import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button onClick={onCancel} style={{ padding: "8px 15px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{ padding: "8px 15px", borderRadius: "6px", border: "none", background: "#e74c3c", color: "#fff", cursor: "pointer" }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
