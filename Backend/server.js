const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./models/Product");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas password
const mongoURI =
  "mongodb+srv://vedavyasmatarguktn_db_user:ProductMS@cluster0.m7lt7g4.mongodb.net/productsDB?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// API routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error adding product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running at http://localhost:5000")
);
