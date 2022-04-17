import React from "react";
import cn from "classnames";
import ProductCard from "./../ProductCard/ProductCard";
// import {useProductContext} from "./../../contexts/ProductContext";
import styles from "./Products.module.scss";

const Products = ({ products, preferences }) => {
  return (
    <ul className={cn(styles.productlist, styles?.[preferences])}>
      {products?.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </ul>
  );
};

export default Products;
