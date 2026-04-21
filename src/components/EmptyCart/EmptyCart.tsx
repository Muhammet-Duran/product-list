import React from "react";
import { BsBagCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styles from "./EmptyCart.module.scss";

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.empty_cart}>
      <BsBagCheck className={styles.icon} />
      <h2>Your Cart is Empty</h2>
      <p>Looks like you haven't added anything to your cart yet</p>
      <button className={styles.shop_button} onClick={() => navigate("/")}>
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
