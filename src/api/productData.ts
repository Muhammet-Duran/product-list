import { products } from "../data/products";
import { Product } from "../types";
import { FilterQueryString } from "../types/api.types";

// Mock API - It looks like it uses Axios, but it returns local data
export const getProductList = async (filterBy?: FilterQueryString): Promise<Product[]> => {
  // API gecikmesi simülasyonu
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock response - like it’s coming from a real API
  const mockResponse = {
    data: {
      products: filterBy ? filterProducts(filterBy) : products
    }
  };

  return mockResponse.data.products;
};

// Filter Func.
function filterProducts(filterBy: string): Product[] {
  const params: Record<string, string[]> = {};
  filterBy.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    if (!params[key]) params[key] = [];
    params[key].push(value);
  });

  return products.filter((product) => {
    return Object.entries(params).every(([key, values]) => {
      const productValue = product[key as keyof Product];
      if (!productValue) return true;
      return values.some(
        (val) => String(productValue).toLowerCase() === val.toLowerCase(),
      );
    });
  });
}



