import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ProductList from './ProductList'; // Example for main product listing

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} /> {/* Main page */}
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Dynamic route */}
      </Routes>
    </Router>
  );
};

export default App;
