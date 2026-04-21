import { FilterOption, FilterCategories, FilterCategory } from "../types";

export const FILTER_CATEGORIES: FilterOption[] = [
  { title: "headset" },
  { title: "notebook" },
  { title: "phone" },
];

export const FILTER_COLORS: FilterOption[] = [
  { title: "black" },
  { title: "blue" },
  { title: "gold" },
  { title: "cream" },
  { title: "white" },
  { title: "silver" },
  { title: "ivory" },
  { title: "pink" },
];

export const FILTER_BRANDS: FilterOption[] = [
  { title: "Apple" },
  { title: "Asus" },
  { title: "Huawei" },
  { title: "Jbl" },
  { title: "Samsung" },
  { title: "Sony" },
];

export const CATEGORIES: FilterCategories = {
  category: FILTER_CATEGORIES,
  color: FILTER_COLORS,
  brand: FILTER_BRANDS,
};

export const INITIAL_FILTER_VALUES: FilterCategory[] = [
  { categoryTitle: "Category", titleArea: FILTER_CATEGORIES },
  { categoryTitle: "Color", titleArea: FILTER_COLORS },
  { categoryTitle: "Brand", titleArea: FILTER_BRANDS },
];
