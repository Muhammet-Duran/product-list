import React, { Fragment } from "react";
import styles from "./ProductCard.module.scss";
import cn from "classnames";
import Button from "../Button/Button";
import CartBtnArea from "./CartBtnArea/CartBtnArea";
import { discountPrice } from "../../Helpers/discountPrice";
import { useProductContext } from "../../contexts/ProductContext";

const ProductCard = ({ product, isCart }) => {
  const { addToCart } = useProductContext();
  // const newPrice = parseInt(product.price) * ((100 - product.discount) / 100);

  return (
    <li
      className={cn(
        styles.product_card,
        `${isCart ? styles?.["flex_row"] : ""}`
      )}
    >
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
          {!isCart && (
            <span className={styles.product_card__details__price__old_price}>
              {product.price} &#8378;
            </span>
          )}

          <span className={styles.product_card__details__price__first_area}>
            <span
              className={
                styles.product_card__details__price__first_area__new_price
              }
            >
              {discountPrice(product).toFixed(2)} &#8378;
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
      {!isCart ? (
        <Button preferences="act_btn" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      ) : (
        <Fragment>
          <span className={styles.piece_area}>
            Quantity : <span>{product.quantity - product.count}</span>
          </span>
          <CartBtnArea product={product} />
          <span className={`${styles.piece_area} ${styles.sum_price}`}>
            TOTAL :{" "}
            <span>
              {(product.count * discountPrice(product)).toFixed(2)} &#8378;
            </span>
          </span>
        </Fragment>
      )}
    </li>
  );
};

export default ProductCard;
