const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Classic Backpack",
    price: 39.99,
    category: "Bags",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 79.99,
    category: "Gadgets",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 59.99,
    category: "Electronics",
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Orebi Shopping API is running!",
  });
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
