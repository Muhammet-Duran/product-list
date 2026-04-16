import { products } from "../data/products";

// Mock API - Axios kullanıyor gibi görünüyor ama local data dönüyor
export const getProductList = async (filterBy) => {
  // API gecikmesi simülasyonu
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock response - gerçek API'den geliyormuş gibi
  const mockResponse = {
    data: {
      products: filterBy ? filterProducts(filterBy) : products
    }
  };

  return mockResponse.data.products;
};

// Filtreleme fonksiyonu
function filterProducts(filterBy) {
  const params = {};
  filterBy.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (!params[key]) params[key] = [];
    params[key].push(value);
  });

  return products.filter((product) => {
    return Object.entries(params).every(([key, values]) => {
      if (!product[key]) return true;
      return values.some(
        (val) => String(product[key]).toLowerCase() === val.toLowerCase(),
      );
    });
  });
}

// Gerçek API'ye geçmek için bu fonksiyonu kullanın:
/*
import { fetch } from "./fetch";

export const getProductList = async (filterBy) => {
  try {
    const endpoint = filterBy ? `/products?${filterBy}` : '/products';
    const response = await fetch.get(endpoint);
    return response.data.products || response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
*/
