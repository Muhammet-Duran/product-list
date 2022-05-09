import React from "react";
import { useProductContext } from "../../contexts/ProductContext";
import cn from "classnames";
import styles from "./Header.module.scss";
import { BsBagCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  const { cartList, openFilter } = useProductContext();
  return (
    <header className={styles.header_wrapper}>
      <div className={cn("container", styles.header_wrapper__h_area)}>
        <Link to="/" className={styles.header_wrapper__h_area__logo}>
          <span className={styles.firstly}>e</span>
          <span
            className={`${styles.others} ${openFilter && styles.color_black}`}
          >
            - STORE
          </span>
        </Link>

        <Link to="/cart" className={styles.header_wrapper__h_area__cart}>
          <BsBagCheck className={styles.header_wrapper__h_area__cart__icon} />
          <span className={styles.header_wrapper__h_area__cart__count}>
            {cartList?.length}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
