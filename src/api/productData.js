import { fetch } from "./fetch.js";

export const getProductList = async (filterBy) => {
  const response = await fetch.get(`/products?${filterBy}`);
  return response.data;
};
