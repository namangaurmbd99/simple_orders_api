import React, { useState } from "react";
import axios from "axios";

export default function OrderForm() {
  const [customerId, setCustomerId] = useState("");
  const [productIds, setProductIds] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = productIds.split(",").map(id => parseInt(id.trim()));
    try {
      await axios.post("http://127.0.0.1:8000/orders/", { customer_id: parseInt(customerId), product_ids: ids });
      alert("Order created!");
      setCustomerId("");
      setProductIds("");
    } catch (error) {
      alert("Error creating order");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Order</h2>
      <input value={customerId} onChange={e => setCustomerId(e.target.value)} placeholder="Customer ID" required />
      <input value={productIds} onChange={e => setProductIds(e.target.value)} placeholder="Product IDs (comma-separated)" required />
      <button type="submit">Submit</button>
    </form>
  );
}
