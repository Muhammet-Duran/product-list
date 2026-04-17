import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { ProductContextProvider } from "./contexts/ProductContext";
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <ProductContextProvider>
      <div className={styles.app_area}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </ProductContextProvider>
  );
};

export default App;
