import React, { useState } from "react";
// import styles from "./Page.module.scss";
import Products from "../components/Products/Products";
import { useProductContext } from "../contexts/ProductContext";

const Cart = () => {
  const { cartList } = useProductContext();

  // const [isCart, setIsCart]= useState(true);

  return (
    <div className="container">
      <Products products={cartList} preferences="col_4" />
    </div>
  );
};

export default Cart;
