import { useMemo } from "react";
import { Product, SelectedCategories, SortOrder } from "../types";

/**
 * Custom hook for filtering and sorting products
 * Separates filtering and sorting logic from ProductContext
 */
export const useProductFiltering = (
  products: Product[],
  selectedCategories: SelectedCategories,
  sortOrder: SortOrder
): Product[] => {
  return useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategories.category.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.category.includes(p.category)
      );
    }

    // Apply color filter
    if (selectedCategories.color.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.color.includes(p.color)
      );
    }

    // Apply brand filter
    if (selectedCategories.brand.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCategories.brand.includes(p.brand)
      );
    }

    // Apply sorting
    if (sortOrder === "price_asc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (isNaN(priceA)) return 1;
        if (isNaN(priceB)) return -1;
        return priceA - priceB;
      });
    } else if (sortOrder === "price_desc") {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (isNaN(priceA)) return 1;
        if (isNaN(priceB)) return -1;
        return priceB - priceA;
      });
    } else if (sortOrder === "name_asc") {
      filtered.sort((a, b) => {
        const titleA = a.title?.toLowerCase() ?? "";
        const titleB = b.title?.toLowerCase() ?? "";
        return titleA.localeCompare(titleB, "tr");
      });
    } else if (sortOrder === "name_desc") {
      filtered.sort((a, b) => {
        const titleA = a.title?.toLowerCase() ?? "";
        const titleB = b.title?.toLowerCase() ?? "";
        return titleB.localeCompare(titleA, "tr");
      });
    }

    return filtered;
  }, [products, selectedCategories, sortOrder]);
};
