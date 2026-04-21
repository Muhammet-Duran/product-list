import { getProductList } from "../api/productData";
import { Product } from "../types";

type FilterColumn = "category" | "color" | "brand";

// Generate link with multiple filter
export const generateLink = async (
  category: string[] = [],
  color: string[] = [],
  brand: string[] = []
): Promise<Product[]> => {
  const template = (slug: string, column: FilterColumn): string => {
    return `${column}=${slug}`;
  };

  const generateFilter = (array: string[], column: FilterColumn): string => {
    return array.map((item) => template(item, column)).join("&");
  };

  let categoryFilter: string | undefined;
  let colorFilter: string | undefined;
  let brandFilter: string | undefined;
  let filter: string | undefined;

  if (category.length) {
    categoryFilter = generateFilter(category, "category");
    filter = categoryFilter;
  }
  if (color.length) {
    colorFilter = generateFilter(color, "color");
    filter = colorFilter;
  }
  if (brand.length) {
    brandFilter = generateFilter(brand, "brand");
    filter = brandFilter;
  }

  if (category.length && color.length) {
    filter = `${categoryFilter}&${colorFilter}`;
  }

  if (category.length && brand.length) {
    filter = `${categoryFilter}&${brandFilter}`;
  }

  if (color.length && brand.length) {
    filter = `${colorFilter}&${brandFilter}`;
  }

  if (category.length && color.length && brand.length) {
    filter = `${categoryFilter}&${colorFilter}&${brandFilter}`;
  }

  return getProductList(filter);
};
