import { fetch } from "./fetch.js";

export const getSearchProduct = async (serchTerm) => {
  const response = await fetch.get(`/products?q=${serchTerm}`);
  return response.data;
};
getSearchProduct();
