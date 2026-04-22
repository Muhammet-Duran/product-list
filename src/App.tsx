import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { ProductContextProvider } from "./contexts/ProductContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import Header from "./components/Header/Header";
import ChatWidget from "./components/ChatWidget";

const App: React.FC = () => {
  return (
    <ProductContextProvider>
      <ChatContextProvider>
        <div className={styles.app_area}>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
          <ChatWidget />
        </div>
      </ChatContextProvider>
    </ProductContextProvider>
  );
};

export default App;
