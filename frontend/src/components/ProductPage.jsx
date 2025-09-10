import React, { useState } from "react";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";  
const ProductPage = ({ products, onAddProduct, onDelete, onEdit }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      {/* Top Bar: Search + Sort + Add Button */}
      <div className="flex items-center justify-between mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/3"
        />

        {/* Sort Dropdown */}
        <select className="border p-2 rounded">
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>

        {/* Add Product Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p._id}
            product={p}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* Popup Modal for Add Product Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[450px] relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>

            {/* existing AddProductForm component */}
            <AddProductForm
              onSubmit={(data) => {
                onAddProduct(data); // call parent function
                setShowForm(false); // close modal after submit
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
