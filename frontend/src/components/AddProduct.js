import React, { useState } from "react";
import axios from "axios";
import { productImages } from "../data/productImages";
import "./AddProductForm.css";  

function AddProduct({ onAdd, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const categories = [
  "Mobile Devices",       // Smartphones
  "Wearables",            // Smart Watches
  "Electronic Gadget",    // iPads/Tablets
  "Appliances",          // TVs
  "Others",
];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return alert("Select a product name");
    if (!form.category) return alert("Select a category");
    if (!form.price || Number(form.price) < 0) return alert("Enter valid price");

    try {
      setLoading(true);

      // save to backend
      await axios.post("http://localhost:5000/api/products", { ...form });

      // reset local form
      setForm({ name: "", price: "", description: "", category: "" });

      // refresh list in parent (if provided) — await in case parent returns a promise
      if (onAdd) await onAdd();

      // close modal (if provided)
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <select name="name" value={form.name} onChange={handleChange}>
        <option value="" disabled>
          Select Product Name
        </option>
        {Object.keys(productImages)
          .filter((n) => n !== "Others")
          .map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
      </select>

      <select name="category" value={form.category} onChange={handleChange}>
        <option value="" disabled>
          Select Category
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />

      {/* multi-line description */}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>

        {/* clear / cancel - closes modal without adding */}
        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            setForm({ name: "", price: "", description: "", category: "" });
            if (onClose) onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddProduct;