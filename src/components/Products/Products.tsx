import React from "react";
import cn from "classnames";
import ProductCard from "../ProductCard/ProductCard";
import NotFound from "../NotFound/NotFound";
import EmptyCart from "../EmptyCart/EmptyCart";
import Loading from "../Loading/Loading";
import styles from "./Products.module.scss";
import { Product, CartItem } from "../../types";

interface ProductsProps {
  products: Product[] | CartItem[];
  preferences: string;
  isCart?: boolean;
  isLoading?: boolean;
}

const Products: React.FC<ProductsProps> = ({ 
  products, 
  preferences, 
  isCart = false,
  isLoading = false 
}) => {
  return (
    <ul
      className={cn(
        styles.productlist,
        styles[preferences],
        isCart ? styles.col_2 : styles.col_mobile
      )}
    >
      {isLoading ? (
        <Loading count={preferences === "col_2" ? 4 : 8} />
      ) : products?.length ? (
        products?.map((product, i) => (
          <ProductCard key={i} product={product} isCart={isCart} />
        ))
      ) : isCart ? (
        <EmptyCart />
      ) : (
        <NotFound />
      )}
    </ul>
  );
};

export default Products;
