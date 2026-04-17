import React from "react";
import styles from "./Page.module.scss";
import Products from "../components/Products/Products";
import { useProductContext } from "../contexts/ProductContext";

const Cart: React.FC = () => {
  const { cartList, totalCartCost } = useProductContext();

  return (
    <div className="container">
      <div className={styles.total_price}>
        <span>TOTAL COST : {totalCartCost} &#8378;</span>
      </div>
      <Products products={cartList} preferences="col_2" isCart={true} />
    </div>
  );
};

export default Cart;
