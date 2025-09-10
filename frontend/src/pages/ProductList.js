import { useState, useEffect } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";
import AddProductForm from "../components/AddProductForm";
import ConfirmModal from "../components/ConfirmModal";

import { productImages } from "../data/productImages";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // default: no sort
  const [isAddOpen, setIsAddOpen] = useState(false);

  // For delete confirmation
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const productsWithImages = res.data.map((p) => ({
        ...p,
        image: productImages[p.name] || productImages["Others"],
      }));
      setProducts(productsWithImages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open confirm modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsConfirmOpen(true);
  };

  // Handle actual delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${deleteId}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setIsConfirmOpen(false);
      setDeleteId(null);
    }
  };

  // Filter + sort
  const filteredProducts = [...products]
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0; // no sorting
    });

  return (
    <div className="product-page">
      {/* Title */}
      <h4 className="main-title">Available Products</h4>

      {/* Line 2: Search | Sort | Add */}
      <div className="controls-line">
        {/* Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products by the name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>

        {/* Sort */}
        <div className="sort-box">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort: None</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>

        {/* Add Product */}
        <button className="add-btn" onClick={() => setIsAddOpen(true)}>
          ➕ Add Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onDelete={() => confirmDelete(p._id)}
            />
          ))
        ) : (
          <p className="no-products">🚫 No products found.</p>

        )}
      </div>

      {/* Add Product Modal */}
      <AddProductForm
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={fetchProducts}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this product?"
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ProductList;