import React from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button/Button";
import { useProductContext } from "../../contexts/ProductContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useProductContext();
  const newPrice = parseInt(product.price) * ((100 - product.discount) / 100);

  const handleAddProduct = () => {
    addToCart(product);
  };
  return (
    <li className={styles.product_card}>
      <div className={styles.product_card__img_area}>
        <img
          src={product.imgUrl}
          alt={product.title}
          className={styles.product_card__img_area__img}
        />
      </div>
      <div className={styles.product_card__details}>
        <div className={styles.product_card__details__info}>
          <p className={styles.product_card__details__info__product_name}>
            {product.title}
          </p>
          {/* <p className={styles.product_card__details__info__product_title}>
            <span>Category :</span>
            {product.category}
          </p> */}
          <p className={styles.product_card__details__info__product_title}>
            <span>Brand :</span>
            {product.brand}
          </p>
          <p className={styles.product_card__details__info__product_title}>
            <span>Color :</span>
            {product.color}
          </p>
        </div>
        <div className={styles.product_card__details__price}>
          <span className={styles.product_card__details__price__old_price}>
            {product.price} TL
          </span>
          <span className={styles.product_card__details__price__first_area}>
            <span
              className={
                styles.product_card__details__price__first_area__new_price
              }
            >
              {newPrice.toFixed(2)} TL
            </span>
            <span
              className={
                styles.product_card__details__price__first_area__percent
              }
            >
              {product.discount}%
            </span>
          </span>
        </div>
      </div>

      <Button
        preferences="add_btn"
        classNames={styles.btn_primary}
        onClick={handleAddProduct}
      >
        Add to Cart
      </Button>
    </li>
  );
};

export default ProductCard;
