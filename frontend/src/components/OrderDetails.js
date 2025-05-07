// src/components/OrderDetails.js

import React, { useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleFetchOrder = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/orders/${orderId}`);
      setOrder(response.data);
      setError("");
    } catch (err) {
      setOrder(null);
      if (err.response && err.response.status === 404) {
        setError("Order not found.");
      } else {
        setError("An error occurred while fetching the order.");
      }
    }
  };

  return (
    <div>
      <h2>📦 Get Order Details</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleFetchOrder}>Fetch Order</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {order && (
        <div style={{ marginTop: "20px", background: "#eef", padding: "10px", borderRadius: "8px" }}>
          <h3>Order #{order.order_id}</h3>
          <p><strong>Customer:</strong> {order.customer.name} ({order.customer.email})</p>
          <h4>Products:</h4>
          <ul>
            {order.products.map((product, idx) => (
              <li key={idx}>{product.name} - ₹{product.price}</li>
            ))}
          </ul>
          <p><strong>Total Cost:</strong> ₹{order.total_cost}</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
