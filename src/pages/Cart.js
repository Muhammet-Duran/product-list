import React from "react";
import styles from "./Page.module.scss";
import Products from "../components/Products/Products";
import { useProductContext } from "../contexts/ProductContext";

const Cart = () => {
  const { cartList, totalCartCost } = useProductContext();

  

  return (
    <div className="container">
      <div className={styles.total_price}>
        <span>TOTAL COST : {totalCartCost} &#8378;</span>
      </div>
      <Products products={cartList} isCart preferences="col_2" />
    </div>
  );
};

export default Cart;
