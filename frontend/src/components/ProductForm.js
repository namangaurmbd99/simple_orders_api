import React, { useState } from "react";
import axios from "axios";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/products/", { name, price: parseFloat(price) });
      alert("Product created!");
      setName("");
      setPrice("");
    } catch (error) {
      alert("Error creating product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" required />
      <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" step="0.01" required />
      <button type="submit">Submit</button>
    </form>
  );
}
