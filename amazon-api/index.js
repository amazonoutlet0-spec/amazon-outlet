const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Mock data for orders
let mockOrders = [
  {
    id: "1",
    userId: "mock-user-id",
    total: 99.99,
    status: "completed",
    items: [
      {
        id: "1",
        productId: "123",
        title: "Mock Product 1",
        price: 49.99,
        quantity: 1,
        image: "https://via.placeholder.com/150"
      }
    ],
    createdAt: new Date().toISOString()
  }
];

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    message: "Amazon Clone API is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Get all orders (mock)
app.get("/api/orders", (req, res) => {
  res.json(mockOrders);
});

// Create order (mock)
app.post("/api/orders", (req, res) => {
  const { totalAmount, items, email, name } = req.body;
  
  const newOrder = {
    id: Date.now().toString(),
    userId: "mock-user-id",
    total: totalAmount || 0,
    status: "pending",
    items: items || [],
    email: email || "mock@example.com",
    name: name || "Mock User",
    createdAt: new Date().toISOString()
  };
  
  mockOrders.push(newOrder);
  res.status(201).json(newOrder);
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Amazon Clone API",
    endpoints: {
      health: "/api/health",
      orders: "/api/orders"
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is running on: http://localhost:${process.env.PORT || 5000}`
  );
});
