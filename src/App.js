
import styles from "./App.module.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className={styles.app_area}>
      <Router>
      <Header />
      <div className={styles.app_area__main}>
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </div>
      </Router>
      
    </div>
  );
}

export default App;
