import React from "react";
import Button from "../../Button/Button";
import styles from "./CartBtnArea.module.scss";
import { useProductContext } from "../../../contexts/ProductContext";

const CartBtnArea = ({ product }) => {

  const { increaseToCart, removeToCart, decreaseToCart } = useProductContext();

  return (
    <div className={styles.cartbtn_area}>
      <Button
        classNames={styles.delete_btn}
        preferences="act_btn"
        onClick={() => removeToCart(product)}
      >
        Remove
      </Button>
      <div className={styles.count_area}>
        <Button preferences="count_btn" onClick={() => increaseToCart(product)}>
          +
        </Button>
        <span className={styles.piece}>{product.count}</span>
        <Button preferences="count_btn" onClick={() => decreaseToCart(product)}>
          -
        </Button>
      </div>
    </div>
  );
};

export default CartBtnArea;
