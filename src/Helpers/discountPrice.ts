import { Product, CartItem } from "../types";

export const discountPrice = (product: Product | CartItem): number => {
  const price = parseFloat(product.price.replace(',', '.'));
  const newPrice = price * ((100 - product.discount) / 100);
  return newPrice;
};