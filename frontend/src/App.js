import React from "react";
import CustomerForm from "./components/CustomerForm";
import ProductForm from "./components/ProductForm";
import OrderForm from "./components/OrderForm";
import OrderDetails from "./components/OrderDetails";
import "./App.css"; 

function App() {
  return (
    <div className="container">
      <h1>🛍️ Simple Orders App</h1>
      <div className="forms">
        <CustomerForm />
        <ProductForm />
        <OrderForm />
        <OrderDetails />
      </div>
    </div>
  );
}

export default App;
