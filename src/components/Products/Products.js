import React from "react";
import cn from "classnames";
import ProductCard from "./../ProductCard/ProductCard";
import NotFound from "../NotFound/NotFound";
import styles from "./Products.module.scss";

const Products = ({ products, preferences, isCart }) => {
  return (
    <ul
      className={cn(
        styles.productlist,
        styles?.[preferences],
        `${isCart ? styles?.["col_2"] : styles?.["col_mobile"]}`
      )}
    >
      {products?.length ? (
        products?.map((product, i) => (
          <ProductCard key={i} product={product} isCart={isCart} />
        ))
      ) : (
        <NotFound />
      )}
    </ul>
  );
};

export default Products;
