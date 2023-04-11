import React from "react";
import { Routes, Route } from "react-router-dom";

// import Home from "./home";
import ProductListing from "./ProductListing";
import Orders from "./Orders";
import Login from "./Login";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Routes>
    {/* <Route exact path="/" element={<Home />} /> */}
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/products" element={<ProductListing />} />
    <Route exact path="/my-orders" element={<Orders />} />
  </Routes>
);
