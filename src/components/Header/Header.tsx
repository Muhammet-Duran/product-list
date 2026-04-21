import React from "react";
import cn from "classnames";
import { BsBagCheck } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { useProductContext } from "../../contexts/ProductContext";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { cartList, openFilter } = useProductContext();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className={styles.header_wrapper}>
      <div className={cn("container", styles.header_wrapper__h_area)}>
        <Link to="/" className={styles.header_wrapper__h_area__logo}>
          <span className={styles.firstly}>e</span>
          <span
            className={cn(
              styles.others,
              isHomePage && openFilter && styles.color_black
            )}
          >
            - STORE
          </span>
        </Link>

        <Link to="/cart" className={styles.header_wrapper__h_area__cart}>
          <BsBagCheck className={styles.header_wrapper__h_area__cart__icon} />
          {cartList?.length > 0 && (
            <span className={styles.header_wrapper__h_area__cart__count}>
              {cartList?.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
