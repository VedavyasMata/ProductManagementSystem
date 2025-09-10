import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated product:", editedProduct);
    // Call API to update backend if needed
  };

  const handleCancel = () => {
    setEditedProduct({ ...product });
    setIsEditing(false);
  };

  return (
    <div className="product-card" style={styles.card}>
      {/* Edit icon */}
      {!isEditing && (
        <FaEdit
          style={styles.editIcon}
          onClick={() => setIsEditing(true)}
          title="Edit Product"
        />
      )}

      {/* Product image */}
      <img
        src={editedProduct.image || "/defaultImage.png"}
        alt={editedProduct.name}
        style={styles.image}
      />

      {/* Edit mode form */}
      {isEditing ? (
        <div style={styles.editForm}>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleChange}
            placeholder="Name"
            style={styles.input}
          />
          <input
            type="number"
            name="price"
            value={editedProduct.price}
            onChange={handleChange}
            placeholder="Price"
            style={styles.input}
          />
          <textarea
            name="description"
            value={editedProduct.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            style={styles.textarea}
          />
          <input
            type="text"
            name="category"
            value={editedProduct.category}
            onChange={handleChange}
            placeholder="Category"
            style={styles.input}
          />
          <div style={styles.editButtons}>
            <FaSave style={styles.saveIcon} onClick={handleSave} title="Save" />
            <FaTimes
              style={styles.cancelIcon}
              onClick={handleCancel}
              title="Cancel"
            />
          </div>
        </div>
      ) : (
        <>
          <h3 style={styles.name}>{editedProduct.name}</h3>
          <p style={styles.detail}>
            <strong>Price:</strong> ₹{editedProduct.price}
          </p>
          <p style={styles.detail}>
            <strong>Category:</strong> {editedProduct.category}
          </p>
          <p style={styles.detail}>
            <strong>Description:</strong> {editedProduct.description}
          </p>
          
        </>
      )}

      {/* Delete button → triggers parent ConfirmModal */}
      <button style={styles.deleteButton} onClick={() => onDelete(product._id)}>
        Delete
      </button>
    </div>
  );
};

// Inline styles
const styles = {
  card: {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    width: "260px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  name: {
    margin: "0",
    color: "#08436a",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
  },
  detail: {
    margin: "3px 0",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#d9534f",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  editIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    color: "#08436a",
    fontSize: "20px",
    transition: "color 0.2s",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  input: {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "8px 10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
  },
  editButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "5px",
  },
  saveIcon: {
    cursor: "pointer",
    color: "#27ae60",
    fontSize: "20px",
    transition: "all 0.2s",
  },
  cancelIcon: {
    cursor: "pointer",
    color: "#e74c3c",
    fontSize: "20px",
    transition: "all 0.2s",
  },
};

export default ProductCard;  