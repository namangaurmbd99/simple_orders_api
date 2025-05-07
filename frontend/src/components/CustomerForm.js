import React, { useState } from "react";
import axios from "axios";

export default function CustomerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/customers/", { name, email });
      alert("Customer created!");
      setName("");
      setEmail("");
    } catch (error) {
      alert("Error creating customer");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Customer</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <button type="submit">Submit</button>
    </form>
  );
}
