
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { ProductContextProvider } from "./contexts/ProductContext";

import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <ProductContextProvider>
      <div className={styles.app_area}>
      <Router>
      <Header />
      <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </Router>
      
    </div>
    </ProductContextProvider>
    
  );
}

export default App;
