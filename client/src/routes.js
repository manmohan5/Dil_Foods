import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./home";
import ProductListing from "./ProductListing";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/products" element={<ProductListing />} />
  </Routes>
);
