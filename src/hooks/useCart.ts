import { useState, useEffect } from "react";
import { Product, CartItem } from "../types";
import { discountPrice } from "../Helpers/discountPrice";

const CART_STORAGE_KEY = "myCartList";

/**
 * Custom hook for cart management
 * Handles cart operations and localStorage persistence
 */
export const useCart = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartList = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCartList) {
      setCartList(JSON.parse(savedCartList));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartList));
  }, [cartList]);

  const addToCart = (product: Product): void => {
    if (cartList.find((item) => item.productId === product.productId)) {
      return;
    }
    const newList: CartItem[] = [...cartList, { ...product, count: 1 }];
    setCartList(newList);
  };

  const removeFromCart = (product: CartItem): void => {
    const newList = cartList.filter(
      (item) => item.productId !== product.productId
    );
    setCartList(newList);
  };

  const increaseQuantity = (product: CartItem): void => {
    const newList = cartList.map((item) =>
      item.productId === product.productId
        ? {
            ...item,
            count:
              item.count === item.quantity ? item.quantity : item.count + 1,
          }
        : item
    );
    setCartList(newList);
  };

  const decreaseQuantity = (product: CartItem): void => {
    const newList = cartList.map((item) =>
      item.productId === product.productId
        ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
        : item
    );
    setCartList(newList);
  };

  const totalCartCost: string = cartList
    .reduce(
      (total, product) => total + discountPrice(product) * product.count,
      0
    )
    .toFixed(2);

  return {
    cartList,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalCartCost,
  };
};
